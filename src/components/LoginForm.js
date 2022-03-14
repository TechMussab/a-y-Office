import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import auth from "../HelperClasses/Auth";

import {useNavigate} from "react-router-dom";


function LoginForm({isAuth, setIsAuth}) {
    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('')
    if (auth.isAuthenticated()) {
        return navigate("/");
    }
    // const [userData, setUserData] = useState({})
    // let history=useHistory();
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    // console.log('in login auth?' + isAuth)
    // console.log('in login ')

    async function handleSubmit(event) {
        event.preventDefault();
        let res = await (auth.login(email, password));
        if (!res.success) {
            setError(res.massage)
        } else {
            // <Redirect to="/" />
            setIsAuth(true)
            console.log('done login ' + res)
        }
    }


    return (
        <div className="justify-content-center">
            <div className="col-8card p-2 mt-4 card-dark">

                <div className="card-header">
                    Login
                </div>
                <div className="card-body">
                    <div className="strong">
                        <div className="text-danger">
                            {error}
                        </div>
                    </div>
                    <div className="Login">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group size="lg" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button block size="lg" type="submit" disabled={!validateForm()}>
                                Login
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;

// return (
//
//     <Layout startingTheme="light">
//         <LoginForm>
//
//         </LoginForm>
//
//
//     </Layout>
// );
