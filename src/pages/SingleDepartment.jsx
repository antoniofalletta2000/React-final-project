import { useNavigate, useParams, Link } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faEnvelope, faPhone, faMapMarkerAlt, faUsers } from "@fortawesome/free-solid-svg-icons"

export default function SingleDepartment() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [orderLastName, setOrderLastName] = useState('cognome')
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/departments/${id}`)
            .then(res => {
                console.log(res.data);
                setDepartment(res.data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [id]);

    if (loading) {
        return (
            <div className="container mt-5 text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Caricamento del Dipartimento...</p>
            </div>
        )
    }

    let employeesList = department.employees || []

    if (orderLastName === 'asc') {
        employeesList = [...employeesList].sort((a, b) => a.last_name.localeCompare(b.last_name))
    } else if (orderLastName === 'desc') {
        employeesList = [...employeesList].sort((a, b) => b.last_name.localeCompare(a.last_name))
    }

    return (
        <div className="container py-4">
            
            
            <div className="d-flex justify-content-end mb-3">
                <Link to="/dipendenti">
                    <FontAwesomeIcon icon={faCircleArrowLeft} size="3x" className="text-primary" />
                </Link>
            </div>

            
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-5">
                <div className="card-header bg-primary text-white p-4">
                    <h1 className="fw-bold mb-0">{department.name}</h1>
                </div>

                <div className="card-body p-4">
                    
                    <div className="row g-3 mb-4">
                        <div className="col-md-4">
                            <div className="d-flex align-items-center bg-light p-3 rounded-3 h-100">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary fs-4 me-3" />
                                <div>
                                    <small className="text-muted d-block fw-bold text-uppercase">Indirizzo</small>
                                    <span className="text-dark fw-semibold">{department.address || 'Non specificato'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="d-flex align-items-center bg-light p-3 rounded-3 h-100">
                                <FontAwesomeIcon icon={faEnvelope} className="text-primary fs-4 me-3" />
                                <div>
                                    <small className="text-muted d-block fw-bold text-uppercase">Mail</small>
                                    <a href={`mailto:${department.email}`} className="text-dark fw-semibold text-decoration-none">
                                        {department.email || 'Non specificata'}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="d-flex align-items-center bg-light p-3 rounded-3 h-100">
                                <FontAwesomeIcon icon={faPhone} className="text-primary fs-4 me-3" />
                                <div>
                                    <small className="text-muted d-block fw-bold text-uppercase">Telefono</small>
                                    <a href={`tel:${department.phone_number}`} className="text-dark fw-semibold text-decoration-none">
                                        {department.phone_number || 'Non specificato'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {department.description && (
                        <div className="p-3 bg-light rounded-3 border-start border-primary border-4">
                            <h6 className="fw-bold text-primary mb-1">Descrizione Dipartimento</h6>
                            <p className="mb-0 text-secondary">{department.description}</p>
                        </div>
                    )}
                </div>
            </div>

            
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold text-dark mb-0">
                    <FontAwesomeIcon icon={faUsers} className="me-2 text-primary" />
                    Dipendenti Assegnati 
                    <span className="badge bg-primary ms-2 fs-6 rounded-pill">{employeesList.length}</span>
                </h4>

                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="sortSelect" className="form-label mb-0 fw-semibold text-muted small">
                        Ordina per:
                    </label>
                    <select
                        id="sortSelect"
                        className="form-select form-select-sm shadow-sm w-auto"
                        value={orderLastName}
                        onChange={(e) => setOrderLastName(e.target.value)}
                    >
                        <option value="cognome">Predefinito</option>
                        <option value="asc">Cognome A → Z</option>
                        <option value="desc">Cognome Z → A</option>
                    </select>
                </div>
            </div>

            <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-5">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th scope="col" className="py-3">Cognome</th>
                                <th scope="col" className="py-3">Nome</th>
                                <th scope="col" className="py-3">Mail</th>
                                <th scope="col" className="py-3">Telefono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeesList.length > 0 ? (
                                employeesList.map(employee => (
                                    <tr 
                                        key={employee.id} 
                                        onClick={() => navigate(`/dipendenti/${employee.id}`)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td className="fw-bold">{employee.last_name}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.phone_number}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-muted">
                                        Nessun dipendente assegnato a questo dipartimento.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}