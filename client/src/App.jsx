import { useState } from 'react'

import './App.css'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  async function registerUser(event) {
    event.preventDefault()
    const response = await fetch('http://localhost:3000/api/details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })

    const data = await response.json()
    console.log(data)
    setName('')
    setEmail('')
  }
  return (
    <div className='App'>
      <h1>Student Details </h1>
      <form onSubmit={registerUser}>
        <input
          type='text'
          value={name}
          placeholder='Name'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='email'
          value={email}
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />

        <input type='submit' value='Submit' />
      </form>
    </div>
  )
}

export default App
