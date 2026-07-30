import Logo from "../assets/images/logo2.png"

export default function AppHeader() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-white border-bottom border-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={Logo} alt="Logo" width="100%" height="75" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/dipartimenti">Dipartimenti</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/dipendenti">Dipendenti</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Cerca..." aria-label="Search" />
                            <button className="btn btn-outline-primary" type="submit">Cerca</button>
                        </form>
                    </div>
                </div>
            </nav>

        </>
    )
}