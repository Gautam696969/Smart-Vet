import i18next from 'i18next'
import React, { useState } from 'react'
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiMessageSquare
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const dummyMessages = [
  {
    id: 1,
    type: 'Messaging Session with a Veterinarian',
    firstMessage: 'Jul 22, 2025 11:59 PM',
    lastMessage: 'Jul 23, 2025 12:00 AM',
    lastResponded: 'Arman Malik',
    clientName: 'Arman Malik',
    professional: 'Not Assigned',
    status: 'Open',
    payment: 'No Charge'
  },
  {
    id: 2,
    type: 'Messaging Session with a Veterinarian',
    firstMessage: 'Jul 22, 2025 11:57 PM',
    lastMessage: 'Jul 22, 2025 11:57 PM',
    lastResponded: 'Rajesh Desai',
    clientName: 'Arman Malik',
    professional: 'Not Assigned',
    status: 'Open',
    payment: 'No Charge'
  }
]

const statusOptions = ['Open', 'Closed']
const paymentOptions = ['No Charge', 'Paid']

const MessagesPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [status, setStatus] = useState('')
  const [payment, setPayment] = useState('')
  const [myMessages, setMyMessages] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(15)
  const [page, setPage] = useState(1)
  const navigate = useNavigate()

  const openFilter = Boolean(filterAnchorEl)

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const handleClear = () => {
    setStatus('')
    setPayment('')
    setMyMessages(false)
  }

  const tableRow = (name: string) => (
    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
      {name}
    </th>
  )

  const tableData = (name: string) => (
    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
      {name}
    </td>
  )

  // Pagination logic for dummy data
  const paginatedMessages = dummyMessages.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  )
  const totalPages = Math.ceil(dummyMessages.length / rowsPerPage)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Content Section */}
      <div className="w-full px-6 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h1 className="text-xl md:text-3xl font-bold text-green-900 dark:text-white mb-2">
                {i18next.t('messages.history')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {i18next.t('messages.messageContent')}
              </p>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-wrap items-center gap-4 justify-between">
              <div className="flex-1 min-w-[300px] relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages or client names..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleFilterClick}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300 font-medium"
                >
                  <FiFilter className="text-lg" />
                  {i18next.t('common.filter')}
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300 font-medium">
                  <FiDownload className="text-lg" />
                  {i18next.t('common.export')}
                </button>
              </div>
            </div>
          </div>

          {/* Filter Menu */}
          {openFilter && (
            <div className="absolute right-14 top-72 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 min-w-[280px] z-10">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {i18next.t('messages.filterMessages')}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {i18next.t('messages.status')}
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#145824] dark:bg-gray-700 dark:text-gray-100"
                  >
                    <option value="">{i18next.t('messages.allStatus')}</option>
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {i18next.t('messages.payment')}
                  </label>
                  <select
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#145824] dark:bg-gray-700 dark:text-gray-100"
                  >
                    <option value="">
                      {i18next.t('messages.allPayments')}
                    </option>
                    {paymentOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={myMessages}
                    onChange={(e) => setMyMessages(e.target.checked)}
                    className="w-4 h-4 text-[#145824] bg-gray-100 border-gray-300 rounded focus:ring-[#145824]"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    {i18next.t('messages.myMessages')}
                  </span>
                </div>
                <div className="flex justify-between gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleClear}
                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                  >
                    {i18next.t('common.clear')}
                  </button>
                  <button
                    onClick={handleFilterClose}
                    className="flex-1 px-4 py-2 bg-[#145824] text-white rounded-lg hover:bg-[#1a6b2e] transition-colors font-medium"
                  >
                    {i18next.t('common.apply')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Messages Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {tableRow(i18next.t('messages.actions'))}
                  {tableRow(i18next.t('messages.type'))}
                  {tableRow(i18next.t('messages.firstMessage'))}
                  {tableRow(i18next.t('messages.lastMessage'))}
                  {tableRow(i18next.t('messages.lastResponded'))}
                  {tableRow(i18next.t('messages.clientName'))}
                  {tableRow(i18next.t('messages.professional'))}
                  {tableRow(i18next.t('messages.status'))}
                  {tableRow(i18next.t('messages.payment'))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedMessages
                  .filter(
                    (m) =>
                      m.type.toLowerCase().includes(search.toLowerCase()) ||
                      m.clientName.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => navigate(`/messages/${row.id}`)}
                          className="p-2 text-[#145824] hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                        >
                          <FiEye className="text-lg" />
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FiMessageSquare className="text-[#145824] text-lg" />
                          <span className="text-gray-900 dark:text-gray-100">
                            {row.type}
                          </span>
                        </div>
                      </td>
					  {tableData(row.firstMessage)}
					  {tableData(row.lastMessage)}
					  {tableData(row.lastResponded)}
					  {tableData(row.clientName)}
					  {tableData(row.professional)}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            row.status === 'Open'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${
                            row.payment === 'No Charge'
                              ? 'border-green-500 text-green-600 dark:text-green-400'
                              : 'border-blue-500 text-blue-600 dark:text-blue-400'
                          }`}
                        >
                          {row.payment}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {i18next.t('common.rowsPerPage')}
                </span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value))
                    setPage(1)
                  }}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
                >
                  <option value={15}>15</option>
                  <option value={30}>30</option>
                  <option value={45}>45</option>
                </select>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {dummyMessages.length === 0
                    ? '0-0 of 0'
                    : `${(page - 1) * rowsPerPage + 1}-${Math.min(
                        page * rowsPerPage,
                        dummyMessages.length
                      )} of ${dummyMessages.length}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
                >
                  {i18next.t('common.previous')}
                </button>
                <span className="px-3 py-1 bg-[#145824] text-white rounded-lg">
                  {page}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 dark:text-gray-300"
                >
                  {i18next.t('common.next')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessagesPage
