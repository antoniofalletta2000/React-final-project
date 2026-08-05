import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faUsers, faSearch } from "@fortawesome/free-solid-svg-icons"

export default function Employees() {
    const [employees, setEmployees] = useState([])
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [orderLastName, setOrderLastName] = useState('cognome')

    useEffect(() => {
        axios.get('http://localhost:8000/api/employees')
            .then(res => {
                console.log(res.data);
                setEmployees(res.data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [])

    // Protezione con Optional Chaining (?.) per evitare errori se 'department' o 'email' sono null
    let filtered = employees.filter(employee => {
        const q = query.toLowerCase();
        const nameMatch = (employee.name || '').toLowerCase().includes(q);
        const lastNameMatch = (employee.last_name || '').toLowerCase().includes(q);
        const emailMatch = (employee.email || '').toLowerCase().includes(q);
        const deptMatch = (employee.department?.name || '').toLowerCase().includes(q);
        return nameMatch || lastNameMatch || emailMatch || deptMatch;
    });

    if (orderLastName === 'asc') {
        filtered = [...filtered].sort((a, b) => (a.last_name || '').localeCompare(b.last_name || ''));
    } else if (orderLastName === 'desc') {
        filtered = [...filtered].sort((a, b) => (b.last_name || '').localeCompare(a.last_name || ''));
    }

    if (loading) {
        return (
            <div className="container mt-5 text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Caricamento dei Dipendenti...</p>
            </div>
        )
    }

    return (
        <div className="container py-4">
            
            {/* Header Pagina + Link Indietro */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-primary mb-0">
                        <FontAwesomeIcon icon={faUsers} className="me-2" />
                        Elenco Dipendenti
                    </h2>
                    <p className="text-muted mb-0 small">Consulta le schede del personale dell'ente</p>
                </div>
                <Link to="/">
                    <FontAwesomeIcon icon={faCircleArrowLeft} size="3x" className="text-primary" />
                </Link>
            </div>

            
            <div className="card shadow-sm border-0 rounded-4 mb-4 bg-light">
                <div className="card-body p-3">
                    <div className="row g-3 align-items-center">
                        
                        
                        <div className="col-12 col-md-6 col-lg-5">
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <FontAwesomeIcon icon={faSearch} className="text-muted" />
                                </span>
                                <input
                                    id="searchInput"
                                    type="search"
                                    className="form-control border-start-0 shadow-none"
                                    placeholder="Cerca per nome, cognome, mail o dipartimento..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        
                        <div className="col-12 col-md-6 col-lg-7 d-flex align-items-center justify-content-md-end gap-3">
                            <span className="badge bg-white text-secondary border px-3 py-2 rounded-pill small">
                                Trovati: <strong>{filtered.length}</strong>
                            </span>

                            <div className="d-flex align-items-center gap-2">
                                <label htmlFor="sortSelect" className="form-label mb-0 fw-semibold text-muted small text-nowrap">
                                    Ordina per:
                                </label>
                                <select
                                    id="sortSelect"
                                    className="form-select form-select-sm w-auto shadow-none"
                                    value={orderLastName}
                                    onChange={(e) => setOrderLastName(e.target.value)}
                                >
                                    <option value="cognome">Cognome (Predefinito)</option>
                                    <option value="asc">Cognome A → Z</option>
                                    <option value="desc">Cognome Z → A</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-5">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th scope="col" className="py-3 px-4">Cognome</th>
                                <th scope="col" className="py-3">Nome</th>
                                <th scope="col" className="py-3">Dipartimento</th>
                                <th scope="col" className="py-3">Mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length > 0 ? (
                                filtered.map(employee => (
                                    <tr 
                                        key={employee.id} 
                                        onClick={() => navigate(`/dipendenti/${employee.id}`)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td className="fw-bold px-4">{employee.last_name}</td>
                                        <td className="fw-semibold">{employee.name}</td>
                                        <td>
                                            {employee.department ? (
                                                <span className="badge bg-light text-dark border">
                                                    {employee.department.name}
                                                </span>
                                            ) : (
                                                <span>Nessuno</span>
                                            )}
                                        </td>
                                        <td>{employee.email}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-5 text-muted">
                                        Nessun dipendente trovato con i criteri di ricerca inseriti.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}