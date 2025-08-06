import React, { useState } from "react";

const cardBase =
  "bg-white rounded-2xl shadow-md p-6 flex flex-col gap-3 text-gray-800";
const sectionTitle = "text-xl font-bold mb-3 text-blue-900";
const softBg = "bg-blue-50";
const accent = "text-blue-600";
const largeFont = "text-2xl font-bold";

const upcomingAppointments = [
  { date: "2025-07-28", time: "10:00 AM", doctor: "Dr. Smith", type: "Video" },
  { date: "2025-07-30", time: "02:30 PM", doctor: "Dr. Lee", type: "In-Person" },
];

const healthHistory = [
  { label: "Last Checkup", value: "2025-06-15" },
  { label: "Chronic Conditions", value: "None" },
  { label: "Medications", value: "Vitamin D" },
];

const profileCompleteness = 75;

export default function PatientDashboard() {
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedDocs([...uploadedDocs, ...Array.from(e.target.files).map(f => f.name)]);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4 md:px-10">
      <h1 className="text-3xl font-extrabold text-blue-900 mb-8" style={{ fontSize: "2.2rem" }}>
        Patient Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Upcoming Appointments */}
        <div className={`${cardBase} ${softBg}`}>
          <h2 className={sectionTitle}>Upcoming Appointments</h2>
          <ul className="space-y-3">
            {upcomingAppointments.map((appt, idx) => (
              <li key={idx} className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className={`${largeFont} ${accent}`}>{appt.time}</div>
                  <div className="text-base">{appt.date}</div>
                  <div className="text-sm text-blue-700">{appt.doctor}</div>
                </div>
                <span className="mt-2 md:mt-0 px-3 py-1 rounded bg-blue-200 text-blue-900 text-xs font-semibold">
                  {appt.type}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Doctor Chat Card */}
        <div className={`${cardBase} bg-violet-50`}>
          <h2 className={sectionTitle}>Chat with Your Doctor</h2>
          <div className="flex flex-col gap-2">
            <div className="text-lg text-violet-800">Dr. Smith</div>
            <div className="bg-violet-100 rounded-lg p-3 text-violet-900 text-base">
              "How are you feeling today? Let me know if you have any concerns."
            </div>
            <button className="mt-2 bg-violet-600 text-white rounded-lg px-4 py-2 font-semibold text-lg hover:bg-violet-700 transition">
              Open Chat
            </button>
          </div>
        </div>
        {/* Profile Completeness Meter */}
        <div className={`${cardBase} bg-green-50`}>
          <h2 className={sectionTitle}>Profile Completeness</h2>
          <div className="flex flex-col items-center gap-2">
            <div className="w-full bg-green-200 rounded-full h-6">
              <div
                className="bg-green-500 h-6 rounded-full transition-all"
                style={{ width: `${profileCompleteness}%` }}
              />
            </div>
            <span className="text-lg font-semibold text-green-700">{profileCompleteness}% Complete</span>
            <span className="text-sm text-green-800">Complete your profile for better care</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Health History Summary */}
        <div className={`${cardBase} ${softBg}`}>
          <h2 className={sectionTitle}>Health History</h2>
          <ul className="space-y-2">
            {healthHistory.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span className="font-medium">{item.label}</span>
                <span className={accent}>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Calendar Integration & Upload Document */}
        <div className={`${cardBase} bg-yellow-50`}>
          <h2 className={sectionTitle}>Calendar & Documents</h2>
          <div className="mb-4">
            {/* Simple calendar mockup */}
            <div className="bg-yellow-100 rounded-lg p-4 text-yellow-900 text-center text-lg font-semibold mb-2">
              Calendar integration coming soon...
            </div>
          </div>
          <div>
            <label className="block mb-2 font-medium text-yellow-900">Upload Medical Documents</label>
            <input
              type="file"
              multiple
              className="block w-full text-lg text-yellow-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-lg file:font-semibold file:bg-yellow-200 file:text-yellow-900 hover:file:bg-yellow-300"
              onChange={handleUpload}
            />
            <ul className="mt-2 space-y-1">
              {uploadedDocs.map((doc, idx) => (
                <li key={idx} className="text-yellow-800 text-base">{doc}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}