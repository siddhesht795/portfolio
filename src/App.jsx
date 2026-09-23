import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import SmoothScroll from './components/anim/SmoothScroll'
import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/ui/Navbar'
import ScrollProgress from './components/ui/ScrollProgress'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Achievements from './components/sections/Achievements'
import Resume from './components/sections/Resume'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'
import Blog from './components/sections/Blog'
import BlogPost from './pages/BlogPost'

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Blog />
      <Projects />
      <Experience />
      <Achievements />
      <Resume />
      <Contact />
    </main>
  )
}

function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-28">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-text-primary"
        >
          ← Back to Portfolio
        </Link>
      </div>
      <Blog />
    </main>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <SmoothScroll />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<BlogPost />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}
