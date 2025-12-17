import { useState } from "react";
import { fetchWithAuth } from "../util/auth";
import { API_BASE_URL, API_ENDPOINTS } from "../util/api";
import { Form, Container, Row, Col, Card, Button, FloatingLabel, InputGroup } from "react-bootstrap";
import { toast } from 'react-toastify';

export default function RecipeForm() {
    // Kezdeti állapotban legyen legalább egy üres elem, hogy ne legyen üres a lista
    const [ingredients, setIngredients] = useState([{}]);
    const [instructions, setInstructions] = useState([{}]);

    // --- Hozzávalók kezelése ---
    const addIngredient = () => {
        setIngredients([...ingredients, {}]);
    };

    const removeIngredient = (index) => {
        if (ingredients.length > 1) {
            const list = [...ingredients];
            list.splice(index, 1);
            setIngredients(list);
        } else {
            toast.info("Legalább egy hozzávaló szükséges!");
        }
    };

    // --- Lépések kezelése ---
    const addInstructions = () => {
        setInstructions([...instructions, {}]);
    };

    const removeInstructions = (index) => {
        if (instructions.length > 1) {
            const list = [...instructions];
            list.splice(index, 1);
            setInstructions(list);
        } else {
            toast.info("Legalább egy lépés szükséges!");
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const formdata = new FormData(e.target);
        
        var ingredientList = []
        
        // Mivel a form inputok nevei azonosak (name="name"), a getAll tömböt ad vissza.
        // Fontos: Feltételezzük, hogy a sorrend megmarad a HTML struktúra alapján.
        const names = formdata.getAll('name');
        const amounts = formdata.getAll('amount');
        const units = formdata.getAll('unit');

        for (let i = 0; i < names.length; i++) {
            // Csak akkor adjuk hozzá, ha van neve az alapanyagnak
            if(names[i].trim() !== "") {
                ingredientList.push({
                    name: names[i],
                    amount: amounts[i],
                    unit: units[i]
                });
            }
        }

        // Lépések tisztítása (üres lépések kiszűrése)
        const stepsRaw = formdata.getAll('steps');
        const stepsClean = stepsRaw.filter(step => step.trim() !== "");

        const toReturn = {
            name: formdata.get('recipe_name'),
            description: formdata.get('description'),
            category: formdata.get('category'),
            ingredients: ingredientList,
            instructions: stepsClean
        }

        console.log(toReturn);
        
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.POST_RECIPE}`, {
                method: "POST",
                body: JSON.stringify(toReturn)
            });
            console.log(res)
            if (res.ok) {
                toast.success("Sikeres receptfeltöltés! 🍲");
                // Opcionális: Form ürítése siker esetén
                e.target.reset();
                setIngredients([{}]);
                setInstructions([{}]);
            } else {
                toast.error("Hiba történt a feltöltéskor.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Hálózati hiba!");
        }
    }

    return (
        <Container className="auth-container my-5">
            <Row className="justify-content-center w-100">
                <Col md={10} lg={8}>
                    <Card className="auth-card shadow-lg border-0">
                        <div className="auth-header">
                            <h2 className="mb-0">🍳 Új Recept Feltöltése</h2>
                            <small className="text-white-50">Oszd meg kedvenc ételeidet a közösséggel</small>
                        </div>
                        
                        <Card.Body className="p-4 bg-white">
                            <Form onSubmit={handleSubmit}>
                                {/* --- Alapadatok --- */}
                                <h5 className="text-muted mb-3">Alapadatok</h5>
                                <Row className="mb-3">
                                    <Col md={8}>
                                        <FloatingLabel controlId="recipeName" label="Recept neve" className="mb-3">
                                            <Form.Control type="text" placeholder="Pl. Rakott krumpli" name="recipe_name" required />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md={4}>
                                        <FloatingLabel controlId="category" label="Kategória" className="mb-3">
                                            <Form.Control type="text" placeholder="Pl. Főétel" name="category" required />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                <FloatingLabel controlId="desc" label="Rövid leírás / Történet" className="mb-4">
                                    <Form.Control as="textarea" placeholder="Leírás" name="description" style={{ height: '100px' }} required />
                                </FloatingLabel>

                                <hr className="my-4" />

                                {/* --- Hozzávalók --- */}
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="text-muted mb-0">Hozzávalók</h5>
                                    <Button variant="outline-success" size="sm" onClick={addIngredient} className="rounded-pill">
                                        + Új sor
                                    </Button>
                                </div>

                                {ingredients.map((_, index) => (
                                    <Row key={index} className="mb-2 align-items-center g-2 fade-in">
                                        <Col xs={12} md={5}>
                                            <Form.Control type="text" placeholder="Alapanyag (pl. liszt)" name="name" required />
                                        </Col>
                                        <Col xs={5} md={3}>
                                            <Form.Control type="number" step="0.1" placeholder="Mennyiség" name="amount" required />
                                        </Col>
                                        <Col xs={5} md={3}>
                                            <Form.Control type="text" placeholder="Egység (pl. dkg)" name="unit" required />
                                        </Col>
                                        <Col xs={2} md={1} className="text-center">
                                            {ingredients.length > 1 && (
                                                <Button variant="outline-danger" size="sm" onClick={() => removeIngredient(index)}>
                                                    🗑️
                                                </Button>
                                            )}
                                        </Col>
                                    </Row>
                                ))}

                                <hr className="my-4" />

                                {/* --- Elkészítés --- */}
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="text-muted mb-0">Elkészítés lépései</h5>
                                    <Button variant="outline-success" size="sm" onClick={addInstructions} className="rounded-pill">
                                        + Új lépés
                                    </Button>
                                </div>

                                {instructions.map((_, index) => (
                                    <div key={index} className="mb-3 fade-in">
                                        <InputGroup>
                                            <InputGroup.Text className="bg-light fw-bold">#{index + 1}</InputGroup.Text>
                                            <Form.Control 
                                                as="textarea" 
                                                placeholder="Mi a teendő ebben a lépésben?" 
                                                name="steps" 
                                                required 
                                                style={{ minHeight: '60px' }}
                                            />
                                            {instructions.length > 1 && (
                                                <Button variant="outline-danger" onClick={() => removeInstructions(index)}>
                                                    Törlés
                                                </Button>
                                            )}
                                        </InputGroup>
                                    </div>
                                ))}

                                {/* --- Beküldés --- */}
                                <div className="d-grid gap-2 mt-5">
                                    <Button type="submit" size="lg" className="custom-btn text-white">
                                        Recept Beküldése 📤
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}