// import ListGroup from "./components/ListGroup";
//
import Hero from "./components/Hero.tsx";
import About from "./components/About.tsx";
import Skills from "./components/Skills.tsx";
import Contact from "./components/Contact.tsx";
import Portfolio from "./components/Portfolio.tsx";
import { Button } from "./components/ui/button.tsx";
import Page from "./app/dashboard/page.tsx";

function App() {
  return (
    <div className="bg-gray-100 text-gray-800">
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
      <Button />
      <Page />
    </div>
  );
}

export default App;
