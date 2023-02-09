import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

export default function CreateUser() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        //Blocca il submit in caso di errori
        event.preventDefault();
        if (inputs.name.replaceAll(' ','') !== "" && inputs.email.replaceAll(' ','') !== "" && inputs.mobile.replaceAll(' ','') !== "") {
            //Richiesta HTTP POST -> inserimento dati in input nel DB
            axios.post('https://thiccnugget.ddns.net/api/', inputs).then(function(response){
                if(response.data === 1){
                    alert("Inserimento avvenuto con successo!");
                    //SOSTITUIRE CON ALERT BOOTSTRAP
                }
                //Reindirizza alla home page
                navigate('/');
            });  
        }  
    }

    return (
        <Container className="container">
            <h1 className="m-5 text-center">Nuovo utente</h1>
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
                    <Form.Control name="mobile" type="number" placeholder="Telefono" value={inputs.mobile || ""} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" className="submit">
                    Crea
                </Button>
            </Form>
        </Container>
    )
}
