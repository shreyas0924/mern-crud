import { useEffect, useState, useId } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const id = useId()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [studentData, setStudentData] = useState([])

  function registerUser(event) {
    event.preventDefault()
    fetch('http://localhost:3000/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
      .then((response) => response.json())
      .then(() =>
        setStudentData([...studentData, { name: name, email: email }])
      )
    setName('')
    setEmail('')
  }
  useEffect(() => {
    function getData() {
      fetch('http://localhost:3000/read', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => setStudentData(data))
    }
    getData()
  }, [])

  // function updateName(id) {
  //   const newName = prompt('Enter new name : ')
  //   axios
  //     .put('http://localhost:3000/update', {
  //       newName: newName,
  //       id: id,
  //     })
  //     .then(() =>
  //       setStudentData(
  //         studentData.map((val) => {
  //           return val._id == id
  //             ? { _id: id, name: newName, email: val.email }
  //             : val
  //         })
  //       )
  //     )
  // }

  function deleteStudent(id) {
    axios.delete(`http://localhost:3000/delete/${id}`).then(() =>
      setStudentData(
        studentData.filter((value) => {
          return value._id != id
        })
      )
    )
  }

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
          <h2 className='font-bold mr-[30%]'>Email</h2>
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

                <button
                  className='ml-5 mr-5'
                  onClick={() => updateName(row._id)}
                >
                  Update
                </button>
                <button onClick={() => deleteStudent(row._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
