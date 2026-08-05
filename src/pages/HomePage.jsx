import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Logo from "../assets/images/logo3.png"
import { faUser, faLandmark  } from '@fortawesome/free-solid-svg-icons'

export default function HomePage() {

    return (
        <div className="container mt-4 mb-4">

            <div>
                <img id="home_logo" src={Logo} alt="Logo" width="100%" />
            </div>

            <p>
                <span className="fw-bold pe-1">RSHR</span>
                è la piattaforma di consultazione del personale della Regione Sicilia, pensata per rendere semplice e immediata la navigazione tra dipartimenti e dipendenti dell'amministrazione. Attraverso un'interfaccia chiara e intuitiva, puoi esplorare la struttura organizzativa suddivisa nei vari dipartimenti, scoprire chi ne fa parte e conoscere le competenze e i ruoli di ciascun dipendente.
                <br />
                Tutti i dati sono sempre aggiornati e consultabili in pochi click, così da avere sempre sotto controllo l'organizzazione del personale, in un unico punto di accesso pensato per essere semplice, veloce ed efficace.

            </p>

            <div className="row row-cols-1 row-cols-md-2">
                <div className="col py-2">
                    <a href="/dipartimenti" className="text-decoration-none">
                        <div className="card dept_card border border-dark">
                            <div className="d-flex flex-column align-items-center justify-content-center gap-3">
                                
                                <FontAwesomeIcon className="pt-5 px-5 pb-2" icon={faLandmark } size="2x" />
                                <h5 className="opacity-75 pb-2">Dipartimenti</h5>
                            </div>
                        </div>
                    </a>

                </div>
                <div className="col py-2">
                    <a href="/dipendenti" className="text-decoration-none">
                        <div className="card emp_card border border-dark">
                            <div className="d-flex flex-column align-items-center justify-content-center gap-3">
                                
                                <FontAwesomeIcon className="pt-5 px-5 pb-2" icon={faUser} size="2x" />
                                <h5 className="opacity-75 pb-2">Dipendenti</h5>
                            </div>

                        </div>
                    </a>
                </div>
            </div>

        </div>
    )
}
