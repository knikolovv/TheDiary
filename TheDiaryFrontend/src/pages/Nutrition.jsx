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
                console.error("Could not fetch nutrition entries",error)
            }
        }
        fetchNutritionEntries();
    }, [])

    return (
        <Logbook
            title={"CalC"}
            extraDetailsByMonth={[]}
            entries={nutritionEntries}
        />
    )
}