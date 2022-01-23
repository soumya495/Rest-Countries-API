import { GlobalContextProvider } from './context/GlobalContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home/Home'
import Country from './components/Country'
import PageNotFound from './components/PageNotFound'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <GlobalContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/country/:countryname' element={<Country />} />
          <Route path='/notfound' element={<PageNotFound />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
        <ScrollToTop />
      </Router>
    </GlobalContextProvider>
  )
}

export default App
