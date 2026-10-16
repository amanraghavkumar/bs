import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music2 } from 'lucide-react';
import { audioManager } from '../utils/audioManager';

export default function MusicPlayer({ config }) {
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    isMuted: false,
    title: config?.title || "A Soft Melody for You ♡",
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    audioManager.setup(config?.audioSrc, config?.title);
    const unsubscribe = audioManager.subscribe(setAudioState);
    return () => unsubscribe();
  }, [config]);

  const handleTogglePlay = () => {
    audioManager.togglePlay();
  };

  const handleToggleMute = () => {
    audioManager.toggleMute();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <div
        className="glass-pill"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 14px',
          borderRadius: '9999px',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Animated equalizer or music icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '18px' }}>
          {audioState.isPlaying && !audioState.isMuted ? (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '16px' }}>
              <span className="eq-bar-1" style={{ width: '3px', background: '#f472b6', borderRadius: '2px' }} />
              <span className="eq-bar-2" style={{ width: '3px', background: '#fb7185', borderRadius: '2px' }} />
              <span className="eq-bar-3" style={{ width: '3px', background: '#c084fc', borderRadius: '2px' }} />
            </div>
          ) : (
            <Music2 size={16} color="#f472b6" style={{ opacity: 0.8 }} />
          )}
        </div>

        {/* Track Title (reveals on hover or small screen) */}
        <span
          style={{
            fontSize: '13px',
            fontWeight: '500',
            color: '#fce7f3',
            maxWidth: isExpanded ? '180px' : '90px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            transition: 'max-width 0.3s ease',
          }}
          title={audioState.title}
        >
          {audioState.title}
        </span>

        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          aria-label={audioState.isPlaying ? 'Pause ambient music' : 'Play ambient music'}
          style={{
            background: 'rgba(244, 114, 182, 0.25)',
            border: 'none',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(244, 114, 182, 0.45)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(244, 114, 182, 0.25)')}
        >
          {audioState.isPlaying ? <Pause size={13} fill="#fff" /> : <Play size={13} fill="#fff" style={{ marginLeft: '1px' }} />}
        </button>

        {/* Mute/Unmute Button */}
        <button
          onClick={handleToggleMute}
          aria-label={audioState.isMuted ? 'Unmute music' : 'Mute music'}
          style={{
            background: 'transparent',
            border: 'none',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fbcfe8',
            cursor: 'pointer',
            opacity: 0.85,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
        >
          {audioState.isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>
    </div>
  );
}
