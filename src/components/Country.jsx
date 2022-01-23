import { useContext, useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useParams, useNavigate } from 'react-router-dom'
import GlobalContext from '../context/GlobalContext'
import { v4 as uuidv4 } from 'uuid'

import Loader from './Loader'
import Container from '../Container'

const Country = () => {
  const { loading, getCountry, country, getName } = useContext(GlobalContext)

  const params = useParams()
  useEffect(() => {
    getCountry(params.countryname)
  }, [params.countryname])

  const navigate = useNavigate()

  function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  function addCommasArrays(arr) {
    return arr.map((a, index) => {
      if (index < arr.length - 1) return (a += ', ')
      else return a
    })
  }

  const getNativeNames = (nativeName) => {
    return Object.values(nativeName)
  }

  const getCurrencies = (currency) => {
    if (!currency) return
    return addCommasArrays(Object.values(currency).map((curr) => curr.name))
  }

  const getLanguages = (languages) => {
    if (!languages) return
    return addCommasArrays(Object.values(languages))
  }

  const getBorders = (borders) => {
    let borderEls = borders.map((border) => getName(border))
    return borderEls.map((b) => (
      <Link to={`/country/${b}`} className='border-btn' key={uuidv4()}>
        {b}
      </Link>
    ))
  }

  if (loading) {
    return (
      <div className='country'>
        <Loader />
      </div>
    )
  } else {
    return (
      <div className='country'>
        {country[0] ? (
          <Container>
            <span onClick={() => navigate(-1)} className='back-btn'>
              <FaArrowLeft />
              <span>Back</span>
            </span>
            <div className='image-container'>
              <img
                src={`${country[0].flags.svg}`}
                alt={`${country[0].name.common} flag`}
              />
            </div>
            <div className='text-container'>
              <h3 className='country-name'>{country[0].name.common}</h3>
              <div className='top'>
                <div className='left'>
                  <ul>
                    <li>
                      <strong>Native Name: </strong>
                      {getNativeNames(country[0].name.nativeName)[0]?.common
                        ? getNativeNames(country[0].name.nativeName)[0]?.common
                        : 'N/A'}
                    </li>
                    <li>
                      <strong>Population: </strong>
                      {addCommas(country[0].population)}
                    </li>
                    <li>
                      <strong>Region: </strong>
                      {country[0].region}
                    </li>
                    <li>
                      <strong>Sub Region: </strong>
                      {country[0].subregion}
                    </li>
                    <li>
                      <strong>Capital: </strong>
                      {country[0].capital ? country[0].capital : 'N/A'}
                    </li>
                  </ul>
                </div>
                <div className='right'>
                  <ul>
                    <li>
                      <strong>Top Level Domain: </strong>
                      {country[0].tld}
                    </li>
                    <li>
                      <strong>Currencies: </strong>
                      {getCurrencies(country[0].currencies)
                        ? getCurrencies(country[0].currencies)
                        : 'N/A'}
                    </li>
                    <li>
                      <strong>Languages: </strong>
                      {getLanguages(country[0].languages)}
                    </li>
                  </ul>
                </div>
              </div>
              <div className='bottom'>
                <strong>Border Countries: </strong>
                <span className='button-container'>
                  {country[0].borders ? getBorders(country[0].borders) : 'N/A'}
                </span>
              </div>
            </div>
          </Container>
        ) : (
          <strong>Not Found</strong>
        )}
      </div>
    )
  }
}

export default Country
