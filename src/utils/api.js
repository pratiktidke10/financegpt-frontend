const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const getHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  }
}

const handleUnauthorized = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  if (window.location.pathname !== '/login') {
    window.location.href = '/login'
  }
}

export const sendMessage = async (message, conversationId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ message, conversationId })
    })

    if (response.status === 401) {
      handleUnauthorized()
      return null
    }

    if (!response.ok) {
      throw new Error(`Server returned status: ${response.status}`)
    }

    const data = await response.json()
    return data.response
  } catch (error) {
    console.error('sendMessage failed:', error)
    throw error
  }
}

export const fetchHistory = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/history`, {
      method: 'GET',
      headers: getHeaders()
    })

    if (response.status === 401) {
      handleUnauthorized()
      return []
    }

    if (!response.ok) return []
    return await response.json()
  } catch (e) {
    console.error('History fetch failed silently:', e)
    return []
  }
}

export const fetchConversationDetails = async (conversationId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/history/${conversationId}`, {
      method: 'GET',
      headers: getHeaders()
    })

    if (response.status === 401) {
      handleUnauthorized()
      return []
    }

    if (!response.ok) {
      throw new Error('Failed to fetch conversation details')
    }

    return await response.json()
  } catch (error) {
    console.error('fetchConversationDetails failed:', error)
    throw error
  }
}

export const deleteConversation = async (conversationId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/history/${conversationId}`, {
      method: 'DELETE',
      headers: getHeaders()
    })

    if (response.status === 401) {
      handleUnauthorized()
      return false
    }

    return response.ok
  } catch (error) {
    console.error('deleteConversation failed:', error)
    return false
  }
}