import { useContext } from 'react'
import { FaMoon, FaRegMoon } from 'react-icons/fa'
import GlobalContext from '../context/GlobalContext'

import Container from '../Container'

const Header = () => {
  const { theme, toggleTheme } = useContext(GlobalContext)
  return (
    <header>
      <Container>
        <h1>Where in the world?</h1>
        <div className='theme-toggle-container' onClick={toggleTheme}>
          <span className='icon'>
            {theme === 'dark-theme' ? <FaMoon /> : <FaRegMoon />}
          </span>
          <span className='theme'>
            {theme === 'dark-theme' ? 'Dark Mode' : 'Light Mode'}
          </span>
        </div>
      </Container>
    </header>
  )
}

export default Header
