import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

const PageNotFound = () => {
  return (
    <div className='page-not-found'>
      <div>
        <p className='num'>404</p>
        <p className='txt'>Page Not Found</p>
        <Link to='/' className='home-btn'>
          <FaHome />
          <span>Back To Home</span>
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound
