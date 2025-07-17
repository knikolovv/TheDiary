import React from "react"

export default function Logbook({ title, entries }) {

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
            width: '40%',
            height: '100%',
            justifySelf: 'center',
            borderRadius: 10,
            backgroundColor: '#D4Af37'
        }}>
            <div style={{
                textAlign: 'center',
                fontSize: '30px',
                flex: 1,
            }}>
                {title}
            </div>
            {
                sortedDates.map((date) => (
                    <div key={date} style={{ justifyItems: 'center' }}>
                        <h3>{date}</h3>
                        <ul>
                            {grouped[date].map((entry) => (
                                <li key={entry.id}>
                                    <div>{entry.title}</div>
                                    {entry.details && <div>{entry.details}</div>}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            }
        </div >
    )
}