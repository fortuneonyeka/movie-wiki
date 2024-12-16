import React from 'react'
import ListBox from '../movies/ListBox';
import RatedMovies from '../movies/RatedMovies';

const Main = ({movies}) => {
  return (
    <main className='main'>
       <ListBox movies={movies}/>
       <RatedMovies />
      
    </main>
  )
}

export default Main
