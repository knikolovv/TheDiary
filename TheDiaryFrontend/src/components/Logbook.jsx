import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Logbook({ title, entries, extraDetailsByMonth = {}, extraDetailsDaily = [], renderEntry }) {
    const location = useLocation();
    const currentPath = location.pathname;

    const groupedByMonth = entries.reduce((acc, entry) => {
        const [year, month] = entry.date.split("-");
        const monthKey = `${year}-${month}`;
        if (!acc[monthKey]) acc[monthKey] = {};
        if (!acc[monthKey][entry.date]) acc[monthKey][entry.date] = [];
        acc[monthKey][entry.date].push(entry);
        return acc;
    }, {});


    const sortedMonths = Object.keys(groupedByMonth).sort((a, b) => (a < b ? 1 : -1));
    const sortedDays = (month) =>
        Object.keys(groupedByMonth[month]).sort((a, b) => (a < b ? 1 : -1));

    function formatMonthYear(monthKey) {
        const [year, month] = monthKey.split("-");
        const date = new Date(year, parseInt(month, 10) - 1);
        return date.toLocaleString("default", { month: "long", year: "numeric" });
    }

    function getDailyDetails(date) {
        const details = extraDetailsDaily.find((d) => d.date === date);
        return details ? details : [];
    }

    return (
        <div
            style={{
                border: "1px solid black",
                marginTop: 32,
                width: "50vw",
                minWidth: "550px",
                minHeight: "40vh",
                justifySelf: "center",
                borderRadius: 10,
                backgroundColor: "#4b8367ff",
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    fontSize: "30px",
                    flex: 1,
                }}
            >
                {title}
            </div>
            {sortedMonths.length === 0 && (
                <div style={{ textAlign: 'center', marginTop: 20, fontSize: 20 }}>
                    No entries yet.
                </div>
            )}

            {entries.length > 0 && (<div
                style={{
                    border: "2px solid black",
                    borderRadius: 10,
                    width: "95%",
                    marginBottom: 10,
                    justifySelf: "center",
                }}
            >

                {sortedMonths.map((month) => (
                    <div key={month} style={{ marginBottom: 16 }}>
                        <div
                            style={{
                                fontSize: 26,
                                textAlign: "center",
                                marginTop: 8,
                                fontWeight: "bold",
                            }}
                        >
                            {formatMonthYear(month)}
                        </div>

                        {extraDetailsByMonth[month] && (
                            <ul
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    listStyle: "none",
                                    padding: 0,
                                    border: "2px solid black",
                                    width: "80%",
                                    margin: "0 auto",
                                    borderRadius: 20,
                                    backgroundColor: "#2A2B2E",
                                    marginTop: 10,
                                }}
                            >
                                {extraDetailsByMonth[month].map((detail) => (
                                    <li key={detail.name}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 4,
                                                color: "white",
                                            }}
                                        >
                                            <div style={{ fontSize: 18, fontWeight: "bold" }}>
                                                {detail.name}:
                                            </div>
                                            <div>{Number(detail.value).toFixed(2)}$</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {sortedDays(month).map((date) => (
                            <div key={date} style={{ justifyItems: "center", marginTop: 8 }}>
                                <h3 style={{ textAlign: "center" }}>{date}</h3>

                                {getDailyDetails(date).length > 0 && (
                                    <ul
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-evenly",
                                            listStyle: "none",
                                            padding: 0,
                                            marginTop: 4,
                                            width: "80%",
                                            margin: "0 auto",
                                        }}
                                    >
                                        {getDailyDetails(date).map((detail) => (
                                            <li key={detail.name}>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 4,
                                                        color: detail.color,
                                                    }}
                                                >
                                                    <div style={{ fontSize: 14, fontWeight: "bold" }}>
                                                        {detail.name}:
                                                    </div>
                                                    <div>{Number(detail.value).toFixed(2)}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div
                                    style={{
                                        display: "flex",
                                        border: "2px solid black",
                                        borderRadius: 20,
                                        width: "85%",
                                        margin: "8px auto",
                                        backgroundColor: "#2A2B2E",
                                    }}
                                >
                                    <ul
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            listStyle: "none",
                                            paddingLeft: 5,
                                            width: "100%",
                                            gap: "20px",
                                        }}
                                    >
                                        {groupedByMonth[month][date].map((entry) => (
                                            <li key={entry.id}>
                                                <Link to={`${currentPath}/${entry.id}`} style={{ textDecoration: "none" }} >
                                                    {renderEntry(entry)}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div
                                    style={{
                                        textAlign: "end",
                                        fontWeight: "bold",
                                        marginTop: 4,
                                        width: "85%",
                                        margin: "0 auto",
                                    }}
                                >
                                    Total:{" "}
                                    {groupedByMonth[month][date]
                                        .reduce((sum, entry) => sum + entry.amount, 0)
                                        .toFixed(2)}
                                    $
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            )}
        </div>
    );
}
