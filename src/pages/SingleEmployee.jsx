import { useNavigate, useParams, Link } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faEnvelope, faPhone, faBuilding, faBriefcase } from "@fortawesome/free-solid-svg-icons"

export default function SingleEmployee() {
    const { id } = useParams()

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/employees/${id}`)
            .then(res => {
                console.log(res.data);
                setEmployee(res.data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [id]);

    if (loading) {
        return (
            <div className="container mt-5 text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Caricamento del Dipendente...</p>
            </div>
        )
    }

    return (
        <div className="container py-4">

            <div className="d-flex justify-content-end mb-3">
                <Link to="/dipendenti">
                    <FontAwesomeIcon icon={faCircleArrowLeft} size="3x" className="text-primary" />
                </Link>
            </div>


            <div className="card shadow border-0 rounded-4 overflow-hidden mb-5">


                <div className="card-header bg-primary text-white p-4">
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <img
                                src={employee.image}
                                alt={`${employee.name} ${employee.last_name}`}
                                id="emp_img"
                                className="rounded-circle border border-3 border-white shadow-sm"

                            />
                        </div>
                        <div className="col">
                            <h2 className="fw-bold mb-1">{employee.name} {employee.last_name}</h2>
                            {employee.department && (
                                <p className="mb-0 fs-5 text-white-50">
                                    <FontAwesomeIcon icon={faBuilding} className="me-2" />
                                    <Link
                                        to={`/dipartimenti/${employee.department.id}`}
                                        className="text-white text-decoration-underline"
                                    >
                                        {employee.department.name}
                                    </Link>
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="card-body p-4">
                    <div className="row g-4">


                        <div className="col-md-6 border-end-md">


                            {employee.job_title && (
                                <div className="mb-4">
                                    <h6 className="text-uppercase text-muted fw-bold small mb-2">
                                        <FontAwesomeIcon icon={faBriefcase} className="me-2" />
                                        Ruolo / Posizione
                                    </h6>
                                    <span className="badge bg-light text-primary border border-primary fs-6 px-3 py-2 rounded-3">
                                        {employee.job_title}
                                    </span>
                                </div>
                            )}


                            <h6 className="text-uppercase text-muted fw-bold small mb-3">Recapiti</h6>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item px-0 d-flex align-items-center bg-transparent border-0 mb-2">
                                    <div className="bg-light p-2 rounded-circle me-3 text-primary">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </div>
                                    <div>
                                        <small className="text-muted d-block">Email</small>
                                        <a href={`mailto:${employee.email}`} className="text-dark fw-semibold text-decoration-none">
                                            {employee.email}
                                        </a>
                                    </div>
                                </li>
                                <li className="list-group-item px-0 d-flex align-items-center bg-transparent border-0">
                                    <div className="bg-light p-2 rounded-circle me-3 text-primary">
                                        <FontAwesomeIcon icon={faPhone} />
                                    </div>
                                    <div>
                                        <small className="text-muted d-block">Telefono</small>
                                        <a href={`tel:${employee.phone_number}`} className="text-dark fw-semibold text-decoration-none">
                                            {employee.phone_number}
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>


                        <div className="col-md-6">
                            <h6 className="text-uppercase text-muted fw-bold small mb-3">Competenze Professionali</h6>

                            {employee.skills?.length > 0 ? (
                                <div className="d-flex flex-wrap gap-2">
                                    {employee.skills.map(skill => (
                                        <span
                                            key={skill.id}
                                            className='badge rounded-pill px-3 py-2 fs-6 shadow-sm '
                                            style={{
                                                backgroundColor: skill.color
                                            }}

                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted italic">Nessuna competenza inserita.</p>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}