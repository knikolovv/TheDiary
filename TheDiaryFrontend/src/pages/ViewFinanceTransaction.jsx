import { useNavigate, useParams } from "react-router-dom";
import FinanceTransaction from "../components/FinanceTransaction";
import { useEffect, useState } from "react";

export default function ViewFinanceTransaction() {
    const { id } = useParams();
    const [entryData, setEntryData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/finance/${id}`)
            .then(result => result.json())
            .then(setEntryData)
            .catch(error => console.error("Could not fetch transaction entry", error));
    }, [id]);

    const handleEdit = async (financeEntry) => {
        try {
            const response = await fetch(`http://localhost:8080/finance/${financeEntry.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(financeEntry),
            })
            if (!response.ok) {
                throw new Error("Could not edit transaction!")
            }
        } catch (error) {
            console.error("Could not edit transaction!", error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/finance/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                throw new Error(`Could not delete transcation with id - ${id}`)
            }
            navigate("/finances");
        } catch (error) {
            console.error("Could not delete transcation!", error)
        }
    }

    return (
        <FinanceTransaction componentMode={"view"} entryData={entryData} handleEdit={handleEdit} handleDelete={handleDelete} />
    )
}