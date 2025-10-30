import React, { useState } from "react";
import CreateObservation from "./CreateObservation";
import Licensing from "./Licensing";
import RolesPermissions from "./RolesPermissions";
import BrandingLocalization from "./BrandingLocalization";
import ReportingAnalytics from "./ReportingAnalytics";
import Support from "./Support";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Building2,
  CreditCard,
  ShieldCheck,
  Palette,
  BarChart3,
  LifeBuoy,
  LogOut,
} from "lucide-react";

export default function Dashboard({ user, onLogout }) {
  const [panel, setPanel] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={20} /> },
    { id: "create", label: "Organizations", icon: <Building2 size={20} /> },
    { id: "licensing", label: "Licensing & Billing", icon: <CreditCard size={20} /> },
    { id: "roles", label: "Roles & Permissions", icon: <ShieldCheck size={20} /> },
   // { id: "branding", label:"Branding & Localization", icon: <Palette size={20} /> },
    { id: "reporting", label: "Reporting & Analytics", icon: <BarChart3 size={20} /> },
    { id: "support", label: "Support", icon: <LifeBuoy size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-lime-100 via-white to-lime-50">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-white/70 backdrop-blur-xl border-r border-lime-200 flex flex-col transition-all duration-300 shadow-xl`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-lime-100">
          {!collapsed && (
            <div>
              <h2 className="text-2xl font-bold text-lime-700">Admin</h2>
              <p className="text-xs text-gray-500">Welcome, {user.name}</p>
            </div>
          )}
          <button
            className="p-2 rounded-lg hover:bg-lime-100 text-lime-700 transition"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 ${
                panel === item.id
                  ? "bg-lime-500 text-white shadow-md scale-[1.02]"
                  : "text-gray-700 hover:bg-lime-100 hover:text-lime-700"
              }`}
              onClick={() => setPanel(item.id)}
            >
              <span className="text-lime-700">{item.icon}</span>
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-lime-100">
          <button
            className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg transition-all duration-200 font-semibold ${
              collapsed
                ? "text-lime-700 hover:bg-lime-100"
                : "bg-lime-600 hover:bg-lime-700 text-white shadow-md"
            }`}
            onClick={onLogout}
          >
            <LogOut size={18} />
            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-lime-100 transition-all">
          {panel === "overview" && (
            <div>
              <h3 className="text-2xl font-bold text-lime-700 mb-3">
                Subscribed Companies Overview
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                View and manage all company subscriptions, roles, and payments below.
              </p>

              <div className="overflow-x-auto rounded-lg border border-lime-100 shadow-sm">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-lime-100/80 text-lime-700 text-left">
                      <th className="px-5 py-3">Company</th>
                      <th className="px-5 py-3">Subscription Plan</th>
                      <th className="px-5 py-3">Roles Assigned</th>
                      <th className="px-5 py-3">Payment Status</th>
                      <th className="px-5 py-3">Expires</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-lime-100">
                    {[
                      {
                        company: "Alpha Industries",
                        plan: "Enterprise",
                        roles: 25,
                        status: "Paid",
                        expires: "2025-12-31",
                      },
                      {
                        company: "Beta Solutions",
                        plan: "Professional",
                        roles: 10,
                        status: "Unpaid",
                        expires: "2025-09-30",
                      },
                      {
                        company: "Gamma Corp",
                        plan: "Basic",
                        roles: 5,
                        status: "Paid",
                        expires: "2025-11-15",
                      },
                    ].map((c, i) => (
                      <tr
                        key={i}
                        className="hover:bg-lime-50/70 transition-colors duration-150"
                      >
                        <td className="px-5 py-3 font-medium">{c.company}</td>
                        <td className="px-5 py-3">{c.plan}</td>
                        <td className="px-5 py-3">{c.roles}</td>
                        <td className="px-5 py-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              c.status === "Paid"
                                ? "bg-lime-100 text-lime-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-gray-600">{c.expires}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {panel === "create" && <CreateObservation />}
          {panel === "licensing" && <Licensing />}
          {panel === "roles" && <RolesPermissions />}
          {panel === "branding" && <BrandingLocalization />}
          {panel === "reporting" && <ReportingAnalytics />}
          {panel === "support" && <Support />}
        </div>
      </main>
    </div>
  );
}
