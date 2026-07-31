import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
import {Navigate} from "react-router-dom"

export default function SingleDepartment() {
    const { id } = useParams();
    const navigate = useNavigate()

    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/departments/${id}`)
            .then(res => {
                console.log(res.data),
                setDepartment(res.data)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [id]);

    if (loading) {
        return (
            <div className="container mt-4 text-center">
                <div className="spinner-border" role="status"></div>
                <p className="mt-2">Caricamento del Dipartimento...</p>
            </div>
        )
    }

    return (
        <div className="card m-4">
            <h1 className="text-center mt-4 mb-4 text-primary">{department.name}</h1>

            <div className="row row-cols-1 row-cols-md-3">
                <div className="col">
                    <div className="d-flex gap-2 align-items-start justify-content-center">
                        <h5>Indirizzo:</h5>
                        <p>{department.address}</p>
                    </div>
                </div>
                <div className="col">
                     <div className="d-flex gap-2 align-items-start justify-content-center">
                        <h5>Mail:</h5>
                        <p>{department.email}</p>
                    </div>
                </div>
                <div className="col">
                     <div className="d-flex gap-2 align-items-start justify-content-center">
                        <h5>Telefono:</h5>
                        <p>{department.phone_number}</p>
                    </div>
                </div>
            </div>

            <div className="container mt-4 mb-4">
                <h5 className="text-center text-danger">Ruolo Dipartimento</h5>
                <p className="text-center">{department.description}</p>
            </div>

            <h5 className="text-center text-success">Tabella Dipendenti</h5>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Cognome</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Mail</th>
                        <th scope="col">Telefono</th>
                    </tr>
                </thead>
                <tbody>
                    {department.employees.map(employee => (
                        <tr key={employee.id} onClick={() => navigate(`/dipendenti/${employee.id}`)}
                            style={{ cursor: 'pointer' }}>
                            <td>{employee.last_name}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone_number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
}