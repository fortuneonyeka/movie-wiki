import React from 'react'
import ListBox from './movies/ListBox';
import RatedMovies from './movies/RatedMovies';

const Main = () => {
  return (
    <main className='main'>
       <ListBox />
       <RatedMovies />
      
    </main>
  )
}

export default Main
