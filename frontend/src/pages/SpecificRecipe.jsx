import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge, Pagination } from 'react-bootstrap';
import { API_BASE_URL, API_ENDPOINTS } from "../util/api";

function SpecificRecipe({recipeId}){
    const [specific_recipe, setSpecific_Recipe] = useState([]);

    useEffect(() => {
        fetchRecipeById;
    }, []);
    
    async function fetchRecipeById(){
        try {
            const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_RECIPE_BY_ID}?id=${recipeId}`);
            if(res.ok){
                const result = await res.json();
                setSpecific_Recipe(result.data);
            }
        } catch (error) {
            console.error(error);
            toast.error("Hálózati hiba!");
        }
    }

    return(
        <>
        <h1>Recept</h1>
        {specific_recipe.map((recipe) => (
            <div>
                <p>{recipe.name}</p>
                <p>{recipe.category}</p>
                <p>{recipe.ingredients}</p>
                <p>{recipe.instructions}</p>
            </div>
        ))}
        </>
    )
}

export default SpecificRecipe;