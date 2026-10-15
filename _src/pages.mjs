// Conteúdo das páginas de tratamento.
// {{base}} é substituído pelo caminho relativo até a raiz do site.
// Textos revisados para não conter promessas de resultado, prazos ou garantias.

export const treatments = [
  /* ---------------- Odontologia ---------------- */
  {
    slug: 'periodontia',
    group: 'odontologia',
    name: 'Periodontia',
    card: 'Saúde da gengiva: sangramento, gengivite, periodontite, retração e manutenção.',
    title: 'Periodontia e Tratamento de Gengiva na Barra Olímpica | Dra. Mara Gama',
    description: 'Gengiva que sangra, inflamada ou retraída? Avaliação e tratamento periodontal com a Dra. Mara Gama, cirurgiã-dentista na Barra Olímpica, Rio de Janeiro.',
    eyebrow: 'Odontologia',
    h1: 'Periodontia: saúde da gengiva e do suporte dos dentes',
    lead: 'A Periodontia cuida da gengiva e das estruturas que sustentam os dentes. Identificar e tratar cedo é a forma mais simples de preservar o sorriso ao longo da vida.',
    image: ['consultorio-2', 'Atendimento odontológico no consultório da Barra Olímpica'],
    wa: 'Olá, gostaria de agendar uma avaliação de Periodontia (gengiva).',
    related: ['prevencao-e-limpeza', 'protese-dentaria', 'implantes-dentarios'],
    body: `
<h2>Sinais que merecem avaliação</h2>
<ul class="checks">
  <li>Gengiva que sangra ao escovar ou ao usar fio dental</li>
  <li>Gengiva vermelha, inchada ou sensível</li>
  <li>Retração gengival — dentes que parecem mais “compridos”</li>
  <li>Mau hálito persistente</li>
  <li>Dentes com mobilidade ou que mudaram de posição</li>
  <li>Sensibilidade na raiz dos dentes</li>
</ul>
<p>A doença periodontal muitas vezes não dói no início. Por isso, mesmo sem dor, esses sinais merecem atenção.</p>

<h2>Gengivite e periodontite: qual a diferença?</h2>
<div class="duo">
  <div>
    <h3>Gengivite</h3>
    <p>É a inflamação inicial da gengiva, causada pelo acúmulo de placa bacteriana. Costuma ser revertida com limpeza profissional e uma rotina de higiene adequada.</p>
  </div>
  <div>
    <h3>Periodontite</h3>
    <p>Acontece quando a inflamação avança e atinge o osso que sustenta os dentes. Exige tratamento específico e acompanhamento contínuo para ser controlada.</p>
  </div>
</div>

<h2>Como é o tratamento</h2>
<ol class="steps">
  <li><strong>Avaliação periodontal.</strong> Exame da gengiva, medição das “bolsas” ao redor dos dentes e exames de imagem quando indicados.</li>
  <li><strong>Raspagem periodontal.</strong> Remoção do tártaro e da placa acima e abaixo da linha da gengiva, com anestesia local quando necessário.</li>
  <li><strong>Orientação de higiene.</strong> Técnicas e instrumentos adequados ao seu caso — escova, fio dental, escovas interdentais.</li>
  <li><strong>Manutenção periodontal.</strong> Consultas periódicas, em intervalos definidos caso a caso, para manter a gengiva saudável.</li>
</ol>

<h2>Retração gengival</h2>
<p>A retração pode ter causas diferentes — escovação com força excessiva, inflamação, posição dos dentes, entre outras. A avaliação identifica a causa e orienta o caminho mais adequado para cada pessoa.</p>

<h2>Perguntas frequentes</h2>
<div class="faq">
  <details>
    <summary>Gengiva sangrando é normal?</summary>
    <p>Não. O sangramento costuma ser sinal de inflamação e merece avaliação, mesmo quando não há dor.</p>
  </details>
  <details>
    <summary>A raspagem dói?</summary>
    <p>Quando necessário, o procedimento é feito com anestesia local, para que você fique confortável durante o atendimento.</p>
  </details>
  <details>
    <summary>A periodontite tem cura?</summary>
    <p>A periodontite pode ser controlada com tratamento e manutenção regulares. O acompanhamento é o que mantém a gengiva estável a longo prazo.</p>
  </details>
</div>
`,
  },
  {
    slug: 'prevencao-e-limpeza',
    group: 'odontologia',
    name: 'Prevenção e limpeza',
    card: 'Avaliação, limpeza profissional e orientação para prevenir cáries e doenças da gengiva.',
    title: 'Limpeza Dentária e Prevenção na Barra Olímpica | Dra. Mara Gama',
    description: 'Avaliação odontológica, limpeza profissional (profilaxia) e prevenção de cáries e doenças da gengiva com a Dra. Mara Gama, na Barra Olímpica, Rio de Janeiro.',
    eyebrow: 'Odontologia',
    h1: 'Prevenção e limpeza dentária',
    lead: 'Consultas regulares ajudam a evitar problemas maiores — e costumam ser as mais simples e confortáveis do tratamento odontológico.',
    image: ['consultorio-1', 'Sala de atendimento do consultório na Barra Olímpica'],
    wa: 'Olá, gostaria de agendar uma avaliação e limpeza.',
    related: ['periodontia', 'odontologia-estetica', 'protese-dentaria'],
    body: `
<h2>O que inclui a consulta de prevenção</h2>
<ul class="checks">
  <li><strong>Avaliação odontológica completa</strong> — dentes, gengiva, mucosas e mordida.</li>
  <li><strong>Limpeza profissional (profilaxia)</strong> — remoção de placa bacteriana e tártaro, seguida de polimento.</li>
  <li><strong>Prevenção de cáries e de doenças da gengiva</strong> — com medidas preventivas quando indicadas.</li>
  <li><strong>Orientação de higiene oral</strong> — personalizada para a sua rotina.</li>
  <li><strong>Acompanhamento periódico</strong> — para identificar alterações no início.</li>
</ul>

<h2>Com que frequência devo ir ao dentista?</h2>
<p>O intervalo entre as consultas é definido na avaliação, de acordo com a sua saúde bucal. Quem tem histórico de doença na gengiva, por exemplo, pode precisar de acompanhamento mais próximo.</p>

<h2>Limpeza ou raspagem?</h2>
<p>A limpeza (profilaxia) remove a placa e o tártaro da superfície dos dentes. Quando há tártaro abaixo da gengiva ou sinais de doença periodontal, pode ser indicada a <a href="{{base}}periodontia/">raspagem periodontal</a>, que faz parte do tratamento da gengiva.</p>
`,
  },
  {
    slug: 'odontologia-estetica',
    group: 'odontologia',
    name: 'Clareamento e estética do sorriso',
    card: 'Clareamento dental e restaurações estéticas para cor, forma e proporção dos dentes.',
    title: 'Clareamento Dental e Odontologia Estética na Barra Olímpica | Dra. Mara Gama',
    description: 'Clareamento dental e restaurações estéticas com planejamento individual. Dra. Mara Gama — Odontologia & Estética, na Barra Olímpica, Rio de Janeiro.',
    eyebrow: 'Odontologia',
    h1: 'Odontologia estética: clareamento e restaurações',
    lead: 'Ajustes de cor, forma e proporção podem fazer diferença no sorriso — sempre com a saúde dos dentes e da gengiva em primeiro lugar.',
    image: ['consultorio-3', 'Consultório odontológico da Dra. Mara Gama na Barra Olímpica'],
    wa: 'Olá, gostaria de agendar uma avaliação de clareamento / estética do sorriso.',
    related: ['prevencao-e-limpeza', 'protese-dentaria', 'periodontia'],
    body: `
<h2 id="clareamento-dental">Clareamento dental</h2>
<p>O clareamento utiliza géis específicos para clarear a cor natural dos dentes. A técnica e o número de sessões são definidos na avaliação, de acordo com o seu caso.</p>
<h3>Antes de clarear</h3>
<ul class="checks">
  <li>Cáries e inflamações na gengiva devem ser tratadas antes.</li>
  <li>Restaurações, coroas e próteses não mudam de cor com o clareamento — isso entra no planejamento.</li>
  <li>Pode haver sensibilidade temporária, que é acompanhada durante o tratamento.</li>
</ul>

<h2 id="restauracoes-esteticas">Restaurações estéticas</h2>
<p>Restaurações em resina na cor do dente recuperam dentes com cárie, fraturas ou desgastes, devolvendo forma e função com aparência natural.</p>

<h2>Forma e proporção do sorriso</h2>
<p>Quando clinicamente indicado, pequenas correções de forma e proporção ajudam a harmonizar o sorriso. A indicação parte sempre de uma avaliação da saúde bucal como um todo.</p>
`,
  },
  {
    slug: 'protese-dentaria',
    group: 'odontologia',
    name: 'Prótese e reabilitação oral',
    card: 'Coroas e próteses para recuperar dentes comprometidos, a mastigação e a estética.',
    title: 'Prótese Dentária e Reabilitação Oral na Barra Olímpica | Dra. Mara Gama',
    description: 'Coroas, próteses e planejamento reabilitador para recuperar função mastigatória e estética. Dra. Mara Gama, cirurgiã-dentista na Barra Olímpica, Rio de Janeiro.',
    eyebrow: 'Odontologia',
    h1: 'Prótese dentária e reabilitação oral',
    lead: 'Recuperar dentes perdidos ou muito comprometidos devolve conforto para mastigar, falar e sorrir.',
    image: ['consultorio-hero', 'Dra. Mara Gama no consultório da Barra Olímpica'],
    wa: 'Olá, gostaria de agendar uma avaliação de prótese dentária.',
    related: ['implantes-dentarios', 'periodontia', 'tratamento-de-canal'],
    body: `
<h2>Quando a prótese é indicada</h2>
<ul class="checks">
  <li>Perda de um ou mais dentes</li>
  <li>Dentes muito destruídos, fraturados ou com restaurações extensas</li>
  <li>Próteses antigas que perderam adaptação, conforto ou estética</li>
  <li>Dificuldade para mastigar</li>
</ul>

<h2>Principais opções</h2>
<div class="duo">
  <div>
    <h3>Coroas</h3>
    <p>Cobrem e protegem um dente comprometido, recuperando forma, resistência e aparência.</p>
  </div>
  <div>
    <h3>Próteses fixas</h3>
    <p>Substituem um ou mais dentes e ficam fixas, apoiadas em dentes ou em <a href="{{base}}implantes-dentarios/">implantes</a>.</p>
  </div>
  <div>
    <h3>Próteses removíveis</h3>
    <p>Parciais ou totais, podem ser removidas para higienização.</p>
  </div>
  <div>
    <h3>Próteses sobre implantes</h3>
    <p>Apoiadas em implantes, trazem mais estabilidade quando há indicação.</p>
  </div>
</div>

<h2>Planejamento reabilitador</h2>
<p>Cada caso começa com a avaliação da gengiva, dos dentes remanescentes e da mordida. Tratar a gengiva antes faz parte do planejamento — é isso que dá base e estabilidade à prótese.</p>
`,
  },
  {
    slug: 'implantes-dentarios',
    group: 'odontologia',
    name: 'Implantes dentários',
    card: 'Reposição de dentes perdidos com planejamento individual e acompanhamento.',
    title: 'Implantes Dentários na Barra Olímpica | Dra. Mara Gama',
    description: 'Implantes dentários com avaliação individual e planejamento. Dra. Mara Gama, cirurgiã-dentista na Barra Olímpica, Rio de Janeiro.',
    eyebrow: 'Odontologia',
    h1: 'Implantes dentários',
    lead: 'O implante substitui a raiz de um dente perdido e serve de base para uma nova coroa ou prótese.',
    image: ['consultorio-1', 'Sala de atendimento do consultório na Barra Olímpica'],
    wa: 'Olá, gostaria de agendar uma avaliação para implante dentário.',
    related: ['protese-dentaria', 'periodontia', 'prevencao-e-limpeza'],
    body: `
<h2>Como funciona</h2>
<ol class="steps">
  <li><strong>Avaliação e exames.</strong> Análise da gengiva, do osso e da saúde geral, com exames de imagem.</li>
  <li><strong>Planejamento.</strong> Quando indicado, o planejamento digital em 3D e a cirurgia guiada ajudam a definir a posição do implante com precisão.</li>
  <li><strong>Instalação do implante.</strong> Procedimento realizado com anestesia local.</li>
  <li><strong>Cicatrização.</strong> Período em que o implante se integra ao osso. O tempo varia de pessoa para pessoa.</li>
  <li><strong>Prótese.</strong> Instalação da coroa ou prótese sobre o implante.</li>
</ol>

<h2>Enxertos</h2>
<p>Quando não há osso suficiente para o implante, pode ser necessário um enxerto antes ou durante a instalação. A necessidade é avaliada nos exames.</p>

<h2>Cuidados depois do implante</h2>
<p>Implantes também precisam de higiene diária e consultas de manutenção. A inflamação ao redor do implante (peri-implantite) é semelhante à doença da gengiva e deve ser acompanhada — por isso a <a href="{{base}}periodontia/">saúde periodontal</a> faz parte do tratamento.</p>
`,
  },
  {
    slug: 'tratamento-de-canal',
    group: 'odontologia',
    name: 'Tratamento de canal',
    card: 'Trata a parte interna do dente inflamada ou infectada, ajudando a preservá-lo.',
    title: 'Tratamento de Canal na Barra Olímpica | Dra. Mara Gama',
    description: 'Tratamento e retratamento de canal (endodontia) com avaliação individual. Dra. Mara Gama, cirurgiã-dentista na Barra Olímpica, Rio de Janeiro.',
    eyebrow: 'Odontologia',
    h1: 'Tratamento de canal',
    lead: 'Quando a parte interna do dente (a polpa) inflama ou infecciona, o tratamento de canal ajuda a preservar o dente e a aliviar o desconforto.',
    image: ['consultorio-2', 'Atendimento odontológico no consultório da Barra Olímpica'],
    wa: 'Olá, gostaria de agendar uma avaliação sobre tratamento de canal.',
    related: ['protese-dentaria', 'implantes-dentarios', 'prevencao-e-limpeza'],
    body: `
<h2>O que é o tratamento de canal</h2>
<p>Dentro de cada dente existe a polpa, um tecido com nervos e vasos sanguíneos. Quando ela é atingida por uma cárie profunda, fratura ou trauma, pode inflamar ou infeccionar. No tratamento de canal, essa polpa é removida e os canais são limpos, desinfetados e selados.</p>

<h2>Sinais que merecem avaliação</h2>
<ul class="checks">
  <li>Dor espontânea ou que aparece à noite</li>
  <li>Sensibilidade ao quente ou ao frio que demora a passar</li>
  <li>Dor ao mastigar</li>
  <li>Inchaço ou “bolinha” na gengiva próxima ao dente</li>
  <li>Escurecimento do dente</li>
  <li>Alterações vistas em radiografia, mesmo sem dor</li>
</ul>

<h2>Como é feito</h2>
<ol class="steps">
  <li><strong>Avaliação e exames de imagem</strong> para entender a causa.</li>
  <li><strong>Anestesia local</strong>, para que você fique confortável.</li>
  <li><strong>Limpeza e desinfecção</strong> dos canais.</li>
  <li><strong>Selamento</strong> dos canais.</li>
  <li><strong>Restauração final</strong> — muitas vezes com uma <a href="{{base}}protese-dentaria/">coroa</a> para proteger o dente.</li>
</ol>

<h2>Retratamento de canal</h2>
<p>Quando um dente que já passou por tratamento de canal volta a apresentar inflamação ou infecção, o retratamento pode ajudar a preservá-lo. O material antigo é removido, e os canais são limpos e selados novamente.</p>

<h2>Perguntas frequentes</h2>
<div class="faq">
  <details>
    <summary>Tratamento de canal dói?</summary>
    <p>O procedimento é feito com anestesia local. Algum desconforto nos dias seguintes pode acontecer, e você recebe as orientações para esse período.</p>
  </details>
  <details>
    <summary>Depois do canal, o dente precisa de coroa?</summary>
    <p>Depende de quanto o dente está comprometido. Em muitos casos, a coroa é indicada para proteger o dente contra fraturas — isso é avaliado caso a caso.</p>
  </details>
</div>
`,
  },

  /* ---------------- Estética orofacial ---------------- */
  {
    slug: 'toxina-botulinica',
    group: 'estetica',
    name: 'Toxina botulínica',
    card: 'Suaviza linhas de expressão relaxando temporariamente músculos específicos da face.',
    title: 'Toxina Botulínica na Barra Olímpica | Dra. Mara Gama',
    description: 'Aplicação de toxina botulínica com avaliação individual e foco em naturalidade. Dra. Mara Gama — Odontologia & Estética, na Barra Olímpica, Rio de Janeiro.',
    eyebrow: 'Estética orofacial',
    h1: 'Toxina botulínica',
    lead: 'Aplicada em pequenas doses, a toxina botulínica relaxa temporariamente músculos específicos da face, suavizando linhas de expressão.',
    image: ['harmonizacao', 'Dra. Mara Gama em avaliação facial no consultório'],
    wa: 'Olá, gostaria de agendar uma avaliação para toxina botulínica.',
    related: ['preenchimento-facial', 'bioestimulador-de-colageno', 'skinbooster'],
    body: `
<h2>Para que é indicada</h2>
<p>A toxina botulínica é usada para suavizar linhas de expressão formadas pela contração repetida dos músculos. A indicação, as regiões e a quantidade são definidas na avaliação, respeitando a expressão de cada pessoa.</p>

<h2>Como é a aplicação</h2>
<ol class="steps">
  <li><strong>Avaliação.</strong> Análise da face em repouso e em movimento, conversa sobre expectativas, saúde e medicamentos em uso.</li>
  <li><strong>Planejamento.</strong> Definição dos pontos de aplicação.</li>
  <li><strong>Aplicação.</strong> Feita no consultório, com agulhas finas.</li>
  <li><strong>Retorno.</strong> Reavaliação para acompanhar a resposta.</li>
</ol>
<p>O efeito é temporário e aparece de forma gradual nos dias seguintes. A duração varia de pessoa para pessoa.</p>

<h2>Quando não é indicada</h2>
<p>A aplicação não é indicada, por exemplo, durante a gestação e a amamentação, em algumas doenças neuromusculares ou quando há infecção no local. Essas e outras situações são avaliadas na consulta.</p>
`,
  },
  {
    slug: 'preenchimento-labial',
    group: 'estetica',
    name: 'Preenchimento labial',
    card: 'Contorno, hidratação e volume dos lábios, em proporção com o restante do rosto.',
    title: 'Preenchimento Labial na Barra Olímpica | Dra. Mara Gama',
    description: 'Preenchimento labial com ácido hialurônico, planejado para respeitar a anatomia e as proporções do rosto. Dra. Mara Gama, na Barra Olímpica, Rio de Janeiro.',
    eyebrow: 'Estética orofacial',
    h1: 'Preenchimento labial',
    lead: 'Com ácido hialurônico, o preenchimento labial pode definir o contorno, hidratar ou repor volume — em proporção com o restante do rosto.',
    image: ['harmonizacao', 'Dra. Mara Gama em avaliação facial no consultório'],
    wa: 'Olá, gostaria de agendar uma avaliação para preenchimento labial.',
    related: ['preenchimento-facial', 'toxina-botulinica', 'skinbooster'],
    body: `
<h2>O que é o ácido hialurônico</h2>
<p>É uma substância presente naturalmente no organismo. Na forma de gel, é usada para dar suporte e hidratação aos tecidos e é absorvida gradualmente pelo corpo ao longo do tempo.</p>

<h2>Naturalidade em primeiro lugar</h2>
<p>O objetivo não é mudar a identidade do rosto. A quantidade de produto e a técnica são definidas a partir da anatomia dos lábios e das proporções da face de cada pessoa.</p>

<h2>Como é o procedimento</h2>
<ol class="steps">
  <li><strong>Avaliação</strong> dos lábios, do sorriso e do rosto como um todo.</li>
  <li><strong>Planejamento</strong> conversado com você, incluindo o que é possível e o que não é indicado.</li>
  <li><strong>Aplicação</strong> no consultório, com anestesia para maior conforto.</li>
  <li><strong>Retorno</strong> para acompanhamento.</li>
</ol>
<p>Inchaço e pequenos hematomas podem ocorrer nos primeiros dias. Você recebe as orientações de cuidados após o procedimento.</p>
`,
  },
  {
    slug: 'preenchimento-facial',
    group: 'estetica',
    name: 'Preenchimento facial',
    card: 'Reposição de volume e suavização de sulcos com ácido hialurônico.',
    title: 'Preenchimento Facial com Ácido Hialurônico na Barra Olímpica | Dra. Mara Gama',
    description: 'Preenchimento facial com ácido hialurônico para repor volume e suavizar sulcos, com planejamento individual. Dra. Mara Gama, na Barra Olímpica, Rio de Janeiro.',
    eyebrow: 'Estética orofacial',
    h1: 'Preenchimento facial com ácido hialurônico',
    lead: 'Repõe volume e suaviza sulcos em regiões específicas do rosto, respeitando as proporções de cada face.',
    image: ['harmonizacao', 'Dra. Mara Gama em avaliação facial no consultório'],
    wa: 'Olá, gostaria de agendar uma avaliação para preenchimento facial.',
    related: ['preenchimento-labial', 'bioestimulador-de-colageno', 'toxina-botulinica'],
    body: `
<h2>Quando pode ser indicado</h2>
<p>Com o tempo, o rosto perde volume e sustentação em algumas regiões, o que pode aprofundar sulcos e alterar contornos. O preenchimento com ácido hialurônico pode repor parte desse volume de forma localizada.</p>

<h2>Planejamento individual</h2>
<p>Cada rosto tem proporções próprias. A avaliação considera a face como um todo — e não apenas uma região isolada — para buscar equilíbrio e naturalidade.</p>

<h2>Como é o procedimento</h2>
<ol class="steps">
  <li><strong>Avaliação</strong> da face, da saúde geral e das expectativas.</li>
  <li><strong>Planejamento</strong> das regiões e da quantidade de produto.</li>
  <li><strong>Aplicação</strong> no consultório.</li>
  <li><strong>Retorno</strong> para acompanhamento.</li>
</ol>
<p>Inchaço e pequenos hematomas podem ocorrer nos primeiros dias. A duração do efeito varia de pessoa para pessoa.</p>
`,
  },
  {
    slug: 'bioestimulador-de-colageno',
    group: 'estetica',
    name: 'Bioestimuladores de colágeno',
    card: 'Estimulam a produção de colágeno pelo próprio organismo, para a firmeza da pele.',
    title: 'Bioestimulador de Colágeno na Barra Olímpica | Dra. Mara Gama',
    description: 'Bioestimuladores de colágeno para a firmeza e a qualidade da pele, com avaliação individual. Dra. Mara Gama, na Barra Olímpica, Rio de Janeiro.',
    eyebrow: 'Estética orofacial',
    h1: 'Bioestimuladores de colágeno',
    lead: 'Substâncias que estimulam o próprio organismo a produzir colágeno, contribuindo para a firmeza e a qualidade da pele.',
    image: ['harmonizacao', 'Dra. Mara Gama em avaliação facial no consultório'],
    wa: 'Olá, gostaria de agendar uma avaliação para bioestimulador de colágeno.',
    related: ['skinbooster', 'preenchimento-facial', 'toxina-botulinica'],
    body: `
<h2>Como age</h2>
<p>Diferente do preenchimento, o bioestimulador não tem como objetivo principal dar volume imediato. Ele estimula a produção de colágeno, e por isso a resposta é gradual, nas semanas seguintes à aplicação.</p>

<h2>Para quem pode ser indicado</h2>
<p>Pode ser indicado para quem deseja melhorar a firmeza e a qualidade da pele. A indicação, o produto e o número de sessões são definidos na avaliação.</p>

<h2>Como é o procedimento</h2>
<ol class="steps">
  <li><strong>Avaliação</strong> da pele, da face e da saúde geral.</li>
  <li><strong>Planejamento</strong> das regiões e do número de sessões.</li>
  <li><strong>Aplicação</strong> no consultório.</li>
  <li><strong>Acompanhamento</strong> da resposta ao longo do tratamento.</li>
</ol>
`,
  },
  {
    slug: 'skinbooster',
    group: 'estetica',
    name: 'Skinbooster',
    card: 'Hidratação e qualidade da pele com microdoses de ácido hialurônico.',
    title: 'Skinbooster na Barra Olímpica | Dra. Mara Gama',
    description: 'Skinbooster com ácido hialurônico para hidratação e qualidade da pele, com avaliação individual. Dra. Mara Gama, na Barra Olímpica, Rio de Janeiro.',
    eyebrow: 'Estética orofacial',
    h1: 'Skinbooster',
    lead: 'Aplicação de ácido hialurônico em microdoses, voltada à hidratação e à qualidade da pele.',
    image: ['harmonizacao', 'Dra. Mara Gama em avaliação facial no consultório'],
    wa: 'Olá, gostaria de agendar uma avaliação para skinbooster.',
    related: ['bioestimulador-de-colageno', 'preenchimento-facial', 'toxina-botulinica'],
    body: `
<h2>Diferença para o preenchimento</h2>
<p>O skinbooster usa um ácido hialurônico mais fluido, distribuído em pequenas quantidades na pele. O objetivo é a hidratação e a qualidade da pele — e não o aumento de volume.</p>

<h2>Como é o procedimento</h2>
<ol class="steps">
  <li><strong>Avaliação</strong> da pele e da saúde geral.</li>
  <li><strong>Planejamento</strong> das regiões e do número de sessões.</li>
  <li><strong>Aplicação</strong> no consultório.</li>
  <li><strong>Acompanhamento</strong> da resposta.</li>
</ol>
<p>Pequenas marcas e leve inchaço podem ocorrer nos primeiros dias.</p>
`,
  },
];
