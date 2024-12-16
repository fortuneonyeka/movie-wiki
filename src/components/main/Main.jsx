import React from 'react'
import ListBox from '../movies/ListBox';
import RatedMovies from '../movies/RatedMovies';

const Main = ({children}) => {
  return (
    <main className='main'>
      {children}
      
    </main>
  )
}

export default Main
