import './Main.css'
import { useState } from 'react';

export default function Main(){
    //calling use state to store ingredients array with starting value empty
    const [ingredients, setIngredients] = useState([]);

    //copying array to a new array
    const ingredientsMap = ingredients.map(ingredient => (
            <li key={ingredient}>{ingredient}</li>
        )
    )

    //setting ingredients to the array using the function and using previous array and adding new element to it
    function HandleSubmit(formData){
        const newIngredient = formData.get("ingredient")
        setIngredients(prev => [...prev, newIngredient])
    }

    return(
        <main>
            <form action={HandleSubmit} className="addingredient-form">
                <input  
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add Ingredient</button>
            </form>

            <ul>
                {ingredientsMap}
            </ul>
        </main>
    )
}
