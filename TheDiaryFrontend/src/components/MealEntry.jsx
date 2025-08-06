import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledButton from "./StyledButton";
import StyledField from "./StyledField";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';

export default function MealEntry({
    componentMode,
    entryData = null,
    handleSave,
    handleEdit,
    handleEditClick,
    handleDelete
}) {
    const [mealType, setMealType] = useState(entryData?.mealType || "");
    const today = new Date().toISOString().split("T")[0];
    const [date, setDate] = useState(entryData?.date || today);
    const [mealFoodEntries, setMealFoodEntries] = useState(entryData?.mealFoodEntries || [
        { food: "", servingSize: "" }
    ]);
    const [suggestions, setSuggestions] = useState({});
    const [selectedFoods, setSelectedFoods] = useState({});
    const [totals, setTotals] = useState(null);
    const debounceTimer = useRef(null);

    const readOnly = componentMode === "view";

    const navigate = useNavigate();

    const mealTypes = [
        "BREAKFAST", "LUNCH", "DINNER", "SNACK"
    ];

    useEffect(() => {
        if (entryData) {
            setMealType(entryData.mealType);
            setDate(entryData.date);
            setMealFoodEntries(
                entryData.mealFoods?.map((mf) => ({
                    food: mf.foodEntry.foodName,
                    servingSize: mf.servingSize
                })) || [{ food: "", servingSize: "" }]
            );
            setSelectedFoods(
                (entryData.mealFoods || []).reduce((accumulator, mealFoodEntry, index) => {
                    accumulator[index] = mealFoodEntry.foodEntry;
                    return accumulator;
                }, {})
            );
            setTotals({
                calories: entryData.totalCalories,
                carbs: entryData.totalCarbs,
                protein: entryData.totalProteins,
                fat: entryData.totalFats,
                satFat: entryData.totalSaturatedFats
            });
        }
    }, [entryData]);

    const addFoodEntry = () => {
        setMealFoodEntries([...mealFoodEntries, { food: "", servingSize: "" }]);
    };

    const updateFoodEntry = (index, field, value) => {
        const updatedEntries = [...mealFoodEntries];
        updatedEntries[index][field] = value;
        setMealFoodEntries(updatedEntries);
    };

    const fetchSuggestions = async (index, query) => {
        if (query.length < 2) {
            setSuggestions((prev) => ({ ...prev, [index]: [] }));
            return;
        }
        const res = await fetch(`/food/search?name=${query}`);
        const data = await res.json();
        setSuggestions((prev) => ({ ...prev, [index]: data }));
    };


    const handleFoodInputChange = (index, value) => {
        updateFoodEntry(index, "food", value);

        if (debounceTimer.current) clearTimeout(debounceTimer.current);

        debounceTimer.current = setTimeout(() => {
            fetchSuggestions(index, value);
        }, 250);
    };

    const selectFood = (index, food) => {
        updateFoodEntry(index, "food", food.foodName);

        setSelectedFoods((prev) => ({
            ...prev,
            [index]: food,
        }));

        setSuggestions((prev) => ({
            ...prev,
            [index]: []
        }));
    };

    const calculateMacros = () => {
        let totals = {
            calories: 0,
            carbs: 0,
            protein: 0,
            fat: 0,
            satFat: 0
        };

        mealFoodEntries.forEach((entry, index) => {
            const food = selectedFoods[index];
            const serving = parseFloat(entry.servingSize) || 0;

            if (food) {
                const factor = serving / 100;
                totals.calories += food.foodCaloriesPer100g * factor;
                totals.carbs += food.carbohydrates * factor;
                totals.protein += food.proteins * factor;
                totals.fat += food.fats * factor;
                totals.satFat += food.saturatedFats * factor;
            }
        });
        return totals;
    };

    const handleSaveMeal = () => {
        const mealFoods = mealFoodEntries
            .map((entry, index) => {
                const food = selectedFoods[index];
                const servingSize = parseFloat(entry.servingSize);

                if (!food || isNaN(servingSize) || servingSize <= 0) return null;

                return {
                    foodEntry: { id: food.id },
                    servingSize,
                };
            })
            .filter(Boolean);

        const totals = calculateMacros();

        const meal = {
            mealType,
            date,
            mealFoods,
            totalCalories: totals?.calories || 0,
            totalCarbs: totals?.carbs || 0,
            totalProteins: totals?.protein || 0,
            totalFats: totals?.fat || 0,
            totalSaturatedFats: totals?.satFat || 0,
        };
        if (handleSave) {
            handleSave(meal);
        } else if (handleEdit) {
            handleEdit(meal);
        };
    }

    return (
        <div style={{
            border: "1px solid black",
            width: "55vw",
            marginTop: 32,
            minWidth: "600px",
            minHeight: "600px",
            justifySelf: "center",
            justifyItems: "center",
            borderRadius: 10,
            backgroundColor: "#C6D4E1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <div style={{
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
                    justifyItems: "center",
                }}
            >
                <StyledField
                    disabled={readOnly}
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
                    disabled={readOnly}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    extraStyle={{ width: "50%" }}
                />
            </div>
            {mealFoodEntries.map((entry, index) => (
                <div style={{
                    display: "flex",
                    width: "85%",
                    height: "5vh",
                    minHeight: "30px",
                    margin: 20
                }}>
                    <div key={index} style={{
                        display: "flex",
                        backgroundColor: "#44749D",
                        width: "100%",
                        borderRight: "1px solid black",
                        borderRadius: 5
                    }}>
                        <div style={{ position: "relative", width: "25%" }}>
                            <StyledField
                                extraStyle={{
                                    width: "100%",
                                    height: "100%",
                                    border: "none"
                                }}
                                disabled={readOnly}
                                placeholder="Food"
                                value={entry.food}
                                onChange={(e) => handleFoodInputChange(index, e.target.value)}
                                className="custom-input"
                            />
                            {suggestions[index]?.length > 0 && (
                                <div style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: 0,
                                    right: 0,
                                    backgroundColor: "white",
                                    border: "1px solid #ccc",
                                    zIndex: 1000,
                                    maxHeight: "150px",
                                    overflowY: "auto"
                                }}>
                                    {suggestions[index].map((food) => (
                                        <div
                                            key={food.id}
                                            onClick={() => selectFood(index, food)}
                                            style={{ padding: "8px", cursor: "pointer" }}
                                        >
                                            {food.foodName}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div style={{
                            display: "flex",
                            width: "70%",
                            alignItems: "center",
                            justifyContent: "center",
                            borderLeft: "1px solid black",
                            padding: 10,
                            gap: 10
                        }}>
                            {selectedFoods[index] ? (
                                <>
                                    <span>{selectedFoods[index].foodCaloriesPer100g} kcal</span>
                                    <span>C: {selectedFoods[index].carbohydrates}</span>
                                    <span>P: {selectedFoods[index].proteins}</span>
                                    <span>F: {selectedFoods[index].fats}</span>
                                    <span>Sf: {selectedFoods[index].saturatedFats}</span>
                                </>
                            ) : (
                                "Macros"
                            )}
                        </div>
                        <div style={{
                            width: "25%",
                            height: "100%",
                            borderLeft: "1px solid black",
                            marginLeft: "auto"
                        }}>
                            <StyledField
                                extraStyle={{
                                    width: "100%",
                                    height: "100%",
                                    border: "none",
                                }}
                                disabled={readOnly}
                                placeholder="Serving Size"
                                type="number"
                                value={entry.servingSize}
                                onChange={(e) => updateFoodEntry(index, "servingSize", e.target.value)}
                                className="no-spinner custom-input"
                            />
                        </div>

                    </div>
                    <div style={{ alignContent: "center" }}>
                        {!readOnly && (
                            <DeleteIcon
                                style={{
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                }}
                                onClick={() => setMealFoodEntries(prev => prev.filter((_, i) => i !== index))}
                            />
                        )}
                    </div>
                </div>
            ))}
            <div style={{
                width: "80%",
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 20
            }}>
                {!readOnly && <div
                    style={{
                        border: "2px solid black",
                        borderRadius: "50%",
                        height: "2vw",
                        width: "2vw",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        backgroundColor: "inherit",
                        transition: "background-color 0.2s",
                    }}
                    onClick={addFoodEntry}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#44749D"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "inherit"}
                >
                    <AddIcon fontSize="medium" />
                </div>
                }
            </div>

            <div></div>
            {totals && (
                <div style={{
                    marginTop: "auto",
                    padding: 15,
                    width: "80%",
                    backgroundColor: "#44749D",
                    border: "1px solid black",
                    borderRadius: 8,
                    fontWeight: "bold",
                    textAlign: "center",
                }}>
                    Total: {(totals.calories ?? 0).toFixed(1)} kcal |
                    Carbs: {(totals.carbs ?? 0).toFixed(1)}g |
                    Protein: {(totals.protein ?? 0).toFixed(1)}g |
                    Fats: {(totals.fat ?? 0).toFixed(1)}g |
                    Saturated fats: {(totals.satFat ?? 0).toFixed(1)}g
                </div>
            )}
            <div style={{
                marginTop: "auto",
                paddingBottom: 20,
            }}>

                {!readOnly && (
                    <>
                        <div style={{
                            marginTop: "auto",
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <StyledButton onClick={() => {
                                setTotals(calculateMacros);
                            }}>
                                Calculate Macros
                            </StyledButton>
                        </div>
                        <StyledButton onClick={handleSaveMeal}>
                            Save
                        </StyledButton>
                    </>
                )}

                {readOnly &&
                    <>
                        <StyledButton onClick={handleEditClick}>
                            Edit
                        </StyledButton>
                        <StyledButton onClick={handleDelete}>
                            Delete
                        </StyledButton>
                    </>
                }
                <StyledButton onClick={() => navigate("/nutrition")}>Cancel</StyledButton>
            </div>
        </div >
    )
}