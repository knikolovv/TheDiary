import { useEffect, useState } from "react";
import FoodSearchField from "./FoodSearchField";
import StyledButton from "./StyledButton";
import { useNavigate } from "react-router-dom";
import StyledField from "./StyledField";

export default function FoodEntry({ onCreate, clearFieldsTrigger, successMessage }) {
    const [foodName, setFoodName] = useState("")
    const [calories, setCalories] = useState("");
    const [carbohydrates, setCarbohydrates] = useState("");
    const [proteins, setProteins] = useState("");
    const [fats, setFats] = useState("");
    const [saturatedFats, setSaturatedFats] = useState("");

    const navigate = useNavigate();

    const setFieldsOnSearchSelect = (item) => {
        setFoodName(item.product_name || "");
        setCalories(item.nutriments["energy-kcal_100g"] || "");
        setCarbohydrates(item.nutriments.carbohydrates_100g || "");
        setProteins(item.nutriments.proteins_100g || "");
        setFats(item.nutriments.fat_100g || "");
        setSaturatedFats(item.nutriments["saturated-fat_100g"] || "");
    };

    useEffect(() => {
        setFoodName("");
        setCalories("");
        setCarbohydrates("");
        setProteins("");
        setFats("");
        setSaturatedFats("");
    }, [clearFieldsTrigger]);

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
                Log food
            </div>
            <div style={{
                width: "80%",
                justifySelf: "center",
                justifyItems: "center",
                textAlign: "center",
            }}>
                <span style={{ fontSize: "24px" }}>
                    Search for food through{" "}
                    <a
                        href="https://world.openfoodfacts.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            textDecoration: "none",
                            color: "blue",
                        }}
                    >
                        Open Food Facts
                    </a>
                </span>
                <span style={{ display: "block", color: "rgba(70, 63, 63, 1)" }}>
                    It takes a bit of time
                </span>
                <div style={{ gridColumn: "1 / span 2", margin: 24 }}>

                    <FoodSearchField onSelect={(item) => setFieldsOnSearchSelect(item)} />
                </div>
                <span style={{ display: "block", fontSize: "24px" }}>or type it manually</span>

                <div style={{
                    margin: 24,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    width: "100%",
                    gap: "24px",
                    justifyItems: "center",
                }}>
                    <StyledField
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        placeholder="Food name"
                    />
                    <StyledField
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        placeholder="Calories per 100 grams"
                    />

                    <StyledField
                        value={carbohydrates}
                        onChange={(e) => setCarbohydrates(e.target.value)}
                        placeholder="Carbohydrates per 100 grams"
                    />
                    <StyledField
                        value={proteins}
                        onChange={(e) => setProteins(e.target.value)}
                        placeholder="Protein per 100 grams"
                    />
                    <StyledField
                        value={fats}
                        onChange={(e) => setFats(e.target.value)}
                        placeholder="Fats per 100 grams"
                    />
                    <StyledField
                        value={saturatedFats}
                        onChange={(e) => setSaturatedFats(e.target.value)}
                        placeholder="Saturated fats per 100 grams"
                    />
                </div>
                <div>
                    {successMessage}
                </div>
                <div>
                    <StyledButton onClick={() => navigate("/nutrition")}>
                        Cancel
                    </StyledButton>
                    <StyledButton
                        onClick={() => onCreate({
                            foodName,
                            foodCaloriesPer100g: calories,
                            carbohydrates,
                            proteins,
                            fats,
                            saturatedFats
                        })}>
                        Save
                    </StyledButton>
                </div>
            </div>
        </div >
    )
}