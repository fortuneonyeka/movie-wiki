import React from 'react'
import RatedMovies from '../movies/RatedMovies';

const Main = ({children}) => {
  return (
    <main className='main'>
      {children}
      <RatedMovies />
      
    </main>
  )
}

export default Main
