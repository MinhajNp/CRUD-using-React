import React from 'react'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

function Home() {
    const {currentUser} = useSelector((state)=> state.user)
  return (
    <>
    <Header/>
    <div className='mt-40'>
    <div className='flex flex-col gap-2 items-center'>
        <p className='text-9xl text-black font-extrabold p-3'>Welcome</p>
          {currentUser &&
            <>
              <p className='text-4xl text-black font-extrabold p-2'>{currentUser?.username}</p>
              <p className='bg-clip-text text-black text-xl'>{currentUser?.email}</p>
            </>
          }
          {!currentUser &&
            <>
              <h1 className='w-10'>Loading....</h1>
            </>
          }
        </div>
        </div>
    </>
  )
}

export default Home