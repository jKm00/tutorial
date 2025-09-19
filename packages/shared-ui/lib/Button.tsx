export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button style={{ background: "green" }} {...props}>
      {children}
    </button>
  );
}
