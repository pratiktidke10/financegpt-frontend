
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const sendMessage = async (message , conversationId) => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${BASE_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ message, conversationId })
  })


  if (response.status === 403) {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  window.location.href = '/login'
  return
}

  if (!response.ok) {
    throw new Error('Failed to send message')
  }

 const data = await response.json()
 return data.response
}


export const fetchHistory = async () => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${BASE_URL}/api/history`,{
    method : 'GET',
    headers : {
      'Authorization' : `Bearer ${token}`
    }
  })

  if (response.status === 403) {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  window.location.href = '/login'
  return
}

  if(!response.ok){
    throw new Error('Failed to fetch the history')
  }

  const data = await response.json()
  return data 
}


export const fetchConversationDetails = async(conversationId) => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${BASE_URL}/api/history/${conversationId}`,{
    method : 'GET',
    headers : {
      'Authorization' : `Bearer ${token}`
    }
  })

  if(response.status === 403){
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    window.location.href = '/login'
    return
  }

  if(!response.ok){
    throw new Error('Failed to fetch conversation details')
  }

  return await response.json()
}

export const deleteConversation = async(conversationId) => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${BASE_URL}/api/history/${conversationId}` , {
    method : 'DELETE',
    headers : {
      'Authorization' : `Bearer ${token}`
    }
  })

  if(!response.ok){
    throw new Error('Failed to delete conversation')
  }

  return true
}