import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faUsers, faSearch, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"

export default function Employees() {
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [searching, setSearching] = useState(false)
    const [orderLastName, setOrderLastName] = useState('cognome')
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearching(true)
            axios.get(`http://localhost:8000/api/employees?page=${page}&search=${query}&sort=${orderLastName}`)
                .then(res => {
                    setEmployees(res.data.data)
                    setLastPage(res.data.last_page)
                    setTotal(res.data.total)
                })
                .catch(err => console.error(err))
                .finally(() => {
                    setLoading(false)
                    setSearching(false)
                });
        }, 400)

        return () => clearTimeout(timer)
    }, [page, query, orderLastName])

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
                                    onChange={(e) => {
                                        setQuery(e.target.value)
                                        setPage(1)
                                    }}
                                />
                                {searching && (
                                    <span className="input-group-text bg-white border-start-0">
                                        <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-7 d-flex align-items-center justify-content-md-end gap-3">
                            <span className="badge bg-white text-secondary border px-3 py-2 rounded-pill small">
                                In pagina: <strong>{employees.length}</strong> / Totale: <strong>{total}</strong>
                            </span>

                            <div className="d-flex align-items-center gap-2">
                                <label htmlFor="sortSelect" className="form-label mb-0 fw-semibold text-muted small text-nowrap">
                                    Ordina per:
                                </label>
                                <select
                                    id="sortSelect"
                                    className="form-select form-select-sm w-auto shadow-none"
                                    value={orderLastName}
                                    onChange={(e) => {
                                        setOrderLastName(e.target.value)
                                        setPage(1)
                                    }}
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

            <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-3">
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
                            {employees.length > 0 ? (
                                employees.map(employee => (
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

            {/* Controlli paginazione */}
            <div className="d-flex justify-content-between align-items-center">
                <button
                    className="btn btn-outline-primary"
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                >
                    <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
                    Precedente
                </button>

                <span className="text-muted">
                    Pagina {page} di {lastPage}
                </span>

                <button
                    className="btn btn-outline-primary"
                    disabled={page === lastPage}
                    onClick={() => setPage(p => p + 1)}
                >
                    Successivo
                    <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
                </button>
            </div>

        </div>
    )
}