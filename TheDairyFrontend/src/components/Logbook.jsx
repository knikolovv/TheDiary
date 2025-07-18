import React from "react"

export default function Logbook({ title, entries, extraDetails = [] }) {

    const grouped = entries.reduce((groupedEntries, entry) => {
        if (!groupedEntries[entry.date]) {
            groupedEntries[entry.date] = [];
        }
        groupedEntries[entry.date].push(entry);
        return groupedEntries;
    }, {});

    const sortedDates = Object.keys(grouped).sort((a, b) => (a < b ? 1 : -1));

    return (
        <div style={{
            border: '2px solid black',
            marginTop: 32,
            width: '40vw',
            minWidth: '200px',
            height: '98%',
            justifySelf: 'center',
            borderRadius: 10,
            backgroundColor: '#4b8367ff'
        }}>
            <div style={{
                textAlign: 'center',
                fontSize: '30px',
                flex: 1,
            }}>
                {title}
            </div>
            <div>
                <ul style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', listStyle: 'none', padding: 0 }}>
                    {
                        extraDetails.map((detail) => (
                            <li>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <div style={{ fontSize: 18, fontWeight: 'bold' }}>
                                        {detail.name}:
                                    </div>
                                    <div>
                                        {detail.value || 0}
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div>
                {
                    sortedDates.map((date) => (
                        <div key={date} style={{ justifyItems: 'center' }}>
                            <h3>{date}</h3>
                            <div style={{ display: 'flex', border: '2px solid black', borderRadius: 20, width: '85%' }}>
                                <ul style={{ listStyle: 'none', paddingLeft: 5 }}>
                                    {grouped[date].map((entry) => (
                                        <li key={entry.id}>
                                            <div style={{ display: 'flex' }}>
                                                <div>{entry.counterparty}</div>
                                                <div>{entry.amount}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}