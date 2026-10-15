// Gera o site estático (HTML puro) a partir do layout compartilhado.
// Uso: node _src/build.mjs   (sem dependências)
// A pasta _src/ é ignorada pelo GitHub Pages (Jekyll ignora pastas com "_").

import { writeFileSync, readFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { treatments } from './pages.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// Versão dos arquivos (hash do conteúdo): força o navegador a baixar CSS/JS novos após cada mudança.
const ver = (rel) => createHash('sha1').update(readFileSync(join(ROOT, rel))).digest('hex').slice(0, 8);
const CSS_V = ver('css/style.css');
const JS_V = ver('js/main.js');

/* ------------------------------------------------------------------ */
/* Configuração — preencher quando confirmado                          */
/* ------------------------------------------------------------------ */
const SITE = {
  // Domínio final, sem barra no fim (ex.: 'https://www.dramaragama.com.br').
  // Enquanto vazio: sem canonical, og:url, og:image absolutos e sem sitemap.xml.
  url: 'https://dramaragama.com.br',
  // Gera o arquivo CNAME (domínio próprio no GitHub Pages). Deixe false até trocar o DNS no Registro.br,
  // senão o endereço *.github.io redireciona para o domínio, que ainda mostra o site antigo.
  cname: false,
  // Número do CRO-RJ. Enquanto vazio, não aparece no site.
  cro: '',
  name: 'Mara Gama Odontologia & Estética',
  phoneDisplay: '(21) 98000-2009',
  phoneIntl: '+5521980002009',
  whatsapp: '5521980002009',
  email: 'dentistamaragama@gmail.com',
  instagram: 'https://www.instagram.com/dra.maragama',
  facebook: 'https://www.facebook.com/Dra.MaraGama',
};

const IMG = {
  'consultorio-hero': [900, 601],
  'consultorio-1': [900, 1200],
  'consultorio-2': [900, 1200],
  'consultorio-3': [834, 1200],
  harmonizacao: [801, 1200],
  'harmonizacao-trust': [602, 900],
  mara: [700, 700],
  'predio-fachada': [831, 1270],
};

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const NEW_TAB = '<span class="sr-only"> (abre em nova aba)</span>';
const DEFAULT_WA = 'Olá, gostaria de agendar uma avaliação.';
const wa = (msg = DEFAULT_WA) => `https://api.whatsapp.com/send?phone=${SITE.whatsapp}&amp;text=${encodeURIComponent(msg)}`;
const icon = (id, size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${id}"/></svg>`;

function picture(base, name, alt, { lazy = true, priority = false, cls = '' } = {}) {
  const [w, h] = IMG[name];
  const load = priority ? ' fetchpriority="high"' : lazy ? ' loading="lazy" decoding="async"' : '';
  return `<picture${cls ? ` class="${cls}"` : ''}>
  <source srcset="${base}assets/images/${name}.webp" type="image/webp">
  <img src="${base}assets/images/${name}.jpg" alt="${esc(alt)}" width="${w}" height="${h}"${load}>
</picture>`;
}
const logo = (base, alt, extra = '') => `<picture>
  <source srcset="${base}assets/images/logo-sm.webp" type="image/webp">
  <img src="${base}assets/images/logo-sm.png" alt="${esc(alt)}" width="200" height="145"${extra}>
</picture>`;

const waBtn = (label, msg, cls = 'btn btn-gold') =>
  `<a class="${cls}" href="${wa(msg)}" target="_blank" rel="noopener">${icon('wa')} ${label}${NEW_TAB}</a>`;

const bySlug = Object.fromEntries(treatments.map((t) => [t.slug, t]));
const odonto = treatments.filter((t) => t.group === 'odontologia');
const estetica = treatments.filter((t) => t.group === 'estetica');

function cards(base, list, headingLevel = 3) {
  return `<ul class="cards">
${list.map((t) => `  <li class="card">
    <h${headingLevel}><a href="${base}${t.slug}/">${esc(t.name)}</a></h${headingLevel}>
    <p>${esc(t.card)}</p>
    <span class="card-more" aria-hidden="true">Conheça o tratamento →</span>
  </li>`).join('\n')}
</ul>`;
}

/* ------------------------------------------------------------------ */
/* Layout                                                               */
/* ------------------------------------------------------------------ */
function head({ base, path, title, description, ogImage = 'consultorio-hero', jsonld = [] }) {
  const abs = SITE.url ? `${SITE.url}/${path}` : '';
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${abs ? `<link rel="canonical" href="${abs}">\n` : ''}<meta name="color-scheme" content="light">
<meta name="theme-color" content="#FBF3EF">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
${abs ? `<meta property="og:url" content="${abs}">\n<meta property="og:image" content="${SITE.url}/assets/images/${ogImage}.jpg">\n` : ''}<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="${base}assets/images/favicon.png">
<link rel="apple-touch-icon" href="${base}assets/images/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..600;1,9..144,400..500&family=Manrope:wght@400..700&display=swap">
<link rel="stylesheet" href="${base}css/style.css?v=${CSS_V}">
${jsonld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>`;
}

const NAV = [
  ['inicio', 'Início', (b) => b || './'],
  ['sobre', 'Sobre a Dra. Mara', (b, home) => (home ? '#sobre' : `${b}#sobre`)],
  ['tratamentos', 'Tratamentos', (b) => `${b}tratamentos/`],
  ['estetica', 'Estética Orofacial', (b) => `${b}estetica-orofacial/`],
  ['contato', 'Contato', (b, home) => (home ? '#contato' : '#contato')],
];

function header(base, current, home) {
  const links = NAV.map(([key, label, href]) =>
    `<a href="${href(base, home)}"${key === current ? ' aria-current="page"' : ''}>${label}</a>`).join('\n      ');
  return `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>

<header class="site-header">
  <div class="headbar">
    <a class="brand" href="${base || './'}">
      ${logo(base, 'Mara Gama Odontologia & Estética — página inicial')}
    </a>
    <nav class="mainnav" aria-label="Principal">
      ${links}
    </nav>
    <div class="head-actions">
      <a class="btn btn-gold" href="${wa()}" target="_blank" rel="noopener">${icon('wa')}<span class="hide-sm">Agende sua avaliação</span><span class="show-sm">Agendar</span>${NEW_TAB}</a>
      <button class="menu-toggle" id="menuToggle" type="button" aria-label="Abrir menu" aria-expanded="false" aria-controls="mobileNav"><span aria-hidden="true"></span></button>
    </div>
  </div>
  <nav class="mobile-nav" id="mobileNav" aria-label="Menu">
      ${links}
  </nav>
</header>`;
}

function footer(base, home) {
  const croLine = SITE.cro ? `<p class="foot-cro">Responsável técnica: Dra. Mara Gama — CRO-RJ ${esc(SITE.cro)}</p>` : '';
  return `<footer class="site-footer"${home ? '' : ' id="contato"'}>
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        ${logo(base, SITE.name, ' loading="lazy" decoding="async"')}
        <p>Odontologia • Periodontia • Prótese Dentária • Estética Orofacial</p>
        <p>Consultório na Barra Olímpica — Rio de Janeiro, RJ</p>
      </div>
      <nav class="foot-col" aria-label="Odontologia">
        <h2 class="foot-title">Odontologia</h2>
        ${odonto.map((t) => `<a href="${base}${t.slug}/">${esc(t.name)}</a>`).join('\n        ')}
      </nav>
      <nav class="foot-col" aria-label="Estética orofacial">
        <h2 class="foot-title">Estética orofacial</h2>
        ${estetica.map((t) => `<a href="${base}${t.slug}/">${esc(t.name)}</a>`).join('\n        ')}
      </nav>
      <div class="foot-col">
        <h2 class="foot-title">Contato</h2>
        <a href="${wa()}" target="_blank" rel="noopener">${icon('wa', 16)} WhatsApp ${SITE.phoneDisplay}${NEW_TAB}</a>
        <a href="tel:${SITE.phoneIntl}">${icon('phone', 16)} Ligar</a>
        <a href="mailto:${SITE.email}">${icon('mail', 16)} ${SITE.email}</a>
        <a href="${SITE.instagram}" target="_blank" rel="noopener">${icon('ig', 16)} @dra.maragama${NEW_TAB}</a>
        <a href="${SITE.facebook}" target="_blank" rel="noopener">${icon('fb', 16)} Facebook${NEW_TAB}</a>
      </div>
    </div>
    <div class="foot-bottom">
      ${croLine}
      <p>As informações deste site têm caráter informativo e não substituem a avaliação profissional.</p>
      <p>© ${new Date().getFullYear()} ${esc(SITE.name)}. Todos os direitos reservados.</p>
    </div>
  </div>
</footer>

<a class="fab" href="${wa()}" target="_blank" rel="noopener" aria-label="Agende sua avaliação pelo WhatsApp (abre em nova aba)">
  ${icon('wa', 28)}
</a>

<svg class="sprite" width="0" height="0" aria-hidden="true" focusable="false">
  <symbol id="i-wa" viewBox="0 0 24 24"><path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.34m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z"/></symbol>
  <symbol id="i-phone" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" d="M20.5 16.9v2.3a2 2 0 0 1-2.2 2 18 18 0 0 1-7.8-2.8 17.8 17.8 0 0 1-5.5-5.5A18 18 0 0 1 2.2 5.1a2 2 0 0 1 2-2.2h2.3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.7a2 2 0 0 1-.5 2.1L7.6 10.5a14 14 0 0 0 5.9 5.9l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2.4Z"/></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 7 8.5-7"/></g></symbol>
  <symbol id="i-ig" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/></g></symbol>
  <symbol id="i-fb" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" d="M14 9V6a2 2 0 0 1 2-2h2V1h-3a5 5 0 0 0-5 5v3H7v3h3v9h4v-9h3l1-3h-4Z"/></symbol>
  <symbol id="i-next" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></symbol>
  <symbol id="i-pin" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></g></symbol>
</svg>

<script src="${base}js/main.js?v=${JS_V}" defer></script>
</body>
</html>
`;
}

function ctaBand(base, msg) {
  return `<section class="cta-band" aria-labelledby="cta-titulo">
  <div class="wrap cta-band-inner">
    <div>
      <h2 id="cta-titulo">Agende sua avaliação</h2>
      <p>Cada tratamento começa com uma avaliação individual. Fale conosco pelo WhatsApp para marcar um horário ou tirar suas dúvidas.</p>
    </div>
    ${waBtn('Agende sua avaliação', msg)}
  </div>
</section>`;
}

function crumbs(base, items) {
  // items: [[label, href|null], ...]
  return `<nav class="crumbs" aria-label="Você está em">
  <ol>
    ${items.map(([label, href]) => href ? `<li><a href="${href}">${esc(label)}</a></li>` : `<li aria-current="page">${esc(label)}</li>`).join('\n    ')}
  </ol>
</nav>`;
}

function breadcrumbLd(items) {
  if (!SITE.url) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE.url}/${path}` })),
  };
}

/* ------------------------------------------------------------------ */
/* Páginas                                                              */
/* ------------------------------------------------------------------ */
function treatmentPage(t) {
  const base = '../';
  const hub = t.group === 'estetica' ? ['Estética orofacial', 'estetica-orofacial/'] : ['Tratamentos', 'tratamentos/'];
  const crumbItems = [['Início', base], [hub[0], base + hub[1]], [t.name, null]];
  const ld = breadcrumbLd([['Início', ''], [hub[0], hub[1]], [t.name, `${t.slug}/`]]);
  const related = t.related.map((s) => bySlug[s]);
  return `${head({ base, path: `${t.slug}/`, title: t.title, description: t.description, ogImage: t.image[0], jsonld: ld ? [ld] : [] })}
<body>
${header(base, t.group === 'estetica' ? 'estetica' : 'tratamentos', false)}

<main id="conteudo" tabindex="-1">
  <section class="page-hero">
    <div class="wrap page-hero-grid">
      <div>
        ${crumbs(base, crumbItems)}
        <p class="eyebrow">${esc(t.eyebrow)}</p>
        <h1>${esc(t.h1)}</h1>
        <p class="lead">${esc(t.lead)}</p>
        <div class="hero-ctas">
          ${waBtn('Agende sua avaliação', t.wa)}
        </div>
      </div>
      <div class="page-hero-photo">
        ${picture(base, t.image[0], t.image[1], { priority: true })}
      </div>
    </div>
  </section>

  <div class="wrap page-body">
    <article class="prose">
${t.body.replaceAll('{{base}}', base).trim()}
    </article>
  </div>

  ${ctaBand(base, t.wa)}

  <section class="section related" aria-labelledby="rel-titulo">
    <div class="wrap">
      <h2 id="rel-titulo" class="related-title">Tratamentos relacionados</h2>
      ${cards(base, related)}
    </div>
  </section>
</main>

${footer(base, false)}`;
}

function hubPage({ slug, title, description, eyebrow, h1, lead, image, current, intro, list, extra = '' }) {
  const base = '../';
  const ld = breadcrumbLd([['Início', ''], [h1, `${slug}/`]]);
  return `${head({ base, path: `${slug}/`, title, description, ogImage: image[0], jsonld: ld ? [ld] : [] })}
<body>
${header(base, current, false)}

<main id="conteudo" tabindex="-1">
  <section class="page-hero">
    <div class="wrap page-hero-grid">
      <div>
        ${crumbs(base, [['Início', base], [h1, null]])}
        <p class="eyebrow">${esc(eyebrow)}</p>
        <h1>${esc(h1)}</h1>
        <p class="lead">${esc(lead)}</p>
        <div class="hero-ctas">${waBtn('Agende sua avaliação')}</div>
      </div>
      <div class="page-hero-photo">
        ${picture(base, image[0], image[1], { priority: true })}
      </div>
    </div>
  </section>
  ${intro}
  ${list}
  ${extra}
  ${ctaBand(base)}
</main>

${footer(base, false)}`;
}

function tratamentosPage() {
  const base = '../';
  return hubPage({
    slug: 'tratamentos',
    title: 'Tratamentos Odontológicos na Barra Olímpica | Dra. Mara Gama',
    description: 'Periodontia, prevenção e limpeza, clareamento dental, prótese, implantes, tratamento de canal e estética orofacial. Dra. Mara Gama, na Barra Olímpica, Rio de Janeiro.',
    eyebrow: 'Tratamentos',
    h1: 'Tratamentos',
    lead: 'Saúde bucal, reabilitação, estética do sorriso e estética orofacial — sempre a partir de uma avaliação individual e de um planejamento cuidadoso.',
    image: ['consultorio-1', 'Sala de atendimento do consultório na Barra Olímpica'],
    current: 'tratamentos',
    intro: '',
    list: `<section class="section" aria-labelledby="odonto-titulo">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Odontologia</p>
        <h2 id="odonto-titulo">Saúde, função e estética do sorriso</h2>
      </div>
      ${cards(base, odonto)}
    </div>
  </section>
  <section class="section alt" aria-labelledby="est-titulo">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Estética orofacial</p>
        <h2 id="est-titulo">Procedimentos estéticos para o rosto</h2>
        <p>Planejados individualmente, com respeito à anatomia e valorização de resultados naturais. <a href="${base}estetica-orofacial/">Saiba como conduzimos a estética orofacial</a>.</p>
      </div>
      ${cards(base, estetica)}
    </div>
  </section>`,
  });
}

// Carrossel do consultório (home). Para adicionar fotos: coloque o .jpg e o .webp em
// assets/images/, registre as dimensões em IMG e inclua uma linha aqui.
const GALLERY = [
  ['consultorio-2', 'Dra. Mara Gama em atendimento odontológico no consultório'],
  ['consultorio-1', 'Sala de atendimento do consultório na Barra Olímpica'],
  ['consultorio-3', 'Dra. Mara Gama na sala de consulta do consultório'],
  ['consultorio-hero', 'Dra. Mara Gama no consultório, com vista da janela'],
  ['harmonizacao', 'Dra. Mara Gama em avaliação facial com paciente'],
];

const PRINCIPLES = [
  ['Naturalidade', 'Preservar a expressão e a identidade de cada rosto.'],
  ['Equilíbrio', 'Olhar a face como um todo, e não apenas uma região isolada.'],
  ['Individualização', 'Cada plano parte da anatomia, da história e das expectativas de cada pessoa.'],
  ['Planejamento', 'Indicação, quantidade e etapas definidas antes de qualquer aplicação.'],
  ['Respeito à anatomia', 'Conhecimento da estrutura da face para escolher a técnica adequada.'],
  ['Indicação profissional', 'Nem todo caso tem indicação — e isso também faz parte de um atendimento responsável.'],
];

function principlesList() {
  return `<ul class="principles">
${PRINCIPLES.map(([t, d]) => `  <li><h3>${t}</h3><p>${d}</p></li>`).join('\n')}
</ul>`;
}

function esteticaPage() {
  const base = '../';
  return hubPage({
    slug: 'estetica-orofacial',
    title: 'Estética Orofacial na Barra Olímpica — Toxina Botulínica e Preenchimento | Dra. Mara Gama',
    description: 'Toxina botulínica, preenchimento labial e facial, bioestimuladores de colágeno e skinbooster com planejamento individual. Dra. Mara Gama, na Barra Olímpica, Rio de Janeiro.',
    eyebrow: 'Estética orofacial',
    h1: 'Estética orofacial',
    lead: 'Procedimentos estéticos para o rosto com planejamento individual, respeito à anatomia e valorização de resultados naturais.',
    image: ['harmonizacao', 'Dra. Mara Gama em avaliação facial no consultório'],
    current: 'estetica',
    intro: `<section class="section" aria-labelledby="principios-titulo">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Como conduzimos</p>
        <h2 id="principios-titulo">Estética com equilíbrio e responsabilidade</h2>
      </div>
      ${principlesList()}
    </div>
  </section>`,
    list: `<section class="section alt" aria-labelledby="proc-titulo">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Procedimentos</p>
        <h2 id="proc-titulo">Procedimentos realizados</h2>
      </div>
      ${cards(base, estetica)}
    </div>
  </section>`,
    extra: `<section class="section" aria-labelledby="aval-titulo">
    <div class="wrap narrow">
      <h2 id="aval-titulo" class="section-title">A avaliação</h2>
      <p class="section-text">Antes de qualquer procedimento, a Dra. Mara avalia a face, conversa sobre expectativas, saúde geral e medicamentos em uso, e explica indicações, limites e cuidados. A decisão é sempre tomada em conjunto, com informação clara.</p>
    </div>
  </section>`,
  });
}

function homePage() {
  const base = '';
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: SITE.name,
    description: 'Odontologia, Periodontia, Prótese Dentária e Estética Orofacial com a Dra. Mara Gama, na Barra Olímpica, Rio de Janeiro.',
    telephone: SITE.phoneIntl,
    email: SITE.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Rio de Janeiro', addressRegion: 'RJ', addressCountry: 'BR' },
    areaServed: 'Barra Olímpica, Rio de Janeiro',
    sameAs: [SITE.instagram, SITE.facebook],
    employee: { '@type': 'Person', name: 'Mara Gama', honorificPrefix: 'Dra.', jobTitle: 'Cirurgiã-dentista' },
    ...(SITE.url ? { url: `${SITE.url}/`, image: `${SITE.url}/assets/images/consultorio-hero.jpg`, logo: `${SITE.url}/assets/images/logo.png` } : {}),
  };
  return `${head({
    base,
    path: '',
    title: 'Dra. Mara Gama | Dentista na Barra Olímpica — Periodontia, Prótese e Estética Orofacial',
    description: 'Cirurgiã-dentista na Barra Olímpica, Rio de Janeiro. Periodontia, prevenção, clareamento dental, prótese, implantes e estética orofacial com planejamento individual.',
    jsonld: [ld],
  })}
<body>
${header(base, 'inicio', true)}

<main id="conteudo" tabindex="-1">
  <section class="hero" id="inicio">
    <div class="wrap hero-grid">
      <div class="hero-text">
        <p class="hero-name">Dra. Mara Gama</p>
        <p class="hero-areas">${['Odontologia', 'Periodontia', 'Prótese Dentária', 'Estética Orofacial'].map((t) => `<span class="area">${t}</span>`).join(' <span class="sep" aria-hidden="true">•</span> ')}</p>
        <h1>Saúde, função e estética <em>em equilíbrio.</em></h1>
        <p class="lead">Tratamentos odontológicos e estéticos individualizados, com planejamento cuidadoso e valorização de resultados naturais.</p>
        <div class="hero-ctas">
          ${waBtn('Agende sua avaliação')}
          <a class="btn btn-ghost" href="tratamentos/">Conheça os tratamentos</a>
        </div>
        <p class="hero-loc">${icon('pin', 18)} Consultório na Barra Olímpica, Rio de Janeiro</p>
      </div>
      <div class="hero-visual">
        <div class="hero-photo-frame">
          ${picture(base, 'consultorio-hero', 'Dra. Mara Gama no consultório da Barra Olímpica', { priority: true })}
        </div>
        <div class="hero-badge">
          ${logo(base, '')}
          <span>Mais de 20 anos de experiência em Odontologia.</span>
        </div>
      </div>
    </div>
  </section>

  <svg class="scallop wrap" viewBox="0 0 1180 34" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <path d="M0 6 Q 29.5 32 59 6 Q 88.5 -20 118 6 Q 147.5 32 177 6 Q 206.5 -20 236 6 Q 265.5 32 295 6 Q 324.5 -20 354 6 Q 383.5 32 413 6 Q 442.5 -20 472 6 Q 501.5 32 531 6 Q 560.5 -20 590 6 Q 619.5 32 649 6 Q 678.5 -20 708 6 Q 737.5 32 767 6 Q 796.5 -20 826 6 Q 855.5 32 885 6 Q 914.5 -20 944 6 Q 973.5 32 1003 6 Q 1032.5 -20 1062 6 Q 1091.5 32 1121 6 Q 1150.5 -20 1180 6" fill="none" stroke="currentColor" stroke-width="1.6" vector-effect="non-scaling-stroke"/>
  </svg>

  <section class="section" id="tratamentos" aria-labelledby="tratamentos-titulo">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Áreas de atuação</p>
        <h2 id="tratamentos-titulo">Cuidado completo, da gengiva ao sorriso</h2>
        <p>Da prevenção à reabilitação, com atenção especial à saúde da gengiva — a base de qualquer tratamento duradouro.</p>
      </div>
      ${cards(base, odonto)}
    </div>
  </section>

  <section class="section alt" id="sobre" aria-labelledby="sobre-titulo">
    <div class="wrap about-grid">
      <div class="about-photo">
        ${picture(base, 'mara', 'Retrato da Dra. Mara Gama')}
      </div>
      <div>
        <p class="eyebrow">A profissional</p>
        <h2 id="sobre-titulo" class="about-name">Dra. Mara Gama</h2>
        <p class="about-role">Cirurgiã-dentista — Odontologia, Periodontia, Prótese Dentária e Estética Orofacial</p>
        <p class="about-text">Cirurgiã-dentista formada pela Universidade Paulista, com um percurso construído entre o consultório e o ambiente hospitalar. Hoje dedica-se a tratamentos que unem saúde bucal e equilíbrio estético, sempre a partir da necessidade individual de cada paciente.</p>
        <ul class="cred-list">
          <li>Mais de 20 anos de experiência em Odontologia</li>
          <li>Graduada em Odontologia pela Universidade Paulista (2004)</li>
          <li>Especialização em Periodontia</li>
          <li>Especialização em Prótese Dentária</li>
          <li>Especialização em Estética Orofacial</li>
          <li>Experiência em Odontologia Hospitalar</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section" id="estetica-orofacial" aria-labelledby="estetica-titulo">
    <span id="harmonizacao" class="anchor-alias" aria-hidden="true"></span>
    <div class="wrap">
      <div class="harm-feature">
        ${picture(base, 'harmonizacao', 'Dra. Mara Gama em avaliação facial no consultório')}
        <div>
          <p class="eyebrow">Estética orofacial</p>
          <h2 id="estetica-titulo" class="section-title">Estética facial com naturalidade</h2>
          <p class="section-text">Procedimentos estéticos para o rosto planejados de forma individual, com respeito à anatomia e foco no equilíbrio entre sorriso e face.</p>
          <ul class="link-list">
            ${estetica.map((t) => `<li><a href="${t.slug}/">${esc(t.name)}</a></li>`).join('\n            ')}
          </ul>
          <a class="btn btn-line" href="estetica-orofacial/">Conheça a estética orofacial</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section alt" id="consultorios" aria-labelledby="consultorio-titulo">
    <div class="wrap">
      <div class="loc-grid">
        <div class="loc-info">
          <p class="eyebrow">Onde atendemos</p>
          <h2 id="consultorio-titulo" class="section-title">Consultório na Barra Olímpica</h2>
          <p class="section-text">Estrutura completa para odontologia e estética orofacial, com estacionamento e fácil acesso para quem vem de toda a Barra da Tijuca e Zona Oeste.</p>
          ${waBtn('Agende sua avaliação')}
        </div>
        <figure class="facade">
          <div class="photo-frame">
            ${picture(base, 'predio-fachada', 'Fachada do edifício Deep Prime Offices, número 740, onde fica o consultório')}
          </div>
          <figcaption class="photo-badge">${icon('pin', 18)} <span><strong>Fachada do prédio</strong>Barra Olímpica — Rio de Janeiro</span></figcaption>
        </figure>
      </div>

      <div class="carousel" data-carousel>
        <h3 id="galeria-titulo" class="carousel-title">Conheça o consultório</h3>
        <div class="carousel-viewport">
        <button type="button" class="carousel-next" data-next aria-controls="galeria" aria-label="Próxima foto">${icon('next', 20)}</button>
        <ul class="carousel-track" id="galeria" role="region" aria-roledescription="carrossel" aria-labelledby="galeria-titulo" tabindex="0">
          ${GALLERY.map(([name, alt], i) => `<li class="slide" aria-label="${i + 1} de ${GALLERY.length}">
            <div class="photo-frame">${picture(base, name, alt)}</div>
          </li>`).join('\n          ')}
        </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="contato" aria-labelledby="contato-titulo">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Contato</p>
        <h2 id="contato-titulo">Fale conosco</h2>
        <p>Escolha o canal mais confortável para você. Pelo WhatsApp, você agenda sua avaliação ou tira suas dúvidas.</p>
      </div>
      <div class="contact-grid">
        <div class="ccard">
          <span class="ic">${icon('wa', 20)}</span>
          <div>
            <h3>WhatsApp / Telefone</h3>
            <a href="https://api.whatsapp.com/send?phone=${SITE.whatsapp}" target="_blank" rel="noopener">${SITE.phoneDisplay}<span class="sr-only"> no WhatsApp (abre em nova aba)</span></a>
            <a class="ccard-sub" href="tel:${SITE.phoneIntl}">Ligar<span class="sr-only"> para o consultório</span></a>
          </div>
        </div>
        <div class="ccard">
          <span class="ic">${icon('mail', 20)}</span>
          <div>
            <h3>E-mail</h3>
            <a href="mailto:${SITE.email}">${SITE.email}</a>
          </div>
        </div>
        <div class="ccard">
          <span class="ic">${icon('ig', 20)}</span>
          <div>
            <h3>Instagram</h3>
            <a href="${SITE.instagram}" target="_blank" rel="noopener">@dra.maragama${NEW_TAB}</a>
          </div>
        </div>
        <div class="ccard">
          <span class="ic">${icon('fb', 20)}</span>
          <div>
            <h3>Facebook</h3>
            <a href="${SITE.facebook}" target="_blank" rel="noopener">Dra.MaraGama${NEW_TAB}</a>
          </div>
        </div>
      </div>
      <div class="cta-final">
        <p class="disp">Agende sua avaliação com a Dra. Mara Gama.</p>
        ${waBtn('Agende sua avaliação')}
      </div>
    </div>
  </section>
</main>

${footer(base, true)}`;
}

function notFoundPage() {
  // Servida pelo GitHub Pages em qualquer caminho: links absolutos a partir da raiz.
  const base = '/';
  return `${head({ base, path: '404.html', title: 'Página não encontrada | Dra. Mara Gama', description: 'A página procurada não foi encontrada.' }).replace('<meta name="color-scheme"', '<meta name="robots" content="noindex">\n<meta name="color-scheme"')}
<body>
${header(base, '', false)}
<main id="conteudo" tabindex="-1">
  <section class="section">
    <div class="wrap narrow">
      <p class="eyebrow">Erro 404</p>
      <h1 class="section-title">Página não encontrada</h1>
      <p class="section-text">O endereço pode ter mudado ou não existe mais. Veja abaixo os principais caminhos do site.</p>
      <ul class="link-list">
        <li><a href="/">Página inicial</a></li>
        <li><a href="/tratamentos/">Tratamentos</a></li>
        <li><a href="/estetica-orofacial/">Estética orofacial</a></li>
        <li><a href="/#contato">Contato</a></li>
      </ul>
    </div>
  </section>
</main>
${footer(base, false)}`;
}

/* ------------------------------------------------------------------ */
/* Escrita                                                              */
/* ------------------------------------------------------------------ */
function write(rel, content) {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  console.log('  ✓', rel);
}

console.log('Gerando site…');
write('index.html', homePage());
write('tratamentos/index.html', tratamentosPage());
write('estetica-orofacial/index.html', esteticaPage());
for (const t of treatments) write(`${t.slug}/index.html`, treatmentPage(t));
write('404.html', notFoundPage());

// Páginas do site antigo (WCHost) → novas URLs. O GitHub Pages não faz 301,
// então cada página antiga vira um redirecionamento imediato (meta refresh + canonical).
const OLD_REDIRECTS = {
  'index.htm': '',
  'consultorio.htm': '#consultorios',
  'tratamentos.htm': 'tratamentos/',
  'harmonizacao_orofacial.htm': 'estetica-orofacial/',
  'equipe.htm': '#sobre',
  'emergencia.htm': '#contato',
  'fisioterapia.htm': '',
  'nutricao.htm': '',
  'psicologia.htm': '',
};
for (const [old, target] of Object.entries(OLD_REDIRECTS)) {
  const to = `${SITE.url}/${target}`;
  write(old, `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>Redirecionando…</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${to}">
<meta http-equiv="refresh" content="0; url=${to}">
<script>location.replace(${JSON.stringify(to)});</script>
</head>
<body><p>Esta página mudou de endereço: <a href="${to}">${to}</a></p></body>
</html>
`);
}

const paths = ['', 'tratamentos/', 'estetica-orofacial/', ...treatments.map((t) => `${t.slug}/`)];
write('robots.txt', `User-agent: *\nAllow: /\n${SITE.url ? `\nSitemap: ${SITE.url}/sitemap.xml\n` : ''}`);
if (SITE.url) {
  const today = new Date().toISOString().slice(0, 10);
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${SITE.url}/${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);
  if (SITE.cname) write('CNAME', new URL(SITE.url).hostname + '\n');
  else if (existsSync(join(ROOT, 'CNAME'))) rmSync(join(ROOT, 'CNAME'));
} else {
  if (existsSync(join(ROOT, 'sitemap.xml'))) rmSync(join(ROOT, 'sitemap.xml'));
  console.log('  ! SITE.url vazio: sitemap.xml, canonical e og:url não gerados.');
}
console.log('Pronto.');
