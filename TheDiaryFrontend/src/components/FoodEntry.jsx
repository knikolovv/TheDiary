import { useState } from "react";
import FoodSearchField from "./FoodSearchField";

export default function FoodEntry() {
    const [calories, setCalories] = useState();
    return (
        <div style={{
            border: "1px solid black",
            width: "50vw",
            marginTop: 32,
            minWidth: "550px",
            minHeight: "50vh",
            justifySelf: "center",
            borderRadius: 10,
            backgroundColor: "rgba(206, 184, 85, 1)"
        }}>
            <div style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 36,
                marginBottom: 24,
            }}>
                Log a meal
            </div>
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                width: "80%",
                justifySelf: "center",
                justifyItems: "center"
            }}>
                <div style={{ gridColumn: 1}}>
                    <FoodSearchField />
                </div>
                <div style={{ gridColumn: 2 }}>
                    <input
                        value={calories}
                        placeholder="Calories"
                        style={{
                            width: "100%",
                            padding: "8px",
                            boxSizing: "border-box"
                        }}
                    />
                </div>
            </div>
        </div>
    )
}