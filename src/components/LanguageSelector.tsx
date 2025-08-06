import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();

  return (
    <div className="language-selector">
      <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value)}
        className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {availableLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
