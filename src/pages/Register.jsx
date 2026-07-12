import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleRegister = async () => {
    if (!username || !email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      })

      const data = await response.json()

      if (data.token) {
        login(data.token, data.username)
        navigate('/')
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleRegister()
  }

  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center' data-theme='dark'>
      <div className='card w-96 bg-base-200 shadow-xl'>
        <div className='card-body'>

          {/* Header */}
          <div className='text-center mb-4'>
            <h1 className='text-3xl font-bold text-primary'>FinanceGPT</h1>
            <p className='text-base-content/60 text-sm mt-1'>Your AI Financial Assistant</p>
          </div>

          <h2 className='card-title justify-center text-xl mb-2'>Create Account</h2>

          {/* Error */}
          {error && (
            <div className='alert alert-error py-2'>
              <span className='text-sm'>{error}</span>
            </div>
          )}

          {/* Form */}
          <div className='form-control gap-3'>
            <input
              type='text'
              placeholder='Username'
              className='input input-bordered w-full'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input
              type='email'
              placeholder='Email'
              className='input input-bordered w-full'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <input
              type='password'
              placeholder='Password (min 6 characters)'
              className='input input-bordered w-full'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Button */}
          <div className='card-actions mt-4'>
            <button
              className='btn btn-primary w-full'
              onClick={handleRegister}
              disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : 'Create Account'}
            </button>
          </div>

          {/* Login link */}
          <p className='text-center text-sm text-base-content/60 mt-2'>
            Already have an account?{' '}
            <Link to='/login' className='text-primary hover:underline'>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register