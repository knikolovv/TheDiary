import { useEffect, useState } from "react";
import Logbook from "../components/Logbook";

export default function Nutrition() {
    const [nutritionEntries, setNutritionEntries] = useState([]);

    useEffect(() => {
        const fetchNutritionEntries = async () => {
            try {
                const response = await fetch(`http://localhost:8080/nutrition`, {
                    method: "GET"
                });
                if (!response.ok) {
                    throw new Error("Could not fetch nutrition entries")
                }
                const data = await response.json();
                setNutritionEntries(data);
            } catch (error) {
                console.error("Could not fetch nutrition entries", error)
            }
        }
        fetchNutritionEntries();
    }, [])

    const renderEntry = (entry) => {
        return (
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    color: "rgb(255,255,255)",
                    padding: 5
                }}
            >
                <div style={{ width: "15%" }}>{entry.mealType}</div>
                <div style={{ display: "flex", marginLeft: "20px", fontSize: "0.9rem", alignItems: "center" }}>
                    Calories: {entry.totalCalories.toFixed(2)} kcal |
                    Carbs: {entry.totalCarbs.toFixed(2)}g |
                    Protein: {entry.totalProteins.toFixed(2)}g |
                    Fats: {entry.totalFats.toFixed(2)}g |
                    Saturated Fats: {entry.totalSaturatedFats.toFixed(2)}g
                </div>
            </div>
        );
    };

    return (
        <Logbook
            title={"CalC"}
            entries={nutritionEntries}
            renderEntry={renderEntry}
            calculateTotal={(entry) => entry.totalCalories}
            unit=" kcal"
        />
    )
}