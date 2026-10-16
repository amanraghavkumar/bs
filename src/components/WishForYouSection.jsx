import React from 'react';
import { Sun, Heart, Sparkles, Compass } from 'lucide-react';

const iconMap = {
  sun: Sun,
  heart: Heart,
  sparkles: Sparkles,
  compass: Compass,
};

export default function WishForYouSection({ wishData, recipient }) {
  if (!wishData || !wishData.enabled) return null;

  return (
    <section
      id="wishes-for-you"
      style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1100px',
        margin: '90px auto 60px',
        padding: '0 24px',
        textAlign: 'center',
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '44px' }}>
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
          <Sparkles size={14} />
          Surprise Six ✨
        </span>
        <h2
          className="font-serif-romantic text-glow"
          style={{
            fontSize: 'clamp(2.1rem, 4.5vw, 3rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.2,
          }}
        >
          {wishData.title || "If I Could Wish One Thing for You..."}
        </h2>
        <p
          style={{
            color: '#fbcfe8',
            fontSize: '1rem',
            maxWidth: '560px',
            margin: '12px auto 0',
            lineHeight: 1.6,
            opacity: 0.85,
          }}
        >
          {wishData.subtitle || "A quiet prayer and deepest hopes for the year ahead."}
        </p>
      </div>

      {/* 4 Pillars of Wishes Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {wishData.wishes?.map((item, idx) => {
          const Icon = iconMap[item.icon] || Heart;

          return (
            <div
              key={idx}
              className="glass-panel glass-panel-hover"
              style={{
                borderRadius: '24px',
                padding: '32px 24px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.25), rgba(192, 132, 252, 0.2))',
                  border: '1px solid rgba(244, 114, 182, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f472b6',
                }}
              >
                <Icon size={22} />
              </div>

              <h3
                className="font-serif-romantic"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  lineHeight: 1.3,
                }}
              >
                {item.heading}
              </h3>

              <p
                style={{
                  fontSize: '0.925rem',
                  lineHeight: 1.65,
                  color: '#fce7f3',
                  opacity: 0.9,
                }}
              >
                {item.text}
              </p>
            </div>
          );
        })}
      </div>

      {/* Warm Closing Note */}
      <div
        className="glass-panel"
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          borderRadius: '20px',
          padding: '24px 32px',
          border: '1px solid rgba(244, 114, 182, 0.3)',
        }}
      >
        <p
          className="font-handwriting"
          style={{
            fontSize: 'clamp(1.35rem, 3.5vw, 1.7rem)',
            color: '#fbcfe8',
            lineHeight: 1.4,
          }}
        >
          "{wishData.closingMessage}"
        </p>
      </div>
    </section>
  );
}
