import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"

export default function Employees() {

    const [employees, setEmployees] = useState([])
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [orderLastName, setOrderLastName] = useState('cognome')

    useEffect(() => {
        axios.get('http://localhost:8000/api/employees')
            .then(res =>{console.log(res.data), setEmployees(res.data) })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [])

    let filtered = employees.filter(employee =>
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

    if (orderLastName === 'asc') {
        filtered = [...filtered].sort((a, b) => a.last_name.localeCompare(b.last_name));
    } else if (orderLastName === 'desc') {
        filtered = [...filtered].sort((a, b) => b.last_name.localeCompare(a.last_name));
    }

    

    return (
        <div className="container mt-4 mb-5">
             <div className="d-flex justify-content-end">
                <Link to="/">
                    <FontAwesomeIcon icon={faCircleArrowLeft} size="3x" className="text-primary" />
                </Link>
                
            </div>
             <div className="row">
                <div className="col-12 col-md-9 pt-2">
                    <label htmlFor="sortSelect" className="form-label">Ordina per :</label>
                    <select
                        id="sortSelect"
                        className="form-select w-auto"
                        value={orderLastName}
                        onChange={(e) => setOrderLastName(e.target.value)}
                    >
                        <option value="default">Nome Dipendente</option>
                        <option value="asc">A → Z</option>
                        <option value="desc">Z → A</option>
                    </select>
                </div>


                <div className="col-12 col-md-3 pt-2">
                    <label htmlFor="searchInput" className="form-label">Cerca dipendente</label>
                    <input
                        id="searchInput"
                        type="search"
                        className="form-control"
                        placeholder="Cerca dipendente..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>
            <table className="table table-striped table-hover">
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
                        <tr key={employee.id} onClick={() => navigate(`/dipendenti/${employee.id}`)}
                            style={{ cursor: 'pointer' }}>
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
