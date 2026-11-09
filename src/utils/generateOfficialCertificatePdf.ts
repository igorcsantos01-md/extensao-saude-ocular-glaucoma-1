import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { CertificateRecord } from '../data/certificatesData';

interface LoadedCertificateAssets {
  logoEmsDataUrl: string;
  logoCpmdaDataUrl: string;
  sigBarbaraDataUrl: string;
  sigJamesDataUrl: string;
}

let cachedAssets: LoadedCertificateAssets | null = null;

async function fetchImageAsDataUrl(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function loadCertificateAssets(): Promise<LoadedCertificateAssets> {
  if (cachedAssets) return cachedAssets;

  const [logoEmsDataUrl, logoCpmdaDataUrl, sigBarbaraDataUrl, sigJamesDataUrl] = await Promise.all([
    fetchImageAsDataUrl('/assets/certificado/logo-ems.png'),
    fetchImageAsDataUrl('/assets/certificado/logo-cpmda.png'),
    fetchImageAsDataUrl('/assets/certificado/assinatura-barbara.png'),
    fetchImageAsDataUrl('/assets/certificado/assinatura-james.png'),
  ]);

  cachedAssets = {
    logoEmsDataUrl,
    logoCpmdaDataUrl,
    sigBarbaraDataUrl,
    sigJamesDataUrl,
  };
  return cachedAssets;
}

export async function buildOfficialCertificateJsPdf(cert: CertificateRecord): Promise<jsPDF> {
  const assets = await loadCertificateAssets();
  const verificationTargetUrl = `https://extensao-mente-saude.vercel.app/?codigo=${cert.code}#validador`;

  // Generate high-definition 480x480 QR Code PNG matching Certificate 01
  const qrDataUrl = await QRCode.toDataURL(verificationTargetUrl, {
    width: 480,
    margin: 1,
    color: {
      dark: '#0F172A',
      light: '#FFFFFF',
    },
    errorCorrectionLevel: 'M',
  });

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  // =========================================================================
  // PAGE 1 — FRENTE DO CERTIFICADO (EXACT VECTOR ENGINE FROM CERTIFICATE 01)
  // =========================================================================
  // Background warm academic paper
  doc.setFillColor(255, 253, 250);
  doc.rect(0, 0, 297, 210, 'F');

  // Triple Academic Borders
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.8);
  doc.rect(5, 5, 287, 200, 'S');

  doc.setDrawColor(217, 120, 5);
  doc.setLineWidth(0.35);
  doc.rect(6.8, 6.8, 283.4, 196.4, 'S');

  doc.setDrawColor(10, 28, 87);
  doc.setLineWidth(0.5);
  doc.rect(8.2, 8.2, 280.6, 193.6, 'S');

  // Left Logo & Institutional Header
  doc.addImage(assets.logoEmsDataUrl, 'PNG', 14, 12, 20, 20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 78, 59);
  doc.text('EDITORA MENTE E SAÚDE', 37, 18);

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('CNPJ: 51.372.335/0001-71', 37, 22.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(13, 148, 136);
  doc.text('Conselho Editorial e Extensão Científica', 37, 26.5);

  // Center Program Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 78, 59);
  doc.text('PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA', 148.5, 17, {
    align: 'center',
  });
  doc.text('E EDUCAÇÃO EM SAÚDE', 148.5, 21.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(10, 29, 86);
  doc.text(
    `Certificado Nº ${cert.numberLabel} · Livro de Extensão nº ${cert.book} · Cód. ${cert.code}`,
    148.5,
    26.2,
    { align: 'center' }
  );

  // Right Logo & Institutional Header
  doc.addImage(assets.logoCpmdaDataUrl, 'PNG', 263, 12, 20, 20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(10, 29, 86);
  doc.text('CENTRO PROFISSIONALIZANTE', 260, 17.5, { align: 'right' });
  doc.text('MARIA DALVA DE ARAÚJO', 260, 21.8, { align: 'right' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('CNPJ: 51.269.112/0001-83', 260, 26.2, { align: 'right' });

  // Header divider line
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.25);
  doc.line(14, 35, 283, 35);

  // Main Certificate Title
  doc.setFont('times', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(6, 78, 59);
  doc.text('CERTIFICADO DE ATIVIDADE DE EXTENSÃO', 148.5, 47, { align: 'center' });

  // Gold underline beneath title
  doc.setDrawColor(217, 120, 5);
  doc.setLineWidth(0.5);
  doc.line(95, 50, 202, 50);

  // Introductory statement
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(
    [
      'A Editora Mente e Saúde (CNPJ: 51.372.335/0001-71), em parceria institucional com o Centro Profissionalizante Maria Dalva de Araújo (CNPJ:',
      '51.269.112/0001-83), certifica para os devidos fins de comprovação curricular e acadêmica que',
    ],
    148.5,
    58.5,
    { align: 'center' }
  );

  // Holder Name Box
  doc.setFillColor(237, 252, 245);
  doc.setDrawColor(217, 120, 5);
  doc.setLineWidth(0.3);
  doc.rect(24, 67, 249, 21, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(23);
  doc.setTextColor(10, 29, 86);
  doc.text(cert.holderName, 148.5, 77, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(`${cert.holderRole}  |  CPF: ${cert.holderCpf}  |  ${cert.holderInstitution}`, 148.5, 84.2, {
    align: 'center',
  });

  // Body Paragraphs
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.1);
  doc.setTextColor(15, 23, 42);
  const p1Lines = doc.splitTextToSize(cert.frontBodyParagraph1, 248);
  doc.text(p1Lines, 24.5, 96.5);

  const p2Lines = doc.splitTextToSize(cert.frontBodyParagraph2, 248);
  doc.text(p2Lines, 24.5, 114.5);

  // Location & Issue Date
  doc.setFont('times', 'italic');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text(`${cert.cityState}, ${cert.issueDate}.`, 148.5, 136.5, { align: 'center' });

  // Left Signature (Bárbara Lima dos Santos)
  doc.addImage(assets.sigBarbaraDataUrl, 'PNG', 22, 149, 64, 18);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(15, 168.5, 93, 168.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(6, 78, 59);
  doc.text('BÁRBARA LIMA DOS SANTOS', 54, 173, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(15, 23, 42);
  doc.text('Editora-Chefe e Coordenadora de Extensão Editorial', 54, 176.8, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.4);
  doc.setTextColor(6, 78, 59);
  doc.text('Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)', 54, 180.5, { align: 'center' });

  // Center Official Gold Seal Circle
  doc.setFillColor(255, 242, 199);
  doc.setDrawColor(217, 120, 5);
  doc.setLineWidth(0.6);
  doc.circle(109, 165, 11.5, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 53, 15);
  doc.text('SELO OFICIAL', 109, 161.2, { align: 'center' });

  doc.setFontSize(8);
  doc.text('FÉ PÚBLICA', 109, 165.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(5.5);
  doc.text(cert.code, 109, 169.5, { align: 'center' });

  // Center QR Code Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.25);
  doc.rect(123.5, 151.5, 25, 25, 'FD');
  doc.addImage(qrDataUrl, 'PNG', 124.5, 152.5, 23, 23);
  doc.link(123.5, 151.5, 25, 25, { url: verificationTargetUrl });

  // Center Manual Authentication Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.25);
  doc.rect(150.5, 151.5, 49, 25, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(6, 78, 59);
  doc.text('AUTENTICAÇÃO PÚBLICA MANUAL', 152.5, 155.5);

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(15, 23, 42);
  doc.text(`Cód.: ${cert.code}`, 152.5, 159.8);

  doc.setTextColor(146, 64, 14);
  doc.text(`Chave: ${cert.controlKey}`, 152.5, 163.8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(10, 29, 86);
  doc.text('Endereço p/ Verificação Online:', 152.5, 167.8);

  doc.setFont('courier', 'normal');
  doc.setFontSize(5.2);
  doc.setTextColor(15, 23, 42);
  doc.text('https://extensao-mente-saude.vercel.app/', 152.5, 171.2);
  doc.link(150.5, 151.5, 49, 25, { url: verificationTargetUrl });

  // Bottom verification note
  doc.setFont('courier', 'bold');
  doc.setFontSize(6.4);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `Verifique via QR Code ou acesse https://extensao-mente-saude.vercel.app/ informando o Código ${cert.code} ou Chave ${cert.controlKey}`,
    148.5,
    191.5,
    { align: 'center' }
  );

  // Right Signature (James Araújo de Santana)
  doc.addImage(assets.sigJamesDataUrl, 'PNG', 210, 149, 64, 18);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(203, 168.5, 282, 168.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(10, 29, 86);
  doc.text('JAMES ARAÚJO DE SANTANA', 242.5, 173, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(15, 23, 42);
  doc.text('Coordenador de Extensão e Projetos Educativos', 242.5, 176.8, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.1);
  doc.setTextColor(10, 29, 86);
  doc.text('Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)', 242.5, 180.5, {
    align: 'center',
  });

  // =========================================================================
  // PAGE 2 — VERSO DO CERTIFICADO (MEMORIAL DESCRITIVO E REGISTRO)
  // =========================================================================
  doc.addPage('a4', 'landscape');

  // Background warm academic paper
  doc.setFillColor(255, 253, 250);
  doc.rect(0, 0, 297, 210, 'F');

  // Triple Academic Borders
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.8);
  doc.rect(5, 5, 287, 200, 'S');

  doc.setDrawColor(217, 120, 5);
  doc.setLineWidth(0.35);
  doc.rect(6.8, 6.8, 283.4, 196.4, 'S');

  doc.setDrawColor(10, 28, 87);
  doc.setLineWidth(0.5);
  doc.rect(8.2, 8.2, 280.6, 193.6, 'S');

  // Top Dual Logos & Verso Header
  doc.addImage(assets.logoEmsDataUrl, 'PNG', 14, 12, 13, 13);
  doc.addImage(assets.logoCpmdaDataUrl, 'PNG', 29, 12, 13, 13);

  doc.setFont('times', 'bold');
  doc.setFontSize(13.5);
  doc.setTextColor(6, 78, 59);
  doc.text('MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE DE EXTENSÃO', 46, 17.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(
    `Verso Oficial do Certificado Nº ${cert.numberLabel} · Fé Pública Interinstitucional e Validação Curricular`,
    46,
    22.5
  );

  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.5);
  doc.line(14, 28, 283, 28);

  // Box 1: Dados de Identificação do Profissional Extensionista
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.25);
  doc.rect(14, 31, 155, 31, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(6, 78, 59);
  doc.text('1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL EXTENSIONISTA', 18, 36.2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.3);
  doc.setTextColor(15, 23, 42);
  doc.text(`Titular Certificado: ${cert.holderName}`, 18, 42.2);
  doc.text(`CPF Registrado: ${cert.holderCpf}`, 18, 47.4);
  doc.text(`Qualificação Profissional: ${cert.holderRole}`, 18, 52.6);
  doc.text(`Instituição de Origem: ${cert.holderInstitution}`, 18, 57.8);

  // Box 2: Enquadramento Curricular e Pontuação
  doc.setFillColor(240, 245, 255);
  doc.setDrawColor(10, 28, 87);
  doc.setLineWidth(0.25);
  doc.rect(173, 31, 110, 31, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(10, 29, 86);
  doc.text('2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO', 177, 36.2);

  doc.setTextColor(15, 23, 42);
  doc.text(
    [
      'Item 08 - Atividades de Extensão: Campanhas educativas, de vacinação,',
      'coleta de dados populacionais e atividades comunitárias',
    ],
    177,
    42.5
  );

  doc.setFont('courier', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(6, 78, 59);
  doc.text(`Período: ${cert.period} | Total: ${cert.totalHoursNumeric}h`, 177, 58);

  // Box 3: Matriz de Atividades Práticas e Metodologia Extensionista
  doc.setFillColor(237, 252, 245);
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.25);
  doc.rect(14, 65, 269, 7.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(6, 78, 59);
  doc.text(`3. MATRIZ DE ATIVIDADES PRÁTICAS E METODOLOGIA EXTENSIONISTA (${cert.totalHoursNumeric} HORAS)`, 18, 70.2);

  const rowTops = [72.5, 86.5, 100.5, 114.5];
  cert.axes.forEach((axis, idx) => {
    const rTop = rowTops[idx];
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(204, 214, 224);
    doc.setLineWidth(0.25);
    doc.rect(14, rTop, 269, 14, 'FD');

    // Vertical column dividers
    doc.setDrawColor(227, 232, 240);
    doc.line(93, rTop, 93, rTop + 14);
    doc.line(258, rTop, 258, rTop + 14);

    // Axis Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(10, 29, 86);
    const titleLines = doc.splitTextToSize(axis.axisTitle, 73);
    doc.text(titleLines, 17, rTop + 4.5);

    // Axis Subtitle
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(71, 85, 105);
    doc.text(axis.axisSubtitle, 17, rTop + 11.8);

    // Axis Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.6);
    doc.setTextColor(15, 23, 42);
    const descLines = doc.splitTextToSize(axis.description, 158);
    doc.text(descLines, 96, rTop + 5);

    // Axis Hours
    doc.setFont('courier', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(6, 78, 59);
    doc.text(axis.hours, 263.88, rTop + 8.2);
  });

  // Box 4: Registro Oficial de Fé Pública, Endereço Web e Chaves
  doc.setFillColor(255, 250, 235);
  doc.setDrawColor(217, 120, 5);
  doc.setLineWidth(0.35);
  doc.rect(14, 131.5, 269, 31, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(146, 64, 14);
  doc.text('4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO DE AUTENTICIDADE', 18, 136.8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(15, 23, 42);
  doc.text(
    [
      `Certificado registrado sob o nº ${cert.numberLabel} no Livro de Extensão nº ${cert.book}, Folha ${cert.sheet}, expedido pela Editora Mente e Saúde (CNPJ: 51.372.335/0001-71) e Centro Profissionalizante Maria Dalva de`,
      'Araújo (CNPJ: 51.269.112/0001-83).',
    ],
    18,
    142
  );

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `CÓDIGO DE AUTENTICIDADE: ${cert.code}   |   CHAVE DE CONTROLE / DÍGITO: ${cert.controlKey}`,
    18,
    149.8
  );

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(10, 29, 86);
  doc.text(`ENDEREÇO PARA VERIFICAÇÃO MANUAL (SEM QR CODE): ${verificationTargetUrl}`, 18, 154.8);
  doc.link(18, 151.5, 230, 5, { url: verificationTargetUrl });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(15, 23, 42);
  doc.text(`HASH SHA-256: ${cert.sha256}`, 18, 159.8);

  // Verso QR Code Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.25);
  doc.rect(253.5, 134, 26, 26, 'FD');
  doc.addImage(qrDataUrl, 'PNG', 254.5, 135, 24, 24);
  doc.link(253.5, 134, 26, 26, { url: verificationTargetUrl });

  // Verso Signatures & Footer
  doc.addImage(assets.sigBarbaraDataUrl, 'PNG', 26, 164, 54, 15);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(18, 180, 92, 180);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(6, 78, 59);
  doc.text('BÁRBARA LIMA DOS SANTOS', 55, 184.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.text('Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)', 55, 188, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`${cert.cityState}, ${cert.issueDate}.`, 148.5, 179.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(71, 85, 105);
  doc.text('Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo o Território Nacional', 148.5, 184.2, {
    align: 'center',
  });

  doc.setFont('courier', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(6, 78, 59);
  doc.text(`Registro: ${cert.code} · Chave: ${cert.controlKey}`, 148.5, 188, { align: 'center' });

  doc.addImage(assets.sigJamesDataUrl, 'PNG', 215, 164, 54, 15);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.35);
  doc.line(204, 180, 279, 180);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(10, 29, 86);
  doc.text('JAMES ARAÚJO DE SANTANA', 241.5, 184.2, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.text('Centro Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)', 241.5, 188, { align: 'center' });

  return doc;
}

export async function downloadOfficialCertificatePdf(cert: CertificateRecord): Promise<void> {
  // If Certificate 01 is selected, we can also serve or generate the exact PDF
  const doc = await buildOfficialCertificateJsPdf(cert);
  const fileName = `Certificado_Extensao_${cert.numberLabel}_${cert.code}_Lucas_Goncalves_Silveira.pdf`;
  doc.save(fileName);
}

export async function generateCertificatePdfBlobUrl(cert: CertificateRecord): Promise<string> {
  const doc = await buildOfficialCertificateJsPdf(cert);
  const blob = doc.output('blob');
  return URL.createObjectURL(blob);
}
