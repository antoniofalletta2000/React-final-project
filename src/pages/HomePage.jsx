import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Logo from "../assets/images/logo3.png"
import { faUser, faLandmark, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function HomePage() {
    return (
        <div className="container py-4">

            
            <div className="text-center mb-5">
                <img 
                    id="home_logo" 
                    src={Logo} 
                    alt="Logo RSHR" 
                    className="img-fluid mb-4" 
                    style={{ maxWidth: '320px' }} 
                />

                <p className="lead text-secondary mx-auto" style={{ maxWidth: '800px', fontSize: '1.1rem' }}>
                    <span className="fw-bold text-primary pe-1">RSHR</span> 
                    è la piattaforma di consultazione del personale della Regione Sicilia, pensata per rendere semplice e immediata la navigazione tra dipartimenti e dipendenti dell'amministrazione. 
                    <br /><br />
                    Attraverso un'interfaccia intuitiva puoi esplorare la struttura organizzativa, scoprire chi ne fa parte e consultare dati sempre aggiornati in pochissimi click.
                </p>
            </div>

            
            <div className="row g-4 justify-content-center">
                
                
                <div className="col-12 col-md-6 col-lg-5">
                    <Link to="/dipartimenti" className="text-decoration-none">
                        <div className="card shadow-sm border-0 rounded-4 p-4 text-center h-100 bg-light transition-all">
                            <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 mx-auto" style={{ width: '65px', height: '65px' }}>
                                <FontAwesomeIcon icon={faLandmark} size="xl" />
                            </div>
                            <h4 className="fw-bold text-dark mb-2">Dipartimenti</h4>
                            <p className="text-muted small mb-4">
                                Consulta le sedi, gli indirizzi di contatto e le strutture organizzative dell'ente.
                            </p>
                            <span className="btn btn-outline-primary rounded-pill px-4 fw-semibold mt-auto align-self-center">
                                Esplora Dipartimenti <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                            </span>
                        </div>
                    </Link>
                </div>

                
                <div className="col-12 col-md-6 col-lg-5">
                    <Link to="/dipendenti" className="text-decoration-none">
                        <div className="card shadow-sm border-0 rounded-4 p-4 text-center h-100 bg-light transition-all">
                            <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 mx-auto" style={{ width: '65px', height: '65px' }}>
                                <FontAwesomeIcon icon={faUser} size="xl" />
                            </div>
                            <h4 className="fw-bold text-dark mb-2">Dipendenti</h4>
                            <p className="text-muted small mb-4">
                                Cerca il personale per cognome, nome o dipartimento di appartenenza.
                            </p>
                            <span className="btn btn-outline-primary rounded-pill px-4 fw-semibold mt-auto align-self-center">
                                Esplora Dipendenti <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                            </span>
                        </div>
                    </Link>
                </div>

            </div>

        </div>
    )
}