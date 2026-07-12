const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const sendMessage = async (message) => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${BASE_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ message })
  })


  if (!response.ok) {
    throw new Error('Failed to send message')
  }

  const data = await response.json()
  return data.response
}