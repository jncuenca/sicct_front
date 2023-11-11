import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Header, Layout } from './sections'

const Home = () => (
  <div>
    <h1>Home</h1>
    <p>This is the home page content.</p>
  </div>
);

const About = () => (
  <div>
    <h1>About</h1>
    <p>This is the about page content.</p>
  </div>
);

const App = () => {
  return (
    <div className="app">
      <Header />
      <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Layout>
      </Router>
    </div>
  )
}

export default App
