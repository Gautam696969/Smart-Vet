import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { employeeDetails } from "shared/utils/graphqlFetch";

type EmployeeProfile = {
  name: string;
  email: string;
  avatar: string;
  availability: string;
};

export default function Emp() {
  const { state } = useLocation();
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!state) return;

    const authToken = localStorage.getItem("authToken") || "";

    const fetchEmployee = async () => {
      setLoading(true);
      try {

        const res = await employeeDetails(state.userId, authToken );
        console.log(res, "API response");
        console.log(state.userId , "state.userId");

        const empData = res?.data?.getUserDetails;
        if (empData) {
          setProfile({
            name: `${empData.firstName} ${empData.lastName}`,
            email: empData.email,
            avatar: empData.avatar,
            availability: empData.availability,
          });
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load employee details");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [state]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return null;

  return (
    <div className="p-6 font-sans bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-4">
        <button className="px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300">
          BACK
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded shadow hover:bg-gray-300">
          EDIT
        </button>
      </div>

      <div className="flex gap-4">
        <div className="bg-white rounded shadow p-4 flex-shrink-0">
          <img
            src={profile.avatar}
            alt="avatar"
            className="w-36 h-36 object-cover rounded"
          />
        </div>

        <div className="bg-white rounded shadow p-4 flex-1">
          <h2 className="text-2xl font-semibold">{profile.name}</h2>
          <p className="text-gray-700">{profile.email}</p>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4 mt-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <span className="text-orange-500 text-lg">⏳</span>
            <strong>Availability</strong>
          </div>
          <span
            className={`text-orange-500 transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </div>
        {isOpen && (
          <p className="mt-2 ml-7 text-gray-600">{profile.availability}</p>
        )}
      </div>
    </div>
  );
}
