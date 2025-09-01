export default function Input({ label, type="text", value, onChange, placeholder, required }) {
  return (
    <div>
      {label && <label><b>{label}</b></label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
