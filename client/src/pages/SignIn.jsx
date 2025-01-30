import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

function SignIn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({})
    const { loading, error } = useSelector((state) => state.user)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart())
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();


            if (data.success === false) {
                dispatch(signInFailure(data.error))
                return
            }
            dispatch(signInSuccess(data))
            navigate('/');
        } catch (error) {
            console.log(error)
        }

    };
    return (
        <div className='p-3 max-w-lg mx-auto mt-35'>
            <h1 className='text-3xl text-center font-semibold my-7'>SignIn</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type="email" placeholder='email'
                    id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
                <input type="password" placeholder='password'
                    id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
                <button disabled={loading} className='bg-black text-white p-3 rounded-lg uppercase hover:opacity-80' >
                    {loading ? 'Loading.....' : 'Sign In'}
                </button>

            </form>
            <div className='flex gap-2 mt-5 justify-center items-center'>
                <p>Dont have an account?</p>
                <span onClick={() => navigate('/sign-up')} className='text-blue-500 cursor-pointer'>Sign up</span>
            </div>
            <p className="text-red-700">
                {error && typeof error === 'string' && error}
            </p>



        </div>
    )
}

export default SignIn