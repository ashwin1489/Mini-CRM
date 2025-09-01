export default function Pagination({ page, setPage, hasPrev, hasNext }) {
  return (
    <div className="pagination">
      <button onClick={() => setPage(page - 1)} disabled={!hasPrev}>
        Prev
      </button>
      <span style={{ margin: "0 10px" }}>Page {page}</span>
      <button onClick={() => setPage(page + 1)} disabled={!hasNext}>
        Next
      </button>
    </div>
  );
}
