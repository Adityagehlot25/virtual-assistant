import React, { useState, useContext } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import bg from '../assets/signup.jpg'
import { UserDataContext } from '../context/userContext.jsx'

function SignUp() {
    const { server } = useContext(UserDataContext)
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${server}/api/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: username, email, password })

            })

            const data = await response.json()

            if (response.ok) {
                console.log('User registered successfully:', data)
            } else {
                console.error('Error registering user:', data)
            }
        } catch (error) {
            console.error('Network or server error:', error)
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
                    Register to <span className='text-blue-500'>Virtual Assistant</span>
                </h1>

                <input
                    type="text"
                    placeholder='Username'
                    className='w-full p-3 rounded-lg border border-gray-300 bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />

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

                <button
                    type="submit"
                    className='w-full p-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600'
                >
                    Register
                </button>

                <p className="text-gray-300 text-md mt-3">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    )
}

export default SignUp
