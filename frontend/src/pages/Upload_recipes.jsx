import { useState } from "react";
import { fetchWithAuth } from "../util/auth";
import { API_BASE_URL, API_ENDPOINTS } from "../util/api";
import { Form } from "react-bootstrap";
import { toast } from 'react-toastify';

export default function RecipeForm() {
    const [ingredients, setIngredients] = useState([{}]);

    const addIngredient = () => {
        setIngredients([...ingredients, {}]);
    };

    const [instructions, setInstructions] = useState([{}]);

    const addInstructions = () => {
        setInstructions([...instructions, {}]);
    };
    
    async function handleSubmit(e) {
        const formdata = new FormData(e.target);
        e.preventDefault();
        var ingredientList = []
        for (let i = 0; i < formdata.getAll('name').length; i++) {
            ingredientList.push({
                name: formdata.getAll('name')[i],
                amount: formdata.getAll('amount')[i],
                unit: formdata.getAll('unit')[i]
            })
        }
        

        const toReturn = {
            name: formdata.get('recipe_name'),
            description: formdata.get('description'),
            category: formdata.get('category'),
            ingredients: ingredientList,
            instructions: formdata.getAll('steps')
        }

        console.log(toReturn);
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}${API_ENDPOINTS.POST_RECIPE}`,{
                method:"POST",
                body: JSON.stringify(toReturn)
            });

            if(res.ok){
                toast.success("Sikeres receptfeltöltés!")
            }
        } catch (error) { 
            console.log(error);
            toast.error("Hibás receptfeltöltés!")
        }
        
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <input type="text" placeholder="Recept neve" name="recipe_name" />
                <input type="text" placeholder="Kategória" name="category" />
                <input type="text" placeholder="Leírás" name="description" />

                <h3>Hozzávalók</h3>

                {ingredients.map((_, index) => (
                    <div key={index} className="ingredient-block">
                        <input type="text" placeholder="Alapanyag" name="name" />
                        <input type="text" placeholder="Mennyiség" name="amount" />
                        <input type="text" placeholder="Mértékegség" name="unit" />
                    </div>
                ))}

                <button type="button" onClick={addIngredient}>
                    Hozzávaló hozzáadása
                </button>

                <h3>Elkészítés</h3>

                {instructions.map((_, index) => (
                    <div key={index} className="ingredient-block">
                        <input type="text" placeholder="Lépések" name="steps" />
                    </div>
                ))}

                <button type="button" onClick={addInstructions}>
                    Lépés hozzáadása
                </button>

                <button type="submit">Recept beküldése</button>
            </Form>
        </div>


    );
}