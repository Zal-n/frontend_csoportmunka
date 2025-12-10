import { useState } from "react";
import { fetchWithAuth } from "../util/auth";
import { API_BASE_URL, API_ENDPOINTS } from "../util/api";
import { Form } from "react-bootstrap";

export default function RecipeForm() {
    const [ingredients, setIngredients] = useState([{}]);

    const addIngredient = () => {
        setIngredients([...ingredients, {}]);
    };

    async function handleSubmit(e){
        e.preventDefault();
        const recipe_name = e.target.recipe_name.value;
        console.log(ingredients)
        console.log(e.target.ingredientlist)

        try {
            /*const res = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.POST_RECIPE}`,{
                method:"POST",
                body: JSON.stringify({})
            })*/
        } catch (error) {
            
        }
    }
    
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <input type="text" placeholder="Recept neve" name="recipe_name" />

                <h3>Hozzávalók</h3>

<Form.ControlGroup>
{ingredients.map((_, index) => (
                    <div key={index} className="ingredient-block">
                        <input type="text" placeholder="Alapanyag" name="name"/>
                        <input type="text" placeholder="Mennyiség" name="amount"/>
                        <input type="text" placeholder="Mértékegség" name="unit"/>
                    </div>
                ))}
</Form.ControlGroup>

                    


                
                <button type="button" onClick={addIngredient}>
                    Hozzávaló hozzáadása
                </button>
                <button type="submit">Recept beküldése</button>
            </Form>


        </div>
    );
}