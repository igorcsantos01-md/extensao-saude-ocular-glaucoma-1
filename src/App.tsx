/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileText, QrCode, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CERTIFICATES_DB } from './data/certificatesData';
import { CertificatePdfViewer } from './components/CertificatePdfViewer';
import { PublicAuthenticator } from './components/PublicAuthenticator';
import { InteractiveCampaignPortal } from './components/InteractiveCampaignPortal';
import { LogoEditoraMenteSaude, LogoCentroMariaDalva } from './components/CertificateVisualAssets';

export default function App() {
  // Default to Certificado Nº 02 (EMS-CDP-2023-0892) as confirmed by the user
  const [selectedCertId, setSelectedCertId] = useState<string>('cert-02');
  const [activeValidationCode, setActiveValidationCode] = useState<string>('EMS-CDP-2023-0892');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get('codigo');
    if (codeParam) {
      const normalized = codeParam.trim().toUpperCase();
      setActiveValidationCode(normalized);
      const found = CERTIFICATES_DB.find(
        (c) => c.code.toUpperCase() === normalized || c.controlKey.toUpperCase() === normalized
      );
      if (found) {
        setSelectedCertId(found.id);
      }
    }
  }, []);

  const handleSelectCert = (certId: string) => {
    setSelectedCertId(certId);
    const cert = CERTIFICATES_DB.find((c) => c.id === certId);
    if (cert) {
      setActiveValidationCode(cert.code);
    }
  };

  const handleTriggerValidation = (code: string) => {
    setActiveValidationCode(code);
    const el = document.getElementById('validador');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentCert = CERTIFICATES_DB.find((c) => c.id === selectedCertId) || CERTIFICATES_DB[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* =====================================================================
          TOP BAR (Strict 3-Zone Contract, hidden on print)
         ===================================================================== */}
      <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#certificado-pdf"
            className="text-lg font-extrabold tracking-tight text-[#1E1B4B] whitespace-nowrap shrink-0"
          >
            Extensão Mente &amp; Saúde
          </a>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a
              href="#certificado-pdf"
              className="hover:text-[#0891B2] transition-colors whitespace-nowrap shrink-0"
            >
              Certificado PDF
            </a>
            <a
              href="#validador"
              className="hover:text-[#0891B2] transition-colors whitespace-nowrap shrink-0"
            >
              Validador
            </a>
            <a
              href="#campanha-educativa"
              className="hover:text-[#0891B2] transition-colors whitespace-nowrap shrink-0"
            >
              Campanha
            </a>
            <a
              href="#quiz-populacional"
              className="hover:text-[#0891B2] transition-colors whitespace-nowrap shrink-0"
            >
              Quiz &amp; Dados
            </a>
            <a
              href="#acervo-ebooks"
              className="hover:text-[#0891B2] transition-colors whitespace-nowrap shrink-0"
            >
              Mini E-books
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#validador"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0891B2] hover:bg-[#0E7490] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Validar Código
            </a>
          </div>
        </div>
      </header>

      {/* =====================================================================
          HERO SECTION — SAÚDE DIGITAL VIBRANTE & REGISTRO INTERINSTITUCIONAL
         ===================================================================== */}
      <section className="no-print bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#0F172A] text-white pt-10 pb-12 border-b border-indigo-900">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Main Campaign & Credential Overview */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-cyan-300 mb-3">
                  <span>PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO</span>
                  <span aria-hidden="true">·</span>
                  <span>FÉ PÚBLICA E AUTENTICAÇÃO QR CODE</span>
                  <span aria-hidden="true">·</span>
                  <span>ITEM 08 DO EDITAL</span>
                </div>

                <h1
                  className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-[1.15]"
                  style={{ textWrap: 'balance' }}
                >
                  Campanha de Saúde Digital, Letramento Ocular em Glaucoma, Vacinação e Combate a Fake News
                </h1>

                <p className="text-base sm:text-lg text-slate-200 mt-4 leading-relaxed max-w-2xl">
                  Plataforma oficial de transparência metodológica, acervo de <strong>Mini E-books</strong>, instrumento
                  de <strong>Coleta de Dados Populacionais</strong> e verificação pública dos Certificados de Extensão
                  do médico <strong>Lucas Gonçalves Silveira</strong> (CPF: 702.794.941-57 · UNIFAN).
                </p>
              </div>

              {/* Primary CTA & Secondary Navigation */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <a
                  href="#certificado-pdf"
                  className="px-5 py-3 bg-[#06B6D4] hover:bg-[#0891B2] text-slate-950 font-bold text-sm rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm whitespace-nowrap"
                >
                  <FileText className="w-4 h-4" />
                  Acessar Certificado Nº {currentCert.numberLabel} em PDF ({currentCert.code})
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#validador"
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm rounded-xl transition-colors inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <QrCode className="w-4 h-4 text-cyan-300" />
                  Autenticador Público
                </a>

                <a
                  href="#comando-github"
                  className="px-4 py-3 text-xs sm:text-sm font-semibold text-cyan-200 hover:text-white underline underline-offset-4 whitespace-nowrap"
                >
                  Copiar Comando p/ GitHub
                </a>
              </div>
            </div>

            {/* Right Column: Institutional Credential Card */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 flex flex-col justify-between gap-5">
              <div>
                <div className="flex items-center gap-3 pb-4 border-b border-white/15">
                  <div className="bg-white p-1.5 rounded-xl shrink-0">
                    <LogoEditoraMenteSaude className="w-11 h-11" />
                  </div>
                  <div className="bg-white p-1.5 rounded-xl shrink-0">
                    <LogoCentroMariaDalva className="w-11 h-11" />
                  </div>
                  <div className="text-xs leading-snug">
                    <p className="font-bold text-white">Instituições Emissoras</p>
                    <p className="text-cyan-200 font-mono-tabular text-[11px]">
                      CNPJ 51.372.335/0001-71 &amp; 51.269.112/0001-83
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Profissional Certificado:</span>
                    <span className="font-bold text-white">Dr. Lucas Gonçalves Silveira</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Certificado em Exibição:</span>
                    <span className="font-mono-tabular font-bold text-cyan-300">
                      Nº {currentCert.numberLabel} ({currentCert.code})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Chave de Controle:</span>
                    <span className="font-mono-tabular font-semibold text-white">{currentCert.controlKey}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Registro Físico/Digital:</span>
                    <span className="font-mono-tabular text-white">
                      Livro {currentCert.book} · Folha {currentCert.sheet}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3.5 border-t border-white/15 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 text-emerald-300 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  Fé Pública Verificada
                </span>
                <span className="font-mono-tabular text-slate-300">{currentCert.totalHoursText}</span>
              </div>
            </div>
          </div>

          {/* Full-width 4-Column Quantitative Proof Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/15 text-xs sm:text-sm">
            <div>
              <p className="text-slate-400 text-xs">Certificado Nº 02 (Glaucoma &amp; Dados)</p>
              <p className="font-mono-tabular font-bold text-white text-base mt-0.5">
                EMS-CDP-2023-0892 · 14h
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-xs">Certificado Nº 01 (Vacinação &amp; E-books)</p>
              <p className="font-mono-tabular font-bold text-white text-base mt-0.5">
                EMS-EXT-2023-0418 · 12h
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-xs">Amostra de Coleta Populacional</p>
              <p className="font-mono-tabular font-bold text-cyan-300 text-base mt-0.5">
                {currentCert.metrics.quizResponsesCollected}
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-xs">Alcance &amp; Distribuição Gratuita</p>
              <p className="font-mono-tabular font-bold text-rose-300 text-base mt-0.5">
                {currentCert.metrics.ebooksDistributed}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MAIN CONTENT: PDF VIEWER + PUBLIC AUTHENTICATOR + CAMPAIGN PORTAL
         ===================================================================== */}
      <main className="flex-1">
        <CertificatePdfViewer
          certificates={CERTIFICATES_DB}
          selectedCertId={selectedCertId}
          onSelectCert={handleSelectCert}
          onTriggerValidation={handleTriggerValidation}
        />

        <PublicAuthenticator
          certificates={CERTIFICATES_DB}
          activeValidationCode={activeValidationCode}
          onSelectCertificateInViewer={handleSelectCert}
        />

        <InteractiveCampaignPortal />
      </main>

      {/* =====================================================================
          INSTITUTIONAL FOOTER (hidden on print)
         ===================================================================== */}
      <footer className="no-print bg-white border-t border-slate-200 py-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-slate-600">
          <div className="space-y-1">
            <p className="font-bold text-slate-900 text-sm">
              Programa Interinstitucional de Extensão, Comunicação Científica e Educação em Saúde
            </p>
            <p>
              <strong>Editora Mente e Saúde</strong> (CNPJ: 51.372.335/0001-71) &nbsp;·&nbsp;{' '}
              <strong>Centro Profissionalizante Maria Dalva de Araújo</strong> (CNPJ: 51.269.112/0001-83)
            </p>
            <p className="text-slate-500">
              Sistema de Registro Acadêmico e Verificação Pública de Certificados — Goiânia/GO · Válido em todo o
              Território Nacional.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono-tabular text-xs">
            <a href="#certificado-pdf" className="text-[#0891B2] hover:underline font-semibold">
              #certificado-pdf
            </a>
            <span>·</span>
            <a href="#validador" className="text-[#0891B2] hover:underline font-semibold">
              #validador
            </a>
            <span>·</span>
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              SHA-256 Verificado
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
