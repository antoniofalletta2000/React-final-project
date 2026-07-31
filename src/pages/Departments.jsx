import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function Departments() {

    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || ''
    const navigate = useNavigate()
    const [departments, setDepartments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:8000/api/departments')
            .then(res => { console.log(res.data), setDepartments(res.data) })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    const filtered = departments.filter(dept =>
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

    return (
        <div className="container mt-4 mb-5">
            <table className="table table-striped">
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
