export default function StyledButton({ children,
    onClick,
    type = "button",
    backgroundColor = "rgba(56, 53, 53, 1)",
    onMouseOverColor = "rgba(39, 35, 35, 1)",
    onMouseOutColor = "rgba(56, 53, 53, 1)",
    style = {},
    asLabel = false,
    htmlFor,
}) {
    const buttonStyle = {
        display: "inline-flex",
        textAlign: "center",
        verticalAlign: "middle",
        lineHeight: 1.3,
        marginTop: 24,
        color: "#fff",
        border: "none",
        borderRadius: 6,
        padding: "12px 24px",
        fontSize: 16,
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: backgroundColor,
        ...style,
    };

    return asLabel ? (
        <label htmlFor={htmlFor}
            style={buttonStyle}
            onMouseOver={(e) => {
                e.target.style.backgroundColor = onMouseOverColor;
            }}
            onMouseOut={(e) => {
                e.target.style.backgroundColor = onMouseOutColor;
            }}>
            {children}
        </label>
    ) : (
        <button
            type={type}
            onClick={onClick}
            style={buttonStyle}
            onMouseOver={(e) => {
                e.target.style.backgroundColor = onMouseOverColor;
            }}
            onMouseOut={(e) => {
                e.target.style.backgroundColor = onMouseOutColor;
            }}
        >
            {children}
        </button>
    );
}