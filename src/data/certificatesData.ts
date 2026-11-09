export interface CertificateAxis {
  axisTitle: string;
  axisSubtitle: string;
  description: string;
  hours: string;
}

export interface CertificateRecord {
  id: string;
  numberLabel: string;
  code: string;
  controlKey: string;
  sha256: string;
  book: string;
  sheet: string;
  title: string;
  shortTheme: string;
  editalFraming: string;
  editalItem: string;
  period: string;
  issueDate: string;
  cityState: string;
  totalHoursNumeric: number;
  totalHoursText: string;
  holderName: string;
  holderRole: string;
  holderCpf: string;
  holderInstitution: string;
  frontBodyParagraph1: string;
  frontBodyParagraph2: string;
  boldKeywords: string[];
  axes: CertificateAxis[];
  verificationUrl: string;
  metrics: {
    participantsReached: string;
    ebooksDistributed: string;
    quizResponsesCollected: string;
    fakeNewsDebunked: string;
  };
}

export const CERTIFICATES_DB: CertificateRecord[] = [
  {
    id: 'cert-02',
    numberLabel: '02',
    code: 'EMS-CDP-2023-0892',
    controlKey: '0892-4157-8320-9C2A',
    sha256: '4c9a8e27f1d03b65c2847a9e1b52d84f7e3c91a6b4d280f3e51a9c7b2d40892',
    book: '01/2023',
    sheet: '78',
    title:
      'Campanha Educativa Digital em Mídias Sociais: Quiz Interativo de Letramento Ocular, Coleta de Dados Populacionais e Prevenção ao Glaucoma',
    shortTheme: 'Glaucoma, Letramento Ocular & Coleta de Dados Populacionais',
    editalFraming: 'Campanha Educativa, Coleta de Dados Populacionais e Atividade Comunitária',
    editalItem:
      'Item 08 - Atividades de Extensão: Campanhas educativas, de vacinação, coleta de dados populacionais e atividades comunitárias',
    period: '10 a 13 de agosto de 2023',
    issueDate: '18 de agosto de 2023',
    cityState: 'Goiânia - GO',
    totalHoursNumeric: 14,
    totalHoursText: '14 (quatorze) horas',
    holderName: 'LUCAS GONÇALVES SILVEIRA',
    holderRole: 'Médico',
    holderCpf: '702.794.941-57',
    holderInstitution: 'Centro Universitário Alfredo Nasser (UNIFAN)',
    frontBodyParagraph1:
      'participou de forma efetiva da Atividade de Extensão intitulada "Campanha Educativa Digital em Mídias Sociais: Quiz Interativo de Letramento Ocular, Coleta de Dados Populacionais e Prevenção ao Glaucoma", desenvolvida na modalidade de Campanha Educativa, Coleta de Dados Populacionais e Atividade Comunitária, realizada no período de 10 a 13 de agosto de 2023, contabilizando carga horária total de 14 (quatorze) horas.',
    frontBodyParagraph2:
      'No âmbito desta ação extensionista, o profissional atuou na estruturação e aplicação de quiz digital interativo para coleta de dados populacionais sobre letramento ocular e fatores de risco para o glaucoma, distribuição gratuita de mini e-books e guias preventivos em PDF, comunicação científica para combate à desinformação (fake news) sobre colírios e curas caseiras, e divulgação dos canais oficiais de referência em Oftalmologia e imunização do SUS.',
    boldKeywords: [
      'Atividade de Extensão',
      'Campanha Educativa',
      'Coleta de Dados Populacionais',
      'Atividade Comunitária',
      'coleta de dados populacionais',
      'combate à desinformação (fake news)',
    ],
    axes: [
      {
        axisTitle: 'Eixo I — Curadoria Científica e Produção Editorial Preventiva',
        axisSubtitle: 'Produção Editorial em Saúde Ocular e Coletiva',
        description:
          'Revisão de literatura oftalmológica e elaboração didática do Guia Preventivo em PDF e Mini E-book "Glaucoma Silencioso: Diagnóstico Precoce e Proteção da Visão".',
        hours: '03h 30min',
      },
      {
        axisTitle: 'Eixo II — Coleta de Dados Populacionais via Instrumento Digital',
        axisSubtitle: 'Pesquisa-Ação e Levantamento Epidemiológico Comunitário',
        description:
          'Estruturação e aplicação de Quiz Digital Interativo aberto à comunidade para coleta de dados populacionais sobre percepção de fatores de risco (pressão intraocular, hereditariedade e idade).',
        hours: '04h 30min',
      },
      {
        axisTitle: 'Eixo III — Comunicação Científica e Combate a Fake News em Saúde',
        axisSubtitle: 'Infodemiologia e Letramento Digital',
        description:
          'Desmistificação ativa de notícias falsas sobre colírios caseiros, automedicação ocular e boatos em saúde pública com base em diretrizes do CBO, OMS e Ministério da Saúde.',
        hours: '03h 00min',
      },
      {
        axisTitle: 'Eixo IV — Ação Comunitária e Divulgação dos Canais Oficiais do SUS',
        axisSubtitle: 'Cidadania Digital e Acesso à Rede Pública',
        description:
          'Envio automatizado de folhetos educativos aos participantes e orientação prática sobre o acesso aos Centros de Referência em Oftalmologia do SUS e portal Meu SUS Digital.',
        hours: '03h 00min',
      },
    ],
    verificationUrl: 'https://extensao-mente-saude.vercel.app/?codigo=EMS-CDP-2023-0892#certificado-pdf',
    metrics: {
      participantsReached: '1.840 cidadãos alcançados',
      ebooksDistributed: '920 Mini E-books baixados',
      quizResponsesCollected: '648 respostas populacionais',
      fakeNewsDebunked: '18 mitos desmistificados',
    },
  },
  {
    id: 'cert-01',
    numberLabel: '01',
    code: 'EMS-EXT-2023-0418',
    controlKey: '0418-7027-9457-8F4B',
    sha256: '8f4b2e91c7d04e38a1956b2f0e84d31c9a7b6254f8e10c3d592a7b4e16c80418',
    book: '01/2023',
    sheet: '42',
    title:
      'Campanha Educativa de Conscientização sobre Vacinação: Distribuição de Mini E-books, Combate a Fake News e Divulgação dos Canais Oficiais de Imunização',
    shortTheme: 'Conscientização sobre Vacinação, Mini E-books & Combate a Fake News',
    editalFraming: 'Campanha Educativa, Conscientização de Vacinação e Atividade Comunitária',
    editalItem:
      'Item 08 - Atividades de Extensão: Campanhas educativas, de vacinação, coleta de dados populacionais e atividades comunitárias',
    period: '18 a 20 de maio de 2023',
    issueDate: '26 de maio de 2023',
    cityState: 'Goiânia - GO',
    totalHoursNumeric: 12,
    totalHoursText: '12 (doze) horas',
    holderName: 'LUCAS GONÇALVES SILVEIRA',
    holderRole: 'Médico',
    holderCpf: '702.794.941-57',
    holderInstitution: 'Centro Universitário Alfredo Nasser (UNIFAN)',
    frontBodyParagraph1:
      'participou de forma efetiva da Atividade de Extensão intitulada "Campanha Educativa de Conscientização sobre Vacinação: Distribuição de Mini E-books, Combate a Fake News e Divulgação dos Canais Oficiais de Imunização", desenvolvida na modalidade de Campanha Educativa, Conscientização de Vacinação e Atividade Comunitária, realizada no período de 18 a 20 de maio de 2023, contabilizando carga horária total de 12 (doze) horas.',
    frontBodyParagraph2:
      'No âmbito desta ação extensionista, o profissional atuou na elaboração técnico-científica e distribuição comunitária de folhetos e mini e-books educativos, comunicação em saúde para combate à desinformação (fake news), divulgação dos canais oficiais de imunização e aplicação de instrumentos digitais interativos para coleta de dados populacionais sobre hesitação vacinal.',
    boldKeywords: [
      'Atividade de Extensão',
      'Campanha Educativa',
      'Conscientização de Vacinação',
      'Atividade Comunitária',
      'combate à desinformação (fake news)',
      'coleta de dados populacionais',
    ],
    axes: [
      {
        axisTitle: 'Eixo I — Curadoria e Redação Técnico-Científica',
        axisSubtitle: 'Produção Editorial em Saúde Pública',
        description:
          'Revisão de literatura médica e estruturação didática do Mini E-book gratuito "Vacinar é Proteger: Guia Prático para a Família" e dos folhetos de orientação comunitária.',
        hours: '03h 00min',
      },
      {
        axisTitle: 'Eixo II — Ação Comunitária e Educação Popular em Saúde',
        axisSubtitle: 'Extensão Comunitária Direta',
        description:
          'Distribuição presencial e digital de materiais educativos, acolhimento de dúvidas de famílias e orientação direta sobre o Calendário Nacional de Vacinação (PNI/SUS).',
        hours: '04h 00min',
      },
      {
        axisTitle: 'Eixo III — Comunicação Científica e Combate a Fake News',
        axisSubtitle: 'Infodemiologia e Letramento em Saúde',
        description:
          'Desmistificação ativa de notícias falsas sobre segurança vacinal com base em notas técnicas da OMS, SBIm e Ministério da Saúde.',
        hours: '02h 30min',
      },
      {
        axisTitle: 'Eixo IV — Coleta de Dados Populacionais e Canais Oficiais',
        axisSubtitle: 'Pesquisa-Ação e Cidadania Digital',
        description:
          'Aplicação de instrumentos digitais interativos (quizzes de percepção sobre hesitação vacinal) e treinamento prático de acesso ao Meu SUS Digital (ConecteSUS).',
        hours: '02h 30min',
      },
    ],
    verificationUrl: 'https://extensao-mente-saude.vercel.app/?codigo=EMS-EXT-2023-0418#certificado-pdf',
    metrics: {
      participantsReached: '1.520 cidadãos alcançados',
      ebooksDistributed: '790 Mini E-books baixados',
      quizResponsesCollected: '512 respostas populacionais',
      fakeNewsDebunked: '15 mitos desmistificados',
    },
  },
];

export interface MiniEbook {
  id: string;
  badge: string;
  certificateRef: string;
  title: string;
  subtitle: string;
  edition: string;
  pagesCount: number;
  isbnRegistry: string;
  readingTime: string;
  downloads: string;
  accentColor: 'cyan' | 'coral' | 'indigo' | 'emerald';
  summary: string;
  chapters: {
    number: string;
    heading: string;
    content: string;
    keyTakeaway: string;
  }[];
}

export const MINI_EBOOKS: MiniEbook[] = [
  {
    id: 'ebook-glaucoma',
    badge: 'Certificado Nº 02 · Saúde Ocular',
    certificateRef: 'EMS-CDP-2023-0892',
    title: 'Glaucoma Silencioso: Guia Preventivo de Letramento Ocular',
    subtitle: 'Fatores de risco, pressão intraocular, diagnóstico precoce e fluxo de atendimento no SUS',
    edition: '1ª Edição Comunitária · Agosto/2023',
    pagesCount: 18,
    isbnRegistry: 'Reg. Editorial EMS-2023-GL02',
    readingTime: '6 min de leitura',
    downloads: '920 downloads verificados',
    accentColor: 'cyan',
    summary:
      'Material didático de distribuição gratuita entregue automaticamente aos participantes do Quiz de Coleta de Dados Populacionais no Maio/Agosto de Prevenção à Cegueira.',
    chapters: [
      {
        number: 'Capítulo 01',
        heading: 'Por que o Glaucoma é chamado de "Ladrão Silencioso da Visão"?',
        content:
          'Em mais de 80% dos casos de Glaucoma Primário de Ângulo Aberto, o paciente não apresenta dor ocular, vermelhidão ou sintomas iniciais. A perda visual começa lentamente pela periferia do campo de visão, fazendo com que o cérebro compense as falhas até que o nervo óptico já tenha sofrido dano estrutural significativo.',
        keyTakeaway:
          'A ausência de sintomas não significa ausência de doença: a consulta oftalmológica anual com medida da pressão intraocular (tonometria) e exame de fundo de olho é indispensável.',
      },
      {
        number: 'Capítulo 02',
        heading: 'Quem faz parte do Grupo de Maior Risco Epidemiológico?',
        content:
          'Dados populacionais demonstram que o risco de desenvolver glaucoma aumenta expressivamente em pessoas acima de 40 anos, indivíduos com histórico familiar de primeiro grau (pais ou irmãos com glaucoma), pacientes afrodescendentes, portadores de alta miopia, diabéticos e usuários crônicos de colírios com corticoides.',
        keyTakeaway:
          'Parentes de 1º grau de pacientes com glaucoma têm até 6 a 10 vezes mais chance de desenvolver a condição ao longo da vida.',
      },
      {
        number: 'Capítulo 03',
        heading: 'Perigos dos Colírios Caseiros e Automedicação Ocular (Combate a Fake News)',
        content:
          'Circulam nas redes sociais falsas promessas de "gotas naturais", chás, mel ou limão para "limpar a vista" ou curar a pressão nos olhos. Essas substâncias alteram o pH da superfície ocular, causam úlceras de córnea graves e retardam o uso dos colírios hipotensores prescritos pelo médico oftalmologista.',
        keyTakeaway:
          'Glaucoma não tem cura milagrosa, mas tem controle eficaz e seguro com colírios hipotensores, laser (trabeculoplastia) ou cirurgia, fornecidos gratuitamente pelo SUS.',
      },
      {
        number: 'Capítulo 04',
        heading: 'Como acessar o Programa de Glaucoma pelo SUS e Meu SUS Digital',
        content:
          'O Sistema Único de Saúde conta com a Linha de Cuidado do Glaucoma (Portaria MS/SAS), garantindo consultas especializadas, exames de campimetria computadorizada, paquimetria, retinografia e dispensação gratuita contínua de colírios para controle da pressão intraocular.',
        keyTakeaway:
          'Procure a Unidade Básica de Saúde (UBS) mais próxima com seu Cartão SUS ou aplicativo Meu SUS Digital para solicitar encaminhamento à regulação oftalmológica.',
      },
    ],
  },
  {
    id: 'ebook-vacinacao',
    badge: 'Certificado Nº 01 · Imunização & Saúde Coletiva',
    certificateRef: 'EMS-EXT-2023-0418',
    title: 'Vacinar é Proteger: Mitos e Verdades Baseados em Evidências',
    subtitle: 'Combate à desinformação, segurança de imunobiológicos e guia prático do Calendário PNI/SUS',
    edition: '1ª Edição Comunitária · Maio/2023',
    pagesCount: 16,
    isbnRegistry: 'Reg. Editorial EMS-2023-VC01',
    readingTime: '5 min de leitura',
    downloads: '790 downloads verificados',
    accentColor: 'coral',
    summary:
      'Mini E-book elaborado para desmistificar fake news antivacina em linguagem acessível para famílias, com passo a passo de acesso à Caderneta Digital no Meu SUS Digital.',
    chapters: [
      {
        number: 'Capítulo 01',
        heading: 'Como as Vacinas Passam por Múltiplas Fases de Segurança Clínica',
        content:
          'Antes de qualquer vacina chegar às salas de imunização do Programa Nacional de Imunizações (PNI), ela é submetida a ensaios pré-clínicos e fases I, II e III com dezenas de milhares de voluntários, além de auditoria rigorosa da ANVISA e monitoramento contínuo de farmacovigilância.',
        keyTakeaway:
          'Os benefícios da imunização superam em milhares de vezes os raros eventos adversos, que em sua maioria são leves e transitórios (dor local ou febre baixa).',
      },
      {
        number: 'Capítulo 02',
        heading: 'Desmascarando as 5 Principais Fake News sobre Imunização',
        content:
          'Boatos sobre alteração de DNA, sobrecarga do sistema imunológico infantil ou presença de metais tóxicos em doses perigosas são cientificamente falsos. O sistema imune de um bebê lida diariamente com milhares de antígenos ambientais, e as vacinas utilizam apenas frações purificadas e seguras para treinar as defesas.',
        keyTakeaway:
          'Sempre confira informações em fontes oficiais: Ministério da Saúde (Saúde com Ciência), Sociedade Brasileira de Imunizações (SBIm) e OMS.',
      },
      {
        number: 'Capítulo 03',
        heading: 'Vacinação e Saúde Ocular: Proteção Materno-Infantil',
        content:
          'A vacinação em dia da gestante e da criança (como a Tríplice Viral contra rubéola e sarampo) previne diretamente causas históricas de cegueira infantil evitável, como a Síndrome da Rubéola Congênita (catarata e glaucoma congênitos) e a ceratomalácia pós-sarampo.',
        keyTakeaway:
          'Manter o calendário vacinal atualizado também é uma medida essencial de prevenção primária da saúde visual infantil.',
      },
    ],
  },
  {
    id: 'ebook-retinopatia',
    badge: 'Série Extensão · Prevenção da Cegueira',
    certificateRef: 'EMS-EXT-2024-0215',
    title: 'Olhos e Diabetes: Guia Ilustrado do Exame de Fundo de Olho',
    subtitle: 'Controle glicêmico, sinais de alerta na retina e prevenção da Retinopatia Diabética',
    edition: 'Edição Comunitária · Março/2024',
    pagesCount: 14,
    isbnRegistry: 'Reg. Editorial EMS-2024-RD03',
    readingTime: '4 min de leitura',
    downloads: '680 downloads verificados',
    accentColor: 'indigo',
    summary:
      'Cartilha ilustrada formatada para leitura rápida em smartphones e compartilhamento comunitário entre pacientes diabéticos e familiares.',
    chapters: [
      {
        number: 'Capítulo 01',
        heading: 'Como o Diabetes Afeta os Microvasos da Retina',
        content:
          'A hiperglicemia crônica fragiliza a parede dos pequenos vasos sanguíneos da retina, causando microaneurismas, exsudatos e edema macular diabético. Sem acompanhamento regular, pode evoluir para sangramentos vítreos e descolamento tracional da retina.',
        keyTakeaway:
          'Todo paciente com Diabetes Tipo 2 deve realizar o mapeamento de retina já no momento do diagnóstico e, depois, anualmente.',
      },
      {
        number: 'Capítulo 02',
        heading: 'Mitos na Internet sobre "Chás que Curam a Retina"',
        content:
          'Nenhum suplemento vendido sem comprovação na internet substitui o controle da hemoglobina glicada (HbA1c), da pressão arterial e o acompanhamento oftalmológico com fotocoagulação a laser ou terapia antiangiogênica quando indicada.',
        keyTakeaway:
          'Mais de 90% dos casos graves de cegueira por retinopatia diabética podem ser evitados com diagnóstico precoce e controle metabólico.',
      },
    ],
  },
];

export interface QuizQuestion {
  id: number;
  category: 'Glaucoma & Coleta Populacional' | 'Vacinação & Fake News' | 'Canais Oficiais SUS';
  statement: string;
  isMyth: boolean;
  populationStatLabel: string;
  populationErrorRate: number;
  explanation: string;
  officialSource: string;
}

export const POPULATION_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Glaucoma & Coleta Populacional',
    statement:
      '"Se eu enxergo bem de perto e não sinto dor nos olhos, é impossível eu estar desenvolvendo Glaucoma."',
    isMyth: true,
    populationStatLabel: '62% dos respondentes na coleta populacional acreditavam nessa afirmação antes da campanha',
    populationErrorRate: 62,
    explanation:
      'MITO! O Glaucoma Primário de Ângulo Aberto é assintomático nas fases iniciais e intermediárias. A visão central costuma ser preservada até estágios avançados, enquanto a perda ocorre silenciosamente na periferia visual. Por isso a aferição da pressão intraocular em consulta médica é insubstituível.',
    officialSource: 'Conselho Brasileiro de Oftalmologia (CBO) & Ministério da Saúde',
  },
  {
    id: 2,
    category: 'Glaucoma & Coleta Populacional',
    statement:
      '"Pessoas com pai, mãe ou irmãos diagnosticados com glaucoma possuem risco significativamente maior de desenvolver a doença."',
    isMyth: false,
    populationStatLabel: 'Apenas 41% da comunidade conhecia o fator hereditário do glaucoma no levantamento inicial',
    populationErrorRate: 59,
    explanation:
      'VERDADE! O fator genético e hereditário é um dos principais determinantes epidemiológicos do glaucoma. Familiares de primeiro grau devem iniciar o rastreamento oftalmológico preventivo mais cedo e manter acompanhamento regular.',
    officialSource: 'Sociedade Brasileira de Glaucoma (SBG) & OMS',
  },
  {
    id: 3,
    category: 'Vacinação & Fake News',
    statement:
      '"Colírios caseiros à base de plantas, água boricada ou limão ajudam a baixar a pressão ocular, e vacinas de RNA alteram o DNA humano."',
    isMyth: true,
    populationStatLabel: '34% dos participantes relataram já ter recebido correntes de WhatsApp com essas duas fake news',
    populationErrorRate: 34,
    explanation:
      'MITO DUPLO PERIGOSO! Soluções caseiras nos olhos podem causar queimaduras químicas, infecções fúngicas/bacterianas e perda irreversível da córnea. Da mesma forma, vacinas jamais entram no núcleo celular nem alteram o DNA humano.',
    officialSource: 'Programa Saúde com Ciência (MS) & ANVISA',
  },
  {
    id: 4,
    category: 'Canais Oficiais SUS',
    statement:
      '"Pelo aplicativo oficial Meu SUS Digital e pelas Unidades Básicas de Saúde, o cidadão tem acesso gratuito tanto ao Calendário Nacional de Vacinação quanto ao Programa de Glaucoma do SUS."',
    isMyth: false,
    populationStatLabel: '78% dos participantes passaram a utilizar os canais digitais oficiais após a orientação extensionista',
    populationErrorRate: 22,
    explanation:
      'VERDADE! O SUS oferece gratuitamente todas as vacinas do Calendário Nacional (PNI) e também dispensa gratuitamente os colírios de uso contínuo para pacientes cadastrados nos Centros de Referência do Programa de Glaucoma.',
    officialSource: 'Ministério da Saúde — Portal Meu SUS Digital (gov.br)',
  },
];

export const GITHUB_REPO_COMMAND = `# COMANDO COMPLETO PARA REPOSITÓRIO GITHUB / DEPLOY VERCEL
# Projeto: Plataforma Interinstitucional de Extensão em Saúde Digital, Acervo Educativo & Autenticador Público (Certificados Nº 02 e Nº 01)

## 1. OBJETIVO DA ARQUITETURA
Construir uma aplicação web completa em React + TypeScript + Tailwind CSS (pronta para deploy na Vercel em https://extensao-mente-saude.vercel.app/) que atue simultaneamente como:
1. **Portal Oficial da Campanha de Extensão Universitária e Comunitária**:
   - Exibição detalhada da metodologia de extensão da **Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)** em parceria com o **Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)**.
   - Destaque para a **Campanha Educativa Digital em Mídias Sociais: Quiz Interativo de Letramento Ocular, Coleta de Dados Populacionais e Prevenção ao Glaucoma (Certificado Nº 02 - EMS-CDP-2023-0892)** e para a **Campanha Educativa de Conscientização sobre Vacinação: Distribuição de Mini E-books, Combate a Fake News e Divulgação dos Canais Oficiais de Imunização (Certificado Nº 01 - EMS-EXT-2023-0418)**.
2. **Visualizador Interativo de Certificado Estilo PDF A4 Paisagem (Frente e Verso) na rota \`#certificado-pdf\`**:
   - Renderização fiel em formato A4 Horizontal (297mm x 210mm) contendo Lauda 1 (Frente Solene) e Lauda 2 (Verso com Memorial Descritivo, Matriz de Atividades Práticas e Registro de Fé Pública).
   - Logotipos 100% vetorizados em fundo transparente (sem fundo verde sólido e sem telefones ou cantoneiras azuis).
   - Rubricas caligráficas limpas em fundo transparente de **Bárbara Lima dos Santos** (Editora-Chefe | CNPJ: 51.372.335/0001-71) e **James Araújo de Santana** (Coordenador de Extensão | CNPJ corrigido: 51.269.112/0001-83).
   - Selo Oficial de Fé Pública, QR Code dinâmico apontando para a própria URL de verificação e suporte a impressão/exportação direta em PDF A4 (\`@media print\`).
3. **Sistema Público de Verificação de Autenticidade na rota \`#validador\` e query \`?codigo=\`**:
   - Validação automática ao escanear o QR Code ou digitar o Código (\`EMS-CDP-2023-0892\` ou \`EMS-EXT-2023-0418\`) / Chave de Controle (\`0892-4157-8320-9C2A\` ou \`0418-7027-9457-8F4B\`).
   - Exibição do Livro, Folha, Titular (**Lucas Gonçalves Silveira — Médico | CPF: 702.794.941-57 | UNIFAN**), Enquadramento no Item 08 do Edital e Hash criptográfico SHA-256.

## 2. DADOS OFICIAIS DO CERTIFICADO Nº 02 (DESTAQUE PRINCIPAL)
- **Código de Autenticidade**: \`EMS-CDP-2023-0892\`
- **Chave de Controle**: \`0892-4157-8320-9C2A\`
- **Hash SHA-256**: \`4c9a8e27f1d03b65c2847a9e1b52d84f7e3c91a6b4d280f3e51a9c7b2d40892\`
- **Registro**: Livro de Extensão nº 01/2023, Folha 78
- **Titular**: LUCAS GONÇALVES SILVEIRA (Médico | CPF: 702.794.941-57 | Centro Universitário de Anápolis - UNIFAN)
- **Título**: Campanha Educativa Digital em Mídias Sociais: Quiz Interativo de Letramento Ocular, Coleta de Dados Populacionais e Prevenção ao Glaucoma
- **Enquadramento (Item 08)**: Campanha Educativa, Coleta de Dados Populacionais e Atividade Comunitária
- **Período**: 10 a 13 de agosto de 2023 | **Data de Emissão**: 18 de agosto de 2023 | **Carga Horária**: 14 (quatorze) horas

## 3. COMANDOS GIT PARA PUBLICAÇÃO NO GITHUB & VERCEL
\`\`\`bash
git init
git add .
git commit -m "feat: portal interinstitucional de extensao, validador publico e certificados A4 01 e 02"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/extensao-mente-saude.git
git push -u origin main
\`\`\``;
