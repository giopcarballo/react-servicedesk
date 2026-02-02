import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SidebarToggle from "../components/SidebarToggle";
import Header from "../components/Header";

const adminModules = [
  {
    id: "users",
    icon: "👥",
    title: "User Management",
    desc: "Manage users, roles, and permissions",
  },
  {
    id: "roles",
    icon: "🔐",
    title: "Roles & Permissions",
    desc: "Configure role-based access control",
  },
  {
    id: "sla",
    icon: "⏱️",
    title: "SLA Policies",
    desc: "Define and manage SLA policies",
  },
  {
    id: "settings",
    icon: "⚙️",
    title: "System Settings",
    desc: "General system configuration",
  },
];

const usersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2 hours ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "Technician",
    status: "Active",
    lastLogin: "30 mins ago",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.j@company.com",
    role: "Manager",
    status: "Active",
    lastLogin: "1 day ago",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.w@company.com",
    role: "Technician",
    status: "Inactive",
    lastLogin: "1 week ago",
  },
];

const rolesData = [
  { id: 1, name: "Admin", users: 3, permissions: ["All Access"] },
  {
    id: 2,
    name: "Manager",
    users: 8,
    permissions: ["View All", "Approve", "Reports"],
  },
  {
    id: 3,
    name: "Technician",
    users: 25,
    permissions: ["View Assigned", "Update Status", "Add Notes"],
  },
  { id: 4, name: "Viewer", users: 12, permissions: ["View Only"] },
];

function AdminSettings() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("users");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddPermissionModal, setShowAddPermissionModal] = useState(false);
  const [permissions, setPermissions] = useState([
    {
      id: 1,
      page: "Dashboard",
      view: true,
      edit: false,
      create: false,
      enabled: true,
    },
    {
      id: 2,
      page: "My View",
      view: true,
      edit: true,
      create: false,
      enabled: true,
    },
    {
      id: 3,
      page: "Requests",
      view: true,
      edit: true,
      create: true,
      enabled: true,
    },
    {
      id: 4,
      page: "Service Configuration",
      view: true,
      edit: true,
      create: true,
      enabled: false,
    },
    {
      id: 5,
      page: "Financial",
      view: false,
      edit: false,
      create: false,
      enabled: false,
    },
    {
      id: 6,
      page: "Admin",
      view: true,
      edit: true,
      create: true,
      enabled: true,
    },
  ]);

  const [newPermissionSet, setNewPermissionSet] = useState({
    name: "",
    department: "",
    description: "",
    permissions: [
      {
        id: 1,
        page: "Dashboard",
        view: false,
        edit: false,
        create: false,
        enabled: true,
      },
      {
        id: 2,
        page: "My View",
        view: false,
        edit: false,
        create: false,
        enabled: true,
      },
      {
        id: 3,
        page: "Requests",
        view: false,
        edit: false,
        create: false,
        enabled: true,
      },
      {
        id: 4,
        page: "Service Configuration",
        view: false,
        edit: false,
        create: false,
        enabled: true,
      },
      {
        id: 5,
        page: "Financial",
        view: false,
        edit: false,
        create: false,
        enabled: true,
      },
      {
        id: 6,
        page: "Admin",
        view: false,
        edit: false,
        create: false,
        enabled: true,
      },
    ],
  });

  const togglePermission = (id, field) => {
    setPermissions(
      permissions.map((perm) =>
        perm.id === id ? { ...perm, [field]: !perm[field] } : perm,
      ),
    );
  };

  const toggleNewPermission = (id, field) => {
    setNewPermissionSet({
      ...newPermissionSet,
      permissions: newPermissionSet.permissions.map((perm) =>
        perm.id === id ? { ...perm, [field]: !perm[field] } : perm,
      ),
    });
  };

  const handleAddPermission = () => {
    if (!newPermissionSet.name || !newPermissionSet.department) {
      alert("Please fill in permission set name and department");
      return;
    }
    // Here you would save the permission set
    alert(
      `Permission set "${newPermissionSet.name}" added for ${newPermissionSet.department}!`,
    );
    setShowAddPermissionModal(false);
    // Reset form
    setNewPermissionSet({
      name: "",
      department: "",
      description: "",
      permissions: [
        {
          id: 1,
          page: "Dashboard",
          view: false,
          edit: false,
          create: false,
          enabled: true,
        },
        {
          id: 2,
          page: "My View",
          view: false,
          edit: false,
          create: false,
          enabled: true,
        },
        {
          id: 3,
          page: "Requests",
          view: false,
          edit: false,
          create: false,
          enabled: true,
        },
        {
          id: 4,
          page: "Service Configuration",
          view: false,
          edit: false,
          create: false,
          enabled: true,
        },
        {
          id: 5,
          page: "Financial",
          view: false,
          edit: false,
          create: false,
          enabled: true,
        },
        {
          id: 6,
          page: "Admin",
          view: false,
          edit: false,
          create: false,
          enabled: true,
        },
      ],
    });
  };

  const navigateToModule = (module) => {
    switch (module) {
      case "dashboard":
        navigate("/dashboard");
        break;
      case "myview":
        navigate("/servicedesk");
        break;
      case "requests":
        navigate("/requests");
        break;
      case "intake":
        navigate("/ticket-intake");
        break;
      case "financial":
        navigate("/section-e");
        break;
      case "admin":
        navigate("/admin");
        break;
      default:
        break;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                User Management
              </h2>
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900"
                onClick={() => setShowAddUserModal(true)}
              >
                + Add User
              </button>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      User
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Role
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Last Login
                    </th>
                    <th className="text-center p-4 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {usersData.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">
                              {user.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${user.role === "Admin" ? "bg-red-100 text-red-700" : user.role === "Manager" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-600">{user.lastLogin}</td>
                      <td className="p-4 text-center">
                        <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm font-medium">
                          Edit
                        </button>
                        <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm font-medium">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "roles":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Roles & Permissions
              </h2>
              <div className="flex gap-3">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                  onClick={() => setShowAddPermissionModal(true)}
                >
                  + Add Permission
                </button>
                <button className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900">
                  + Create Role
                </button>
              </div>
            </div>

            {/* Existing Roles Grid */}
            <div className="mb-4">
              <h3 className="font-bold text-gray-800 mb-4">Role Templates</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rolesData.map((role) => (
                <div
                  key={role.id}
                  className="bg-white rounded-xl p-5 border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800">{role.name}</h3>
                      <div className="text-sm text-gray-500">
                        {role.users} users
                      </div>
                    </div>
                    <button className="text-blue-600 text-sm font-medium hover:underline">
                      Edit
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((perm, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600"
                      >
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "sla":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">SLA Policies</h2>
              <button className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900">
                + Add Policy
              </button>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-700">
                      Priority
                    </th>
                    <th className="text-center p-4 font-semibold text-gray-700">
                      Response Time
                    </th>
                    <th className="text-center p-4 font-semibold text-gray-700">
                      Resolution Time
                    </th>
                    <th className="text-center p-4 font-semibold text-gray-700">
                      Escalation L1
                    </th>
                    <th className="text-center p-4 font-semibold text-gray-700">
                      Escalation L2
                    </th>
                    <th className="text-center p-4 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">
                      <span className="px-2 py-1 bg-red-500 text-white rounded text-xs font-bold">
                        P1 - Critical
                      </span>
                    </td>
                    <td className="p-4 text-center font-medium">15 mins</td>
                    <td className="p-4 text-center font-medium">4 hours</td>
                    <td className="p-4 text-center font-medium">30 mins</td>
                    <td className="p-4 text-center font-medium">1 hour</td>
                    <td className="p-4 text-center">
                      <button className="text-blue-600 text-sm font-medium hover:underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">
                      <span className="px-2 py-1 bg-amber-500 text-white rounded text-xs font-bold">
                        P2 - High
                      </span>
                    </td>
                    <td className="p-4 text-center font-medium">30 mins</td>
                    <td className="p-4 text-center font-medium">8 hours</td>
                    <td className="p-4 text-center font-medium">2 hours</td>
                    <td className="p-4 text-center font-medium">4 hours</td>
                    <td className="p-4 text-center">
                      <button className="text-blue-600 text-sm font-medium hover:underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">
                      <span className="px-2 py-1 bg-blue-500 text-white rounded text-xs font-bold">
                        P3 - Medium
                      </span>
                    </td>
                    <td className="p-4 text-center font-medium">2 hours</td>
                    <td className="p-4 text-center font-medium">24 hours</td>
                    <td className="p-4 text-center font-medium">8 hours</td>
                    <td className="p-4 text-center font-medium">12 hours</td>
                    <td className="p-4 text-center">
                      <button className="text-blue-600 text-sm font-medium hover:underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">
                      <span className="px-2 py-1 bg-gray-500 text-white rounded text-xs font-bold">
                        P4 - Low
                      </span>
                    </td>
                    <td className="p-4 text-center font-medium">4 hours</td>
                    <td className="p-4 text-center font-medium">72 hours</td>
                    <td className="p-4 text-center font-medium">24 hours</td>
                    <td className="p-4 text-center font-medium">48 hours</td>
                    <td className="p-4 text-center">
                      <button className="text-blue-600 text-sm font-medium hover:underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case "settings":
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              System Settings
            </h2>
            <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">
                  General Settings
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                      defaultValue="GOLI ServiceDesk"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5">
                      <option>Asia/Manila (GMT+8)</option>
                      <option>Asia/Singapore (GMT+8)</option>
                      <option>Asia/Tokyo (GMT+9)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">
                  Notification Settings
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Email notifications for new tickets
                    </span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      SLA breach alerts
                    </span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    <span className="text-sm text-gray-700">
                      Daily summary report
                    </span>
                  </label>
                </div>
              </div>
              <button className="px-6 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900">
                Save Settings
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen text-gray-800">
      <Sidebar collapsed={sidebarCollapsed} onNavigate={navigateToModule} />
      <SidebarToggle
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Header */}
      <Header collapsed={sidebarCollapsed} />

      <div
        className={`max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${sidebarCollapsed ? "sidebar-collapsed-margin" : "with-sidebar"}`}
      >
        {/* Module Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {adminModules.map((module) => (
            <div
              key={module.id}
              className={`bg-white rounded-xl p-5 border-2 cursor-pointer transition-all ${activeSection === module.id ? "border-gray-800 shadow-lg" : "border-gray-200 hover:border-gray-400"}`}
              onClick={() => setActiveSection(module.id)}
            >
              <div className="text-3xl mb-2">{module.icon}</div>
              <h3 className="font-bold text-gray-800">{module.title}</h3>
              <p className="text-sm text-gray-500">{module.desc}</p>
            </div>
          ))}
        </div>

        {/* Content Area */}
        {renderContent()}
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowAddUserModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-md m-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Add New User
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5">
                  <option>Technician</option>
                  <option>Manager</option>
                  <option>Admin</option>
                  <option>Viewer</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
                onClick={() => setShowAddUserModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900"
                onClick={() => {
                  alert("User added!");
                  setShowAddUserModal(false);
                }}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Permission Modal */}
      {showAddPermissionModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddPermissionModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-6">
              Add New Permission Set
            </h3>

            {/* Form Fields */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permission Set Name *
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                  placeholder="e.g., IT Admin Permissions"
                  value={newPermissionSet.name}
                  onChange={(e) =>
                    setNewPermissionSet({
                      ...newPermissionSet,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department / Division *
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                  value={newPermissionSet.department}
                  onChange={(e) =>
                    setNewPermissionSet({
                      ...newPermissionSet,
                      department: e.target.value,
                    })
                  }
                >
                    <option value="">Select department...</option>
                    <option value="Engineering">Engineering</option>
                    <option value="House Keeping">House Keeping</option>
                    <option value="Front Office">Front Office</option>
                    <option value="F & B">F & B</option>
                    <option value="IT">IT</option>
                    <option value="Security">Security</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                  rows="3"
                  placeholder="Enter description..."
                  value={newPermissionSet.description}
                  onChange={(e) =>
                    setNewPermissionSet({
                      ...newPermissionSet,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Permissions Table */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-bold text-gray-800 mb-4">Page Permissions</h4>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-700">
                        Permission
                      </th>
                      <th className="text-center p-4 font-semibold text-gray-700">
                        View
                      </th>
                      <th className="text-center p-4 font-semibold text-gray-700">
                        Edit
                      </th>
                      <th className="text-center p-4 font-semibold text-gray-700">
                        Create
                      </th>
                      <th className="text-center p-4 font-semibold text-gray-700">
                        On / Off
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {newPermissionSet.permissions.map((perm) => (
                      <tr
                        key={perm.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="p-4 font-medium text-gray-800">
                          {perm.page}
                        </td>
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={perm.view}
                            disabled={!perm.enabled}
                            onChange={() =>
                              toggleNewPermission(perm.id, "view")
                            }
                            className="w-4 h-4 cursor-pointer"
                          />
                        </td>
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={perm.edit}
                            disabled={!perm.enabled}
                            onChange={() =>
                              toggleNewPermission(perm.id, "edit")
                            }
                            className="w-4 h-4 cursor-pointer"
                          />
                        </td>
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={perm.create}
                            disabled={!perm.enabled}
                            onChange={() =>
                              toggleNewPermission(perm.id, "create")
                            }
                            className="w-4 h-4 cursor-pointer"
                          />
                        </td>
                        <td className="p-4 text-center">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={perm.enabled}
                              onChange={() =>
                                toggleNewPermission(perm.id, "enabled")
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
                onClick={() => setShowAddPermissionModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                onClick={handleAddPermission}
              >
                Add Permission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminSettings;
