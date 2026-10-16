import React, { useState } from 'react';
import { Camera, ZoomIn, Heart, Sparkles, Filter } from 'lucide-react';
import { audioManager } from '../utils/audioManager';

export default function MemoriesGallery({ memoriesData, onOpenPhoto }) {
  const [selectedTag, setSelectedTag] = useState('All');
  const photos = memoriesData?.photos || [];

  // Extract unique tags
  const tags = ['All', ...new Set(photos.map((p) => p.tag).filter(Boolean))];

  const filteredPhotos = selectedTag === 'All'
    ? photos
    : photos.filter((p) => p.tag === selectedTag);

  const handleCardClick = (photo) => {
    audioManager.playChime();
    const originalIndex = photos.findIndex((p) => p.id === photo.id);
    onOpenPhoto(photos, originalIndex !== -1 ? originalIndex : 0);
  };

  return (
    <section
      id="photo-memories"
      style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1240px',
        margin: '90px auto',
        padding: '0 24px',
        textAlign: 'center',
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '40px' }}>
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
            color: '#f472b6',
            marginBottom: '12px',
          }}
        >
          <Camera size={14} />
          Surprise Four 📸
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
          {memoriesData.title || "Every Picture Has Its Own Little Story ♡"}
        </h2>
        <p
          style={{
            color: '#fbcfe8',
            fontSize: '1rem',
            maxWidth: '580px',
            margin: '12px auto 0',
            lineHeight: 1.6,
            opacity: 0.85,
          }}
        >
          {memoriesData.subtitle || "A visual timeline of sweet moments, quiet smiles, and beautiful chapters."}
        </p>
      </div>

      {/* Filter Tabs if multiple tags */}
      {tags.length > 2 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '36px',
          }}
        >
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={selectedTag === tag ? 'btn-magical' : 'btn-secondary'}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Polaroid Gallery Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          alignItems: 'start',
        }}
      >
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id || index}
            onClick={() => handleCardClick(photo)}
            className="polaroid-card"
            style={{
              position: 'relative',
              borderRadius: '14px',
              cursor: 'pointer',
              transform: `rotate(${photo.rotation || '0deg'})`,
              border: '1px solid rgba(244, 114, 182, 0.2)',
            }}
          >
            {/* Washi Tape */}
            <div className="washi-tape" />

            {/* Photo Image Frame */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '1/1',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#1b0922',
              }}
            >
              <img
                src={photo.src}
                alt={photo.title || 'Memory photo'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
              />

              {/* Tag in corner */}
              {photo.tag && (
                <span
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontSize: '11px',
                    fontWeight: 700,
                    background: 'rgba(244, 63, 94, 0.85)',
                    color: '#ffffff',
                    letterSpacing: '0.5px',
                  }}
                >
                  {photo.tag}
                </span>
              )}

              {/* Hover overlay hint */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
              >
                <div
                  style={{
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(4px)',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <ZoomIn size={14} /> Fullscreen
                </div>
              </div>
            </div>

            {/* Polaroid Bottom Notes */}
            <div style={{ marginTop: '14px', textAlign: 'left', padding: '0 4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4
                  className="font-serif-romantic"
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#1a0822',
                  }}
                >
                  {photo.title}
                </h4>
                {photo.date && (
                  <span style={{ fontSize: '12px', color: '#be185d', fontWeight: 600 }}>
                    {photo.date}
                  </span>
                )}
              </div>

              <p
                className="font-handwriting"
                style={{
                  fontSize: '1.15rem',
                  color: '#4c0519',
                  lineHeight: 1.4,
                  marginTop: '6px',
                }}
              >
                "{photo.caption}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Instruction indicator */}
      <div
        style={{
          marginTop: '32px',
          fontSize: '13px',
          color: '#fda4af',
          opacity: 0.85,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
        }}
      >
        <Sparkles size={14} />
        {memoriesData.instruction || "Click any Polaroid to view in fullscreen gallery with heart reactions"}
      </div>
    </section>
  );
}
