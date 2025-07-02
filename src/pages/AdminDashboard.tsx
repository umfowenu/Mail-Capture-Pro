import React from 'react'
import { Users, CreditCard, BarChart3, Settings } from 'lucide-react'

const AdminDashboard = () => {
  const [users] = React.useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', credits: 85, status: 'active', joined: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', credits: 150, status: 'active', joined: '2024-01-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', credits: 25, status: 'active', joined: '2024-02-01' },
  ])

  const addCredits = (userId: number, amount: number) => {
    alert(`Added ${amount} credits to user ${userId}`)
  }

  const suspendUser = (userId: number) => {
    alert(`User ${userId} suspended`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, credits, and system settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Credits</p>
                <p className="text-2xl font-bold">{users.reduce((sum, u) => sum + u.credits, 0)}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">$1,240</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">User Management</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Credits</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium">{user.credits}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {user.joined}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => addCredits(user.id, 100)}
                          className="btn-primary text-xs"
                        >
                          Add Credits
                        </button>
                        <button
                          onClick={() => suspendUser(user.id)}
                          className="btn-danger text-xs"
                        >
                          Suspend
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Credit Packages */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Credit Packages</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium">Starter Pack</h4>
              <p className="text-2xl font-bold text-green-600">$20</p>
              <p className="text-sm text-gray-600">500 Credits</p>
              <p className="text-xs text-gray-500">$0.04 per credit</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium">Pro Pack</h4>
              <p className="text-2xl font-bold text-green-600">$75</p>
              <p className="text-sm text-gray-600">2,000 Credits</p>
              <p className="text-xs text-gray-500">$0.0375 per credit</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium">Enterprise Pack</h4>
              <p className="text-2xl font-bold text-green-600">$150</p>
              <p className="text-sm text-gray-600">5,000 Credits</p>
              <p className="text-xs text-gray-500">$0.03 per credit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
