export default function StyledField({
    as = "input",
    children,
    extraStyle = {},
    ...props
}) {
    const baseStyle = {
        backgroundColor: "transparent",
        border: "1px solid black",
        borderRadius: 4,
        padding: "12px 16px",
        color: "black",
        fontSize: 16,
        outline: "none",
        width: "50%",
        boxSizing: "border-box",
        fontFamily: "inherit",
        ...extraStyle,
    };

    const Component = as;

    return (
        <Component style={baseStyle} {...props} >
            {children}
        </Component>
    );
}
