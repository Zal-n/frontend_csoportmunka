import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, FloatingLabel } from 'react-bootstrap';

function Register() {
    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const password_again = e.target.password_again.value;

        if (password !== password_again) {
            toast.error("A jelszavak nem egyeznek!");
            return;
        }

        try {
            // FIX: Content-Type javítva
            const res = await fetch("https://api.cookbook.techtrove.ddns.net/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "username": username, "email": email, "password": password })
            });

            if (res.ok) {
                toast.success("Sikeres regisztráció! 🎉");
                navigate("/login");
            } else {
                toast.error("Sikertelen regisztráció! (Lehet foglalt az email?)");
            }
        } catch (error) {
            toast.error("Hálózati hiba.");
        }
    }

    return (
        <Container className="auth-container">
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={5}>
                    <Card className="auth-card">
                        <div className="auth-header">
                            <h2>Csatlakozz!</h2>
                            <p className="mb-0">Készítsd el saját receptkönyvedet</p>
                        </div>
                        <Card.Body className="p-4">
                            <Form onSubmit={handleSubmit}>
                                <FloatingLabel controlId="regUser" label="Felhasználónév" className="mb-3">
                                    <Form.Control name="username" type="text" placeholder="User" required />
                                </FloatingLabel>

                                <FloatingLabel controlId="regEmail" label="E-mail cím" className="mb-3">
                                    <Form.Control name="email" type="email" placeholder="name@example.com" required />
                                </FloatingLabel>

                                <Row>
                                    <Col md={6}>
                                        <FloatingLabel controlId="regPass" label="Jelszó" className="mb-3">
                                            <Form.Control name="password" type="password" placeholder="Password" required />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md={6}>
                                        <FloatingLabel controlId="regPassAgain" label="Jelszó ismét" className="mb-3">
                                            <Form.Control name="password_again" type="password" placeholder="Password" required />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                <div className="d-grid gap-2 mt-2">
                                    <Button type="submit" size="lg" className="custom-btn">
                                        Regisztráció
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="text-center p-3 bg-light border-0">
                            Már regisztráltál?{' '}
                            <span className="link-btn" onClick={() => navigate("/login")}>
                                Belépés
                            </span>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;