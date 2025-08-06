import i18next from 'i18next'
import React, { useState, useRef } from 'react'
import {
  FiBookmark,
  FiCreditCard,
  FiLock,
  FiUpload,
  FiMessageSquare,
  FiClock,
  FiDownload,
  FiMail,
  FiList,
  FiImage,
  FiChevronDown,
  FiCalendar,
  FiUser,
  FiEdit3,
  FiSave,
  FiX,
  FiAlertTriangle
} from 'react-icons/fi'
import NotesEditor from 'shared/components/NoteEditor'

const messages = [
  {
    id: 1,
    author: 'Arman Malik',
    time: 'Jul 22, 2025 11:59 PM',
    text: 'hey'
  },
  {
    id: 2,
    author: 'Arman Malik',
    time: 'Jul 23, 2025 12:00 AM',
    text: 'please answer me when get back'
  }
]

const MessagesInfoPage: React.FC = () => {
  const [openIntake, setOpenIntake] = useState(false)
  const [openMedia, setOpenMedia] = useState(false)
  const [clientHistory, setClientHistory] = useState(false)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [emailForm, setEmailForm] = useState({
    name: '',
    recipient: '',
    subject: '',
    note: ''
  })
  const [editNoteType, setEditNoteType] = useState(false)
  const [editPrivateNoteType, setEditPrivateNoteType] = useState(false)
  const [noteValue, setNoteValue] = useState('Hello notes')
  const [privateNoteValue, setPrivateNoteValue] = useState(
    'You can add brief yet detailed private notes of your consultation here'
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full px-6 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header Section */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row items-start gap-6">
              {/* Profile Card */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 min-w-[320px]">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img
                      src="https://jeremy.smart.vet/storage/public/default-avatar.jpg"
                      alt="Client Avatar"
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Meeting with
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      Arman Malik
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      midixa1060@forexru.com
                    </div>
                  </div>
                </div>
              </div>

              {/* Session Info */}
              <div className="flex-1 flex flex-col lg:items-end">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-sm font-medium">
                    <FiAlertTriangle className="w-4 h-4 mr-2" />
                    Not Confirmed
                  </span>
                  <div className="w-12 h-12 bg-gradient-to-r from-[#145824] to-[#1a6b2e] rounded-full flex items-center justify-center shadow-lg">
                    <FiMessageSquare className="text-white text-xl" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-right">
                  Messaging Session with a Veterinarian
                </h1>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-xl cursor-not-allowed">
                <FiCreditCard className="text-lg" />
                {i18next.t('messages.charge')}
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300 font-medium">
                {i18next.t('messages.dontCharge')}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-xl cursor-not-allowed">
                <FiLock className="text-lg" />
                {i18next.t('messages.open')}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-xl cursor-not-allowed">
                <FiBookmark className="text-lg" />
                {i18next.t('messages.claim')}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-xl cursor-not-allowed">
                <FiBookmark className="text-lg" />
                {i18next.t('messages.reassign')}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-xl cursor-not-allowed">
                <FiBookmark className="text-lg" />
                {i18next.t('messages.changeServiceType')}
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#145824] to-[#1a6b2e] text-white rounded-xl shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300 font-medium">
                <FiCalendar className="text-lg" />
                {i18next.t('messages.scheduleAppointment')}
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300 font-medium">
                <FiDownload className="text-lg" />
                {i18next.t('common.export')}
              </button>
              <button
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300 font-medium"
                onClick={() => setEmailDialogOpen(true)}
              >
                <FiMail className="text-lg" />
                {i18next.t('messages.emailRecord')}
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#145824] to-[#1a6b2e] text-white rounded-xl shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300 font-medium">
                <FiMail className="text-lg" />
                {i18next.t('messages.resendConfirmation')}
              </button>
            </div>
          </div>

          {/* Collapsible Panels */}
          <div className="p-8 space-y-6">
            {/* Intake Questions */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden">
              <button
                className="w-full flex items-center px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setOpenIntake(!openIntake)}
              >
                <FiList className="text-[#145824] dark:text-green-400 text-xl mr-3" />
                <span className="font-semibold text-gray-900 dark:text-gray-100 flex-1 text-left">
                  {i18next.t('messages.intakeQuestions')}
                </span>
                <FiChevronDown
                  className={`text-gray-600 dark:text-gray-400 transition-transform ${
                    openIntake ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIntake && (
                <div className="px-6 pb-4 text-gray-500 dark:text-gray-400">
                  {i18next.t('messages.noAnswersProvided')}
                </div>
              )}
            </div>

            {/* Media Section */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden">
              <button
                className="w-full flex items-center px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setOpenMedia(!openMedia)}
              >
                <FiImage className="text-[#145824] dark:text-green-400 text-xl mr-3" />
                <span className="font-semibold text-gray-900 dark:text-gray-100 flex-1 text-left">
                  {i18next.t('messages.imgVideoDoc')}
                </span>
                <FiChevronDown
                  className={`text-gray-600 dark:text-gray-400 transition-transform ${
                    openMedia ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openMedia && (
                <div className="px-6 pb-4">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {i18next.t('messages.noMediaUploaded')}
                  </p>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#145824] to-[#1a6b2e] text-white rounded-xl shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300 font-medium">
                    <FiUpload className="text-lg" />
                    {i18next.t('messages.uploadFile')}
                  </button>
                </div>
              )}
            </div>

            {/* Client History */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden">
              <button
                className="w-full flex items-center px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setClientHistory(!clientHistory)}
              >
                <FiClock className="text-[#145824] dark:text-green-400 text-xl mr-3" />
                <span className="font-semibold text-gray-900 dark:text-gray-100 flex-1 text-left">
                  {i18next.t('messages.clientHistory')}
                </span>
                <FiChevronDown
                  className={`text-gray-600 dark:text-gray-400 transition-transform ${
                    clientHistory ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {clientHistory && (
                <div className="px-6 pb-4 space-y-4">
                  {/* History Cards */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                    <div className="space-y-2 mb-4">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {i18next.t('messages.dateTime')}: Jul 29, 2025 12:40 PM
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {i18next.t('messages.veterinarian')}: Rajesh Desai
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {i18next.t('messages.summary')}:
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        Not Provided
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button className="px-6 py-2 bg-gradient-to-r from-[#145824] to-[#1a6b2e] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium">
                        {i18next.t('messages.viewConsultation')}
                      </button>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                    <div className="space-y-2 mb-4">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {i18next.t('messages.dateTime')}: Jul 29, 2025 12:40 PM
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {i18next.t('messages.veterinarian')}: Rajesh Desai
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {i18next.t('messages.summary')}:
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        Not Provided
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button className="px-6 py-2 bg-gradient-to-r from-[#145824] to-[#1a6b2e] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium">
                        {i18next.t('messages.viewConsultation')}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Messages Section */}
          <div className="p-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <FiMessageSquare className="text-[#145824] dark:text-green-400" />
              {i18next.t('messages.subtitle')}
            </h2>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <FiUser className="text-[#145824] dark:text-green-400" />
                    <span className="font-bold text-gray-900 dark:text-gray-100">
                      {msg.author}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      @ {msg.time}
                    </span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Warning and Reply */}
            <div className="mt-6">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-600 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 text-yellow-800 dark:text-yellow-400">
                  <FiAlertTriangle className="text-xl" />
                  <span className="font-medium">
                    {i18next.t('messages.noPermission')}
                  </span>
                </div>
              </div>
              <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-xl cursor-not-allowed font-medium">
                {i18next.t('common.reply')}
              </button>
            </div>
          </div>

          {/* Notes Section */}
          <div className="p-8 bg-gray-50 dark:bg-gray-700">
            {/* Notes from client */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Notes from dj cloudpeak
              </h3>
              <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-600 rounded-xl p-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">i</span>
                  </div>
                  <span className="text-blue-800 dark:text-blue-300">
                    Client has not provided a message for this appointment
                  </span>
                </div>
              </div>
            </div>

            {/* My notes to client */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                My notes to dj cloudpeak
              </h3>
              {editNoteType ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <NotesEditor
                    initialContent={noteValue}
                    onChange={(html: any) => setNoteValue(html)}
                    height="min-h-30"
                  />
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#145824] to-[#1a6b2e] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                      onClick={() => setEditNoteType(false)}
                    >
                      <FiSave />
                      {i18next.t('common.save')}
                    </button>
                    <button
                      className="flex items-center gap-2 px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors font-medium"
                      onClick={() => setEditNoteType(false)}
                    >
                      <FiX />
                      {i18next.t('common.cancel')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600 flex items-end gap-4">
                  <div
                    className="flex-1 min-h-[100px] text-gray-800 dark:text-gray-200"
                    dangerouslySetInnerHTML={{ __html: noteValue }}
                  />
                  <button
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#145824] to-[#1a6b2e] text-white rounded-xl shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300 font-medium"
                    onClick={() => setEditNoteType(true)}
                  >
                    <FiEdit3 />
                    {i18next.t('common.edit')}
                  </button>
                </div>
              )}
            </div>

            {/* My private notes */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {i18next.t('messages.myPrivateNote')}
              </h3>
              {editPrivateNoteType ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                  <NotesEditor
                    initialContent={privateNoteValue}
                    onChange={(html: any) => setPrivateNoteValue(html)}
                    height="min-h-32"
                  />
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#145824] to-[#1a6b2e] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                      onClick={() => setEditPrivateNoteType(false)}
                    >
                      <FiSave />
                      {i18next.t('common.save')}
                    </button>
                    <button
                      className="flex items-center gap-2 px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors font-medium"
                      onClick={() => setEditPrivateNoteType(false)}
                    >
                      <FiX />
                      {i18next.t('common.cancel')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600 flex items-end gap-4">
                  <div
                    className="flex-1 min-h-[100px] text-gray-800 dark:text-gray-200"
                    dangerouslySetInnerHTML={{ __html: privateNoteValue }}
                  />
                  <button
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#145824] to-[#1a6b2e] text-white rounded-xl shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300 font-medium"
                    onClick={() => setEditPrivateNoteType(true)}
                  >
                    <FiEdit3 />
                    {i18next.t('messages.addPrivateNote')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Email Dialog */}
      {emailDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Email Consultation Record
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={emailForm.name}
                onChange={(e) =>
                  setEmailForm({ ...emailForm, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#145824] dark:bg-gray-700 dark:text-gray-100"
              />
              <input
                type="email"
                placeholder="Recipient's Email"
                value={emailForm.recipient}
                onChange={(e) =>
                  setEmailForm({ ...emailForm, recipient: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#145824] dark:bg-gray-700 dark:text-gray-100"
              />
              <input
                type="text"
                placeholder="Subject"
                value={emailForm.subject}
                onChange={(e) =>
                  setEmailForm({ ...emailForm, subject: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#145824] dark:bg-gray-700 dark:text-gray-100"
              />
              <textarea
                placeholder="Note"
                value={emailForm.note}
                onChange={(e) =>
                  setEmailForm({ ...emailForm, note: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#145824] dark:bg-gray-700 dark:text-gray-100 resize-none"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEmailDialogOpen(false)}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors font-medium"
              >
                CLOSE
              </button>
              <button
                onClick={() => setEmailDialogOpen(false)}
                className="px-6 py-2 bg-gradient-to-r from-[#145824] to-[#1a6b2e] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
              >
                EMAIL RECORD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessagesInfoPage
