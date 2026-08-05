import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faBuilding, faSearch } from "@fortawesome/free-solid-svg-icons"

export default function Departments() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [departments, setDepartments] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')
    const [sortOrder, setSortOrder] = useState('default')

    useEffect(() => {
        axios.get('http://localhost:8000/api/departments')
            .then(res => {
                console.log(res.data);
                setDepartments(res.data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    // Protezione con (|| '') per evitare errori JS se address o email sono null nel DB
    let filtered = departments.filter(dept => {
        const q = query.toLowerCase();
        const nameMatch = (dept.name || '').toLowerCase().includes(q);
        const addressMatch = (dept.address || '').toLowerCase().includes(q);
        const emailMatch = (dept.email || '').toLowerCase().includes(q);
        return nameMatch || addressMatch || emailMatch;
    });

    if (sortOrder === 'asc') {
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'desc') {
        filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    }

    if (loading) {
        return (
            <div className="container mt-5 text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Caricamento dei Dipartimenti...</p>
            </div>
        )
    }

    return (
        <div className="container py-4">
            
            
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-primary mb-0">
                        <FontAwesomeIcon icon={faBuilding} className="me-2" />
                        Elenco Dipartimenti
                    </h2>
                    <p className="text-muted mb-0 small">Seleziona un dipartimento per vederne i dettagli e il personale</p>
                </div>
                <Link to="/">
                    <FontAwesomeIcon icon={faCircleArrowLeft} size="3x" className="text-primary" />
                </Link>
            </div>

            
            <div className="card shadow-sm border-0 rounded-4 mb-4 bg-light">
                <div className="card-body p-3">
                    <div className="row g-3 align-items-center">
                        
                        
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <FontAwesomeIcon icon={faSearch} className="text-muted" />
                                </span>
                                <input
                                    id="searchInput"
                                    type="search"
                                    className="form-control border-start-0 shadow-none"
                                    placeholder="Cerca per nome, indirizzo o mail..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        
                        <div className="col-12 col-md-6 col-lg-4 ms-auto d-flex align-items-center justify-content-md-end gap-2">
                            <label htmlFor="sortSelect" className="form-label mb-0 fw-semibold text-muted small text-nowrap">
                                Ordina per:
                            </label>
                            <select
                                id="sortSelect"
                                className="form-select form-select-sm w-auto shadow-none"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="default">Predefinito</option>
                                <option value="asc">Nome A → Z</option>
                                <option value="desc">Nome Z → A</option>
                            </select>
                        </div>

                    </div>
                </div>
            </div>

            {/* Tabella Dipartimenti */}
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-5">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th scope="col" className="py-3 px-4">Nome Dipartimento</th>
                                <th scope="col" className="py-3">Indirizzo</th>
                                <th scope="col" className="py-3">Email di Contatto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length > 0 ? (
                                filtered.map(department => (
                                    <tr 
                                        key={department.id} 
                                        onClick={() => navigate(`/dipartimenti/${department.id}`)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td className="fw-bold px-4">{department.name}</td>
                                        <td >{department.address || '-'}</td>
                                        <td >{department.email || '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-5 text-muted">
                                        Nessun dipartimento trovato con i criteri di ricerca inseriti.
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