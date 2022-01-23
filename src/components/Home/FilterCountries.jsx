import { useContext } from 'react'
import { FaAngleDown } from 'react-icons/fa'

import GlobalContext from '../../context/GlobalContext'

const FilterCountries = () => {
  const { getFilteredResults, setFilter, filterSelected, filterVal } =
    useContext(GlobalContext)

  const handleChange = (e) => {
    getFilteredResults(e.target.value)
    setFilter(e.target.value)
  }

  return (
    <div className='select'>
      <select value={filterSelected ? filterVal : ''} onChange={handleChange}>
        <option value='' disabled>
          Filter by Region
        </option>
        <option value='Africa'>Africa</option>
        <option value='Americas'>America</option>
        <option value='Asia'>Asia</option>
        <option value='Europe'>Europe</option>
        <option value='Oceania'>Oceania</option>
      </select>
      <FaAngleDown className='down-arrow' />
    </div>
  )
}

export default FilterCountries
