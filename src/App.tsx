import HeroSection         from './components/sections/HeroSection';
import GallerySection      from './components/sections/GallerySection';
import PixelSection        from './components/sections/PixelSection';
import MusicSection        from './components/sections/MusicSection';
import TimelineSection     from './components/sections/TimelineSection';
import DeclarationsSection from './components/sections/DeclarationsSection';
import SectionDots         from './components/navigation/SectionDots';

export default function App() {
  return (
    <>
      <SectionDots />
      <HeroSection />
      <GallerySection />
      <PixelSection />
      <MusicSection />
      <TimelineSection />
      <DeclarationsSection />
    </>
  );
}
