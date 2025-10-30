import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function Companies() {
  // Initial sample data
  const [companies, setCompanies] = useState([
    {
      id: 1,
      orgName: "Zones Pvt Ltd",
      userName: "Ali",
      website: "https://zones.pvt.com",
      contact: "0300-1234567",
      email: "info@zones.com",
      timezone: "Asia/Karachi (GMT+5)",
      language: "en",
      created: new Date().toLocaleDateString(),
      logo: "",
      twoFactorEnabled: true,
    },
    {
      id: 2,
      orgName: "Albertio Solutions",
      userName: "Sara",
      website: "https://albertio.com",
      contact: "0311-7654321",
      email: "contact@albertio.com",
      timezone: "Europe/London (GMT+1)",
      language: "es",
      created: new Date().toLocaleDateString(),
      logo: "",
      twoFactorEnabled: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [activeTab, setActiveTab] = useState("details"); // "details" or "branding"

  // Company Details form fields
  const [orgName, setOrgName] = useState("");
  const [userName, setUserName] = useState("");
  const [website, setWebsite] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [timezone, setTimezone] = useState("");
  const [language, setLanguage] = useState("en");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Branding & Localization fields
  const [logo, setLogo] = useState("");
  const [brandingLanguage, setBrandingLanguage] = useState("en");

  const inputClass =
    "w-full border border-lime-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400";

  // Common Timezones List
  const timezones = [
    "America/Anchorage (GMT-9)",
    "America/Los_Angeles (GMT-8)",
    "America/New_York (GMT-5)",
    "Atlantic/Azores (GMT-1)",
    "Europe/London (GMT+1)",
    "Asia/Dubai (GMT+4)",
    "Asia/Karachi (GMT+5)",
    "Asia/Hong_Kong (GMT+8)",
    "Australia/Sydney (GMT+10)",
    "Pacific/Auckland (GMT+12)",
  ];

  const resetForm = () => {
    setOrgName("");
    setUserName("");
    setWebsite("");
    setContact("");
    setEmail("");
    setTimezone("");
    setLanguage("en");
    setLogo("");
    setBrandingLanguage("en");
    setTwoFactorEnabled(false);
    setEditingCompany(null);
    setActiveTab("details");
  };

  const openModal = (company = null) => {
    if (company) {
      setEditingCompany(company);
      setOrgName(company.orgName);
      setUserName(company.userName);
      setWebsite(company.website);
      setContact(company.contact);
      setEmail(company.email);
      setTimezone(company.timezone);
      setLanguage(company.language);
      setLogo(company.logo || "");
      setBrandingLanguage(company.language || "en");
      setTwoFactorEnabled(company.twoFactorEnabled || false);
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const saveCompany = () => {
    if (!orgName || !userName || !email) {
      alert("Organization name, user name and email are required");
      return;
    }

    const companyData = {
      orgName,
      userName,
      website,
      contact,
      email,
      timezone,
      language,
      logo,
      brandingLanguage,
      twoFactorEnabled,
    };

    if (editingCompany) {
      const updated = companies.map((c) =>
        c.id === editingCompany.id ? { ...c, ...companyData } : c
      );
      setCompanies(updated);
    } else {
      const newCompany = {
        id: Date.now(),
        ...companyData,
        created: new Date().toLocaleDateString(),
      };
      setCompanies([...companies, newCompany]);
    }

    setShowModal(false);
    resetForm();
  };

  const deleteCompany = (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      setCompanies(companies.filter((c) => c.id !== id));
    }
  };

  // Handle logo upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setLogo(evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <h2 className="text-xl font-bold mb-4 text-lime-700">
        Companies Overview
      </h2>

      {/* Add Button */}
      <button
        onClick={() => openModal()}
        className="mb-4 bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded text-sm"
      >
        + Add New Company
      </button>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-200 bg-white shadow">
          <thead className="bg-lime-100 text-lime-700">
            <tr>
              <th className="border p-2 text-left">Organization</th>
              <th className="border p-2 text-left">User</th>
              <th className="border p-2 text-left">Website</th>
              <th className="border p-2 text-left">Contact</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Timezone</th>
              <th className="border p-2 text-left">Language</th>
              <th className="border p-2 text-left">2FA</th>
              <th className="border p-2 text-left">Created</th>
              <th className="border p-2 text-left w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center p-4">
                  No companies yet.
                </td>
              </tr>
            )}
            {companies.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="border p-2">{c.orgName}</td>
                <td className="border p-2">{c.userName}</td>
                <td className="border p-2">
                  <a
                    href={c.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lime-700 hover:underline"
                  >
                    {c.website}
                  </a>
                </td>
                <td className="border p-2">{c.contact}</td>
                <td className="border p-2">{c.email}</td>
                <td className="border p-2">{c.timezone}</td>
                <td className="border p-2 capitalize">{c.language}</td>
                <td className="border p-2 text-center">
                  {c.twoFactorEnabled ? (
                    <span className="text-green-600 font-medium">Enabled</span>
                  ) : (
                    <span className="text-gray-500">Disabled</span>
                  )}
                </td>
                <td className="border p-2">{c.created}</td>
                <td className="border p-2 flex gap-3 items-center justify-center">
                  <button
                    onClick={() => openModal(c)}
                    title="Edit Company"
                    className="text-lime-600 hover:text-lime-800"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => deleteCompany(c.id)}
                    title="Delete Company"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            <button
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>

            {/* Tabs */}
            <div className="flex border-b mb-4">
              <button
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === "details"
                    ? "border-b-2 border-lime-600 text-lime-700"
                    : "text-gray-500 hover:text-lime-600"
                }`}
                onClick={() => setActiveTab("details")}
              >
                Company Details
              </button>
              <button
                className={`flex-1 py-2 text-center font-medium ${
                  activeTab === "branding"
                    ? "border-b-2 border-lime-600 text-lime-700"
                    : "text-gray-500 hover:text-lime-600"
                }`}
                onClick={() => setActiveTab("branding")}
              >
                Localization
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "details" ? (
              <div className="grid gap-2 mb-4">
                <input
                  className={inputClass}
                  placeholder="Organization name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="User name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="Company website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="Contact number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="Company email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* Predefined Timezones */}
                <select
                  className={inputClass}
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  <option value="">Select Timezone</option>
                  {timezones.map((tz, i) => (
                    <option key={i} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>

                {/* 2FA Toggle */}
                <div className="flex items-center justify-between mt-3 p-3 bg-lime-50 rounded-lg border border-lime-200">
                  <div>
                    <p className="font-medium text-lime-800">
                      Two-Factor Authentication
                    </p>
                    <p className="text-xs text-gray-600">
                      Enhance security by requiring verification at login.
                    </p>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      twoFactorEnabled
                        ? "bg-lime-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-lime-700 mb-1">
                    Company Logo
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <div className="flex-1">
                      <input
                        className={inputClass}
                        placeholder="Logo URL"
                        value={logo}
                        onChange={(e) => setLogo(e.target.value)}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        className="text-sm text-lime-600 mt-2"
                        onChange={handleFileUpload}
                      />
                    </div>

                    {logo && (
                      <div className="mt-4 sm:mt-0 flex-shrink-0">
                        <div className="h-16 w-16 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                          <img
                            src={logo}
                            alt="Logo Preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-lime-700 mb-1">
                    Default Language
                  </label>
                  <select
                    className={inputClass}
                    value={brandingLanguage}
                    onChange={(e) => setBrandingLanguage(e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="ur">Urdu</option>
                    <option value="ar">Arabic</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex gap-2 mt-6">
              <button
                onClick={saveCompany}
                className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-1.5 rounded text-sm"
              >
                {editingCompany ? "Update" : "Save"}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1.5 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
