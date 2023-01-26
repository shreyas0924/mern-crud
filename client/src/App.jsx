import { useEffect, useState, useId } from 'react'

import './App.css'

function App() {
  const id = useId()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [studentData, setStudentData] = useState([])

  async function registerUser(event) {
    event.preventDefault()
    const response = await fetch('http://localhost:3000/post', {
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

  useEffect(() => {
    async function getData() {
      const res = await fetch('http://localhost:3000/read', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setStudentData(data)
    }
    getData()
  }, [name, email])

  return (
    <div className='App'>
      <h2>Student Details </h2>
      <form onSubmit={registerUser} className='h-5 mt-5'>
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

      <div className=' w-[50%] ml-auto mr-auto'>
        <div className='flex justify-between border-white border-2 mt-5 '>
          <h2 className='font-bold'>Name</h2>
          <h2 className='font-bold'>Email</h2>
        </div>
        <div className='flex justify-between '>
          <div>
            {studentData.map((row) => (
              <tr>{row.name}</tr>
            ))}
          </div>
          <div>
            {studentData.map((row) => (
              <div className='flex justify-between  '>
                <tr>{row.email}</tr>

                <button>Update</button>
                <button>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
