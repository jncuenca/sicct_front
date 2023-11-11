import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Header, Layout } from './sections'
import { Home } from './components'

const MiCuenta = () => (
  <div>
    <h1>Mi cuenta</h1>
    <p>This is the account page content.</p>
  </div>
);

const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mi-cuenta" element={<MiCuenta />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  )
}

export default App
