import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import GlobalContext from '../../context/GlobalContext'

import Loader from '../Loader'
import CountryCard from './CountryCard'
import NotFound from './NotFound'

const Countries = () => {
  const { countries, loading, notFound } = useContext(GlobalContext)

  if (loading) {
    return (
      <div className='page-container'>
        <Loader />
      </div>
    )
  } else {
    if (notFound)
      return (
        <div className='page-container'>
          <NotFound />
        </div>
      )
    return (
      <div className='countries'>
        {countries.map((country) => (
          <CountryCard key={uuidv4()} country={country} />
        ))}
      </div>
    )
  }
}

export default Countries
