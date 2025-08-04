import MealEntry from "../components/MealEntry";
import { useNavigate } from "react-router-dom";

export default function LogMeal() {
    const navigate = useNavigate();

    const saveMeal = async (meal) => {
        console.log(meal);
        try {
            const response = await fetch(`http://localhost:8080/nutrition/meal/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(meal),
            });

            if (!response.ok) throw new Error("Cannot save meal");

            navigate("/nutrition");
        } catch (error) {
            console.error("Error saving meal:", error);
        }
    };

    return (
        <MealEntry handleSave={saveMeal} />
    )
}