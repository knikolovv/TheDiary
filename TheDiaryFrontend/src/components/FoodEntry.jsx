import { useState } from "react";
import FoodSearchField from "./FoodSearchField";
import { useNavigate } from "react-router-dom";
import StyledButton from "./StyledButton";

export default function FoodEntry(onCreate) {
    const [foodName, setFoodName] = useState()
    const [calories, setCalories] = useState();
    const [carbohydrates, setCarbohydrates] = useState();
    const [protein, setProtein] = useState();
    const [fats, setFats] = useState();
    const [saturatedFats, setSaturatedFats] = useState();
    const [isReadOnly, setIsReadOnly] = useState(false);

    const navigate = useNavigate();

    const inputFieldStyle = (extraStyle = {}) => ({
        backgroundColor: "transparent",
        border: "1px solid black",
        borderRadius: 4,
        padding: "12px 16px",
        color: "black",
        fontSize: 16,
        outline: "none",
        ...extraStyle,
    });

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
                Log food
            </div>
            <div>

            </div>
            <div style={{
                width: "80%",
                justifySelf: "center",
                justifyItems: "center",
                textAlign: "center",
            }}>
                <text style={{ fontSize: "24px" }}>Search for food through Open Food Facts</text>
                <br></br>
                <text style={{color:"rgba(70, 63, 63, 1)"}}>It takes a bit of time</text>
                <div style={{ gridColumn: "1 / span 2", margin: 24 }}>

                    <FoodSearchField searchFieldStyle={inputFieldStyle()} />
                </div>
                <text style={{ fontSize: "24px" }}>or type it manually</text>
                <div style={{
                    margin: 24,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    width: "100%",
                    gap: "24px",
                    justifyItems: "center",
                }}>
                    <input
                        disabled={isReadOnly}
                        value={foodName}
                        placeholder="Food name"
                        style={inputFieldStyle({ width: "50%" })}
                    />
                    <input
                        disabled={isReadOnly}
                        value={calories}
                        placeholder="Calories per 100 grams"
                        style={inputFieldStyle({ width: "50%" })}
                    />

                    <input
                        disabled={isReadOnly}
                        value={carbohydrates}
                        placeholder="Carbohydrates per 100 grams"
                        style={inputFieldStyle({ width: "50%" })}
                    />
                    <input
                        disabled={isReadOnly}
                        value={protein}
                        placeholder="Protein per 100 grams"
                        style={inputFieldStyle({ width: "50%" })}
                    />
                    <input
                        disabled={isReadOnly}
                        value={fats}
                        placeholder="Fats per 100 grams"
                        style={inputFieldStyle({ width: "50%" })}
                    /><input
                        disabled={isReadOnly}
                        value={saturatedFats}
                        placeholder="Saturated fats per 100 grams"
                        style={inputFieldStyle({ width: "50%" })}
                    />
                </div>
                <div>
                    <StyledButton onClick={() => navigate("/nutrition")}>
                        Cancel
                    </StyledButton>
                    <StyledButton>
                        Save
                    </StyledButton>
                </div>
            </div>
        </div>
    )
}