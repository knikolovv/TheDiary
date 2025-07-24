import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FinanceTransaction({ mode = "create", entryData = null, handleCreate }) {
    const today = new Date().toISOString().split("T")[0];

    const [category, setCategory] = useState(entryData?.category || "");
    const [date, setDate] = useState(entryData?.date || today);
    const [counterparty, setCounterparty] = useState(entryData?.counterparty || "");
    const [amount, setAmount] = useState(entryData?.amount ?? "");
    const [paymentMethod, setPaymentMethod] = useState(entryData?.paymentMethod || "CARD");
    const [description, setDescription] = useState(entryData?.description || "");

    useEffect(() => {
        if (entryData) {
            setCategory(entryData.category || "");
            setDate(entryData.date || today);
            setCounterparty(entryData.counterparty || "");
            setAmount(entryData.amount ?? "");
            setPaymentMethod(entryData.paymentMethod || "CARD");
            setDescription(entryData.description || "");
        }
        console.log(entryData)
    }, [entryData]);

    const navigate = useNavigate();

    const isViewMode = mode === "view";
    const isCreateMode = mode === "create";
    const isReadOnly = isViewMode;

    const categories = [
        "GROCERIES", "TRANSPORTATION", "RENT", "UTILITIES", "HEALTH",
        "ENTERTAINMENT", "CLOTHING", "ELECTRONICS", "EDUCATION",
        "TRAVEL", "WELLNESS", "OTHER",
    ];

    const buttonStyle = {
        marginTop: 24,
        backgroundColor: "rgba(56, 53, 53, 1)",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        padding: "12px 24px",
        fontSize: 16,
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        marginLeft: 5,
        marginRight: 5,
    }

    return (
        <div style={{
            border: "1px solid black",
            width: "50vw",
            marginTop: 32,
            minWidth: "500px",
            minHeight: "50vh",
            justifySelf: "center",
            borderRadius: 10,
            backgroundColor: "#706f6fff",
            padding: 24,
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
                    justifyItems: "center"
                }}
            >
                <input
                    disabled={isReadOnly}
                    placeholder="Counterparty"
                    value={counterparty}
                    onChange={(e) => setCounterparty(e.target.value)}
                    className="custom-input"
                    style={{
                        backgroundColor: "transparent",
                        border: "1px solid black",
                        borderRadius: 4,
                        padding: "12px 16px",
                        color: "black",
                        fontSize: 16,
                        outline: "none",
                        width: "50%",
                    }}
                />
                <select
                    disabled={isReadOnly}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                        padding: "12px 16px",
                        fontSize: 16,
                        backgroundColor: "transparent",
                        border: "1px solid black",
                        borderRadius: 4,
                        width: "50%",
                        color: "black",
                    }}
                >
                    <option value="">Choose category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category.charAt(0) + category.slice(1).toLowerCase()}
                        </option>
                    ))}
                </select>
                <input
                    disabled={isReadOnly}
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="custom-input"
                    style={{
                        backgroundColor: "transparent",
                        border: "1px solid black",
                        borderRadius: 4,
                        padding: "12px 16px",
                        color: "black",
                        fontSize: 16,
                        outline: "none",
                        width: "50%",
                    }}
                />
                {isReadOnly ? (
                    <div style={{ fontSize: 16, gridColumn: "2" }}>
                        <span>Payment Method: <strong>{paymentMethod}</strong></span>
                    </div>
                ) : (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        gridColumn: '2',
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
                    </div>
                )}
                <input
                    disabled={isReadOnly}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                        padding: "12px 16px",
                        fontSize: 16,
                        backgroundColor: "transparent",
                        border: "1px solid black",
                        borderRadius: 4,
                        width: "50%",
                        color: "black",
                    }}
                />
                <textarea
                    disabled={isReadOnly}
                    placeholder={isReadOnly ? "No Description" : "Description (Optional)"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="custom-input"
                    rows={7}
                    style={{
                        backgroundColor: "transparent",
                        border: "1px solid black",
                        borderRadius: 4,
                        rows: 10,
                        padding: "12px 16px",
                        color: "black",
                        fontSize: 16,
                        resize: "none",
                        width: "50%",
                        height: '100%',
                        gridColumn: "1 / span 2",
                    }}
                />
                <div style={{ gridColumn: "1 / span 2" }}>
                    <button
                        onClick={() => {
                            navigate("/finances")
                        }}
                        style={buttonStyle}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = "rgba(39, 35, 35, 1)";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = "rgba(56, 53, 53, 1)";
                        }}>
                        Cancel
                    </button>
                    {!isViewMode && <button
                        type="submit"
                        onClick={() => handleCreate({
                            counterparty,
                            category,
                            amount: parseFloat(amount),
                            paymentMethod,
                            date,
                            description
                        })}
                        style={buttonStyle}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = "rgba(39, 35, 35, 1)";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = "rgba(56, 53, 53, 1)";
                        }}>
                        Create
                    </button>
                    }
                </div>
            </div>
        </div >
    )
}