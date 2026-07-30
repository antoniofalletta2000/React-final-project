import Logo from "../assets/images/logo2.png"
import { useLocation, Link } from "react-router-dom"

export default function AppHeader() {

    const location = useLocation()
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-white border-bottom border-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={Logo} alt="Logo" width="100%" height="75" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dipartimenti">Dipartimenti</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dipendenti">Dipendenti</Link>
                            </li>
                        </ul>
                        {location.pathname !== "/" && (
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Cerca..." aria-label="Search" />
                                <button className="btn btn-outline-primary" type="submit">Cerca</button>
                            </form>
                        )}

                    </div>
                </div>
            </nav>

        </>
    )
}