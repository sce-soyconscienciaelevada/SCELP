import type { Metadata } from 'next';
import { Suspense } from 'react';
import BgCanvas from '../components/BgCanvas';
import Nav from '../components/Nav';
import AssessmentClient from './AssessmentClient';

export const metadata: Metadata = {
  title: 'Evaluación de Identidad — Soy Consciencia Elevada',
  description: 'Completa tu evaluación para recibir tu análisis personalizado.',
  robots: { index: false, follow: false },
};

export default function AssessmentPage() {
  return (
    <>
      <BgCanvas />
      <Nav />
      <Suspense fallback={null}>
        <AssessmentClient />
      </Suspense>
    </>
  );
}
