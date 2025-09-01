import Papa from "papaparse";

export default function CsvUploader({ onImport }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      complete: (res) => onImport(res.data)
    });
  };

  return (
    <label style={{ cursor: "pointer", color: "#0077cc" }}>
      Import CSV
      <input type="file" accept=".csv" style={{ display: "none" }} onChange={handleFile} />
    </label>
  );
}
