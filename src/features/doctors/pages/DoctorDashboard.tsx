import React, { useState } from "react";

const cardBase =
  "bg-gradient-to-br from-[#232946] to-[#1a1a2e] rounded-xl shadow-lg p-6 flex flex-col gap-2 text-white";

const accentBlue = "from-blue-700 to-violet-700";
const accentViolet = "from-violet-700 to-blue-700";

const todayAppointments = [
  { time: "09:00 AM", patient: "John Doe", type: "Video" },
  { time: "11:30 AM", patient: "Jane Smith", type: "In-Person" },
  { time: "02:00 PM", patient: "Sam Wilson", type: "Video" },
];

const recentMessages = [
  { from: "John Doe", message: "Thank you, doctor!", time: "2m ago" },
  { from: "Jane Smith", message: "Can I reschedule?", time: "1h ago" },
  { from: "Support", message: "Your payout is processed.", time: "3h ago" },
];

const patientInsights = [
  { label: "Active Patients", value: 24 },
  { label: "Avg. Rating", value: "4.8/5" },
  { label: "Follow-ups", value: 5 },
];

const earningsSummary = {
  today: "$320",
  week: "$2,100",
  month: "$8,400",
};

export default function DoctorDashboard() {
  const [available, setAvailable] = useState(true);

  return (
    <div className="min-h-screen bg-[#181824] py-8 px-4 md:px-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Doctor Dashboard</h1>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <span className="text-white font-medium">Availability</span>
          <button
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
              available ? "bg-gradient-to-r from-blue-600 to-violet-600" : "bg-gray-600"
            }`}
            onClick={() => setAvailable((a) => !a)}
            aria-label="Toggle availability"
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                available ? "translate-x-7" : ""
              }`}
            />
            <span
              className={`absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold ${
                available ? "text-blue-700" : "text-gray-300"
              }`}
            >
              {available ? "ON" : "OFF"}
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today’s Appointments */}
        <div className={`${cardBase} ${accentBlue}`}>
          <h2 className="text-lg font-semibold mb-2">Today’s Appointments</h2>
          <ul className="divide-y divide-blue-900/30">
            {todayAppointments.map((appt, idx) => (
              <li key={idx} className="py-2 flex justify-between items-center">
                <div>
                  <div className="font-bold">{appt.time}</div>
                  <div className="text-sm text-blue-200">{appt.patient}</div>
                </div>
                <span className="px-2 py-1 rounded bg-blue-900/60 text-xs">
                  {appt.type}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Messages */}
        <div className={`${cardBase} ${accentViolet}`}>
          <h2 className="text-lg font-semibold mb-2">Recent Messages</h2>
          <ul className="divide-y divide-violet-900/30">
            {recentMessages.map((msg, idx) => (
              <li key={idx} className="py-2 flex flex-col">
                <span className="font-bold text-violet-200">{msg.from}</span>
                <span className="text-sm">{msg.message}</span>
                <span className="text-xs text-violet-300 self-end">{msg.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Patient Insights */}
        <div className={`${cardBase} bg-gradient-to-br from-[#232946] to-[#232946]`}>
          <h2 className="text-lg font-semibold mb-2">Patient Insights</h2>
          <div className="flex flex-col gap-3">
            {patientInsights.map((insight, idx) => (
              <div key={idx} className="flex justify-between">
                <span className="text-blue-300">{insight.label}</span>
                <span className="font-bold text-white">{insight.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Earnings Summary */}
        <div className={`${cardBase} ${accentBlue}`}>
          <h2 className="text-lg font-semibold mb-2">Earnings Summary</h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-blue-200">Today</span>
              <span className="font-bold">{earningsSummary.today}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">This Week</span>
              <span className="font-bold">{earningsSummary.week}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-200">This Month</span>
              <span className="font-bold">{earningsSummary.month}</span>
            </div>
          </div>
        </div>
        {/* Placeholder for future cards or analytics */}
        <div className={`${cardBase} bg-gradient-to-br from-[#232946] to-[#1a1a2e] flex items-center justify-center`}>
          <span className="text-blue-300">More analytics coming soon...</span>
        </div>
      </div>
    </div>
  );
}