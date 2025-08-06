import React, { useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import {
  FiArrowLeft,
  FiBold,
  FiItalic,
  FiUnderline,
  FiLink,
  FiTrash2,
  FiChevronUp,
  FiChevronDown,
  FiPlus
} from 'react-icons/fi'
import Button from '../../shared/components/Button'
import { useTranslation } from 'react-i18next'
import { CheckBox } from '@mui/icons-material'
import { Checkbox } from '@mui/material'

// Modern rich text editor with icons
type RichTextEditorProps = {
  value: string
  onChange: (val: string) => void
  placeholder?: string
  error?: string
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder,
  error
}) => {
  return (
    <div>
      <div
        className={`border ${
          error
            ? 'border-red-300 dark:border-red-600'
            : 'border-gray-300 dark:border-gray-600'
        } rounded-xl overflow-hidden bg-white dark:bg-gray-700`}
      >
        <div className="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-600">
          <button
            type="button"
            onClick={() => document.execCommand('bold', false)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
          >
            <FiBold className="text-gray-600 dark:text-gray-300" />
          </button>
          <button
            type="button"
            onClick={() => document.execCommand('italic', false)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
          >
            <FiItalic className="text-gray-600 dark:text-gray-300" />
          </button>
          <button
            type="button"
            onClick={() => document.execCommand('underline', false)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
          >
            <FiUnderline className="text-gray-600 dark:text-gray-300" />
          </button>
          <button
            type="button"
            onClick={() => {
              const url = prompt('Enter URL') || ''
              document.execCommand('createLink', false, url)
            }}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
          >
            <FiLink className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <div className="relative">
          <div
            contentEditable
            suppressContentEditableWarning
            className="min-h-[80px] p-4 outline-none text-gray-900 dark:text-gray-100"
            onInput={(e) => onChange(e.currentTarget.innerHTML)}
            dangerouslySetInnerHTML={{ __html: value }}
          />
          {(!value || value === '<br>') && (
            <div className="absolute left-4 top-4 text-gray-400 dark:text-gray-500 pointer-events-none italic">
              {placeholder}
            </div>
          )}
        </div>
      </div>
      {error && (
        <div className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  )
}

type IntakeQuestion = {
  id: string
  text: string
  required: boolean
  enabled: boolean
  type: string
}

type ServiceFormData = {
  name: string
  description: string
  category: string
  type: string
  duration: string
  onDemand: boolean
  amount: string
  taxPercent: string
  provideAddress: boolean
  providePhone: boolean
  allEmployees: boolean
  questions: IntakeQuestion[]
  allowBooking: boolean
  featureOnHomepage: boolean
  features: { value: string }[]
}

const CreateServicePage: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const { t } = useTranslation()
  const isEditMode = !!id
  const serviceData = location.state?.service

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ServiceFormData>({
    defaultValues: {
      name: '',
      description: '',
      category: '',
      type: '',
      duration: '',
      onDemand: false,
      amount: '0',
      taxPercent: '0',
      provideAddress: false,
      providePhone: true,
      allEmployees: true,
      questions: [
        {
          id: Math.random().toString(36).substr(2, 9),
          text: '',
          required: true,
          enabled: true,
          type: 'one-line'
        }
      ],
      allowBooking: true,
      featureOnHomepage: false,
      features: [{ value: '' }]
    }
  })

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
    move: moveQuestion
  } = useFieldArray({
    control,
    name: 'questions'
  })

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature
  } = useFieldArray({
    control,
    name: 'features'
  })

  // Populate form fields when in edit mode
  useEffect(() => {
    if (isEditMode && serviceData) {
      reset({
        name: serviceData.title || '',
        description: serviceData.description || '',
        category: serviceData.category || '',
        type: serviceData.type || '',
        duration: serviceData.sessionInfo || '',
        amount: serviceData.price?.replace('$', '') || '0',
        onDemand: serviceData.onDemand || false,
        taxPercent: serviceData.taxPercent || '0',
        provideAddress: serviceData.provideAddress || false,
        providePhone: serviceData.providePhone || true,
        allEmployees: serviceData.allEmployees || true,
        allowBooking: serviceData.allowBooking || true,
        featureOnHomepage: serviceData.featured || false,
        questions:
          serviceData.questions && serviceData.questions.length > 0
            ? serviceData.questions
            : [
                {
                  id: Math.random().toString(36).substr(2, 9),
                  text: '',
                  required: true,
                  enabled: true,
                  type: 'one-line'
                }
              ],
        features:
          serviceData.features && serviceData.features.length > 0
            ? serviceData.features.map((f: string) => ({ value: f }))
            : [{ value: '' }]
      })
    }
  }, [isEditMode, serviceData, reset])

  const onSubmit = (data: ServiceFormData) => {
    const formattedData = {
      ...data,
      features: data.features.map((f) => f.value).filter((f) => f.trim() !== '')
    }

    if (isEditMode) {
      console.log('Update service', { id, ...formattedData })
    } else {
      console.log('Create service', formattedData)
    }
    navigate('/admin-services')
  }

  const addQuestion = () => {
    appendQuestion({
      id: Math.random().toString(36).substr(2, 9),
      text: '',
      required: true,
      enabled: true,
      type: 'one-line'
    })
  }

  const addFeature = () => {
    appendFeature({ value: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="w-full px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-200 text-gray-700 dark:text-gray-300 font-medium"
            >
              <FiArrowLeft className="text-lg" />
              {t('common.back')}
            </button>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {isEditMode
                ? t('services.editService')
                : t('services.createNewService')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isEditMode
                ? t('services.updateServiceDescription')
                : t('services.createServiceDescription')}
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="w-full px-6 py-8">
        <div className="w-full">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit)} className="p-8">
              {/* Service Details */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#145824] dark:text-green-400 mb-6">
                  {t('services.serviceDetails')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {t('services.serviceNameRequired')}
                      </label>
                      <Controller
                        name="name"
                        control={control}
                        rules={{
                          required: t('services.serviceNameRequired'),
                          minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters'
                          }
                        }}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className={`w-full px-4 py-3 border ${
                              errors.name
                                ? 'border-red-300 dark:border-red-600'
                                : 'border-gray-300 dark:border-gray-600'
                            } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200`}
                            placeholder={t('services.serviceNamePlaceholder')}
                          />
                        )}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {t('services.description')}
                      </label>
                      <Controller
                        name="description"
                        control={control}
                        rules={{ required: 'Description is required' }}
                        render={({ field }) => (
                          <RichTextEditor
                            value={field.value}
                            onChange={field.onChange}
                            placeholder={t(
                              'services.serviceDescriptionPlaceholder'
                            )}
                            error={errors.description?.message}
                          />
                        )}
                      />
                    </div>

                    <div>
                      <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('services.serviceCategories')}
                      </label>
                      <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder={t(
                              'services.serviceCategoriesPlaceholder'
                            )}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                    <div className="space-y-6 text-gray-600 dark:text-gray-300">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          {t('services.serviceName')}
                        </h4>
                        <p className="text-sm">
                          {t('services.serviceNameHelp')}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          {t('services.description')}
                        </h4>
                        <p className="text-sm">
                          {t('services.serviceDescriptionHelp')}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          {t('services.categoryName')}
                        </h4>
                        <p className="text-sm">
                          {t('services.categoriesHelp')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Settings */}
              <div className="mb-12 border-t border-gray-200 dark:border-gray-700 pt-12">
                <h2 className="text-2xl font-bold text-[#145824] dark:text-green-400 mb-6">
                  {t('services.serviceSettings')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {t('services.communicationTypeRequired')}
                      </label>
                      <Controller
                        name="type"
                        control={control}
                        rules={{ required: 'Communication type is required' }}
                        render={({ field }) => (
                          <select
                            {...field}
                            className={`w-full px-4 py-3 border ${
                              errors.type
                                ? 'border-red-300 dark:border-red-600'
                                : 'border-gray-300 dark:border-gray-600'
                            } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200`}
                          >
                            <option value="">
                              {t('services.selectCommunicationMethod')}
                            </option>
                            <option value="video">
                              {t('services.videoConsultation')}
                            </option>
                            <option value="phone">
                              {t('services.phoneCall')}
                            </option>
                            <option value="message">
                              {t('services.messaging')}
                            </option>
                            <option value="home">
                              {t('services.homeVisit')}
                            </option>
                          </select>
                        )}
                      />
                      {errors.type && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.type.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {t('services.duration')}
                      </label>
                      <Controller
                        name="duration"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder={t('services.durationPlaceholder')}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                    <div className="space-y-6 text-gray-600 dark:text-gray-300">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          {t('services.communicationType')}
                        </h4>
                        <p className="text-sm">
                          {t('services.communicationTypeHelp')}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          {t('services.duration')}
                        </h4>
                        <p className="text-sm">{t('services.durationHelp')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scheduling Type */}
              <div className="mb-12 border-t border-gray-200 dark:border-gray-700 pt-12">
                <h2 className="text-2xl font-bold text-[#145824] dark:text-green-400 mb-6">
                  {t('services.schedulingOptions')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <Controller
                      name="onDemand"
                      control={control}
                      render={({ field }) => (
                        <label className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                          <Checkbox
                            {...field}
                            checked={!!field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            sx={{
                              color: 'gray',
                              '&.Mui-checked': {
                                color: 'blueblue'
                              }
                            }}
                          />
                          <div className="ml-4">
                            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              {t('services.onDemandBooking')}
                            </span>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {t('services.enableInstantBooking')}
                            </p>
                          </div>
                        </label>
                      )}
                    />
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {t('services.onDemandBooking')}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t('services.onDemandServiceHelp')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Billing Section */}
              <div className="mb-12 border-t border-gray-200 dark:border-gray-700 pt-12">
                <h2 className="text-2xl font-bold text-[#145824] dark:text-green-400 mb-6">
                  {t('services.pricingBilling')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {t('services.servicePrice')}
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                          $
                        </span>
                        <Controller
                          name="amount"
                          control={control}
                          rules={{
                            required: 'Price is required',
                            min: {
                              value: 0,
                              message: 'Price must be 0 or greater'
                            }
                          }}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="number"
                              className={`w-full pl-8 pr-4 py-3 border ${
                                errors.amount
                                  ? 'border-red-300 dark:border-red-600'
                                  : 'border-gray-300 dark:border-gray-600'
                              } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200`}
                              placeholder="0.00"
                            />
                          )}
                        />
                      </div>
                      {errors.amount && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.amount.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {t('services.taxPercentage')}
                      </label>
                      <div className="relative">
                        <Controller
                          name="taxPercent"
                          control={control}
                          rules={{
                            min: {
                              value: 0,
                              message: 'Tax must be 0 or greater'
                            },
                            max: {
                              value: 100,
                              message: 'Tax cannot exceed 100%'
                            }
                          }}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="number"
                              className="w-full pr-8 pl-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                              placeholder="0"
                            />
                          )}
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                          %
                        </span>
                      </div>
                      {errors.taxPercent && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.taxPercent.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl">
                    <div className="space-y-6 text-gray-600 dark:text-gray-300">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          {t('services.servicePrice')}
                        </h4>
                        <p className="text-sm">
                          {t('services.servicePriceHelp')}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          {t('services.taxPercentage')}
                        </h4>
                        <p className="text-sm">
                          {t('services.taxCalculationHelp')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Details Section */}
              <div className="mb-12 border-t border-gray-200 dark:border-gray-700 pt-12">
                <h2 className="text-2xl font-bold text-[#145824] dark:text-green-400 mb-6">
                  {t('services.bookingDetails')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Controller
                        name="provideAddress"
                        control={control}
                        render={({ field }) => (
                          <label className="flex items-center">
                            <Checkbox
                              {...field}
                              checked={!!field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              sx={{
                                color: 'gray',
                                '&.Mui-checked': {
                                  color: 'blueblue'
                                }
                              }}
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">
                              {t('services.requireAddress')}
                            </span>
                          </label>
                        )}
                      />
                    </div>
                    <div>
                      <Controller
                        name="providePhone"
                        control={control}
                        render={({ field }) => (
                          <label className="flex items-center">
                            <Checkbox
                              {...field}
                              checked={!!field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              sx={{
                                color: 'gray',
                                '&.Mui-checked': {
                                  color: 'blueblue'
                                }
                              }}
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">
                              {t('services.requirePhoneNumber')}
                            </span>
                          </label>
                        )}
                      />
                    </div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl">
                    <div className="space-y-6 text-gray-600 dark:text-gray-300">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          {t('services.requireAddress')}
                        </h4>
                        <p className="text-sm">
                          {t('services.addressRequirementHelp')}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          {t('services.requirePhoneNumber')}
                        </h4>
                        <p className="text-sm">
                          {t('services.phoneRequirementHelp')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Employees Section */}
              <div className="mb-12 border-t border-gray-200 dark:border-gray-700 pt-12">
                <h2 className="text-2xl font-bold text-[#145824] dark:text-green-400 mb-6">
                  {t('services.employees')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Controller
                        name="allEmployees"
                        control={control}
                        render={({ field }) => (
                          <label className="flex items-center">
                            <Checkbox
                              {...field}
                              checked={!!field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              sx={{
                                color: 'gray',
                                '&.Mui-checked': {
                                  color: 'blueblue'
                                }
                              }}
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">
                              {t('services.allEmployees')}
                            </span>
                          </label>
                        )}
                      />
                    </div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {t('services.allEmployees')}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t('services.allEmployeesHelp')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Intake Questions Section */}
              <div className="mb-12 border-t border-gray-200 dark:border-gray-700 pt-12">
                <h2 className="text-2xl font-bold text-[#145824] dark:text-green-400 mb-6">
                  {t('services.clientIntakeQuestions')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  {t('services.intakeQuestionsDescription')}
                </p>

                <div className="space-y-6">
                  {questionFields.map((field, idx) => (
                    <div
                      key={field.id}
                      className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl p-6 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {t('services.question')} {idx + 1}
                        </h4>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => moveQuestion(idx, idx - 1)}
                            disabled={idx === 0}
                            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FiChevronUp className="text-gray-600 dark:text-gray-300" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveQuestion(idx, idx + 1)}
                            disabled={idx === questionFields.length - 1}
                            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <FiChevronDown className="text-gray-600 dark:text-gray-300" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeQuestion(idx)}
                            className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>

                      <Controller
                        name={`questions.${idx}.text`}
                        control={control}
                        render={({ field }) => (
                          <RichTextEditor
                            value={field.value}
                            onChange={field.onChange}
                            placeholder={t('services.questionPlaceholder')}
                          />
                        )}
                      />

                      <div className="flex flex-wrap items-center gap-6 mt-4">
                        <Controller
                          name={`questions.${idx}.required`}
                          control={control}
                          render={({ field }) => (
                            <label className="flex items-center">
                              <Checkbox
                                {...field}
                                checked={!!field.value}
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                }
                                sx={{
                                  color: 'gray',
                                  '&.Mui-checked': {
                                    color: 'blueblue'
                                  }
                                }}
                              />
                              <span className="ml-2 text-gray-700 dark:text-gray-300">
                                {t('services.required')}
                              </span>
                            </label>
                          )}
                        />
                        <Controller
                          name={`questions.${idx}.enabled`}
                          control={control}
                          render={({ field }) => (
                            <label className="flex items-center">
                              <Checkbox
                                {...field}
                                checked={!!field.value}
                                onChange={(e) =>
                                  field.onChange(e.target.checked)
                                }
                                sx={{
                                  color: 'gray',
                                  '&.Mui-checked': {
                                    color: 'blueblue'
                                  }
                                }}
                              />
                              {/* <input
                                {...field}
                                type="checkbox"
                                checked={field.value}
                                className="w-4 h-4 text-[#145824] bg-gray-100 border-gray-300 rounded focus:ring-[#145824]"
                              /> */}
                              <span className="ml-2 text-gray-700 dark:text-gray-300">
                                {t('services.enabled')}
                              </span>
                            </label>
                          )}
                        />
                        <Controller
                          name={`questions.${idx}.type`}
                          control={control}
                          render={({ field }) => (
                            <select
                              {...field}
                              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#145824] dark:bg-gray-600 dark:text-gray-100"
                            >
                              <option value="one-line">
                                {t('services.singleLineText')}
                              </option>
                              <option value="multi-line">
                                {t('services.multiLineText')}
                              </option>
                              <option value="dropdown">
                                {t('services.dropdown')}
                              </option>
                              <option value="checkbox">
                                {t('services.checkbox')}
                              </option>
                            </select>
                          )}
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addQuestion}
                    className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium text-gray-700 dark:text-gray-300"
                  >
                    <FiPlus />
                    {t('services.addQuestion')}
                  </button>
                </div>
              </div>

              {/* Marketing and Features Section */}
              <div className="mb-12 border-t border-gray-200 dark:border-gray-700 pt-12">
                <h2 className="text-2xl font-bold text-[#145824] dark:text-green-400 mb-6">
                  {t('services.marketingFeatures')}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Controller
                        name="allowBooking"
                        control={control}
                        render={({ field }) => (
                          <label className="flex items-center">
                            <Checkbox
                              {...field}
                              checked={!!field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              sx={{
                                color: 'gray',
                                '&.Mui-checked': {
                                  color: 'blueblue'
                                }
                              }}
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">
                              {t('services.allowClientsToBook')}
                            </span>
                          </label>
                        )}
                      />
                    </div>
                    <div>
                      <Controller
                        name="featureOnHomepage"
                        control={control}
                        render={({ field }) => (
                          <label className="flex items-center">
                            <Checkbox
                              {...field}
                              checked={!!field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              sx={{
                                color: 'gray',
                                '&.Mui-checked': {
                                  color: 'blueblue'
                                }
                              }}
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">
                              {t('services.featureOnHomepage')}
                            </span>
                          </label>
                        )}
                      />
                    </div>
                  </div>
                  <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-xl">
                    <div className="space-y-6 text-gray-600 dark:text-gray-300">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          {t('services.allowClientsToBook')}
                        </h4>
                        <p className="text-sm">
                          {t('services.publicBookingHelp')}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          {t('services.featureOnHomepage')}
                        </h4>
                        <p className="text-sm">
                          {t('services.homepageFeatureHelp')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100 text-lg mb-2">
                    {t('services.features')}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {t('services.featuresDescription')}
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl p-6">
                    {featureFields.map((field, idx) => (
                      <div
                        key={field.id}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 mb-4 flex items-center"
                      >
                        <Controller
                          name={`features.${idx}.value`}
                          control={control}
                          render={({ field }) => (
                            <textarea
                              {...field}
                              placeholder={t('services.featurePlaceholder')}
                              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#145824] dark:bg-gray-700 dark:text-gray-100 transition-all duration-200 resize-none"
                            />
                          )}
                        />
                        <Button
                          type="button"
                          style={{
                            background: 'none',
                            color: '#1976d2',
                            border: 'none',
                            minWidth: 0,
                            boxShadow: 'none',
                            fontSize: 16,
                            padding: '4px 12px'
                          }}
                          onClick={() => removeFeature(idx)}
                        >
                          {t('services.remove')}
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      style={{
                        background: '#fff',
                        color: '#222',
                        border: '1px solid #ccc',
                        minWidth: 180,
                        boxShadow: 'none',
                        marginTop: 8
                      }}
                      onClick={addFeature}
                    >
                      {t('services.addFeature')}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-8 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-200"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-[#145824] to-[#1a6b2e] hover:from-[#1a6b2e] hover:to-[#145824] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? 'Submitting...'
                    : isEditMode
                      ? t('services.updateService')
                      : t('services.createService')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateServicePage
