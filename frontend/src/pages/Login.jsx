import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, FloatingLabel } from 'react-bootstrap';

function Login({ setIsLoggedIn }) {
    let navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const credential = e.target.credential.value;
        const password = e.target.password.value;
        console.log(credential, password)
        console.log(JSON.stringify({ credential: credential, password: password }))

        try {
            // FIX: Content-Type javítva
            const res = await fetch("https://api.cookbook.techtrove.ddns.net/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ credential: credential, password: password })
            });

            if (res.ok) {
                toast.success("Sikeres bejelentkezés! 🍲");
                if (setIsLoggedIn) setIsLoggedIn(true);
                navigate("/");
            } else {
                toast.error("Hibás adatok!");
            }
        } catch (err) {
            toast.error("Szerver hiba történt.");
        }
    }

    return (
        <Container className="auth-container">
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={5}>
                    <Card className="auth-card">
                        <div className="auth-header">
                            <h2>Üdv újra!</h2>
                            <p className="mb-0">Jelentkezz be a receptjeidhez</p>
                        </div>
                        <Card.Body className="p-4">
                            <Form onSubmit={handleSubmit}>
                                <FloatingLabel controlId="floatingInput" label="Email vagy Felhasználónév" className="mb-3">
                                    <Form.Control name="credential" type="text" placeholder="name@example.com" required />
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingPassword" label="Jelszó" className="mb-4">
                                    <Form.Control name="password" type="password" placeholder="Jelszó" required />
                                </FloatingLabel>

                                <div className="d-grid gap-2">
                                    <Button type="submit" size="lg" className="custom-btn">
                                        Bejelentkezés
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="text-center p-3 bg-light border-0">
                            Nincs még fiókod?{' '}
                            <span className="link-btn" onClick={() => navigate("/register")}>
                                Regisztrálj itt
                            </span>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;