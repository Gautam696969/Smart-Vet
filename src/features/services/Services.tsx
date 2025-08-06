import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/Button";
import i18next from "i18next";

type Service = {
  id: number;
  title: string;
  description: string;
  price: string;
  sessionInfo: string;
  featured?: boolean;
};

const mockServices: Service[] = [
  {
    id: 1,
    title: "Messaging Session with a Veterinarian",
    description: "Message Consultation",
    price: "$0.00",
    sessionInfo: "1 message session",
    featured: true,
  },
  {
    id: 2,
    title: "Video Consultation with a Veterinarian",
    description: "Video Consultation",
    price: "$0.00",
    sessionInfo: "15 minute session",
    featured: true,
  },
  {
    id: 3,
    title: "Phone Consultation with a Veterinarian",
    description: "Phone Consultation",
    price: "$0.00",
    sessionInfo: "15 minute session",
    featured: true,
  },
  {
    id: 4,
    title: "test",
    description: "Home Health Service",
    price: "$0.00",
    sessionInfo: "1 home visit",
    featured: false,
  },
];

const ServicePage: React.FC = () => {
  const [loading] = useState(false);
  const [services, setServices] = useState<Service[]>(mockServices);
  const [dark, setDark] = useState<boolean>(() => {
    // Try to get theme from localStorage
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  const navigate = useNavigate();

  // Handler to move a service up in the list
  const handleMoveUp = (idx: number) => {
    if (idx === 0) return;
    setServices((prev) => {
      const newServices = [...prev];
      [newServices[idx - 1], newServices[idx]] = [newServices[idx], newServices[idx - 1]];
      return newServices;
    });
  };

  // Handler to move a service down in the list
  const handleMoveDown = (idx: number) => {
    if (idx === services.length - 1) return;
    setServices((prev) => {
      const newServices = [...prev];
      [newServices[idx], newServices[idx + 1]] = [newServices[idx + 1], newServices[idx]];
      return newServices;
    });
  };

  // Theme toggle handler
  const handleThemeToggle = () => {
    setDark((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", next ? "dark" : "light");
        document.documentElement.classList.toggle("dark", next);
      }
      return next;
    });
  };

  // Ensure theme class is set on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", dark);
    }
  }, [dark]);

  // Handler to navigate to edit service category
  const handleEditCategory = (service: Service, idx: number) => {
    navigate(`/services-categories/edit/${service.id}`, {
      state: {
        category: {
          id: service.id,
          name: service.title.replace('with a Veterinarian', 'Category'),
          description: `${service.description} services and related offerings`,
          index: idx
        }
      }
    });
  };

  // Handler to navigate to edit service
  const handleEditService = (service: Service, idx: number) => {
    navigate(`/services/edit/${service.id}`, {
      state: {
        service: {
          ...service,
          index: idx
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">

      {/* Service Categories Section */}
      <div className="w-full px-6 py-8">
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-white mb-2">
              {i18next.t("services.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {i18next.t("services.seviceDescription")}
            </p>
          </div>
          <Button
            style={{
              background: "linear-gradient(135deg, #145824 0%, #1a6b2e 100%)",
              color: "#fff",
              minWidth: 120,
              padding: "12px 24px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(20, 88, 36, 0.3)",
            }}
            onClick={() => navigate('/services-categories/create')}
            className="hover:transform hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            + {i18next.t("common.create")}
          </Button>
        </div>

        {/* Service Categories Grid */}
        <div className="grid gap-6 mb-12">
          {services.slice(0, 2).map((service, idx) => (
            <div
              key={`category-${service.id}`}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                  {/* Category Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-1xl md:text-xl font-semibold text-green-900 dark:text-white">
                        {service.title.replace('with a Veterinarian', 'Category')}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                      {service.description} {i18next.t("services.servicesAndRelatedOfferings")}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-4 min-w-[210px]">
                    {/* Move Buttons */}
                    <div className="flex gap-3">
                      <button
                        className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={idx === 0}
                        onClick={() => handleMoveUp(idx)}
                      >
                        ↑ {i18next.t("common.up")}
                      </button>
                      <button
                        className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={idx === 1}
                        onClick={() => handleMoveDown(idx)}
                      >
                        ↓ {i18next.t("common.down")}
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button 
                        className="flex-1 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                        onClick={() => handleEditCategory(service, idx)}
                      >
                        {i18next.t("common.update")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="w-full px-6 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-green-900 dark:text-white mb-2">
              {i18next.t("services.availableServices")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {services.length} service{services.length !== 1 ? 's' : ''} available
            </p>
          </div>
          <Button
            style={{
              background: "linear-gradient(135deg, #145824 0%, #1a6b2e 100%)",
              color: "#fff",
              minWidth: 120,
              padding: "12px 24px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(20, 88, 36, 0.3)",
            }}
            onClick={() => navigate('/services/create')}
            className="hover:transform hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            + {i18next.t("common.create")}
          </Button>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                  {/* Service Info */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-xl md:text-xl font-semibold text-green-900 dark:text-white">
                        {service.title}
                      </h3>
                      {service.featured && (
                        <span className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full px-4 py-2 text-sm font-medium shadow-lg">
                          <span className="text-base">★</span>
                          {i18next.t("services.featured")}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-2xl font-bold text-[#145824] dark:text-green-400">
                        {service.price}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">/ {service.sessionInfo}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-4 min-w-[200px]">
                    {/* Move Buttons */}
                    <div className="flex gap-3">
                      <button
                        className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={idx === 0}
                        onClick={() => handleMoveUp(idx)}
                      >
                        ↑ {i18next.t("common.up")}
                      </button>
                      <button
                        className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={idx === services.length - 1}
                        onClick={() => handleMoveDown(idx)}
                      >
                        ↓ {i18next.t("common.down")}
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="flex-1 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg font-medium transition-all duration-200">
                        {i18next.t("common.duplicate")}
                      </button>
                      <button 
                        className="flex-1 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                        onClick={() => handleEditService(service, idx)}
                      >
                        {i18next.t("common.update")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {services.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-12 w-full max-w-md mx-auto">
              <div className="text-6xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No services yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create your first service to get started
              </p>
              <Button
                style={{
                  background: "linear-gradient(135deg, #145824 0%, #1a6b2e 100%)",
                  color: "#fff",
                  padding: "12px 24px",
                  borderRadius: "12px",
                }}
                onClick={() => navigate('/admin-services/create')}
              >
                Create Service
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicePage;
