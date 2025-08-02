import { useState } from "react";
import FoodEntry from "../components/FoodEntry";

export default function LogFood() {
    const [clearFieldsTrigger, setClearFieldsTrigger] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleCreate = async (foodEntry) => {
        try {
            const response = await fetch("http://localhost:8080/food/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(foodEntry)
            })
            if (!response.ok) {
                throw new Error("Could not log food entry!");
            }
            setClearFieldsTrigger(prev => !prev);
            setSuccessMessage("Food saved successfully!");

            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            console.log("Could not log food entry", error)
        }
    }

    return (
        <FoodEntry onCreate={handleCreate} clearFieldsTrigger={clearFieldsTrigger} successMessage={successMessage}></FoodEntry>
    );
}