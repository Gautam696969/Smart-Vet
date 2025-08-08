
import React, { useState } from "react";
import ClinicTable from "../components/ClinicTable";
import ClinicModal from "../components/ClinicModel";

const ClinicsPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState( false );

  const handleOpenModal = () => setModalOpen( true );
  const handleCloseModal = () => setModalOpen( false );

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ color: "orange" }}>Clinics</h1>
      <p className="text-gray-600">Clinics allow you to group your professionals based on location.</p>
      <button
        style={{
          backgroundColor: "orange",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          marginTop: "10px",
          fontSize: "16px",
        }}
        onClick={handleOpenModal}
      >
        NEW CLINIC
      </button>
      <ClinicTable />
      <ClinicModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ClinicsPage;
