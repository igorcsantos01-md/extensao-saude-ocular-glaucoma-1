import React, { useState } from 'react';
import {
  BookOpen,
  ShieldAlert,
  BarChart3,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Copy,
  Check,
  Terminal,
  Eye,
  Syringe,
  Smartphone,
  Building2,
  ChevronRight,
  X,
  Sparkles,
} from 'lucide-react';
import {
  MINI_EBOOKS,
  MiniEbook,
  POPULATION_QUIZ_QUESTIONS,
  GITHUB_REPO_COMMAND,
} from '../data/certificatesData';

export const InteractiveCampaignPortal: React.FC = () => {
  const [activePillarTab, setActivePillarTab] = useState<'glaucoma' | 'vacinacao'>('glaucoma');
  const [selectedEbook, setSelectedEbook] = useState<MiniEbook | null>(null);
  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(0);

  // Interactive Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean>>({});
  const [copiedCommand, setCopiedCommand] = useState(false);

  const handleAnswerQuiz = (questionId: number, userSaidMyth: boolean) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: userSaidMyth }));
  };

  const handleCopyGithubCommand = () => {
    navigator.clipboard.writeText(GITHUB_REPO_COMMAND);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2500);
  };

  return (
    <div className="no-print">
      {/* =====================================================================
          1. METODOLOGIA INTERINSTITUCIONAL: GLAUCOMA, VACINAÇÃO & FAKE NEWS
         ===================================================================== */}
      <section id="campanha-educativa" className="py-16 md:py-20 bg-[#F8FAFC] scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0891B2] uppercase tracking-wider mb-2">
                <span>METODOLOGIA EXTENSIONISTA INTERINSTITUCIONAL</span>
                <span aria-hidden="true">·</span>
                <span>CONFORMIDADE ACADÊMICA E CNAE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                Arquitetura da Campanha Educativa, Coleta de Dados Populacionais e Combate a Fake News
              </h2>
              <p className="text-base text-slate-600 mt-3 leading-relaxed">
                Desenvolvida conjuntamente pela <strong>Editora Mente e Saúde</strong> e pelo{' '}
                <strong>Centro Profissionalizante Maria Dalva de Araújo</strong>, a metodologia integra produção
                editorial científica, distribuição gratuita de Mini E-books, desmistificação de notícias falsas e
                instrumentos digitais de coleta epidemiológica comunitária.
              </p>
            </div>

            {/* Interactive Pillar Switcher */}
            <div className="inline-flex bg-slate-200/80 p-1.5 rounded-xl shrink-0 self-start">
              <button
                type="button"
                onClick={() => setActivePillarTab('glaucoma')}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activePillarTab === 'glaucoma'
                    ? 'bg-[#0891B2] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Eye className="w-4 h-4" />
                Eixo Certificado Nº 02 (Glaucoma & Quiz Ocular)
              </button>
              <button
                type="button"
                onClick={() => setActivePillarTab('vacinacao')}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  activePillarTab === 'vacinacao'
                    ? 'bg-[#F43F5E] text-white shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <Syringe className="w-4 h-4" />
                Eixo Certificado Nº 01 (Vacinação & Fake News)
              </button>
            </div>
          </div>

          {/* Active Pillar Content Showcase */}
          {activePillarTab === 'glaucoma' ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <p className="text-xs font-mono-tabular font-bold text-[#0891B2]">
                    CERTIFICADO Nº 02 · CÓD. EMS-CDP-2023-0892 · 14 HORAS · AGOSTO/2023
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    Campanha Educativa Digital em Mídias Sociais: Quiz Interativo de Letramento Ocular, Coleta de Dados
                    Populacionais e Prevenção ao Glaucoma
                  </h3>
                </div>
                <span className="text-xs font-mono-tabular font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                  Livro 01/2023 · Folha 78
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#0891B2] flex items-center justify-center mb-3">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    1. Coleta de Dados Populacionais via Quiz Interativo
                  </h4>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Aplicação de instrumento digital estruturado para mensurar o nível de conhecimento comunitário sobre
                    a evolução assintomática do glaucoma, hereditariedade e pressão intraocular, gerando diagnóstico
                    situacional com <strong>648 participantes avaliados</strong>.
                  </p>
                </div>

                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#F43F5E] flex items-center justify-center mb-3">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    2. Combate a Fake News e Colírios Caseiros Perigosos
                  </h4>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Ação direta de infodemiologia desmistificando receitas virais de colírios naturais, uso
                    indiscriminado de corticoides tópicos e promessas falsas de cura sem acompanhamento oftalmológico.
                  </p>
                </div>

                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#312E81] flex items-center justify-center mb-3">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    3. Entrega Automatizada de Guia em PDF e Acesso ao SUS
                  </h4>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Ao concluir o quiz populacional, cada cidadão recebeu gratuitamente o Mini E-book{' '}
                    <em>&ldquo;Glaucoma Silencioso&rdquo;</em> e o passo a passo de acesso aos Centros de Referência em
                    Oftalmologia do SUS.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <p className="text-xs font-mono-tabular font-bold text-[#F43F5E]">
                    CERTIFICADO Nº 01 · CÓD. EMS-EXT-2023-0418 · 12 HORAS · MAIO/2023
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    Campanha Educativa de Conscientização sobre Vacinação: Distribuição de Mini E-books, Combate a Fake
                    News e Divulgação dos Canais Oficiais de Imunização
                  </h3>
                </div>
                <span className="text-xs font-mono-tabular font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                  Livro 01/2023 · Folha 42
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#F43F5E] flex items-center justify-center mb-3">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    1. Distribuição Comunitária de Mini E-books e Folhetos
                  </h4>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Produção editorial e entrega física e digital do guia{' '}
                    <em>&ldquo;Vacinar é Proteger: Mitos e Verdades Baseados em Evidências&rdquo;</em>, traduzindo
                    notas técnicas científicas para linguagem acessível às famílias.
                  </p>
                </div>

                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#0891B2] flex items-center justify-center mb-3">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    2. Desmistificação de Boatos Antivacina nas Redes
                  </h4>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Publicação de pílulas educativas baseadas em evidências da OMS, SBIm e Ministério da Saúde,
                    esclarecendo dúvidas sobre segurança de imunobiológicos e prevenção de cegueira infecciosa
                    congênita (rubéola/sarampo).
                  </p>
                </div>

                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#312E81] flex items-center justify-center mb-3">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    3. Divulgação dos Canais Oficiais e Meu SUS Digital
                  </h4>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Treinamento comunitário por QR Codes direcionando os cidadãos ao portal oficial do Programa
                    Nacional de Imunizações (PNI) e à conferência da Caderneta Digital de Vacinação no aplicativo Meu
                    SUS Digital.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          2. INSTRUMENTO INTERATIVO: QUIZ DE COLETA DE DADOS POPULACIONAIS & FAKE NEWS
         ===================================================================== */}
      <section id="quiz-populacional" className="py-16 md:py-20 bg-[#1E1B4B] text-white scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-2">
                <span>INSTRUMENTO AUDITÁVEL DE PESQUISA-AÇÃO</span>
                <span aria-hidden="true">·</span>
                <span>AMOSTRA CONSOLIDADA: 1.160 PARTICIPANTES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Simulador do Quiz de Letramento Ocular, Coleta Populacional e Combate a Fake News
              </h2>
              <p className="text-base text-slate-300 mt-2.5 leading-relaxed">
                Interaja abaixo com as questões aplicadas à comunidade durante as campanhas de extensão. Ao responder{' '}
                <strong>Mito</strong> ou <strong>Verdade</strong>, o sistema exibe o percentual epidemiológico coletado
                e a nota técnica educativa enviada aos participantes.
              </p>
            </div>

            <div className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 shrink-0">
              <p className="text-xs text-cyan-200 font-medium">Progresso de Demonstração</p>
              <p className="text-lg font-mono-tabular font-bold text-white mt-0.5">
                {Object.keys(quizAnswers).length} de {POPULATION_QUIZ_QUESTIONS.length} questões testadas
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {POPULATION_QUIZ_QUESTIONS.map((q) => {
              const hasAnswered = quizAnswers[q.id] !== undefined;
              const userChoiceIsMyth = quizAnswers[q.id];
              const isCorrect = hasAnswered && userChoiceIsMyth === q.isMyth;

              return (
                <div
                  key={q.id}
                  className="bg-[#28245E] border border-indigo-400/25 rounded-2xl p-6 flex flex-col justify-between gap-5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-cyan-300 font-medium mb-3">
                      <span>Questão 0{q.id} · {q.category}</span>
                      <span className="font-mono-tabular text-indigo-200">Coleta Epidemiológica</span>
                    </div>

                    <p className="text-base sm:text-lg font-semibold text-white leading-snug">{q.statement}</p>
                  </div>

                  <div>
                    {/* Myth or Truth Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleAnswerQuiz(q.id, true)}
                        className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                          hasAnswered && userChoiceIsMyth === true
                            ? 'bg-[#F43F5E] text-white border-[#F43F5E]'
                            : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                        }`}
                      >
                        <XCircle className="w-4 h-4" />
                        É MITO (Fake News)
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAnswerQuiz(q.id, false)}
                        className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                          hasAnswered && userChoiceIsMyth === false
                            ? 'bg-[#0891B2] text-white border-[#0891B2]'
                            : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        É VERDADE Científica
                      </button>
                    </div>

                    {/* Revealed Population Statistics & Scientific Explanation */}
                    {hasAnswered && (
                      <div className="mt-4 pt-4 border-t border-indigo-400/25 space-y-2.5 text-xs sm:text-sm">
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-bold ${
                              isCorrect ? 'text-emerald-300' : 'text-amber-300'
                            }`}
                          >
                            {isCorrect
                              ? 'Resposta Correta! Confira o dado populacional:'
                              : 'Atenção! Confira o esclarecimento técnico:'}
                          </span>
                          <span className="font-mono-tabular text-xs text-cyan-200">{q.officialSource}</span>
                        </div>

                        <p className="text-slate-200 leading-relaxed">{q.explanation}</p>

                        <div className="bg-black/25 rounded-xl p-3">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-cyan-200 font-medium">{q.populationStatLabel}</span>
                            <span className="font-mono-tabular font-bold text-white">{q.populationErrorRate}%</span>
                          </div>
                          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#06B6D4] to-[#F43F5E]"
                              style={{ width: `${q.populationErrorRate}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. ACERVO DE MINI E-BOOKS E GUIAS COMUNITÁRIOS COM LEITOR INTERATIVO
         ===================================================================== */}
      <section id="acervo-ebooks" className="py-16 md:py-20 bg-white scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0891B2] uppercase tracking-wider mb-2">
              <span>PRODUÇÃO EDITORIAL CIENTÍFICA</span>
              <span aria-hidden="true">·</span>
              <span>EDITORA MENTE E SAÚDE (CNPJ: 51.372.335/0001-71)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
              Galeria Interativa de Mini E-books e Cartilhas da Campanha
            </h2>
            <p className="text-base text-slate-600 mt-2.5 leading-relaxed">
              Todos os materiais abaixo foram redigidos com curadoria médica e distribuídos gratuitamente em formato
              digital e impresso à comunidade. Clique em qualquer obra para abrir o{' '}
              <strong>Leitor de Capítulos Online</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MINI_EBOOKS.map((ebook) => {
              const headerTheme =
                ebook.accentColor === 'cyan'
                  ? 'from-[#0891B2] to-[#1E3A8A]'
                  : ebook.accentColor === 'coral'
                  ? 'from-[#F43F5E] to-[#9F1239]'
                  : 'from-[#312E81] to-[#1E1B4B]';

              return (
                <div
                  key={ebook.id}
                  className="bg-[#F8FAFC] border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
                >
                  <div>
                    {/* Book Cover Header */}
                    <div className={`bg-gradient-to-br ${headerTheme} p-6 text-white`}>
                      <div className="flex items-center justify-between text-[11px] font-mono-tabular text-white/85 mb-3">
                        <span>{ebook.badge}</span>
                        <span>{ebook.certificateRef}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold leading-snug text-white">{ebook.title}</h3>
                      <p className="text-xs text-white/85 mt-2 leading-relaxed">{ebook.subtitle}</p>
                    </div>

                    {/* Book Metadata & Summary */}
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
                        <span>{ebook.edition}</span>
                        <span>·</span>
                        <span>{ebook.pagesCount} páginas</span>
                        <span>·</span>
                        <span>{ebook.readingTime}</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{ebook.summary}</p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-slate-200/70 flex items-center justify-between">
                    <span className="text-xs font-mono-tabular font-semibold text-slate-500">{ebook.downloads}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEbook(ebook);
                        setActiveChapterIdx(0);
                      }}
                      className="px-4 py-2 bg-slate-900 hover:bg-[#0891B2] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Ler Mini E-book
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. CANAIS OFICIAIS DE IMUNIZAÇÃO E SAÚDE OCULAR DO SUS
         ===================================================================== */}
      <section id="canais-oficiais" className="py-14 md:py-18 bg-[#F8FAFC] border-t border-slate-200 scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0891B2] uppercase tracking-wider mb-2">
              <span>UTILIDADE PÚBLICA E CIDADANIA DIGITAL</span>
              <span aria-hidden="true">·</span>
              <span>REDE OFICIAL DE SAÚDE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Canais Oficiais de Imunização (PNI) e Referência em Saúde Ocular no SUS
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Direcionamento direto utilizado nos QR Codes das cartilhas comunitárias para garantir que a população
              busque exclusivamente serviços e informações oficiais do Ministério da Saúde.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <a
              href="https://meususdigital.saude.gov.br/"
              target="_blank"
              rel="noreferrer"
              className="bg-white border border-slate-200 hover:border-[#0891B2] rounded-2xl p-5 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Smartphone className="w-6 h-6 text-[#0891B2]" />
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0891B2]" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Meu SUS Digital (ConecteSUS)</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Acesso oficial à Carteira Nacional de Vacinação Digital, histórico de exames, medicamentos e fila de
                  regulação do SUS.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#0891B2] mt-4 inline-block">
                meususdigital.saude.gov.br →
              </span>
            </a>

            <a
              href="https://www.gov.br/saude/pt-br/vacinacao"
              target="_blank"
              rel="noreferrer"
              className="bg-white border border-slate-200 hover:border-[#F43F5E] rounded-2xl p-5 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Syringe className="w-6 h-6 text-[#F43F5E]" />
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#F43F5E]" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Calendário Nacional PNI / MS</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Consulte todas as vacinas preconizadas para crianças, gestantes, adultos, idosos e grupos especiais
                  nas salas de vacina do SUS.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#F43F5E] mt-4 inline-block">
                gov.br/saude/pt-br/vacinacao →
              </span>
            </a>

            <a
              href="https://www.gov.br/saude/pt-br/assuntos/saude-com-ciencia"
              target="_blank"
              rel="noreferrer"
              className="bg-white border border-slate-200 hover:border-[#312E81] rounded-2xl p-5 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <ShieldAlert className="w-6 h-6 text-[#312E81]" />
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#312E81]" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Programa Saúde com Ciência</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Plataforma interministerial oficial para checagem de fatos e desmistificação de Fake News sobre
                  vacinas, colírios e tratamentos.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#312E81] mt-4 inline-block">
                gov.br/saude/saude-com-ciencia →
              </span>
            </a>

            <a
              href="https://cbo.net.br/"
              target="_blank"
              rel="noreferrer"
              className="bg-white border border-slate-200 hover:border-emerald-600 rounded-2xl p-5 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Building2 className="w-6 h-6 text-emerald-700" />
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Diretrizes CBO & Glaucoma SUS</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Orientações do Conselho Brasileiro de Oftalmologia sobre prevenção da cegueira e acesso à Linha de
                  Cuidado do Glaucoma no SUS.
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 mt-4 inline-block">Portal Oficial CBO →</span>
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. COMANDO PRONTO PARA REPOSITÓRIO GITHUB / DEPLOY VERCEL
         ===================================================================== */}
      <section id="comando-github" className="py-16 bg-slate-900 text-slate-100 scroll-mt-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-cyan-400 uppercase tracking-wider mb-1.5">
                <Terminal className="w-4 h-4" />
                <span>ESPECIFICAÇÃO TÉCNICA E PROMPT PARA REPOSITÓRIO GITHUB / VERCEL</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Comando Estruturado Completo (Sistema + Certificado Nº 02 + Validador QR Code)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Copie o comando abaixo caso deseje documentar, versionar ou replicar este sistema em outro repositório
                GitHub conectado à Vercel.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyGithubCommand}
              className="px-5 py-3 bg-[#0891B2] hover:bg-[#06B6D4] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2 shrink-0 self-start md:self-auto"
            >
              {copiedCommand ? (
                <>
                  <Check className="w-4 h-4" />
                  Comando Copiado para a Área de Transferência!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar Comando Completo para GitHub
                </>
              )}
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 overflow-x-auto max-h-[380px] overflow-y-auto">
            <pre className="text-xs font-mono-tabular text-slate-300 leading-relaxed whitespace-pre-wrap">
              {GITHUB_REPO_COMMAND}
            </pre>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MODAL READER FOR MINI E-BOOKS
         ===================================================================== */}
      {selectedEbook && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
            <div className="bg-[#1E1B4B] text-white px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-mono-tabular text-cyan-300">
                  {selectedEbook.isbnRegistry} · {selectedEbook.certificateRef}
                </p>
                <h3 className="text-base sm:text-lg font-bold text-white">{selectedEbook.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEbook(null)}
                className="p-1.5 text-slate-300 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Chapter selector tabs */}
              <div className="flex flex-wrap gap-2 pb-3 border-b border-slate-200">
                {selectedEbook.chapters.map((ch, idx) => (
                  <button
                    key={ch.number}
                    type="button"
                    onClick={() => setActiveChapterIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      activeChapterIdx === idx
                        ? 'bg-[#0891B2] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {ch.number}
                  </button>
                ))}
              </div>

              {/* Active Chapter Content */}
              {selectedEbook.chapters[activeChapterIdx] && (
                <div className="space-y-4">
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                    {selectedEbook.chapters[activeChapterIdx].heading}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {selectedEbook.chapters[activeChapterIdx].content}
                  </p>
                  <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#0891B2] mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Orientação Prática à Comunidade
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-slate-900">
                      {selectedEbook.chapters[activeChapterIdx].keyTakeaway}
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Editora Mente e Saúde & Centro Profissionalizante Maria Dalva de Araújo
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedEbook(null)}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Fechar Leitura
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
