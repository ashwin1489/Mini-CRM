export default function Button({ children, onClick, type="button", variant="primary" }) {
  const style = variant === "outline"
    ? { background: "white", color: "#0077cc", border: "1px solid #0077cc" }
    : {};

  return (
    <button type={type} onClick={onClick} style={style}>
      {children}
    </button>
  );
}
