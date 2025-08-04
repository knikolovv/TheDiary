import { useNavigate, useParams } from "react-router-dom";
import MealEntry from "../components/MealEntry";
import { useEffect, useState } from "react";

export default function ViewMeal() {
    const { id } = useParams();
    const [entryData, setEntryData] = useState(null);
    const [mode, setMode] = useState("view");

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/nutrition/${id}`)
            .then(result => result.json())
            .then(setEntryData)
            .catch(error => console.error("Could not fetch meal entry", error));
    }, [id]);

    const handleEdit = async (meal) => {
        try {
            const response = await fetch(`http://localhost:8080/nutrition/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(meal)
            });
            if (!response.ok) {
                throw new Error(`Could not edit meal entry with id - ${id}`)
            }
            setMode("view")
            navigate("/nutrition");
        } catch (error) {
            console.error("Could not edit meal entry", error)
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/nutrition/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) {
                throw new Error(`Could not delete meal entry with id - ${id}`)
            }
            navigate("/nutrition");
        } catch (error) {
            console.error("Could not delete meal entry", error)
        }
    }

    return (
        <MealEntry componentMode={mode} entryData={entryData} handleEdit={handleEdit} handleEditClick={() => setMode("edit")} handleDelete={handleDelete} />
    )
}