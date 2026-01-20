import './App.css'
import CollectionPage from './pages/collection/CollectionPage'

function App() {
  return <CollectionPage />
}

export default App

/*
Since the application currently renders a single page, routing was avoided to keep
the implementation simple and prevent overengineering. 

However, because the project is designed for expansion, introducing React Router with a shared layout (e.g. a
navbar) would be a natural next step to support additional pages such as Home,
Collection, and Reports.

Example:

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import CollectionPage from './pages/collection/CollectionPage'
import Reports from './pages/reports/Reports'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
*/
