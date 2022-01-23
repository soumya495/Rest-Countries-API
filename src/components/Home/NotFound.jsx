import React from 'react'

const NotFound = () => {
  return (
    <div className='error'>
      <h2>Sorry, no results were found!</h2>
      <p>
        <strong>Search Suggestions: </strong>
      </p>
      <ul>
        <li>Check Your Spelling</li>
        <li>Enter correct Country name</li>
        <li>Don't include any numbers</li>
      </ul>
    </div>
  )
}

export default NotFound
