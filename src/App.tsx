import { Route, Routes } from 'react-router-dom'
import { HomePage } from './assets/pages/HomePage'
import { FavoritesPage } from './assets/pages/FavoritesPage'
import { Navigation } from './assets/components/Navigation'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  )
}

export default App
