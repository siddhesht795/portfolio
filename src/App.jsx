import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RouteScroll from './components/ui/RouteScroll'
import BackLink from './components/ui/BackLink'
import NotFound from './pages/NotFound'
import { ThemeProvider } from './context/ThemeContext'
import SmoothScroll from './components/anim/SmoothScroll'
import Navbar from './components/ui/Navbar'
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
    <main id="main-content" tabIndex={-1}>
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
    <main id="main-content" tabIndex={-1} className="blog-index-page">
      <div className="mb-8">
        <BackLink fallback="/#blog" />
      </div>
      <Blog showViewAll={false} />
    </main>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <SmoothScroll />
        <RouteScroll />
        <Navbar />
        <div className="workspace-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}
