import { useNavigate } from "react-router-dom";
import FinanceTransaction from "../components/FinanceTransaction";

export default function LogFinanceTransaction() {

    const navigate = useNavigate();

    const handleCreate = async (financeEntry) => {
        try {
            const response = await fetch(`http://localhost:8080/finance/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(financeEntry),
            })
            if (!response.ok) {
                throw new Error("Could not create transaction!")
            }
            navigate("/finances")
        } catch (error) {
            console.error("Could not create transaction!", error)
        }
    }

    return (
        <FinanceTransaction componentMode="create" handleCreate={handleCreate}></FinanceTransaction>
    )
}
