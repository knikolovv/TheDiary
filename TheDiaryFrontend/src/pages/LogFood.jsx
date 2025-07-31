import { useState } from "react";
import FoodEntry from "../components/FoodEntry";

export default function LogFood() {
    const [clearFieldsTrigger, setClearFieldsTrigger] = useState(false);


    const handleCreate = async (foodEntry) => {
        console.log("Sending foodEntry:", foodEntry);
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
        } catch (error) {
            console.log("Could not log food entry", error)
        }
    }

    return (
        <FoodEntry onCreate={handleCreate} clearFieldsTrigger={clearFieldsTrigger}></FoodEntry>
    );
}