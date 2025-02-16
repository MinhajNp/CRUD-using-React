import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({})
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            setError(false)
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data)
            setLoading(false);

            if (data.success === false) {
                setError(true)
                return
            }
            navigate('/sign-in')
        } catch (error) {
            setLoading(false);
            setError(true);
        }

    };
    return (
        <div className='p-3 max-w-lg mx-auto mt-35'>
            <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type="text" placeholder='Username'
                    id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
                <input type="email" placeholder='email'
                    id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
                <input type="password" placeholder='password'
                    id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
                <button disabled={loading} className='bg-black text-white p-3 rounded-lg uppercase hover:opacity-80' >
                    {loading ? 'Loading.....' : 'Sign up'}
                </button>

            </form>
            <div className='flex gap-2 mt-5 justify-center items-center'>
                <p>Have an account?</p>
                <span onClick={() => navigate('/sign-in')} className='text-blue-500 cursor-pointer'>Sign in</span>
            </div>
            <p className='text-red-700' >{error && 'Something went wrong!'}</p>
        </div>
    )
}

export default SignUp