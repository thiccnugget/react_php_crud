import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

export default function ListUser() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.get(`https://thiccnugget.ddns.net/api/user/${id}`).then(function(response) {
            setInputs(response.data);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        //Blocca il submit in caso di errori
        event.preventDefault();

        if (inputs.name.replaceAll(' ','') !== "" && inputs.email.replaceAll(' ','') !== "" && inputs.mobile.replaceAll(' ','') !== "") {
            //Richiesta PUT -> modifica di un record nel DB
            axios.put(`https://thiccnugget.ddns.net/api/user/${id}/edit`, inputs).then(function(response){
            if(response.data === 1){
                alert("Modifica effettuata con successo!");
                //SOSTITUIRE CON ALERT BOOTSTRAP
            }
            //Reindirizza alla home page
            navigate('/');
            });
        }
    }

    
    return (
        <Container className="container">
            <h1 className="m-5 text-center">Modifica utente</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Nome" value={inputs.name || ""} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Email" value={inputs.email || ""} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-5">
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control name="mobile" type="number" placeholder="telefono" value={inputs.mobile || ""} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" className="submit">
                    Salva
                </Button>
            </Form>
        </Container>
    )
}
