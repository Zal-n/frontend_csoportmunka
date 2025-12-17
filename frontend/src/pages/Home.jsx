import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge, Pagination } from 'react-bootstrap';
import { API_BASE_URL, API_ENDPOINTS } from "../util/api";

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [pagination, setPagination] = useState({ totalPages: 1, total: 0 });
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecipes(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    async function fetchRecipes(targetPage) {
        try {
            const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_RECIPES}?page=${targetPage}&limit=12`);
            if (res.ok) {
                const result = await res.json();
                setRecipes(result.data || []);
                setPagination(result.pagination || { totalPages: 1, total: 0 });
            }
        } catch (error) {
            console.error(error);
            toast.error("Hálózati hiba!");
        }
    }

    const renderPaginationItems = () => {
        let items = [];
        const totalPages = pagination.totalPages;
        let start = Math.max(1, page - 5);
        let end = Math.min(totalPages, page + 5);

        for (let number = start; number <= end; number++) {
            items.push(
                <Pagination.Item 
                    key={number} 
                    active={number === page}
                    onClick={() => setPage(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }
        return items;
    };

    return (
        <div className="fade-in">
            {/* Fejléc Szekció - A te színátmeneteddel */}
            <div className="home-hero mb-5 shadow-sm">
                <Container className="text-center py-5">
                    <h1 className="display-5 fw-bold text-white">Szakácskönyvem</h1>
                    <p className="text-white-50">Fedezd fel a közösség legjobb receptjeit</p>
                </Container>
            </div>

            <Container className="pb-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold section-title">Friss kínálat</h2>
                    <Badge className="badge-custom bg-light">
                        {pagination.total} Recept
                    </Badge>
                </div>

                {recipes.length === 0 ? (
                    <Card className="auth-card text-center p-5 border-0">
                        <Card.Body>
                            <div className="fs-1 mb-3">🥘</div>
                            <h4 className="text-muted">Még nincs itt semmi finomság...</h4>
                        </Card.Body>
                    </Card>
                ) : (
                    <>
                        <Row xs={1} md={2} lg={3} className="g-4">
                            {recipes.map((recipe) => (
                                <Col key={recipe.id}>
                                    <Card className="h-100 auth-card recipe-hover-card border-0">
                                        <div className="recipe-img-box">
                                            <span className="recipe-main-emoji">🥗</span>
                                            <Badge className="recipe-cat-badge bg-light">
                                                {recipe.category}
                                            </Badge>
                                        </div>
                                        <Card.Body className="p-4">
                                            <Card.Title className="fw-bold mb-2">{recipe.name}</Card.Title>
                                            <Card.Text className="text-muted small text-truncate-3">
                                                {recipe.description}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className="bg-transparent border-0 p-4 pt-0">
                                            <Button 
                                                className="custom-btn w-100 rounded-pill py-2"
                                                onClick={() => navigate(`/recipe/${recipe.id}`)}
                                            >
                                                Megnézem
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        {/* Lapozó a te színeiddel */}
                        {pagination.totalPages > 1 && (
                            <div className="d-flex flex-column align-items-center mt-5">
                                <Pagination className="custom-pagination shadow-sm p-2 bg-white rounded-pill">
                                    <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
                                    <Pagination.Prev onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} />
                                    {renderPaginationItems()}
                                    <Pagination.Next onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))} disabled={page === pagination.totalPages} />
                                    <Pagination.Last onClick={() => setPage(pagination.totalPages)} disabled={page === pagination.totalPages} />
                                </Pagination>
                                <span className="text-muted mt-2 small">
                                    {page} / {pagination.totalPages} oldal
                                </span>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
}

export default Home;