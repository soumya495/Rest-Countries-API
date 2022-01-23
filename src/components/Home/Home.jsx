import SearchCountries from './SearchCountries'
import FilterCountries from './FilterCountries'

import Container from '../../Container'
import Countries from './Countries'

const Home = () => {
  return (
    <div className='home'>
      <Container>
        <div className='user-input-container'>
          <SearchCountries />
          <FilterCountries />
        </div>
        <Countries />
      </Container>
    </div>
  )
}

export default Home
