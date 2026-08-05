import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="container text-center mt-5 mb-5">
            <h1 className="display-1">404</h1>
            <p className="lead">Pagina non trovata.</p>
            <Link to="/" className="btn btn-primary">Torna alla Home</Link>
        </div>
    );
}