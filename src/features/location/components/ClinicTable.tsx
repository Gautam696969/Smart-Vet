import React, { useEffect, useState } from "react";
import { fetchClinics } from "../api/Clinics";
import { Clinic } from "../types/types";

const ClinicTable: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetchClinics(currentPage, token);

      setClinics(res.data.clinics || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching clinics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  return (
    <div style={{ marginTop: "20px" }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid #ccc", color: 'white' }}>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clinics.map((clinic) => (
                <tr key={clinic.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td>{clinic.name}</td>
                  <td>{clinic.email}</td>
                  <td>{clinic.phone}</td>
                  <td>{clinic.address}</td>
                  <td>
                    {clinic.status === "Featured" && (
                      <span
                        style={{
                          backgroundColor: "orange",
                          color: "white",
                          padding: "4px 10px",
                          borderRadius: "20px",
                        }}
                      >
                        Featured ⭐
                      </span>
                    )}
                  </td>
                  <td>
                    <span style={{ color: "crimson", cursor: "pointer", marginRight: "10px" }}>🗑️</span>
                    <span style={{ color: "teal", cursor: "pointer" }}>✏️</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div style={{ marginTop: "15px", textAlign: "right", color: 'white' }}>
            <span style={{ marginRight: "10px" }}>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              ◀
            </button>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ClinicTable;
