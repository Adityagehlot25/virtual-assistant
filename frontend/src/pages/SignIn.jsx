import React, { useState, useContext } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import bg from '../assets/signup.jpg'
import { UserDataContext } from '../context/userContext.jsx'

function SignIn() {
    const { server } = useContext(UserDataContext)
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch(`${server}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password })

            })

            const data = await response.json()

            if (response.ok) {
                console.log('User logged in successfully:', data)
                setErrorMessage('') 
                setLoading(false)
            } else {
                console.error('Error logging in user:', data)
                setErrorMessage(data.message || 'An error occurred. Please try again.')
                setLoading(false)
            }
        } catch (error) {
            console.error('Network or server error:', error)
           setErrorMessage(data.message || 'An error occurred. Please try again.')
            setLoading(false)
        }
    }

    return (
        <div
            className="h-screen w-screen flex items-center justify-center bg-gray-200 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <form
                onSubmit={handleSubmit}
                className="w-[90%] h-[600px] max-w-[500px] bg-slate-600/20 backdrop-blur-md p-8 rounded-lg shadow-lg flex flex-col justify-center items-center gap-[20px]"
            >
                <h1 className='text-white text-[30px] font-bold mb-[20px]'>
                    Sign In to <span className='text-blue-500'>Virtual Assistant</span>
                </h1>


                <input
                    type="email"
                    placeholder='Email'
                    className='w-full p-3 rounded-lg border border-gray-300 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <div className="w-full relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder='Password'
                        className='w-full p-3 rounded-lg border border-gray-300 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-300 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                    </span>
                </div>

                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                <button
                    type="submit"
                    className='w-full p-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600' disabled={loading}
                >
                    {loading ? 'Loading...' : 'Login'}
                </button>

                <p className="text-gray-300 text-md mt-3">
                    Want to create an account?{" "}
                    <a href="/signup" className="text-blue-600 hover:underline">
                        Sign Up
                    </a>
                </p>
            </form>
        </div>
    )
}

export default SignIn
