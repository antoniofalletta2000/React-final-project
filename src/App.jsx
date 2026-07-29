import { useState, useEffect } from 'react'
import axios from 'axios';


function App() {

const[employees, setEmployees] = useState([])

useEffect(()=> {

  axios.get('http://127.0.0.1:8000/api/employees')
  .then(res => setEmployees(res.data))
  .catch(err => console.error(err));

}, [])

  

  return (
    <>
      <button className='btn btn-primary'>Funziona</button>
      {employees.map(employee=> (

        <p key={employee.id}>{employee.name}</p>

        )
      )}
    </>
  )
}

export default App
