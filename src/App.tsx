import { Hero, Philosophy, Features, PanoramaView, Pricing, Booking } from "./components/Sections";

export default function App() {
  return (
    <main className="min-h-screen bg-sea-950">
      <Hero />
      <Philosophy />
      <Features />
      <PanoramaView />
      <Pricing />
      <Booking />
    </main>
  );
}
