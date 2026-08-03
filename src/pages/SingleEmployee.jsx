import { useNavigate, useParams, Link} from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"

export default function SingleEmployee() {
    const { id } = useParams()

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/employees/${id}`)
            .then(res => {
                console.log(res.data),
                    setEmployee(res.data)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [id]);

    if (loading) {
        return (
            <div className="container mt-4 text-center">
                <div className="spinner-border" role="status"></div>
                <p className="mt-2">Caricamento del Dipendente...</p>
            </div>
        )
    }


    return (
        <div className=" m-4">

            <div className="d-flex justify-content-around align-items-center mb-4">
                <img src={employee.image} alt={employee.name} className="d-none d-md-block w-25 h-25 rounded-circle" />
                <div className="d-flex flex-column">
                    <h5 className="text-center">Ruolo Dipendente</h5>
                    <p className="text-center p-2 border bg-primary text-white rounded">{employee.job_title}</p>
                    <h5 className="text-center">Competenze:</h5>
                    <ul className="list-unstyled">
                        {employee.skills?.map(skill => (
                            <li key={skill.id} className="p-2 m-2 rounded text-white text-center " style={{ backgroundColor: skill.color, border: '1px solid #dee2e6' }}>
                                {skill.name}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>



            <table className="table table-striped-columns">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Cognome</th>
                        <th scope="col">Dipartimento</th>
                        <th scope="col">Mail</th>
                        <th scope="col">Telefono</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{employee.name}</td>
                        <td>{employee.last_name}</td>
                        <td><Link className="text-decoration-none text-dark" to={`/dipartimenti/${employee.department?.id}`}>{employee.department?.name}</Link></td>
                        <td>{employee.email}</td>
                        <td>{employee.phone_number}</td>
                    </tr>
                </tbody>
            </table>



        </div>
    );
}