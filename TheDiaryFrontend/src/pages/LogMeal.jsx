import { useState } from "react";
import StyledField from "../components/StyledField";

export default function LogMeal() {
    const [mealType, setMealType] = useState("");
    const today = new Date().toISOString().split("T")[0];
    const [date, setDate] = useState(today);

    const mealTypes = [
        "BREAKFAST", "LUNCH", "DINNER", "SNACK"
    ];

    return (
        <div style={{
            border: "1px solid black",
            width: "50vw",
            marginTop: 32,
            minWidth: "550px",
            minHeight: "50vh",
            justifySelf: "center",
            borderRadius: 10,
            backgroundColor: "#C6D4E1"
        }}>
            <div style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 36,
                marginBottom: 24,
            }}>
                Log Meal
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px",
                    width: "80%",
                    justifySelf: "center",
                    justifyItems: "center",
                }}
            >
                <StyledField
                    as="select"
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                >
                    <option value="">Choose meal type*</option>
                    {mealTypes.map((mealType) => (
                        <option key={mealType} value={mealType}>
                            {mealType.charAt(0) + mealType.slice(1).toLowerCase()}
                        </option>
                    ))}
                </StyledField>
                <StyledField
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    extraStyle={{ width: "50%" }}
                />
            </div>
        </div>

    )
}