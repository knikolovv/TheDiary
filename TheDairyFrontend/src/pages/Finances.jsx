import { useEffect, useState } from "react"
import Logbook from "../components/Logbook"

export default function Finances() {
    const [financeEntries, setFinanceEntries] = useState([]);
    
    useEffect(() => {
        const fetchFinanceEntries = async () => {
            try {
                const response = await fetch('http://localhost:8080/finance');
                if (!response.ok) {
                    throw new Error('Could not fetch finance entries')
                }
                const data = await response.json();
                setFinanceEntries(data);
                console.log(data)
            } catch (error) {
                console.log('Could not fetch finances entries', error);
            }
        }
        fetchFinanceEntries();
    }, [])

    return (
        <Logbook
            title={'PocketBank'}
            extraDetails={[
                { name: 'Income', value: 200 },
                { name: 'Spent', value: 100 },
            ]}
            entries={financeEntries} />
    )
}