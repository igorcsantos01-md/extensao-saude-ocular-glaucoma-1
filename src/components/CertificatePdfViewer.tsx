import React, { useState } from 'react';
import {
  Download,
  Printer,
  QrCode,
  FileText,
  Layers,
  ZoomIn,
  ZoomOut,
  CheckCircle2,
  Eye,
  Loader2,
} from 'lucide-react';
import { CertificateRecord } from '../data/certificatesData';
import {
  LogoEditoraMenteSaude,
  LogoCentroMariaDalva,
  SignatureBarbaraSvg,
  SignatureJamesSvg,
  SeloFePublicaSvg,
  OfficialQrCodeSvg,
} from './CertificateVisualAssets';
import { downloadOfficialCertificatePdf } from '../utils/generateOfficialCertificatePdf';

interface CertificatePdfViewerProps {
  certificates: CertificateRecord[];
  selectedCertId: string;
  onSelectCert: (id: string) => void;
  onTriggerValidation: (code: string) => void;
}

export const CertificatePdfViewer: React.FC<CertificatePdfViewerProps> = ({
  certificates,
  selectedCertId,
  onSelectCert,
  onTriggerValidation,
}) => {
  const [viewMode, setViewMode] = useState<'both' | 'front' | 'back' | 'native-pdf'>('both');
  const [zoomScale, setZoomScale] = useState<number>(100);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);

  const activeCert = certificates.find((c) => c.id === selectedCertId) || certificates[0];

  const staticPdfPath =
    activeCert.numberLabel === '02'
      ? '/assets/certificado/Certificado_Extensao_02_EMS-CDP-2023-0892_Lucas_Goncalves_Silveira.pdf'
      : '/assets/certificado/Certificado_Extensao_01_EMS-EXT-2023-0418_Lucas_Goncalves_Silveira.pdf';

  const downloadFileName = `Certificado_Extensao_${activeCert.numberLabel}_${activeCert.code}_Lucas_Goncalves_Silveira.pdf`;

  const handleDownloadVectorPdf = async () => {
    try {
      setIsDownloadingPdf(true);
      await downloadOfficialCertificatePdf(activeCert);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <section id="certificado-pdf" className="py-12 md:py-16 scroll-mt-20">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-6">
        {/* Section Header & Interactive Controls Bar (hidden when printing) */}
        <div className="no-print mb-8 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#0891B2] mb-1.5">
                <span>DOCUMENTO OFICIAL DE FÉ PÚBLICA</span>
                <span aria-hidden="true">·</span>
                <span>PDF VETORIAL IDÊNTICO (297mm × 210mm)</span>
                <span aria-hidden="true">·</span>
                <span>ITEM 08 DO EDITAL</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Certificado Nº {activeCert.numberLabel} ({activeCert.code}) — Frente e Verso em PDF
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Gerado com a mesma matriz vetorial, tipografia, moldura tripla, selo oficial, logotipos e assinaturas
                originais em alta definição (2 laudas A4 paisagem).
              </p>
            </div>

            {/* Primary Actions: Direct Vector PDF Download + Validate QR + Print */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleDownloadVectorPdf}
                disabled={isDownloadingPdf}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-[#054F3B] hover:bg-[#043F2F] rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-sm disabled:opacity-60"
              >
                {isDownloadingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Gerando PDF Vetorial...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Baixar Certificado Nº {activeCert.numberLabel} em PDF (Original)
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onTriggerValidation(activeCert.code)}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-[#0891B2] bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                <QrCode className="w-4 h-4" />
                Validar ({activeCert.code})
              </button>

              <button
                type="button"
                onClick={handlePrintPdf}
                className="inline-flex items-center gap-2 px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                title="Imprimir diretamente em folha A4 Paisagem"
              >
                <Printer className="w-4 h-4" />
                Imprimir
              </button>
            </div>
          </div>

          {/* Toolbar Row: Certificate Selector + Page Filter + Zoom */}
          <div className="pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Certificate Switcher (Cert 02 Principal vs Cert 01 Referência) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 mr-1">Selecionar Certificado:</span>
              {certificates.map((cert) => {
                const isSelected = cert.id === activeCert.id;
                return (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => onSelectCert(cert.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#0891B2] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>
                      Certificado Nº {cert.numberLabel} · {cert.code}
                    </span>
                    {cert.numberLabel === '02' && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-cyan-100 text-cyan-800'
                        }`}
                      >
                        DESTAQUE
                      </span>
                    )}
                  </button>
                );
              })}

              <a
                href={staticPdfPath}
                download={downloadFileName}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-[#054F3B] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors whitespace-nowrap inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Link Direto (.PDF)
              </a>
            </div>

            {/* Page View Selector & Zoom */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setViewMode('both')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    viewMode === 'both' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 inline mr-1" />
                  Frente + Verso (2 Laudas)
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('front')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    viewMode === 'front' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Lauda 1 (Frente)
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('back')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    viewMode === 'back' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Lauda 2 (Verso)
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('native-pdf')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    viewMode === 'native-pdf'
                      ? 'bg-[#312E81] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 inline mr-1" />
                  Leitor PDF Embutido
                </button>
              </div>

              {viewMode !== 'native-pdf' && (
                <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setZoomScale((z) => Math.max(85, z - 5))}
                    className="p-1.5 text-slate-600 hover:text-slate-900 rounded cursor-pointer"
                    title="Reduzir Zoom"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-mono-tabular font-semibold px-1.5 text-slate-700">{zoomScale}%</span>
                  <button
                    type="button"
                    onClick={() => setZoomScale((z) => Math.min(110, z + 5))}
                    className="p-1.5 text-slate-600 hover:text-slate-900 rounded cursor-pointer"
                    title="Aumentar Zoom"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PDF Reader Backdrop Frame */}
        <div className="bg-[#1E293B] p-3 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-slate-800 print-only-container overflow-x-auto">
          {/* Top Reader Status Bar (hidden in print) */}
          <div className="no-print flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-700/80 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium text-white">{downloadFileName}</span>
              <span className="text-slate-400">·</span>
              <span className="text-cyan-300 font-mono-tabular">Qualidade Vetorial 100% Fiel (jsPDF A4)</span>
            </div>
            <div className="flex items-center gap-3 font-mono-tabular text-[11px] text-slate-300">
              <span>Livro: {activeCert.book}</span>
              <span>·</span>
              <span>Folha: {activeCert.sheet}</span>
              <span>·</span>
              <span>Chave: {activeCert.controlKey}</span>
            </div>
          </div>

          {viewMode === 'native-pdf' ? (
            <div className="no-print w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
              <iframe
                src={staticPdfPath}
                title={downloadFileName}
                className="w-full h-[780px] bg-white"
              />
            </div>
          ) : (
            <div
              className="flex flex-col items-center gap-8 transition-transform origin-top"
              style={{ transform: `scale(${zoomScale / 100})` }}
            >
              {/* =====================================================================
                  LAUDA 1 / PÁGINA 1 — FRENTE DO CERTIFICADO (EXACT REPLICA OF PDF)
                 ===================================================================== */}
              {(viewMode === 'both' || viewMode === 'front') && (
                <div className="a4-landscape-sheet a4-print-page min-w-[920px] bg-[#FFFDFA] rounded-xs shadow-2xl p-[18px] select-text">
                  {/* Outer Forest Green Border (#054F3B) */}
                  <div className="w-full h-full border-[3px] border-[#054F3B] p-[5px] box-border">
                    {/* Middle Gold Border (#D97805) */}
                    <div className="w-full h-full border-[1.3px] border-[#D97805] p-[4px] box-border">
                      {/* Inner Royal Navy Border (#0A1C57) */}
                      <div className="w-full h-full border-[2px] border-[#0A1C57] px-6 py-4 flex flex-col justify-between box-border bg-[#FFFDFA]">
                        {/* 1. HEADER: Left Logo (Editora Mente e Saúde), Center Program Metadata, Right Logo (Centro Maria Dalva) */}
                        <div>
                          <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#054F3B]">
                            {/* Left Promoter: Editora Mente e Saúde */}
                            <div className="flex items-center gap-3 shrink-0">
                              <LogoEditoraMenteSaude className="w-18 h-18 shrink-0" />
                              <div className="leading-snug">
                                <p className="text-[12.5px] font-bold text-[#064E3B] tracking-tight">
                                  EDITORA MENTE E SAÚDE
                                </p>
                                <p className="text-[11px] font-mono-tabular font-bold text-[#0F172A] mt-0.5">
                                  CNPJ: 51.372.335/0001-71
                                </p>
                                <p className="text-[10.2px] font-medium text-[#0D9488] mt-0.5">
                                  Conselho Editorial e Extensão Científica
                                </p>
                              </div>
                            </div>

                            {/* Center Interinstitutional Program Header */}
                            <div className="text-center px-2">
                              <p className="text-[12.5px] font-bold text-[#064E3B] uppercase leading-snug">
                                PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA
                                <br />E EDUCAÇÃO EM SAÚDE
                              </p>
                              <p className="text-[11px] font-mono-tabular font-bold text-[#0A1D56] mt-1.5">
                                Certificado Nº {activeCert.numberLabel} · Livro de Extensão nº {activeCert.book} · Cód.{' '}
                                {activeCert.code}
                              </p>
                            </div>

                            {/* Right Promoter: Centro Profissionalizante Maria Dalva de Araújo */}
                            <div className="flex items-center gap-3 shrink-0 text-right">
                              <div className="leading-snug">
                                <p className="text-[12.5px] font-bold text-[#0A1D56]">CENTRO PROFISSIONALIZANTE</p>
                                <p className="text-[12.5px] font-bold text-[#0A1D56]">MARIA DALVA DE ARAÚJO</p>
                                <p className="text-[11px] font-mono-tabular font-bold text-[#0F172A] mt-0.5">
                                  CNPJ: 51.269.112/0001-83
                                </p>
                              </div>
                              <LogoCentroMariaDalva className="w-18 h-18 shrink-0" />
                            </div>
                          </div>

                          {/* 2. MAIN DIPLOMA TITLE */}
                          <div className="text-center mt-4 mb-2.5">
                            <h3
                              className="text-[31px] font-bold tracking-wide text-[#064E3B] uppercase"
                              style={{ fontFamily: 'Times New Roman, Georgia, serif' }}
                            >
                              CERTIFICADO DE ATIVIDADE DE EXTENSÃO
                            </h3>
                            <div className="w-[380px] h-[2px] bg-[#D97805] mx-auto mt-1" />
                          </div>

                          {/* 3. INTRODUCTORY STATEMENT */}
                          <p className="text-center text-[14.2px] text-[#0F172A] leading-snug max-w-[880px] mx-auto">
                            A Editora Mente e Saúde (CNPJ: 51.372.335/0001-71), em parceria institucional com o Centro
                            Profissionalizante Maria Dalva de Araújo (CNPJ:
                            <br />
                            51.269.112/0001-83), certifica para os devidos fins de comprovação curricular e acadêmica
                            que
                          </p>

                          {/* 4. HOLDER HIGHLIGHT BOX (#EDFCF5 with #D97805 border matching exact PDF) */}
                          <div className="my-3.5 mx-auto max-w-[900px] bg-[#EDFCF5] border border-[#D97805] py-3 px-6 text-center">
                            <p
                              className="text-[30px] font-bold tracking-wide text-[#0A1D56] leading-tight"
                              style={{ fontFamily: 'Times New Roman, Georgia, serif' }}
                            >
                              {activeCert.holderName}
                            </p>
                            <p className="text-[13.5px] font-bold text-[#0F172A] mt-1">
                              {activeCert.holderRole} &nbsp;|&nbsp; CPF: {activeCert.holderCpf} &nbsp;|&nbsp;{' '}
                              {activeCert.holderInstitution}
                            </p>
                          </div>

                          {/* 5. EXTENSION NARRATIVE BODY */}
                          <div className="max-w-[900px] mx-auto space-y-3 text-[13.6px] text-[#0F172A] leading-[1.48] text-left">
                            <p>{activeCert.frontBodyParagraph1}</p>
                            <p>{activeCert.frontBodyParagraph2}</p>
                          </div>

                          {/* 6. LOCATION AND DATE */}
                          <p
                            className="text-center italic text-[17.5px] text-[#0F172A] mt-4"
                            style={{ fontFamily: 'Times New Roman, Georgia, serif' }}
                          >
                            {activeCert.cityState}, {activeCert.issueDate}.
                          </p>
                        </div>

                        {/* 7. FOOTER: Exact Original Signatures + Circular Gold Seal + QR Code + Manual Verification Box */}
                        <div>
                          <div className="grid grid-cols-12 items-end gap-2 pt-1">
                            {/* Left Signature: Bárbara Lima dos Santos */}
                            <div className="col-span-4 text-center flex flex-col items-center">
                              <SignatureBarbaraSvg className="w-52 h-15 -mb-1" />
                              <div className="w-[92%] border-t border-[#0F172A] pt-1">
                                <p className="text-[11px] font-bold text-[#064E3B]">BÁRBARA LIMA DOS SANTOS</p>
                                <p className="text-[9.5px] text-[#0F172A]">
                                  Editora-Chefe e Coordenadora de Extensão Editorial
                                </p>
                                <p className="text-[9px] font-mono-tabular font-bold text-[#064E3B] mt-0.5">
                                  Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
                                </p>
                              </div>
                            </div>

                            {/* Center: Circular Fé Pública Seal + QR Code Box + Manual Verification Box */}
                            <div className="col-span-4 flex items-center justify-center gap-2">
                              <SeloFePublicaSvg code={activeCert.code} className="w-21 h-21 shrink-0" />

                              <div
                                onClick={() => onTriggerValidation(activeCert.code)}
                                title="Clique para verificar este QR Code no Autenticador do Site"
                                className="bg-white border border-[#054F3B] p-1 shrink-0 cursor-pointer hover:border-[#0891B2] transition-colors"
                              >
                                <OfficialQrCodeSvg seed={activeCert.code} size={78} />
                              </div>

                              <div
                                onClick={() => onTriggerValidation(activeCert.code)}
                                className="bg-white border border-[#054F3B] px-2.5 py-2 text-left leading-tight cursor-pointer hover:border-[#0891B2] transition-colors min-w-[172px]"
                              >
                                <p className="text-[8.5px] font-bold text-[#064E3B] uppercase">
                                  AUTENTICAÇÃO PÚBLICA MANUAL
                                </p>
                                <p className="text-[8.5px] font-mono-tabular font-bold text-[#0F172A] mt-1">
                                  Cód.: {activeCert.code}
                                </p>
                                <p className="text-[8.5px] font-mono-tabular font-bold text-[#92400E] mt-0.5">
                                  Chave: {activeCert.controlKey}
                                </p>
                                <p className="text-[7.8px] font-bold text-[#0A1D56] mt-1">
                                  Endereço p/ Verificação Online:
                                </p>
                                <p className="text-[7.2px] font-mono-tabular text-[#0F172A]">
                                  https://extensao-mente-saude.vercel.app/
                                </p>
                              </div>
                            </div>

                            {/* Right Signature: James Araújo de Santana */}
                            <div className="col-span-4 text-center flex flex-col items-center">
                              <SignatureJamesSvg className="w-52 h-15 -mb-1" />
                              <div className="w-[92%] border-t border-[#0F172A] pt-1">
                                <p className="text-[11px] font-bold text-[#0A1D56]">JAMES ARAÚJO DE SANTANA</p>
                                <p className="text-[9.5px] text-[#0F172A]">
                                  Coordenador de Extensão e Projetos Educativos
                                </p>
                                <p className="text-[8.6px] font-mono-tabular font-bold text-[#0A1D56] mt-0.5">
                                  Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Verification Line */}
                          <div className="mt-2 pt-1 text-center">
                            <p className="text-[9.2px] font-mono-tabular font-bold text-[#064E3B]">
                              Verifique via QR Code ou acesse https://extensao-mente-saude.vercel.app/ informando o
                              Código {activeCert.code} ou Chave {activeCert.controlKey}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =====================================================================
                  LAUDA 2 / PÁGINA 2 — VERSO DO CERTIFICADO (MEMORIAL DESCRITIVO)
                 ===================================================================== */}
              {(viewMode === 'both' || viewMode === 'back') && (
                <div className="a4-landscape-sheet a4-print-page min-w-[920px] bg-[#FFFDFA] rounded-xs shadow-2xl p-[18px] select-text">
                  {/* Outer Forest Green Border (#054F3B) */}
                  <div className="w-full h-full border-[3px] border-[#054F3B] p-[5px] box-border">
                    {/* Middle Gold Border (#D97805) */}
                    <div className="w-full h-full border-[1.3px] border-[#D97805] p-[4px] box-border">
                      {/* Inner Royal Navy Border (#0A1C57) */}
                      <div className="w-full h-full border-[2px] border-[#0A1C57] px-6 py-3.5 flex flex-col justify-between box-border bg-[#FFFDFA]">
                        <div>
                          {/* 1. VERSO HEADER */}
                          <div className="flex items-center gap-3.5 pb-2 border-b-2 border-[#054F3B]">
                            <div className="flex items-center gap-2 shrink-0">
                              <LogoEditoraMenteSaude className="w-12 h-12" />
                              <LogoCentroMariaDalva className="w-12 h-12" />
                            </div>
                            <div>
                              <h4
                                className="text-[18px] font-bold text-[#064E3B] tracking-tight uppercase"
                                style={{ fontFamily: 'Times New Roman, Georgia, serif' }}
                              >
                                MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE DE EXTENSÃO
                              </h4>
                              <p className="text-[11.5px] text-[#0F172A]">
                                Verso Oficial do Certificado Nº {activeCert.numberLabel} · Fé Pública Interinstitucional
                                e Validação Curricular
                              </p>
                            </div>
                          </div>

                          {/* 2. TWO-COLUMN IDENTIFICATION & EDITAL FRAMING */}
                          <div className="grid grid-cols-12 gap-3 my-2.5">
                            <div className="col-span-7 bg-white border border-[#054F3B] p-3 text-[11.5px] space-y-1">
                              <p className="font-bold text-[#064E3B] uppercase text-[11px] mb-1">
                                1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL EXTENSIONISTA
                              </p>
                              <p className="text-[#0F172A]">Titular Certificado: {activeCert.holderName}</p>
                              <p className="text-[#0F172A]">CPF Registrado: {activeCert.holderCpf}</p>
                              <p className="text-[#0F172A]">Qualificação Profissional: {activeCert.holderRole}</p>
                              <p className="text-[#0F172A]">Instituição de Origem: {activeCert.holderInstitution}</p>
                            </div>

                            <div className="col-span-5 bg-[#F0F5FF] border border-[#0A1C57] p-3 text-[11.5px] flex flex-col justify-between">
                              <div>
                                <p className="font-bold text-[#0A1D56] uppercase text-[11px] mb-1">
                                  2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO
                                </p>
                                <p className="font-bold text-[#0F172A] leading-snug">{activeCert.editalItem}</p>
                              </div>
                              <p className="font-mono-tabular font-bold text-[11.5px] text-[#064E3B] pt-2">
                                Período: {activeCert.period} | Total: {activeCert.totalHoursNumeric}h
                              </p>
                            </div>
                          </div>

                          {/* 3. MATRIX OF PRACTICAL ACTIVITIES & EXTENSION METHODOLOGY */}
                          <div className="border border-[#054F3B] my-2">
                            <div className="bg-[#EDFCF5] px-3.5 py-1.5 border-b border-[#054F3B]">
                              <p className="text-[11px] font-bold text-[#064E3B] uppercase">
                                3. MATRIZ DE ATIVIDADES PRÁTICAS E METODOLOGIA EXTENSIONISTA (
                                {activeCert.totalHoursNumeric} HORAS)
                              </p>
                            </div>
                            <div className="divide-y divide-[#CCD6E0] bg-white text-[11px]">
                              {activeCert.axes.map((axis, idx) => (
                                <div key={idx} className="grid grid-cols-12 items-center">
                                  <div className="col-span-4 px-3 py-2 border-r border-[#E3E8F0]">
                                    <p className="font-bold text-[#0A1D56] leading-tight">{axis.axisTitle}</p>
                                    <p className="text-[9.5px] text-[#475569] mt-0.5">{axis.axisSubtitle}</p>
                                  </div>
                                  <div className="col-span-6 px-3.5 py-2 text-[#0F172A] leading-snug border-r border-[#E3E8F0]">
                                    {axis.description}
                                  </div>
                                  <div className="col-span-2 px-3 py-2 text-right font-mono-tabular font-bold text-[#064E3B]">
                                    {axis.hours}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 4. OFFICIAL REGISTRY OF PUBLIC FAITH, WEB ADDRESS & AUTHENTICITY KEYS */}
                          <div className="bg-[#FFFAEB] border border-[#D97805] p-3 flex items-center justify-between gap-4 mt-2.5">
                            <div className="space-y-1 text-[10.5px] leading-snug">
                              <p className="font-bold text-[#92400E] uppercase text-[11px]">
                                4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO DE
                                AUTENTICIDADE
                              </p>
                              <p className="text-[#0F172A]">
                                Certificado registrado sob o nº {activeCert.numberLabel} no Livro de Extensão nº{' '}
                                {activeCert.book}, Folha {activeCert.sheet}, expedido pela Editora Mente e Saúde (CNPJ:
                                51.372.335/0001-71) e Centro Profissionalizante Maria Dalva de Araújo (CNPJ:
                                51.269.112/0001-83).
                              </p>
                              <p className="font-mono-tabular font-bold text-[#064E3B] pt-0.5">
                                CÓDIGO DE AUTENTICIDADE: {activeCert.code} &nbsp;&nbsp;|&nbsp;&nbsp; CHAVE DE CONTROLE /
                                DÍGITO: {activeCert.controlKey}
                              </p>
                              <p className="font-mono-tabular font-bold text-[#0A1D56]">
                                ENDEREÇO PARA VERIFICAÇÃO MANUAL (SEM QR CODE):
                                https://extensao-mente-saude.vercel.app/?codigo={activeCert.code}#validador
                              </p>
                              <p className="font-mono-tabular font-bold text-[9.8px] text-[#0F172A]">
                                HASH SHA-256: {activeCert.sha256}
                              </p>
                            </div>

                            <div
                              onClick={() => onTriggerValidation(activeCert.code)}
                              className="bg-white border border-[#054F3B] p-1 shrink-0 cursor-pointer hover:border-[#0891B2] transition-colors"
                              title="Clique para validar este QR Code"
                            >
                              <OfficialQrCodeSvg seed={activeCert.code} size={82} />
                            </div>
                          </div>
                        </div>

                        {/* 5. VERSO SIGNATURES & FOOTER */}
                        <div className="grid grid-cols-12 items-end gap-3 pt-1">
                          <div className="col-span-4 text-center flex flex-col items-center">
                            <SignatureBarbaraSvg className="w-44 h-12 -mb-1" />
                            <div className="w-[88%] border-t border-[#0F172A] pt-0.5">
                              <p className="text-[10.5px] font-bold text-[#064E3B]">BÁRBARA LIMA DOS SANTOS</p>
                              <p className="text-[8.8px] font-mono-tabular font-bold text-[#064E3B]">
                                Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
                              </p>
                            </div>
                          </div>

                          <div className="col-span-4 text-center pb-0.5">
                            <p
                              className="italic text-[14px] text-[#0F172A]"
                              style={{ fontFamily: 'Times New Roman, Georgia, serif' }}
                            >
                              {activeCert.cityState}, {activeCert.issueDate}.
                            </p>
                            <p className="text-[9.2px] font-bold text-[#475569] mt-0.5">
                              Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo o Território Nacional
                            </p>
                            <p className="text-[8.8px] font-mono-tabular text-[#064E3B]">
                              Registro: {activeCert.code} · Chave: {activeCert.controlKey}
                            </p>
                          </div>

                          <div className="col-span-4 text-center flex flex-col items-center">
                            <SignatureJamesSvg className="w-44 h-12 -mb-1" />
                            <div className="w-[88%] border-t border-[#0F172A] pt-0.5">
                              <p className="text-[10.5px] font-bold text-[#0A1D56]">JAMES ARAÚJO DE SANTANA</p>
                              <p className="text-[8.8px] font-mono-tabular font-bold text-[#0A1D56]">
                                Centro Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
