import React from 'react';
import Display from '@/components/Display';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center w-full h-full">
      <Display />
      <Footer />
    </main>
  );
}

