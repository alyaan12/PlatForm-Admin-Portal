import React from "react";
import { BarChart3, Users, Layers, Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ReportingAnalytics() {
  const metrics = [
    { title: "Active Subscriptions", value: 42, icon: BarChart3, color: "bg-lime-100 text-lime-700" },
    { title: "Total Users", value: 1238, icon: Users, color: "bg-blue-100 text-blue-700" },
    { title: "Licenses Used", value: 317, icon: Layers, color: "bg-amber-100 text-amber-700" },
  ];

  const activities = [
    { id: 1, org: "Acme Inc.", action: "Upgraded to Pro plan", date: "2025-09-18" },
    { id: 2, org: "Globex Corp.", action: "Added 12 new users", date: "2025-09-17" },
    { id: 3, org: "Initech", action: "Downgraded to Starter", date: "2025-09-15" },
  ];

  // Dummy area chart data
  const chartData = [
    { month: "Jan", usage: 120 },
    { month: "Feb", usage: 160 },
    { month: "Mar", usage: 210 },
    { month: "Apr", usage: 280 },
    { month: "May", usage: 300 },
    { month: "Jun", usage: 260 },
    { month: "Jul", usage: 320 },
    { month: "Aug", usage: 380 },
    { month: "Sep", usage: 450 },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-6xl">
      {/* Header */}
      <h3 className="text-xl font-bold text-lime-700 mb-1">Reporting & Analytics</h3>
      <p className="text-sm text-gray-500 mb-6">
        Monitor subscription status, usage metrics, and analytics across all organizations.
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {metrics.map((m) => (
          <div
            key={m.title}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${m.color}`}>
              <m.icon size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{m.title}</p>
              <p className="text-2xl font-bold text-gray-800">{m.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-6"></div>

      {/* Area Chart Section */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-700 mb-3">Usage Overview</h4>
        <div className="h-72 border border-gray-100 rounded-md bg-gray-50 p-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#84cc16" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#84cc16" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                }}
              />
              <Area
                type="monotone"
                dataKey="usage"
                stroke="#84cc16"
                fillOpacity={1}
                fill="url(#colorUsage)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h4 className="text-lg font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Activity size={18} className="text-lime-600" />
          Recent Activity
        </h4>
        <div className="bg-white border border-gray-100 rounded-lg divide-y">
          {activities.map((a) => (
            <div
              key={a.id}
              className="p-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">{a.org}</p>
                <p className="text-xs text-gray-500">{a.action}</p>
              </div>
              <div className="text-xs text-gray-400">{a.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
