import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Skills from "../components/Skills/Skills";
import Project from "../components/Project/Project";
import Contact from "../components/Contact/Contact";

const MainPage = () => {
    return (
        <main>
            <Hero />
            <About />
            <Skills />  
            <Project />
            <Contact />
        </main>
    );
}

export default MainPage;