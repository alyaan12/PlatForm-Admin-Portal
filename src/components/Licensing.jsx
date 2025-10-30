import React, { useState } from "react";

export default function Licensing() {
  // ---------- STATES ----------
  const [activeTab, setActiveTab] = useState("subscriptions");

  // Subscription data
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      orgName: "Zones Pvt Ltd",
      plan: "Starter",
      seats: 5,
      created: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      orgName: "Albertio Solutions",
      plan: "Enterprise",
      seats: 25,
      created: new Date().toLocaleDateString(),
    },
  ]);

  // Plan data
  const [plans, setPlans] = useState([
    { id: 1, name: "Starter", description: "Basic access for small teams" },
    { id: 2, name: "Pro", description: "Advanced features for growing teams" },
    { id: 3, name: "Enterprise", description: "Full suite with premium support" },
  ]);

  // ---------- MODAL STATES ----------
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);

  // ---------- SUBSCRIPTION FORM ----------
  const [orgOption, setOrgOption] = useState("");
  const [orgName, setOrgName] = useState("");
  const [plan, setPlan] = useState("");
  const [seats, setSeats] = useState(1);

  const existingCompanies = Array.from(new Set(subscriptions.map((s) => s.orgName)));

  const addSubscription = () => {
    if (!orgName.trim()) {
      alert("Organization name is required.");
      return;
    }
    if (!plan) {
      alert("Please select a plan.");
      return;
    }

    const newSub = {
      id: Date.now(),
      orgName,
      plan,
      seats,
      created: new Date().toLocaleDateString(),
    };
    setSubscriptions([...subscriptions, newSub]);
    setShowSubscriptionModal(false);
    setOrgOption("");
    setOrgName("");
    setPlan("");
    setSeats(1);
  };

  // ---------- PLAN FORM ----------
  const [planName, setPlanName] = useState("");
  const [planDesc, setPlanDesc] = useState("");

  const addPlan = () => {
    if (!planName.trim()) {
      alert("Plan name is required.");
      return;
    }
    const newPlan = {
      id: Date.now(),
      name: planName,
      description: planDesc || "No description",
    };
    setPlans([...plans, newPlan]);
    setShowPlanModal(false);
    setPlanName("");
    setPlanDesc("");
  };

  const inputClass =
    "w-full border border-lime-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400";

  // ---------- RENDER ----------
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h2 className="text-xl font-bold mb-6 text-lime-700">Licensing & Billing</h2>

      {/* Tabs Header */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("subscriptions")}
          className={`px-6 py-2 font-medium text-sm ${
            activeTab === "subscriptions"
              ? "text-lime-700 border-b-2 border-lime-500"
              : "text-gray-500 hover:text-lime-600"
          }`}
        >
          Subscriptions
        </button>
        <button
          onClick={() => setActiveTab("plans")}
          className={`px-6 py-2 font-medium text-sm ${
            activeTab === "plans"
              ? "text-lime-700 border-b-2 border-lime-500"
              : "text-gray-500 hover:text-lime-600"
          }`}
        >
          Plans
        </button>
      </div>

      {/* ---------- SUBSCRIPTIONS TAB ---------- */}
      {activeTab === "subscriptions" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-lime-700">All Subscriptions</h3>
            <button
              onClick={() => setShowSubscriptionModal(true)}
              className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded text-sm"
            >
              + Add New Subscription
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 bg-white shadow">
              <thead className="bg-lime-100 text-lime-700">
                <tr>
                  <th className="border p-2 text-left">Organization</th>
                  <th className="border p-2 text-left">Plan</th>
                  <th className="border p-2 text-left">Seats</th>
                  <th className="border p-2 text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center p-4">
                      No subscriptions yet.
                    </td>
                  </tr>
                )}
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="border p-2">{sub.orgName}</td>
                    <td className="border p-2">{sub.plan}</td>
                    <td className="border p-2">{sub.seats}</td>
                    <td className="border p-2">{sub.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------- PLANS TAB ---------- */}
      {activeTab === "plans" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-lime-700">Available Plans</h3>
            <button
              onClick={() => setShowPlanModal(true)}
              className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded text-sm"
            >
              + Create New Plan
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 bg-white shadow">
              <thead className="bg-lime-100 text-lime-700">
                <tr>
                  <th className="border p-2 text-left">Plan Name</th>
                  <th className="border p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {plans.length === 0 && (
                  <tr>
                    <td colSpan={2} className="text-center p-4">
                      No plans created yet.
                    </td>
                  </tr>
                )}
                {plans.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="border p-2">{p.name}</td>
                    <td className="border p-2">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------- SUBSCRIPTION MODAL ---------- */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4 text-lime-700">
              Add Subscription
            </h3>

            <div className="space-y-3 mb-4">
              <select
                className={inputClass}
                value={orgOption}
                onChange={(e) => {
                  const val = e.target.value;
                  setOrgOption(val);
                  if (val !== "other" && val !== "") {
                    setOrgName(val);
                  } else {
                    setOrgName("");
                  }
                }}
              >
                <option value="">Select existing company</option>
                {existingCompanies.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
                <option value="other">Other (type manually)</option>
              </select>

              {orgOption === "other" && (
                <input
                  className={inputClass}
                  placeholder="Enter new organization name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              )}

              <select
                className={inputClass}
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
              >
                <option value="">Select a plan</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} – {p.description}
                  </option>
                ))}
              </select>

              <input
                type="number"
                className={inputClass}
                placeholder="Seats"
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                min={1}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={addSubscription}
                className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-1.5 rounded text-sm"
              >
                Save
              </button>
              <button
                onClick={() => setShowSubscriptionModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1.5 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- PLAN MODAL ---------- */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4 text-lime-700">
              Create New Plan
            </h3>

            <div className="space-y-3 mb-4">
              <input
                className={inputClass}
                placeholder="Plan Name"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
              />
              <textarea
                className={inputClass}
                placeholder="Plan Description"
                value={planDesc}
                onChange={(e) => setPlanDesc(e.target.value)}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={addPlan}
                className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-1.5 rounded text-sm"
              >
                Save Plan
              </button>
              <button
                onClick={() => setShowPlanModal(false)}
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
