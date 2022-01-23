import { Link } from 'react-router-dom'

// to add commas to population
function addCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const CountryCard = ({ country }) => {
  const { flags, name, population, region, capital } = country
  return (
    <Link to={`/country/${country.name.common}`} className='country-card'>
      <img src={flags.svg} alt='flag' />
      <ul>
        <li className='name'>
          <h3>{name.common}</h3>
        </li>
        <li>
          <span className='bold'>Population:</span>{' '}
          {population && addCommas(population)}
        </li>
        <li>
          <span className='bold'>Region:</span> {region}
        </li>
        <li>
          <span className='bold'>Capital:</span> {capital ? capital : 'N/A'}
        </li>
      </ul>
    </Link>
  )
}

export default CountryCard
