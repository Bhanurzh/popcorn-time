import HeroSection from "./components/Hero";
import FeaturedMovie from "./components/FeaturedMovie";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="h-full bg-dark-primary">
      <Navbar />
      <HeroSection />
      <FeaturedMovie />
    </main>
  );
}

export default App;
