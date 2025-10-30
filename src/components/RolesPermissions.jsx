import React, { useState } from "react";
import { Trash2, Pencil } from "lucide-react";

export default function CompanyRolesPermissionsTabs() {
  /** ---------------------------------
   *  Static Companies & Users
   *  --------------------------------- */
  const companies = [
    { id: 1, name: "Zones Pvt Ltd" },
    { id: 2, name: "Albertio Solutions" },
    { id: 3, name: "TechNova" },
  ];

  const users = [
    { id: 1, name: "Uncle Champ Doe", companyId: 1 },
    { id: 2, name: "Sarah Smith", companyId: 1 },
    { id: 3, name: "Mike Albert", companyId: 2 },
    { id: 4, name: "Rita Nova", companyId: 3 },
  ];

  /** ---------------------------------
   *  State: Roles, Assignments
   *  --------------------------------- */
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      permissions: ["Asset Management", "Service Desk", "Monitoring", "MOAR"],
    },
    {
      id: 2,
      name: "Manager",
      permissions: ["Asset Management", "Service Desk"],
    },
    {
      id: 3,
      name: "Viewer",
      permissions: ["Asset Management"],
    },
  ]);

  const [assignments, setAssignments] = useState([
    { userId: 1, roleId: 1 },
    { userId: 3, roleId: 3 },
  ]);

  /** ---------------------------------
   *  Tabs & Modal States
   *  --------------------------------- */
  const [activeTab, setActiveTab] = useState("roles"); // "roles" | "assign"

  // Popups
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Role modal states
  const [newRoleName, setNewRoleName] = useState("");
  const [newRolePermissions, setNewRolePermissions] = useState("");
  const [editRole, setEditRole] = useState(null); // store role being edited

  // Assign modal states
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [editAssignmentIndex, setEditAssignmentIndex] = useState(null); // index of assignment editing

  const inputClass =
    "border border-lime-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 w-full";

  /** ---------------------------------
   *  Helpers
   *  --------------------------------- */
  const getUsersByCompany = (companyId) =>
    users.filter((u) => u.companyId === parseInt(companyId));

  const getUnassignedUsersByCompany = (companyId) => {
    const assignedUserIds = assignments.map((a) => a.userId);
    return getUsersByCompany(companyId).filter(
      (u) => !assignedUserIds.includes(u.id)
    );
  };

  /** ---------------------------------
   *  Logic: Add / Edit Role
   *  --------------------------------- */
  const openAddRoleModal = () => {
    setEditRole(null);
    setNewRoleName("");
    setNewRolePermissions("");
    setShowRoleModal(true);
  };

  const openEditRoleModal = (role) => {
    setEditRole(role);
    setNewRoleName(role.name);
    setNewRolePermissions(role.permissions.join(", "));
    setShowRoleModal(true);
  };

  const addOrUpdateRole = () => {
    if (!newRoleName) {
      alert("Role name is required");
      return;
    }
    const permArray = newRolePermissions
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    if (editRole) {
      // Update existing role
      setRoles((prev) =>
        prev.map((r) =>
          r.id === editRole.id
            ? { ...r, name: newRoleName, permissions: permArray }
            : r
        )
      );
    } else {
      // Add new role
      const newRole = {
        id: Date.now(),
        name: newRoleName,
        permissions: permArray,
      };
      setRoles([...roles, newRole]);
    }

    // reset modal
    setNewRoleName("");
    setNewRolePermissions("");
    setEditRole(null);
    setShowRoleModal(false);
  };

  /** ---------------------------------
   *  Logic: Assign Role (Add or Edit)
   *  --------------------------------- */
  const openAddAssignmentModal = () => {
    setEditAssignmentIndex(null);
    setSelectedCompany("");
    setSelectedUser("");
    setSelectedRole("");
    setShowAssignModal(true);
  };

  const openEditAssignmentModal = (index, assignment) => {
    setEditAssignmentIndex(index);
    const user = users.find((u) => u.id === assignment.userId);
    setSelectedCompany(user?.companyId || "");
    setSelectedUser(assignment.userId);
    setSelectedRole(assignment.roleId);
    setShowAssignModal(true);
  };

  const addOrUpdateAssignment = () => {
    if (!selectedUser || !selectedRole) {
      alert("Please select user and role");
      return;
    }

    const newAssignment = {
      userId: parseInt(selectedUser),
      roleId: parseInt(selectedRole),
    };

    if (editAssignmentIndex !== null) {
      // Editing existing assignment
      const updated = [...assignments];
      updated[editAssignmentIndex] = newAssignment;
      setAssignments(updated);
    } else {
      // Adding new assignment
      const exists = assignments.find(
        (a) =>
          a.userId === parseInt(selectedUser) &&
          a.roleId === parseInt(selectedRole)
      );
      if (exists) {
        alert("This user already has this role assigned");
        return;
      }
      setAssignments([...assignments, newAssignment]);
    }

    // reset modal
    setSelectedCompany("");
    setSelectedUser("");
    setSelectedRole("");
    setEditAssignmentIndex(null);
    setShowAssignModal(false);
  };

  const deleteAssignment = (index) => {
    setAssignments(assignments.filter((_, i) => i !== index));
  };

  /** ---------------------------------
   *  Render Tabs
   *  --------------------------------- */
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-lime-700">
        Roles & Permissions
      </h2>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 mb-6">
        <button
          className={`pb-2 ${
            activeTab === "roles"
              ? "text-lime-700 border-b-2 border-lime-600 font-semibold"
              : "text-gray-500 hover:text-lime-700"
          }`}
          onClick={() => setActiveTab("roles")}
        >
          Roles & Permissions
        </button>
        <button
          className={`pb-2 ${
            activeTab === "assign"
              ? "text-lime-700 border-b-2 border-lime-600 font-semibold"
              : "text-gray-500 hover:text-lime-700"
          }`}
          onClick={() => setActiveTab("assign")}
        >
          Users
        </button>
      </div>

      {/* --- TAB 1: Roles --- */}
      {activeTab === "roles" && (
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-lime-700">Available Roles</h3>
            <button
              onClick={openAddRoleModal}
              className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded text-sm"
            >
              + Add Custom Role
            </button>
          </div>

          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-lime-100 text-lime-700">
              <tr>
                <th className="border p-2 text-left w-40">Role</th>
                <th className="border p-2 text-left">Permissions</th>
                <th className="border p-2 text-center w-20">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id}>
                  <td className="border p-2 font-medium">{role.name}</td>
                  <td className="border p-2">
                    {role.permissions.length > 0
                      ? role.permissions.join(", ")
                      : "No permissions"}
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit Role"
                      onClick={() => openEditRoleModal(role)}
                    >
                      <Pencil size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- TAB 2: Assign --- */}
      {activeTab === "assign" && (
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-lime-700">
              Assign Roles to Users
            </h3>
            <button
              onClick={openAddAssignmentModal}
              className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded text-sm"
            >
              + Add User
            </button>
          </div>

          {/* Assignments Table */}
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-lime-100 text-lime-700">
              <tr>
                <th className="border p-2 text-left">Company</th>
                <th className="border p-2 text-left">User</th>
                <th className="border p-2 text-left">Role</th>
                <th className="border p-2 text-left">Permissions</th>
                <th className="border p-2 text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-4">
                    No assignments yet.
                  </td>
                </tr>
              )}
              {assignments.map((a, index) => {
                const user = users.find((u) => u.id === a.userId);
                const company = companies.find((c) => c.id === user?.companyId);
                const role = roles.find((r) => r.id === a.roleId);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-2">{company?.name}</td>
                    <td className="border p-2">{user?.name}</td>
                    <td className="border p-2">{role?.name}</td>
                    <td className="border p-2">
                      {role?.permissions?.length > 0
                        ? role.permissions.join(", ")
                        : "No permissions"}
                    </td>
                    <td className="border p-2 text-center flex items-center justify-center gap-2">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit Assignment"
                        onClick={() => openEditAssignmentModal(index, a)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        title="Delete Assignment"
                        onClick={() => deleteAssignment(index)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* --- MODALS --- */}

      {/* Add/Edit Role Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setShowRoleModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-4 text-lime-700">
              {editRole ? "Edit Role" : "Add Custom Role"}
            </h3>

            <input
              className={`${inputClass} mb-3`}
              placeholder="Role name"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
            />
            <input
              className={`${inputClass} mb-3`}
              placeholder="Permissions (comma separated)"
              value={newRolePermissions}
              onChange={(e) => setNewRolePermissions(e.target.value)}
            />

            <div className="flex gap-2 justify-end">
              <button
                onClick={addOrUpdateRole}
                className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-1.5 rounded text-sm"
              >
                {editRole ? "Update Role" : "Save Role"}
              </button>
              <button
                onClick={() => setShowRoleModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1.5 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Assign Role Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setShowAssignModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-4 text-lime-700">
              {editAssignmentIndex !== null ? "Edit Assignment" : "Assign Role"}
            </h3>

            {/* Company Select */}
            <select
              className={`${inputClass} mb-3`}
              value={selectedCompany}
              onChange={(e) => {
                setSelectedCompany(e.target.value);
                setSelectedUser("");
              }}
              disabled={editAssignmentIndex !== null} // disabled when editing
            >
              <option value="">Select Company</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* User Select */}
            <select
              className={`${inputClass} mb-3`}
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              disabled={editAssignmentIndex !== null || !selectedCompany} // disabled when editing
            >
              <option value="">Select User</option>
              {selectedCompany &&
                getUnassignedUsersByCompany(selectedCompany).map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              {/* For editing assignment, still allow current user */}
              {editAssignmentIndex !== null &&
                selectedUser &&
                !getUnassignedUsersByCompany(selectedCompany).some(
                  (u) => u.id === parseInt(selectedUser)
                ) && (
                  <option value={selectedUser}>
                    {users.find((u) => u.id === parseInt(selectedUser))?.name}
                  </option>
                )}
            </select>

            {/* Role Select */}
            <select
              className={`${inputClass} mb-3`}
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>

            <div className="flex gap-2 justify-end">
              <button
                onClick={addOrUpdateAssignment}
                className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-1.5 rounded text-sm"
              >
                {editAssignmentIndex !== null ? "Update Assignment" : "Add User"}
              </button>
              <button
                onClick={() => setShowAssignModal(false)}
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
