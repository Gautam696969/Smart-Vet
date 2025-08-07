import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FiArrowLeft, FiSave, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const CreateServiceCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const isEditMode = !!id;
  const categoryData = location.state?.category;

  // Populate form fields when in edit mode
  useEffect(() => {
    if (isEditMode && categoryData) {
      setName(categoryData.name || "");
      setDescription(categoryData.description || "");
    }
  }, [isEditMode, categoryData]);

  const handleSave = () => {
    if (isEditMode) {
      console.log("Updating service category:", { id, name, description });
    } else {
      console.log("Creating service category:", { name, description });
    }
    navigate(-1);
  };

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
              {t("common.back")}
            </button>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {isEditMode ? t("services.editServiceCategory") : t("services.createServiceCategory")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isEditMode
                ? t("services.updateCategoryInfo")
                : t("services.createNewCategoryContent")}
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="w-full px-6 py-8">
        <div className="w-full">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div   className="p-8">
              {/* Category Details */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#145824] dark:text-green-400 mb-6">
                  {t("services.categoryInformation")}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {t("services.categoryNameRequired")}
                      </label>
                      <input
                        type="text"
                        placeholder={t("services.categoryNamePlaceholder")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {t("services.description")}
                      </label>
                      <textarea
                        placeholder={t("services.descriptionPlaceholder")}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#145824] focus:border-transparent dark:bg-gray-700 dark:text-gray-100 transition-all duration-200 resize-none"
                      />
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                    <div className="space-y-6 text-gray-600 dark:text-gray-300">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          {t("services.categoryName")}
                        </h4>
                        <p className="text-sm">
                          {t("services.categoryNameHelp")}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          {t("services.description")}
                        </h4>
                        <p className="text-sm">
                          {t("services.descriptionHelp")}
                        </p>
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
                        <h5 className="font-medium text-green-800 dark:text-green-400 mb-1">
                          {t("services.tipTitle")}
                        </h5>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          {t("services.tipContent")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 px-8 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-200"
                >
                  <FiX className="text-lg" />
                  {t("common.cancel")}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!name.trim()}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#145824] to-[#1a6b2e] hover:from-[#1a6b2e] hover:to-[#145824] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <FiSave className="text-lg" />
                  {isEditMode ? t("services.updateCategory") : t("services.createCategory")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateServiceCategoryPage;
