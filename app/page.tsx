import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { AICapabilities } from '@/components/AICapabilities';
import { SelectedWork } from '@/components/SelectedWork';
import { AISystems } from '@/components/AISystems';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-magenta focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to work
      </a>
      <Header />
      <main>
        <Hero />
        <AICapabilities />
        <SelectedWork />
        <AISystems />
      </main>
      <Footer />
    </>
  );
}
