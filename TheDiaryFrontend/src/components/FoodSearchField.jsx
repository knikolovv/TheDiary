import { useState, useEffect } from "react";

export default function FoodSearchField({ onSelect, searchFieldStyle }) {
    const [term, setTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [debounceTimer, setDebounceTimer] = useState(null);

    useEffect(() => {
        if (debounceTimer) clearTimeout(debounceTimer);
        if (!term.trim()) {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const query = encodeURIComponent(term);
                const res = await fetch(
                    `https://world.openfoodfacts.org/cgi/search.pl`
                    + `?search_terms=${query}`
                    + `&search_simple=1`
                    + `&action=process`
                    + `&json=1`
                    + `&page_size=3`
                    + `&fields=code,product_name,brands,nutriments`,
                    {
                        headers: {
                            "User-Agent": "The Diary(Personal Project) - bobliest36@gmail.com"
                        }
                    }
                );
                const data = await res.json();
                console.log(data);
                setSuggestions(data.products || []);
            } catch (err) {
                console.error("Error fetching products", err);
            }
        }, 1500);

        setDebounceTimer(timer);
        return () => clearTimeout(timer);
    }, [term]);

    return (
        <div style={{ position: "relative" }}>
            <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Type a food name..."
                style={searchFieldStyle}
            />
            {suggestions.length > 0 && (
                <ul
                    style={{
                        left: 0,
                        right: 0,
                        margin: 0,
                        padding: 0,
                        border: "1px solid #ccc",
                        listStyle: "none",
                    }}
                >
                    {suggestions.map((item) => (
                        <li
                            key={item.code}
                            onClick={() => {
                                setTerm(item.product_name);
                                setSuggestions([]);
                                onSelect(item);
                            }}
                            style={{
                                padding: "8px",
                                cursor: "pointer",
                                borderBottom: "1px solid #eee",
                            }}
                        >
                            <div style={{ fontWeight: "bold" }}>
                                {item.product_name}
                            </div>
                            {item.brands && (
                                <div style={{ fontSize: "12px", color: "#666" }}>
                                    {item.brands}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}