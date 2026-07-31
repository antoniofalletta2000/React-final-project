import { useNavigate, useParams } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"

export default function SingleEmployee() {
    const {id} = useParams()

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
        <div>
            <h1>Single Employee Page</h1>
            <img src={employee?.image} alt={employee?.name} />
        </div>
    );
}