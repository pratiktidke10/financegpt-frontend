import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { MdPerson, MdEmail, MdLock } from 'react-icons/md'

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
    <div className='min-h-screen flex items-center justify-center' data-theme='financegpt'>

      {/* Background decoration */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl'></div>
      </div>

      <div className='w-full max-w-md px-4 relative z-10'>

        {/* Logo */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4'>
            <img src='/logo.svg' alt='FinanceGPT' className='w-10 h-10' />
          </div>
          <h1 className='text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
            FinanceGPT
          </h1>
          <p className='text-base-content/40 text-sm mt-1'>Your AI Financial Assistant</p>
        </div>

        {/* Card */}
        <div className='bg-base-200 border border-base-300 rounded-2xl p-8'>
          <h2 className='text-xl font-semibold text-base-content mb-6'>Create account</h2>

          {error && (
            <div className='bg-error/10 border border-error/20 text-error text-sm rounded-xl px-4 py-3 mb-4'>
              {error}
            </div>
          )}

          <div className='space-y-4'>
            <div>
              <label className='text-xs text-base-content/50 font-medium uppercase tracking-wide mb-1.5 block'>Username</label>
              <div className='relative'>
                <MdPerson className='absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30' size={18} />
                <input
                  type='text'
                  placeholder='Choose a username'
                  className='w-full bg-base-300 border border-base-300 focus:border-primary/50 focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-base-content placeholder:text-base-content/30 transition-colors'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div>
              <label className='text-xs text-base-content/50 font-medium uppercase tracking-wide mb-1.5 block'>Email</label>
              <div className='relative'>
                <MdEmail className='absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30' size={18} />
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='w-full bg-base-300 border border-base-300 focus:border-primary/50 focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-base-content placeholder:text-base-content/30 transition-colors'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div>
              <label className='text-xs text-base-content/50 font-medium uppercase tracking-wide mb-1.5 block'>Password</label>
              <div className='relative'>
                <MdLock className='absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30' size={18} />
                <input
                  type='password'
                  placeholder='Min 6 characters'
                  className='w-full bg-base-300 border border-base-300 focus:border-primary/50 focus:outline-none rounded-xl pl-10 pr-4 py-3 text-sm text-base-content placeholder:text-base-content/30 transition-colors'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          </div>

          <button
            className='w-full bg-primary hover:bg-primary/90 text-primary-content font-medium rounded-xl py-3 mt-6 transition-colors text-sm disabled:opacity-50'
            onClick={handleRegister}
            disabled={loading}>
            {loading ? <span className='loading loading-spinner loading-sm'></span> : 'Create account'}
          </button>

          <p className='text-center text-sm text-base-content/40 mt-4'>
            Already have an account?{' '}
            <Link to='/login' className='text-primary hover:text-accent transition-colors'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register