import { useParams } from "react-router-dom";
import FinanceTransaction from "../components/FinanceTransaction";
import { useEffect, useState } from "react";

export default function ViewFinanceTransaction() {
    const { id } = useParams();
    const [entryData, setEntryData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/finance/${id}`)
            .then(result => result.json())
            .then(setEntryData)
            .catch(error => console.error("Could not fetch entry", error));
    }, [id]);

    return (
        <FinanceTransaction mode="view" entryData={entryData} />
    )
}