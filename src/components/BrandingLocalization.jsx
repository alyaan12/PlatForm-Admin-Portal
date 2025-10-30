import React, { useState } from "react";

export default function BrandingLocalization() {
  // Mock companies list — you can replace this with props or API data
  const companies = [
    { id: 1, name: "Your Company" },
    { id: 2, name: "Zones Pvt Ltd" },
    { id: 3, name: "Albertio Solutions" },
    { id: 4, name: "NextGen Electric" },
  ];

  const [brand, setBrand] = useState({
    name: companies[0].name,
    logo: "",
    language: "en",
  });
  const [isChanged, setIsChanged] = useState(false);

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500";

  const handleSave = () => {
    if (!brand.name.trim()) {
      alert("Brand name is required.");
      return;
    }
    alert(
      `Branding saved:\nName: ${brand.name}\nLogo: ${
        brand.logo || "N/A"
      }\nLanguage: ${brand.language}`
    );
    setIsChanged(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setBrand((prev) => ({ ...prev, logo: evt.target.result }));
        setIsChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-8 max-w-xl">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-lime-800">
          Branding & Localization
        </h3>
        <p className="text-sm text-lime-500 mt-1">
          Manage your company branding and default language preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* Brand Name Dropdown */}
        <div>
          <label className="block text-sm font-medium text-lime-700 mb-1">
            Select Company
          </label>
          <select
            className={inputClass}
            value={brand.name}
            onChange={(e) => {
              setBrand({ ...brand, name: e.target.value });
              setIsChanged(true);
            }}
          >
            {companies.map((company) => (
              <option key={company.id} value={company.name}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-lime-700 mb-2">
            Company Logo
          </label>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <div className="flex-1">
              <input
                className={inputClass}
                placeholder="Logo URL"
                value={brand.logo}
                onChange={(e) => {
                  setBrand({ ...brand, logo: e.target.value });
                  setIsChanged(true);
                }}
              />
              <input
                type="file"
                accept="image/*"
                className="text-sm text-lime-600 mt-2"
                onChange={handleFileUpload}
              />
            </div>

            {brand.logo && (
              <div className="mt-4 sm:mt-0 flex-shrink-0">
                <div className="h-16 w-16 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                  <img
                    src={brand.logo}
                    alt="Logo Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-lime-700 mb-1">
            Default Language
          </label>
          <select
            className={inputClass}
            value={brand.language}
            onChange={(e) => {
              setBrand({ ...brand, language: e.target.value });
              setIsChanged(true);
            }}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="ur">Urdu</option>
            <option value="ar">Arabic</option>
            <option value="fr">French</option>
          </select>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            disabled={!isChanged}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isChanged
                ? "bg-lime-600 hover:bg-lime-700 text-white shadow-sm"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
