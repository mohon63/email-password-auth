import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../../firebase.init';

const auth = getAuth(app);

const BasicExampleForm = () => {
    const [validated, setValidated] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailBlur = e => {
        setEmail(e.target.value)
    };
    const handlePasswordBlur = e => {
        setPassword(e.target.value)
    };

    const handleRegisteredChange = e => {
        setRegistered(e.target.checked)
    }
    const handleFormSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return;
        };

        if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
            setError('Please password should contain at list one special character')
            return;
        };

        setValidated(true);
        setError('')

        if (registered) {
            signInWithEmailAndPassword(auth, email, password)
                .then(result => {
                    const user = result.user;
                    console.log(user);
                })
                .catch(error => {
                    setError(error.message);
                    console.error(error);
                })
        }
        else {
            createUserWithEmailAndPassword(auth, email, password)
                .then(result => {
                    const user = result.user;
                    console.log(user);
                    setEmail('');
                    setPassword('');
                })
                .catch(error => {
                    setError(error.message);
                    console.error(error);
                })
        }

        e.preventDefault();
    };
    return (
        <div className='registration w-50 mx-auto mt-3'>
            <h2 className="text-primary">Please {registered ? 'LogIn' : 'Registered'}</h2>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check onChange={handleRegisteredChange} label="Already register!" required />
                </Form.Group>
                <p className="text-danger">{error}</p>
                <Button variant="primary" type="submit">
                    {registered ? 'LogIn' : 'Register'}
                </Button>
            </Form>
        </div>
    );
};

export default BasicExampleForm;