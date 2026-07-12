import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (data.token) {
        login(data.token, data.username)
        navigate('/')
      } else {
        setError(data.message || 'Login failed')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin()
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

          <h2 className='card-title justify-center text-xl mb-2'>Welcome Back!</h2>

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
              type='password'
              placeholder='Password'
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
              onClick={handleLogin}
              disabled={loading}>
              {loading ? <span className='loading loading-spinner'></span> : 'Login'}
            </button>
          </div>

          {/* Register link */}
          <p className='text-center text-sm text-base-content/60 mt-2'>
            Don't have an account?{' '}
            <Link to='/register' className='text-primary hover:underline'>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login