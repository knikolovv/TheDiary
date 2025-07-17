import Logbook from "../components/Logbook"

export default function Finances() {
    return (
        <Logbook 
        title={'PocketBank'}
        entries={[
            { id: 1, date: "2025-07-16", title: "Lunch", details: "Pasta" },
            { id: 2, date: "2025-07-15", title: "Groceries", details: "$45" },
        ]} />
    )
}