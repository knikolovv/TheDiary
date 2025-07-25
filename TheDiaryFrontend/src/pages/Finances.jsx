import { useEffect, useState, useMemo } from "react"
import Logbook from "../components/Logbook"

export default function Finances() {
    const [financeEntries, setFinanceEntries] = useState([]);

    useEffect(() => {
        const fetchFinanceEntries = async () => {
            try {
                const response = await fetch(`http://localhost:8080/finance`);
                if (!response.ok) {
                    throw new Error("Could not fetch finance entries")
                }
                const data = await response.json();
                setFinanceEntries(data);
            } catch (error) {
                console.error("Could not fetch finances entries", error);
            }
        }
        fetchFinanceEntries();
    }, [])

    const extraDetailsByMonth = useMemo(() => {
        const map = {};

        for (const entry of financeEntries) {
            const [year, month] = entry.date.split("-");
            const monthKey = `${year}-${month}`;
            if (!map[monthKey]) map[monthKey] = [];

            map[monthKey].push(entry);
        }

        const result = {};
        for (const month in map) {
            const entries = map[month];
            const income = entries.filter(e => e.amount > 0).reduce((sum, e) => sum + e.amount, 0);
            const spent = entries.filter(e => e.amount < 0).reduce((sum, e) => sum + Math.abs(e.amount), 0);
            const net = income - spent;

            result[month] = [
                { name: "Income", value: income.toFixed(2), color: "rgba(2, 187, 178, 1)" },
                { name: "Monthly total", value: net.toFixed(2), color: "rgba(160, 158, 25, 1)" },
                { name: "Spent", value: spent.toFixed(2), color: "rgba(218, 47, 47, 1)" },
            ];
        }

        return result;
    }, [financeEntries]);

    const renderEntry = ((entry) =>
        <div
            style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                color: "rgb(255,255,255)",
            }}
        >
            <div>
                <div>{entry.counterparty}</div>
                <div style={{ fontSize: "0.8em", color: "gray" }}>
                    {entry.category.charAt(0) + entry.category.slice(1).toLowerCase()}
                </div>
            </div>
            <div style={{ marginLeft: "auto", paddingRight: 4 }}>
                {Number(entry.amount).toFixed(2)}$
            </div>
        </div>
    )

    return (
        <div style={{ paddingBottom: 30 }}>
            <Logbook
                title={"DesktopBank"}
                extraDetailsByMonth={extraDetailsByMonth}
                entries={financeEntries}
                renderEntry={renderEntry} />
        </div>
    )
}