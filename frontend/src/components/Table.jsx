export default function Table({ columns, data, actions }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.title}</th>
          ))}
          {actions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row) => (
            <tr key={row._id}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.dataIndex], row) : row[col.dataIndex]}
                </td>
              ))}
              {actions && <td>{actions(row)}</td>}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + 1} style={{ textAlign: "center" }}>
              No data found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
