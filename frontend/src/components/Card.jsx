export default function Card({ title, actions, children }) {
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>{title}</h3>
        {actions}
      </div>
      <div>{children}</div>
    </div>
  );
}
