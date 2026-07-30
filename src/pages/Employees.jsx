import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from 'react-router-dom'

export default function Employees() {

    const [employees, setEmployees] = useState([])
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || ''
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:8000/api/employees')
            .then(res =>{console.log(res.data), setEmployees(res.data) })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [])

    const filtered = employees.filter(employee =>
        employee.name.toLowerCase().includes(query.toLowerCase()) ||
        employee.last_name.toLowerCase().includes(query.toLowerCase()) ||
        employee.email.toLowerCase().includes(query.toLowerCase()) ||
        employee.department.name.toLowerCase().includes(query.toLowerCase())
    );

    if (loading) {
        return (
            <div className="container mt-4 text-center">
                <div className="spinner-border" role="status"></div>
                <p className="mt-2">Caricamento dei Dipendenti...</p>
            </div>
        )
    }

    return (
        <div className="container mt-4 mb-5">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Cognome</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Dipartimento</th>
                        <th scope="col">Mail</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.last_name}</td>
                            <td>{employee.name}</td>
                            <td>{employee.department.name}</td>
                            <td>{employee.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
