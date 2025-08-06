import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  FiClock,
  FiChevronDown,
  FiChevronUp,
  FiArrowLeft
} from 'react-icons/fi'
import i18next from 'i18next'

interface Consultation {
  id: number
  dateTime: string
  veterinarian: string
  summary: string
}

interface Client {
  id: number
  name: string
  email: string
  phone: string
  avatarUrl?: string
  consultations: Consultation[]
}

const mockClient: Client = {
  id: 1,
  name: 'Arman Malik',
  email: 'midixa1060@forexru.com',
  phone: '4015455788',
  avatarUrl: '/Primary-Logo-Tagline-Black.png',
  consultations: [
    {
      id: 1,
      dateTime: 'Jul 26, 2025 6:30 AM',
      veterinarian: 'Rajesh Desai',
      summary: 'Not Provided'
    },
    {
      id: 2,
      dateTime: 'Jul 26, 2025 2:00 AM',
      veterinarian: 'Rajesh Desai',
      summary: 'Not Provided'
    }
  ]
}

const ClientInfo: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const clientData = location.state?.client
  const { id } = useParams<{ id: string }>()
  const [historyOpen, setHistoryOpen] = useState(false)

  // In real app, fetch client by id. Here we use mockClient for demo.
  const client = mockClient

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-full">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-200 text-gray-700 dark:text-gray-300 font-medium"
          >
            <FiArrowLeft className="text-lg" />
            {i18next.t('common.back')}
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => alert('Schedule Appointment clicked')}
            className="bg-[#145824] text-white px-4 py-2 rounded shadow hover:bg-[#145824]/90  "
          >
            {i18next.t('client.scheduleAppointment')}
          </button>
          <button
            onClick={() => navigate(`/clients/${client.id}/edit`)}
            className="bg-white dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-4 py-2 shadow hover:bg-gray-100 dark:hover:bg-gray-700  "
          >
            {i18next.t('EDIT')}
          </button>
        </div>
      </div>
      {/* Client Info Card */}
      <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 px-6 py-4 mb-6">
        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
          {clientData.avatarUrl ? (
            <img
              src={clientData.avatarUrl}
              alt={clientData.name}
              className="object-contain max-h-full max-w-full"
            />
          ) : (
            <div className="text-4xl font-bold text-gray-400 dark:text-gray-500">
              {clientData.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-2xl text-gray-900 dark:text-gray-100 truncate">
            {clientData.name}
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm truncate">
            {clientData.email}
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm truncate">
            {client.phone}
          </div>
        </div>
      </div>
      {/* Client History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setHistoryOpen(!historyOpen)}
          className="flex items-center gap-2 px-4 py-3 w-full text-left border-b border-gray-200 dark:border-gray-700"
          aria-expanded={historyOpen}
          aria-controls="client-history-content"
        >
          <FiClock className="text-[#145824]" />
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {i18next.t('client.history')}
          </span>
          <span className="ml-auto">
            {historyOpen ? <FiChevronUp /> : <FiChevronDown />}
          </span>
        </button>
        {historyOpen && (
          <div id="client-history-content" className="p-4 space-y-4">
            {client.consultations.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No consultations found.
              </div>
            )}
            {client.consultations.map((consultation) => (
              <div
                key={consultation.id}
                className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div>
                  <div className="text-gray-900 dark:text-gray-100 font-semibold">
                    {consultation.dateTime}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">
                    <strong>{i18next.t('messages.veterinarian')}:</strong> {consultation.veterinarian}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">
                    <strong>{i18next.t('messages.summary')}:</strong> {consultation.summary}
                  </div>
                </div>
                <div className="flex items-center justify-end w-full md:w-auto">
                  <button
                    onClick={() =>
                      alert(`View Consultation ${consultation.id} clicked`)
                    }
                    className="bg-[#145824] text-white px-4 py-2 rounded shadow hover:bg-[#145824]/90  "
                  >
                    {i18next.t('messages.viewConsultation')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ClientInfo
