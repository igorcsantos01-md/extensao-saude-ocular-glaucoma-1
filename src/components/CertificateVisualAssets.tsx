import React from 'react';

export const LogoEditoraMenteSaude: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <img
    src="/assets/certificado/logo-ems.png"
    alt="Logotipo Editora Mente e Saúde"
    referrerPolicy="no-referrer"
    className={`object-contain select-none ${className}`}
  />
);

export const LogoCentroMariaDalva: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <img
    src="/assets/certificado/logo-cpmda.png"
    alt="Logotipo Centro Profissionalizante Maria Dalva de Araújo"
    referrerPolicy="no-referrer"
    className={`object-contain select-none ${className}`}
  />
);

export const SignatureBarbaraSvg: React.FC<{ className?: string }> = ({ className = 'w-48 h-14' }) => (
  <img
    src="/assets/certificado/assinatura-barbara.png"
    alt="Assinatura de Bárbara Lima dos Santos"
    referrerPolicy="no-referrer"
    className={`object-contain select-none ${className}`}
  />
);

export const SignatureJamesSvg: React.FC<{ className?: string }> = ({ className = 'w-48 h-14' }) => (
  <img
    src="/assets/certificado/assinatura-james.png"
    alt="Assinatura de James Araújo de Santana"
    referrerPolicy="no-referrer"
    className={`object-contain select-none ${className}`}
  />
);

export const SeloFePublicaSvg: React.FC<{ code: string; className?: string }> = ({
  code,
  className = 'w-22 h-22',
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label={`Selo Oficial de Fé Pública ${code}`}
  >
    {/* Circular Gold Seal matching exact jsPDF circle(109, 165, 11.5) */}
    <circle cx="60" cy="60" r="55" fill="#FFF2C7" stroke="#D97805" strokeWidth="3.2" />
    <text
      x="60"
      y="43"
      textAnchor="middle"
      fill="#78350F"
      fontSize="10.2"
      fontWeight="700"
      fontFamily="Times New Roman, Georgia, serif"
    >
      SELO OFICIAL
    </text>
    <text
      x="60"
      y="61"
      textAnchor="middle"
      fill="#78350F"
      fontSize="12.5"
      fontWeight="700"
      fontFamily="Times New Roman, Georgia, serif"
    >
      FÉ PÚBLICA
    </text>
    <text
      x="60"
      y="80"
      textAnchor="middle"
      fill="#78350F"
      fontSize="8.3"
      fontWeight="700"
      fontFamily="Courier New, JetBrains Mono, monospace"
    >
      {code}
    </text>
  </svg>
);

export const OfficialQrCodeSvg: React.FC<{ seed: string; size?: number; className?: string }> = ({
  seed,
  size = 92,
  className = '',
}) => {
  const isCert01 = seed.includes('EMS-EXT-2023-0418');
  const qrSrc = isCert01
    ? '/assets/certificado/qrcode-cert-01.png'
    : '/assets/certificado/qrcode-cert-02.png';

  return (
    <img
      src={qrSrc}
      alt={`QR Code de Verificação ${seed}`}
      width={size}
      height={size}
      referrerPolicy="no-referrer"
      className={`object-contain select-none bg-white ${className}`}
    />
  );
};
