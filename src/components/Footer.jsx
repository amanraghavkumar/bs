import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';

export default function Footer({ recipient, onReplay }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid rgba(244, 114, 182, 0.15)',
        padding: '60px 24px 80px',
        textAlign: 'center',
        background: 'linear-gradient(to bottom, transparent, rgba(15, 4, 20, 0.95))',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px',
        }}
      >
        {/* Heart emblem */}
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fb7185',
          }}
        >
          <Heart size={20} fill="#fb7185" />
        </div>

        <h3
          className="font-serif-romantic text-glow"
          style={{
            fontSize: '1.6rem',
            color: '#ffffff',
            fontWeight: 600,
          }}
        >
          Made with Love & Care, Just for {recipient.name || "You"} ♡
        </h3>

        <p style={{ fontSize: '0.9rem', color: '#fbcfe8', opacity: 0.8 }}>
          Today and every day, may you know just how deeply cherished you are.
        </p>

        {/* Buttons: Back to top & Replay */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <button
            onClick={scrollToTop}
            className="btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <ArrowUp size={14} />
            Back to Top
          </button>

          <button
            onClick={onReplay}
            className="btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Sparkles size={14} />
            Replay Opening ✨
          </button>
        </div>
      </div>
    </footer>
  );
}
