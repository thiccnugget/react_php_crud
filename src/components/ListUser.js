import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";

export default function ListUser() {

    //Funzione getUsers() -> richiesta GET al server per prendere i dati degli utenti dal DB
    function getUsers() {
        axios.get('https://thiccnugget.ddns.net/api/').then(function(response) {
            setUsers(response.data);
        });
    }

    //Funzione deleteUser() -> richiesta 
    const deleteUser = (id) => {
        axios.delete(`https://thiccnugget.ddns.net/api/${id}/`).then(function(response){
            getUsers();
        });
    }

    //Funzione per eseguire il set degli utenti
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="mt-5 text-center">
            <h1 className="mb-3">Lista utenti</h1>   
            <Container className="mainContainer">
                <Table className="p-4" bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefono</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(
                                (user, key) =>
                                <tr key={key}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>
                                        <Link to={`user/${user.id}/edit`}><Button variant="primary" className="mx-3">Modifica</Button></Link>
                                        <Button variant="danger" onClick={() => deleteUser(user.id)}>Elimina</Button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}