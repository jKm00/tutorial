export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      style={{
        padding: "8px 16px",
        backgroundColor: "green",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
        transition: "background-color 0.2s",
        ...props.style,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "#0056b3";
        props.onMouseOver?.(e);
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "#007bff";
        props.onMouseOut?.(e);
      }}
    >
      {children}
    </button>
  );
}
