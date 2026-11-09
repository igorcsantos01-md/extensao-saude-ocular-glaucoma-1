import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Copy,
  Check,
  QrCode,
  ArrowUpRight,
} from 'lucide-react';
import { CertificateRecord } from '../data/certificatesData';
import { OfficialQrCodeSvg } from './CertificateVisualAssets';

interface PublicAuthenticatorProps {
  certificates: CertificateRecord[];
  activeValidationCode: string;
  onSelectCertificateInViewer: (certId: string) => void;
}

export const PublicAuthenticator: React.FC<PublicAuthenticatorProps> = ({
  certificates,
  activeValidationCode,
  onSelectCertificateInViewer,
}) => {
  const [query, setQuery] = useState(activeValidationCode || 'EMS-CDP-2023-0892');
  const [verifiedCert, setVerifiedCert] = useState<CertificateRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(true);
  const [copiedHash, setCopiedHash] = useState(false);

  const performLookup = (inputStr: string) => {
    const clean = inputStr.trim().toUpperCase();
    const match = certificates.find(
      (c) =>
        c.code.toUpperCase() === clean ||
        c.controlKey.toUpperCase() === clean ||
        c.sha256.toUpperCase() === clean ||
        `CERT-${c.numberLabel}` === clean
    );
    setVerifiedCert(match || null);
    setHasSearched(true);
  };

  useEffect(() => {
    if (activeValidationCode) {
      setQuery(activeValidationCode);
      performLookup(activeValidationCode);
    }
  }, [activeValidationCode]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(query);
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <section id="validador" className="no-print py-14 md:py-20 bg-white border-y border-slate-200 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0891B2] mb-2">
            <span>SISTEMA PÚBLICO DE CONFERÊNCIA DOCUMENTAL</span>
            <span aria-hidden="true">·</span>
            <span> LIVRO DE EXTENSÃO 01/2023</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Validador Público de Autenticidade e Fé Pública
          </h2>
          <p className="text-base text-slate-600 mt-2.5 leading-relaxed">
            Consulte em tempo real a validade jurídica e acadêmica dos certificados expedidos pelo Programa
            Interinstitucional da <strong>Editora Mente e Saúde</strong> e do{' '}
            <strong>Centro Profissionalizante Maria Dalva de Araújo</strong> informando o Código de Autenticidade, a
            Chave de Controle ou escaneando o QR Code impresso no documento.
          </p>
        </div>

        {/* Search Console Card */}
        <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-xs">
          <form onSubmit={handleFormSubmit} className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Digite o Código (ex: EMS-CDP-2023-0892) ou Chave (0892-4157-8320-9C2A)"
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-300 rounded-xl text-sm sm:text-base font-mono-tabular font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-[#0891B2] hover:bg-[#0E7490] text-white font-semibold text-sm sm:text-base rounded-xl transition-colors cursor-pointer whitespace-nowrap inline-flex items-center justify-center gap-2 shadow-xs"
            >
              <ShieldCheck className="w-5 h-5" />
              Verificar Autenticidade
            </button>
          </form>

          {/* Quick-Test Preset Buttons for the Evaluation Board */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium mr-1">Consultas Rápidas Registradas no Livro 01/2023:</span>
            {certificates.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setQuery(c.code);
                  performLookup(c.code);
                }}
                className={`px-3 py-1.5 rounded-lg font-mono-tabular font-semibold transition-colors cursor-pointer whitespace-nowrap border ${
                  verifiedCert?.code === c.code
                    ? 'bg-[#312E81] text-white border-[#312E81]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                Certificado Nº {c.numberLabel}: {c.code} (Chave: {c.controlKey})
              </button>
            ))}
          </div>

          {/* Verification Result Display */}
          {hasSearched && (
            <div className="mt-7">
              {verifiedCert ? (
                <div className="bg-white border border-emerald-200 rounded-2xl overflow-hidden shadow-xs">
                  {/* Verified Top Banner */}
                  <div className="bg-gradient-to-r from-[#0F4C3A] via-[#0F766E] to-[#312E81] px-6 py-4 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-emerald-300" />
                      </div>
                      <div>
                        <p className="text-xs font-mono-tabular uppercase tracking-wider text-emerald-200 font-semibold">
                          AUTENTICIDADE CONFIRMADA · REGISTRO ATIVO E INALTERADO
                        </p>
                        <h3 className="text-lg font-bold text-white">
                          Certificado Nº {verifiedCert.numberLabel} — Código {verifiedCert.code}
                        </h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectCertificateInViewer(verifiedCert.id);
                        document.getElementById('certificado-pdf')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-4 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
                    >
                      <FileCheck2 className="w-4 h-4 text-[#0891B2]" />
                      Visualizar Laudas A4 (PDF)
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Detailed Dossier Grid */}
                  <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-8 space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Titular Certificado</p>
                          <p className="text-base font-bold text-slate-900 mt-0.5">{verifiedCert.holderName}</p>
                          <p className="text-xs font-mono-tabular text-slate-600 mt-0.5">
                            CPF: {verifiedCert.holderCpf} · {verifiedCert.holderRole} ({verifiedCert.holderInstitution})
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-medium">Assentamento e Fé Pública</p>
                          <p className="text-sm font-bold text-slate-900 mt-0.5">
                            Livro de Extensão nº {verifiedCert.book} · Folha {verifiedCert.sheet}
                          </p>
                          <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                            Expedido em {verifiedCert.cityState}, {verifiedCert.issueDate}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500 font-medium">Título Oficial da Atividade de Extensão</p>
                        <p className="text-sm sm:text-base font-semibold text-slate-900 mt-1 leading-snug">
                          {verifiedCert.title}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mt-2">
                          <span>
                            <strong>Enquadramento:</strong> {verifiedCert.editalFraming}
                          </span>
                          <span>·</span>
                          <span>
                            <strong>Período:</strong> {verifiedCert.period}
                          </span>
                          <span>·</span>
                          <span>
                            <strong>Carga Horária:</strong> {verifiedCert.totalHoursText}
                          </span>
                        </div>
                      </div>

                      {/* Cryptographic Verification Footnote */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="font-mono-tabular font-bold text-slate-800">
                            CÓDIGO: <span className="text-[#0891B2]">{verifiedCert.code}</span> &nbsp;|&nbsp; CHAVE DE
                            CONTROLE: <span className="text-[#312E81]">{verifiedCert.controlKey}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyHash(verifiedCert.sha256)}
                            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                          >
                            {copiedHash ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700">Hash Copiado</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copiar SHA-256</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-[11px] font-mono-tabular text-slate-500 break-all">
                          <strong>HASH SHA-256:</strong> {verifiedCert.sha256}
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Institutional Signatories & QR Code */}
                    <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                          Instituições Emissoras e Signatários
                        </p>
                        <div className="space-y-3 text-xs">
                          <div className="pb-2.5 border-b border-slate-200">
                            <p className="font-bold text-slate-900">Editora Mente e Saúde</p>
                            <p className="font-mono-tabular text-slate-600">CNPJ: 51.372.335/0001-71</p>
                            <p className="text-slate-700 mt-0.5">
                              Signatária: <strong>Bárbara Lima dos Santos</strong> (Editora-Chefe e Coordenadora de
                              Extensão Editorial)
                            </p>
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">
                              Centro Profissionalizante Maria Dalva de Araújo
                            </p>
                            <p className="font-mono-tabular text-slate-600">CNPJ: 51.269.112/0001-83</p>
                            <p className="text-slate-700 mt-0.5">
                              Signatário: <strong>James Araújo de Santana</strong> (Coordenador de Extensão e Projetos
                              Educativos)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200 flex items-center gap-3">
                        <div className="bg-white p-1.5 border border-slate-300 rounded-lg shrink-0">
                          <OfficialQrCodeSvg seed={verifiedCert.verificationUrl} size={64} />
                        </div>
                        <div className="text-[11px] text-slate-600 leading-snug">
                          <p className="font-semibold text-slate-900 flex items-center gap-1">
                            <QrCode className="w-3.5 h-3.5 text-[#0891B2]" />
                            QR Code Vinculado
                          </p>
                          <p className="mt-0.5">
                            Redireciona diretamente para este assento digital com validação automática.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-[#F43F5E] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      Nenhum registro encontrado para &ldquo;{query}&rdquo;
                    </h4>
                    <p className="text-sm text-slate-600 mt-1">
                      Verifique se o Código de Autenticidade (ex: <code className="font-mono">EMS-CDP-2023-0892</code>{' '}
                      ou <code className="font-mono">EMS-EXT-2023-0418</code>) ou a Chave de Controle foram digitados
                      corretamente.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
