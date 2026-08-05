import Logo from "../assets/images/logo3.png"
import { useLocation, Link, useSearchParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faXTwitter, faYoutube, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'


export default function AppHeader() {

    const location = useLocation()


    return (
        <>
            <nav className="navbar navbar-custom-bg navbar-expand-lg bg-white border-bottom border-primary p-5">
                <div className="container-fluid">
                    <Link className="navbar-logo" to="/">
                        <img src={Logo} alt="Logo" width="100%" height="75" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item fw-bold">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item fw-bold">
                                <Link className="nav-link" to="/dipartimenti">Dipartimenti</Link>
                            </li>
                            <li className="nav-item fw-bold">
                                <Link className="nav-link" to="/dipendenti">Dipendenti</Link>
                            </li>
                        </ul>

                            <ul className="list-unstyled">
                            <li><h5 className="text-primary text-center pb-1">Seguici Su</h5></li>
                            <li>
                                <div className="d-flex flex-wrap gap-3">
                                    <a href="..." target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faFacebookF} size="lg" className="text-primary" />
                                    </a>
                                    <a href="..." target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faXTwitter} size="lg" className="text-primary" />
                                    </a>
                                    <a href="..." target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faYoutube} size="lg" className="text-primary" />
                                    </a>
                                    <a href="..." target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faInstagram} size="lg" className="text-primary" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/antonio-falletta-219607281/" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faLinkedin} size="lg" className="text-primary" />
                                    </a>
                                    <a href="https://github.com/antoniofalletta2000" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faGithub} size="lg" className="text-primary" />
                                    </a>
                                </div>

                            </li>
                        </ul>
                        

                    </div>
                </div>
            </nav>

        </>
    )
}