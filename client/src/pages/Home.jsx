import React from 'react'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

function Home() {
    const { currentUser } = useSelector((state) => state.user)
    return (
        <>
            <Header />
            <div className="mt-40">
                <div className="flex flex-col gap-2 items-center px-4 sm:px-8 md:px-16 lg:px-32">
                    <p className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-black font-extrabold p-3 text-center">
                        Welcome
                    </p>
                    {currentUser ? (
                        <>
                            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-extrabold p-2 text-center">
                                {currentUser?.username}
                            </p>
                            <p className="bg-clip-text text-black text-base sm:text-xl md:text-2xl lg:text-3xl text-center">
                                {currentUser?.email}
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="w-32 sm:w-40 md:w-52 lg:w-64 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                                Loading....
                            </h1>
                        </>
                    )}
                </div>
            </div>

        </>
    )
}

export default Home