import React, { useState } from 'react';
import { Mail, Heart, Sparkles, Feather, RotateCcw } from 'lucide-react';
import { audioManager } from '../utils/audioManager';

export default function LetterSurprise({ letterData, recipient }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      audioManager.playEnvelopeRustle();
      setIsOpen(true);
    }
  };

  const handleCloseEnvelope = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <section
      id="letter-surprise"
      style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '960px',
        margin: '60px auto',
        padding: '40px 24px',
        textAlign: 'center',
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '36px' }}>
        <span
          className="glass-pill"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#fb7185',
            marginBottom: '12px',
          }}
        >
          <Mail size={14} />
          Surprise One 💌
        </span>
        <h2
          className="font-serif-romantic text-glow"
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 700,
            color: '#ffffff',
          }}
        >
          {letterData.envelopePrompt || "There's something I wanted to tell you..."}
        </h2>
        <p style={{ color: '#fbcfe8', fontSize: '0.95rem', marginTop: '8px', opacity: 0.85 }}>
          {!isOpen ? (letterData.clickInstruction || "Click the wax seal to unfold your letter") : "Take your time to read this ♡"}
        </p>
      </div>

      {/* Main Envelope & Letter Container */}
      <div
        style={{
          position: 'relative',
          maxWidth: '720px',
          margin: '0 auto',
          minHeight: isOpen ? 'auto' : '260px',
          perspective: '1000px',
        }}
      >
        {!isOpen ? (
          /* ===================================================================
              CLOSED ENVELOPE WITH WAX SEAL
              =================================================================== */
          <div
            onClick={handleOpenEnvelope}
            className="animate-soft-float"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '460px',
              aspectRatio: '460/280',
              margin: '0 auto',
              backgroundColor: '#3f1547',
              borderRadius: '16px',
              boxShadow: '0 24px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(244, 114, 182, 0.25)',
              cursor: 'pointer',
              border: '2px solid rgba(244, 114, 182, 0.35)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.7), 0 0 45px rgba(244, 114, 182, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 24px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(244, 114, 182, 0.25)';
            }}
          >
            {/* Envelope Background Flap Shapes (SVG) */}
            <svg
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
              viewBox="0 0 460 280"
              preserveAspectRatio="none"
            >
              {/* Bottom fold */}
              <polygon points="0,280 230,130 460,280" fill="#2d0e34" opacity="0.75" />
              {/* Left fold */}
              <polygon points="0,0 230,140 0,280" fill="#36103e" opacity="0.65" />
              {/* Right fold */}
              <polygon points="460,0 230,140 460,280" fill="#36103e" opacity="0.65" />
              {/* Top flap */}
              <polygon points="0,0 230,150 460,0" fill="#4d1656" />
            </svg>

            {/* Glowing Wax Seal Button in the Center */}
            <div
              className="animate-soft-pulse"
              style={{
                position: 'relative',
                zIndex: 10,
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #f43f5e 0%, #be123c 70%, #881337 100%)',
                border: '3px solid #fecdd3',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 25px rgba(244, 63, 94, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              <Heart size={32} fill="#ffffff" color="#ffffff" />
            </div>

            {/* Prompt Tag */}
            <div
              style={{
                position: 'absolute',
                bottom: '18px',
                zIndex: 10,
                fontSize: '13px',
                fontWeight: 600,
                color: '#fbcfe8',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Sparkles size={14} color="#fde047" />
              Click to Open
            </div>
          </div>
        ) : (
          /* ===================================================================
              OPENED LETTER DISPLAY
              =================================================================== */
          <div
            className="paper-texture"
            style={{
              width: '100%',
              borderRadius: '24px',
              padding: 'clamp(32px, 6vw, 56px)',
              textAlign: 'left',
              position: 'relative',
              animation: 'letterUnfold 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              border: '1px solid #fed7aa',
            }}
          >
            {/* Fold back button in top right */}
            <button
              onClick={handleCloseEnvelope}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(67, 20, 7, 0.08)',
                border: '1px solid rgba(67, 20, 7, 0.15)',
                color: '#78350f',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(67, 20, 7, 0.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(67, 20, 7, 0.08)')}
            >
              <RotateCcw size={13} />
              Fold Letter
            </button>

            {/* Date Tag */}
            <div
              className="font-serif-romantic"
              style={{
                fontSize: '14px',
                color: '#9a3412',
                fontStyle: 'italic',
                marginBottom: '20px',
              }}
            >
              {letterData.date || "On Your Special Day"}
            </div>

            {/* Salutation */}
            <h3
              className="font-handwriting"
              style={{
                fontSize: 'clamp(2rem, 5vw, 2.6rem)',
                color: '#7c2d12',
                marginBottom: '24px',
                lineHeight: 1.2,
              }}
            >
              {letterData.salutation.replace("Sophia", recipient.name || "Sophia")}
            </h3>

            {/* Letter Paragraphs */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                fontSize: 'clamp(1rem, 2.2vw, 1.125rem)',
                lineHeight: 1.85,
                color: '#431407',
                fontFamily: 'var(--font-serif)',
              }}
            >
              {letterData.paragraphs?.map((p, idx) => (
                <p key={idx} style={{ textIndent: idx > 0 ? '24px' : '0' }}>
                  {p}
                </p>
              ))}
            </div>

            {/* Sign-off & Signature Area */}
            <div
              style={{
                marginTop: '40px',
                paddingTop: '20px',
                borderTop: '1px dashed rgba(180, 83, 9, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}
            >
              <span
                style={{
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: '#9a3412',
                  marginBottom: '6px',
                }}
              >
                {letterData.closing || "With all my fondness & warmth,"}
              </span>
              <div
                className="font-handwriting"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
                  color: '#991b1b',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Feather size={22} color="#b45309" />
                {letterData.signature || "Yours Always ♡"}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes letterUnfold {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.92);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
