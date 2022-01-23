import { useContext, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import GlobalContext from '../../context/GlobalContext'

const SearchCountries = () => {
  const {
    getAllCountries,
    getSearchedResults,
    setInput,
    inputSelected,
    inputVal,
  } = useContext(GlobalContext)

  useEffect(() => {
    getAllCountries()
  }, [])

  const handleChange = (e) => {
    getSearchedResults(e.target.value)
    setInput(e.target.value)
  }

  return (
    <div className='input'>
      <input
        className='search-box'
        placeholder='Search for a Country...'
        value={inputSelected ? inputVal : ''}
        onChange={handleChange}
      />
      <FaSearch className='search-icon' />
    </div>
  )
}

export default SearchCountries
