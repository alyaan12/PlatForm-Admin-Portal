import React, { useState } from "react";
import {
  MessageSquare,
  X,
  CheckCircle2,
  XCircle,
  SendHorizonal,
} from "lucide-react";

export default function Support() {
  // Demo teams/staff list for assignment dropdown
  const teams = [
    "John Doe – IT Support",
    "Jane Smith – Billing",
    "Alex Johnson – Security",
    "Sara Khan – Development",
    "Customer Success Team",
  ];

  const [tickets, setTickets] = useState([
    {
      id: 1,
      text: "Unable to access dashboard analytics page",
      status: "open",
      created: new Date().toLocaleString(),
      description:
        "I’m unable to access the dashboard analytics page. It keeps loading indefinitely. Tried multiple browsers and cleared cache.",
      priority: "High",
      assignedTo: "John Doe – IT Support",
      company: "Acme Inc",
      department: "IT",
      history: [{ date: new Date().toLocaleString(), action: "Ticket created" }],
      reviews: [],
    },
    {
      id: 2,
      text: "Billing issue with last invoice",
      status: "closed",
      created: new Date().toLocaleString(),
      description:
        "There’s a discrepancy in the last invoice billed for our subscription. Please review and clarify.",
      priority: "Medium",
      assignedTo: "Jane Smith – Billing",
      company: "Beta Corp",
      department: "Finance",
      history: [{ date: new Date().toLocaleString(), action: "Ticket created" }],
      reviews: [],
    },
  ]);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newReview, setNewReview] = useState("");
  const [newAssigned, setNewAssigned] = useState("");

  // toggle open/closed status
  const toggleStatus = (id) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === "open" ? "closed" : "open",
              history: [
                ...t.history,
                {
                  date: new Date().toLocaleString(),
                  action:
                    t.status === "open" ? "Ticket closed" : "Ticket reopened",
                },
              ],
            }
          : t
      )
    );

    if (selectedTicket) {
      setSelectedTicket((prev) => ({
        ...prev,
        status: prev.status === "open" ? "closed" : "open",
        history: [
          ...prev.history,
          {
            date: new Date().toLocaleString(),
            action:
              prev.status === "open" ? "Ticket closed" : "Ticket reopened",
          },
        ],
      }));
    }
  };

  // add review/comment to ticket
  const addReview = () => {
    if (!newReview.trim()) return;
    const updated = tickets.map((t) =>
      t.id === selectedTicket.id
        ? {
            ...t,
            reviews: [
              ...t.reviews,
              { date: new Date().toLocaleString(), text: newReview },
            ],
            history: [
              ...t.history,
              {
                date: new Date().toLocaleString(),
                action: "New review added",
              },
            ],
          }
        : t
    );
    setTickets(updated);
    setSelectedTicket((prev) => ({
      ...prev,
      reviews: [
        ...prev.reviews,
        { date: new Date().toLocaleString(), text: newReview },
      ],
      history: [
        ...prev.history,
        { date: new Date().toLocaleString(), action: "New review added" },
      ],
    }));
    setNewReview("");
  };

  // assign ticket to another team/member
  const assignTicket = () => {
    if (!newAssigned.trim()) return;
    const updated = tickets.map((t) =>
      t.id === selectedTicket.id
        ? {
            ...t,
            assignedTo: newAssigned,
            history: [
              ...t.history,
              {
                date: new Date().toLocaleString(),
                action: `Assigned to ${newAssigned}`,
              },
            ],
          }
        : t
    );
    setTickets(updated);
    setSelectedTicket((prev) => ({
      ...prev,
      assignedTo: newAssigned,
      history: [
        ...prev.history,
        {
          date: new Date().toLocaleString(),
          action: `Assigned to ${newAssigned}`,
        },
      ],
    }));
    setNewAssigned("");
  };

  const getStatusBadge = (status) => {
    const base = "px-2 py-0.5 rounded-full text-xs font-medium";
    if (status === "open")
      return `${base} bg-green-100 text-green-700 border border-green-200`;
    if (status === "closed")
      return `${base} bg-gray-200 text-gray-700 border border-gray-300`;
    return `${base} bg-yellow-100 text-yellow-700 border border-yellow-200`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold mb-4 text-lime-700">Support Tickets</h2>

      {/* Tickets List */}
      <div className="bg-white shadow rounded-lg border border-gray-200">
        <div className="px-5 py-3 border-b bg-lime-50 text-lime-700 font-medium text-sm">
          All Tickets
        </div>
        {tickets.length === 0 && (
          <div className="p-5 text-gray-500 text-sm">No tickets yet.</div>
        )}
        <ul className="divide-y divide-gray-100">
          {tickets.map((t) => (
            <li
              key={t.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                setSelectedTicket(t);
                setNewReview("");
                setNewAssigned("");
              }}
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="text-lime-600 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-800">{t.text}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Created: {t.created}
                  </div>
                  <div className="text-xs text-gray-500">
                    {t.company} — {t.department}
                  </div>
                </div>
              </div>
              <div className="mt-2 sm:mt-0 flex items-center gap-3">
                <span className={getStatusBadge(t.status)}>Status: {t.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Ticket Details */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
            {/* header */}
            <div className="sticky top-0 bg-white flex justify-between items-center px-6 py-4 border-b shadow">
              <h3 className="text-lg font-semibold text-gray-800">
                Ticket Details
              </h3>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* content */}
            <div className="px-6 py-5 space-y-6">
              {/* If ticket is closed show warning */}
              {selectedTicket.status === "closed" && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm p-3 rounded">
                  This ticket is closed. To edit, please reopen the ticket.
                </div>
              )}

              {/* Basic Info */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-1">
                  {selectedTicket.text}
                </h4>
                <p className="text-gray-600">{selectedTicket.description}</p>
              </div>

              {/* Status & Priority */}
              <div className="flex flex-wrap gap-6">
                <div>
                  <span className="text-sm text-gray-500">Status</span>
                  <div className={getStatusBadge(selectedTicket.status)}>
                    {selectedTicket.status}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Priority</span>
                  <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                    {selectedTicket.priority}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Assigned To</span>
                  <div className="text-gray-700">{selectedTicket.assignedTo}</div>
                </div>
              </div>

              {/* Company/Department */}
              <div className="flex flex-wrap gap-6">
                <div>
                  <span className="text-sm text-gray-500">Company</span>
                  <div className="text-gray-700">{selectedTicket.company}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Department</span>
                  <div className="text-gray-700">{selectedTicket.department}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Created On</span>
                  <div className="text-gray-700">{selectedTicket.created}</div>
                </div>
              </div>

              {/* Assign Ticket Dropdown */}
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="text-sm text-gray-500">Assign to</label>
                  <select
                    className="w-full border rounded px-3 py-2 text-sm"
                    value={newAssigned}
                    onChange={(e) => setNewAssigned(e.target.value)}
                    disabled={selectedTicket.status === "closed"} // disable when closed
                  >
                    <option value="">Select a team or person</option>
                    {teams.map((team, idx) => (
                      <option key={idx} value={team}>
                        {team}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={assignTicket}
                  disabled={selectedTicket.status === "closed"} // disable when closed
                  className={`px-4 py-2 rounded text-sm ${
                    selectedTicket.status === "closed"
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                  }`}
                >
                  Assign
                </button>
              </div>

              {/* Add Review */}
              <div>
                <label className="text-sm text-gray-500">Add Review</label>
                <div className="flex gap-2 mt-1">
                  <textarea
                    className="flex-1 border rounded px-3 py-2 text-sm"
                    rows="2"
                    placeholder="Write your review or comment..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    disabled={selectedTicket.status === "closed"} // disable when closed
                  />
                  <button
                    onClick={addReview}
                    disabled={selectedTicket.status === "closed"} // disable when closed
                    className={`px-4 py-2 rounded flex items-center gap-1 ${
                      selectedTicket.status === "closed"
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-lime-600 hover:bg-lime-700 text-white"
                    }`}
                  >
                    <SendHorizonal size={16} /> Post
                  </button>
                </div>
              </div>

              {/* Reviews */}
              {selectedTicket.reviews.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Reviews
                  </h4>
                  <ul className="space-y-2">
                    {selectedTicket.reviews.map((r, idx) => (
                      <li
                        key={idx}
                        className="border rounded px-3 py-2 text-sm bg-gray-50"
                      >
                        <div className="text-gray-800">{r.text}</div>
                        <div className="text-xs text-gray-500">{r.date}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* History */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Ticket History
                </h4>
                <ul className="space-y-1">
                  {selectedTicket.history.map((h, idx) => (
                    <li key={idx} className="text-xs text-gray-600">
                      {h.date} — {h.action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* footer */}
            <div className="sticky bottom-0 bg-white px-6 py-4 border-t flex justify-between shadow">
              <button
                onClick={() => toggleStatus(selectedTicket.id)}
                className="flex items-center gap-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded transition-colors"
              >
                {selectedTicket.status === "open" ? (
                  <>
                    <CheckCircle2 size={14} /> Mark Closed
                  </>
                ) : (
                  <>
                    <XCircle size={14} /> Reopen
                  </>
                )}
              </button>
              <button
                onClick={() => setSelectedTicket(null)}
                className="bg-lime-600 hover:bg-lime-700 text-white px-5 py-2 rounded text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
