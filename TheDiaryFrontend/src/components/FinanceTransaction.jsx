import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledButton from "./StyledButton";
import StyledField from "./StyledField";

export default function FinanceTransaction({ componentMode, entryData = null, handleCreate, handleEdit, handleDelete }) {
    const today = new Date().toISOString().split("T")[0];

    const [category, setCategory] = useState(entryData?.category || "");
    const [date, setDate] = useState(entryData?.date || today);
    const [counterparty, setCounterparty] = useState(entryData?.counterparty || "");
    const [amount, setAmount] = useState(entryData?.amount ?? "");
    const [paymentMethod, setPaymentMethod] = useState(entryData?.paymentMethod || "CARD");
    const [description, setDescription] = useState(entryData?.description || "");
    const [mode, setMode] = useState(componentMode);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const isViewMode = mode === "view";
    const isCreateMode = mode === "create";
    const isEditMode = mode === "edit";
    const isReadOnly = isViewMode;

    const categories = [
        "GROCERIES", "TRANSPORTATION", "RENT", "UTILITIES", "HEALTH",
        "ENTERTAINMENT", "CLOTHING", "ELECTRONICS", "EDUCATION",
        "TRAVEL", "WELLNESS", "OTHER",
    ];

    useEffect(() => {
        if (entryData) {
            setCategory(entryData.category || "");
            setDate(entryData.date || today);
            setCounterparty(entryData.counterparty || "");
            setAmount(entryData.amount ?? "");
            setPaymentMethod(entryData.paymentMethod || "CARD");
            setDescription(entryData.description || "");
        }
    }, [entryData, today]);

    const validateForm = () => {
        const newErrors = {};

        if (!counterparty.trim()) {
            newErrors.counterparty = "Counterparty must not be blank";
        }
        if (!category) {
            newErrors.category = "Category is required";
        }
        if (!amount) {
            newErrors.amount = "Amount can not be empty"
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div style={{
            border: "1px solid black",
            width: "50vw",
            marginTop: 32,
            minWidth: "550px",
            minHeight: "50vh",
            justifySelf: "center",
            borderRadius: 10,
            backgroundColor: "#C6D4E1",
            paddingBottom: 24
        }}>
            <style>
                {`
                .custom-input::placeholder {
                    color: black;
                    opacity:0.8;
                }
                .custom-input:focus::placeholder {
                     color: transparent;
                }
                .no-spinner::-webkit-outer-spin-button,
                .no-spinner::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }

                .no-spinner {
                  -moz-appearance: textfield;
                }
                `}
            </style>

            <div style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 36,
                marginBottom: 24,
            }}>
                Log a transaction
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
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <StyledField
                        disabled={isReadOnly}
                        placeholder="Counterparty*"
                        value={counterparty}
                        onChange={(e) => setCounterparty(e.target.value)}
                        className="custom-input"
                        extraStyle={{ width: "50%" }}
                    />
                    {errors.counterparty && (
                        <span style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>
                            {errors.counterparty}
                        </span>
                    )}
                </div>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <StyledField
                        as="select"
                        disabled={isReadOnly}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Choose category*</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category.charAt(0) + category.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </StyledField>
                    {errors.category && (
                        <span style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>
                            {errors.category}
                        </span>
                    )}
                </div>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <StyledField
                        type="number"
                        className="no-spinner custom-input"
                        disabled={isReadOnly}
                        placeholder="Amount*"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        extraStyle={{ width: "50%" }}
                    />
                    {errors.amount && (
                        <span style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>
                            {errors.amount}
                        </span>
                    )}
                </div>
                {isReadOnly ? (
                    <div style={{ fontSize: 16 }}>
                        <span>Payment Method: <strong>{paymentMethod}</strong></span>
                    </div>
                ) : (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                    }}>
                        <span>Payment Method:</span>
                        <label style={{ display: "flex", gap: 4 }}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="CARD"
                                checked={paymentMethod === "CARD"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Card
                        </label>
                        <label style={{ display: "flex", gap: 4 }}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="CASH"
                                checked={paymentMethod === "CASH"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Cash
                        </label>
                        <label style={{ display: "flex", gap: 4 }}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="CRYPTO"
                                checked={paymentMethod === "CRYPTO"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            Crypto
                        </label>
                    </div>
                )}
                <StyledField
                    disabled={isReadOnly}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    extraStyle={{ width: "50%" }}
                />
                <StyledField
                    as="textarea"
                    disabled={isReadOnly}
                    placeholder={isReadOnly ? "No Description" : "Description (Optional)"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="custom-input"
                    rows={7}
                    extraStyle={{
                        resize: "none",
                        width: "50%",
                        height: "100%",
                        gridColumn: "1 / span 2",
                    }}
                />
                <div style={{ gridColumn: "1 / span 2" }}>
                    <StyledButton
                        onClick={() => {
                            navigate("/finances")
                        }}
                    >
                        Cancel
                    </StyledButton>
                    {isViewMode && (
                        <>
                            <StyledButton
                                onClick={() => setMode("edit")}
                            >
                                Edit
                            </StyledButton>

                            <StyledButton
                                onClick={() => handleDelete(entryData.id)}
                            >
                                Delete
                            </StyledButton>
                        </>
                    )}
                    {isEditMode &&
                        <StyledButton
                            onClick={async () => {
                                if (!validateForm()) return;
                                await handleEdit({
                                    id: entryData.id,
                                    counterparty,
                                    category,
                                    amount: parseFloat(amount),
                                    paymentMethod,
                                    date,
                                    description
                                });
                                setMode("view");
                            }}
                        >
                            Save
                        </StyledButton>
                    }
                    {isCreateMode &&
                        <StyledButton
                            type="submit"
                            onClick={() => {
                                if (!validateForm()) return;
                                handleCreate({
                                    counterparty,
                                    category,
                                    amount: parseFloat(amount),
                                    paymentMethod,
                                    date,
                                    description
                                });
                            }}
                        >
                            Create
                        </StyledButton>
                    }
                </div>
            </div>
        </div >
    )
}