import ReactLenis from 'lenis/react';
import Header from './components/header/Header.tsx';
import Hero from './components/hero/Hero.tsx';
import ProjectsStack from './components/projectsStack/ProjectsStack.tsx';
import About from './components/about/About.tsx';
import Skills from './components/skills/Skills.tsx';
import Contact from './components/contact/Contact.tsx';
import Footer from './components/footer/Footer.tsx';
import BlobBackground from './ui/BlobBackground.tsx';

function App() {
    return (
        <ReactLenis root>
            <BlobBackground/>
            <Header/>
            <main>
                <section id="home" className="min-h-screen">
                    <Hero/>
                </section>

                <section id="projects" className="min-h-screen flex justify-center items-center flex-col">
                    <ProjectsStack/>
                </section>

                <section id="about" className="min-h-screen">
                    <About/>
                </section>

                <section id="skills" className="min-h-screen">
                    <Skills/>
                </section>

                <section id="contact">
                    <Contact/>
                </section>
            </main>
            <Footer/>
        </ReactLenis>
    );
}

export default App;