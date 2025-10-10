import React from 'react'
import Container from './components/Container'
import Tranding from './components/Tranding';
import Shorts from './components/Shorts';
import Videos from './components/Videos';

function Home() {
  return (
    <Container>
      <div className='h-full w-full p-15 bg-[#0B031C]'>
        <div>
          <Tranding />
        </div>
        <div>
          <Shorts />
        </div>
        <div>
          <Videos />
        </div>
      </div>
    </Container>
  )
}

export default Home;