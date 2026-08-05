import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons"


export default function Departments() {

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [departments, setDepartments] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')
    const [sortOrder, setSortOrder] = useState('default')

    useEffect(() => {
        axios.get('http://localhost:8000/api/departments')
            .then(res => { console.log(res.data), setDepartments(res.data) })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    let filtered = departments.filter(dept =>
        dept.name.toLowerCase().includes(query.toLowerCase()) ||
        dept.address.toLowerCase().includes(query.toLowerCase()) ||
        dept.email.toLowerCase().includes(query.toLowerCase())
    );

    if (loading) {
        return (
            <div className="container mt-4 text-center">
                <div className="spinner-border" role="status"></div>
                <p className="mt-2">Caricamento dei Dipartimenti...</p>
            </div>
        )
    }

    if (sortOrder === 'asc') {
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'desc') {
        filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
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
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="default">Nome Dipartimento</option>
                        <option value="asc">A → Z</option>
                        <option value="desc">Z → A</option>
                    </select>
                </div>


                <div className="col-12 col-md-3 pt-2">
                    <label htmlFor="searchInput" className="form-label">Cerca dipartimento</label>
                    <input
                        id="searchInput"
                        type="search"
                        className="form-control"
                        placeholder="Cerca dipartimento..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>



            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Indirizzo</th>
                        <th scope="col">Mail</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map(department => (
                        <tr key={department.id} onClick={() => navigate(`/dipartimenti/${department.id}`)}
                            style={{ cursor: 'pointer' }}>
                            <td>{department.name}</td>
                            <td>{department.address}</td>
                            <td>{department.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
