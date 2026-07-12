import { Children, createContext, useContext, useState , useEffect} from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // On app load, check if user is already logged in
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('username')

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(storedUser)
    }

    setLoading(false)
  }, [])

  const login = (token, username) => {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    setToken(token)
    setUser(username)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)