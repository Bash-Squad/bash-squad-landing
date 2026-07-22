import type { Metadata } from 'next';
import BuildApp from '../build/BuildApp';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <BuildApp />;
}
