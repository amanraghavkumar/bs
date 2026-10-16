import React, { useState } from 'react';
import { birthdayData } from './config/birthdayData';
import BackgroundEffects from './components/BackgroundEffects';
import MusicPlayer from './components/MusicPlayer';
import WelcomeScreen from './components/WelcomeScreen';
import HeroSection from './components/HeroSection';
import LetterSurprise from './components/LetterSurprise';
import SpecialThingsSurprise from './components/SpecialThingsSurprise';
import CakeSurprise from './components/CakeSurprise';
import MemoriesGallery from './components/MemoriesGallery';
import GiftSurprise from './components/GiftSurprise';
import WishForYouSection from './components/WishForYouSection';
import PhotoLightbox from './components/PhotoLightbox';
import Footer from './components/Footer';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    photos: [],
    currentIndex: 0,
  });

  const handleOpenWorld = () => {
    setHasEntered(true);
  };

  const handleReplay = () => {
    setHasEntered(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPhoto = (photosList, index) => {
    setLightboxState({
      isOpen: true,
      photos: photosList,
      currentIndex: index,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleNavigateLightbox = (nextIndex) => {
    setLightboxState((prev) => ({ ...prev, currentIndex: nextIndex }));
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      {/* Dynamic Background Effects: Petals, Sparkles, and Floating Bokeh */}
      <BackgroundEffects />

      {/* Floating Music Controller */}
      <MusicPlayer config={birthdayData.music} />

      {/* Fullscreen Welcome Curtain Modal */}
      {!hasEntered && (
        <WelcomeScreen
          config={birthdayData.welcome}
          onOpenWorld={handleOpenWorld}
        />
      )}

      {/* Main Experience (Visible when entered or animated in) */}
      <main
        style={{
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: hasEntered ? 'auto' : 'none',
        }}
      >
        {/* Section 1: Hero Section (Photos on Left, Story on Right) */}
        <HeroSection
          heroData={birthdayData.hero}
          recipient={birthdayData.recipient}
          onOpenPhoto={handleOpenPhoto}
        />

        {/* Section 2: Surprise One - Personal Letter */}
        <LetterSurprise
          letterData={birthdayData.letter}
          recipient={birthdayData.recipient}
        />

        {/* Section 3: Surprise Two - Little Things That Make You Special */}
        <SpecialThingsSurprise
          specialThingsData={birthdayData.specialThings}
        />

        {/* Section 4: Surprise Three - The Birthday Cake */}
        <CakeSurprise
          cakeData={birthdayData.cake}
          recipient={birthdayData.recipient}
        />

        {/* Section 5: Surprise Four - Her Photo Memories */}
        <MemoriesGallery
          memoriesData={birthdayData.memories}
          onOpenPhoto={handleOpenPhoto}
        />

        {/* Section 6: Surprise Five - The Hidden Gift */}
        <GiftSurprise
          giftData={birthdayData.gift}
          recipient={birthdayData.recipient}
        />

        {/* Section 7: Surprise Six - Personal Message & Wish */}
        <WishForYouSection
          wishData={birthdayData.wishForYou}
          recipient={birthdayData.recipient}
        />

        {/* Footer & Signature */}
        <Footer
          recipient={birthdayData.recipient}
          onReplay={handleReplay}
        />
      </main>

      {/* Fullscreen Lightbox Modal */}
      {lightboxState.isOpen && (
        <PhotoLightbox
          photos={lightboxState.photos}
          currentIndex={lightboxState.currentIndex}
          onClose={handleCloseLightbox}
          onNavigate={handleNavigateLightbox}
        />
      )}
    </div>
  );
}
