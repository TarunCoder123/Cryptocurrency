import React from "react";
import { Button } from "../styles";

export default function Pagination({ page, setPage, limit, setLimit, totalPages }) {
    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <div style={{ marginBottom: "10px" }}>
                <label htmlFor="limit" style={{ marginRight: "8px" }}>
                    Items per page:
                </label>
                <select
                    id="limit"
                    value={limit}
                    onChange={(e) => { setLimit(Number(e.target.value)); setPage(1) }}
                    style={{
                        padding: "5px 10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        background: "#fff",
                    }}
                >
                    {[5, 10, 20, 50].map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <Button disabled={page === 1} onClick={() => setPage(1)}>
                    First
                </Button>
                <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
                    ◀ Previous
                </Button>

                <span style={{ margin: "0 10px" }}>
                    Page {page} {totalPages ? `of ${totalPages}` : ""}
                </span>

                <Button
                    disabled={totalPages && page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next ▶
                </Button>
                <Button
                    disabled={totalPages && page === totalPages}
                    onClick={() => setPage(totalPages)}
                >
                    Last
                </Button>
            </div>
        </div >
    );
}
