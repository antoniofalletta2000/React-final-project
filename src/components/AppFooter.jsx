import Logo from "../assets/images/logo3.png"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faXTwitter, faYoutube, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

export default function AppFooter() {
    return (
        <footer className="bg-dark text-white">

            <div className="container-fluid p-4">

                <div className="row">
                    <div className="col-12">
                        <div className="d-flex gap-2 align-items-end">
                            <Link id="footer-logo" to="/">
                                <img src={Logo} alt="Logo" height="75" />
                            </Link>
                            <p>Regione Sicilia <br /> Human Resource</p>
                        </div>
                    </div>
                </div>


                <hr />

                <div className="row row-cols-1 row-cols-md-3">

                    <div className="col">
                        <ul className="list-unstyled">
                            <li><h5 className="text-primary">CONTATTI</h5></li>
                            <li className="pb-2">Palazzo Orleans</li>
                            <li className="pb-2">Piazza Indipendenza 21</li>
                            <li className="pb-4">90129 Palermo ( PA )</li>
                            <li>
                                <div className="d-flex gap-2">
                                    <span>Centralino :</span>
                                    <span>0911111111</span>
                                </div>
                            </li>
                            <li>
                                <div className="d-flex gap-2">
                                    <span>Numero Verde Cittadino :</span>
                                    <span>0912222222</span>
                                </div>
                            </li>

                        </ul>
                    </div>

                    <div className="col">
                        <ul className="list-unstyled">
                            <li><h5 className="text-primary">TRASPARENZA</h5></li>
                            <li>
                                <a className="text-decoration-none text-white" href="#">Amministrazione Trasparente</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col">
                        <ul className="list-unstyled">
                            <li><h5 className="text-primary pb-1">Seguici Su</h5></li>
                            <li>
                                <div className="d-flex flex-wrap gap-3">
                                    <a href="..." target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faFacebookF} size="2x" className="text-white" />
                                    </a>
                                    <a href="..." target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faXTwitter} size="2x" className="text-white" />
                                    </a>
                                    <a href="..." target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faYoutube} size="2x" className="text-white" />
                                    </a>
                                    <a href="..." target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faInstagram} size="2x" className="text-white" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/antonio-falletta-219607281/" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faLinkedin} size="2x" className="text-white" />
                                    </a>
                                    <a href="https://github.com/antoniofalletta2000" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faGithub} size="2x" className="text-white" />
                                    </a>
                                </div>

                            </li>
                        </ul>
                    </div>




                </div>


            <hr />
            </div>



        
        </footer>
    )
}