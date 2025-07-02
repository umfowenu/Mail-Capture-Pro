import React from 'react'
import { Download, Search } from 'lucide-react'
import { useStore } from '../store/useStore'

const EmailsList = () => {
  const { subscribers } = useStore()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCampaign, setSelectedCampaign] = React.useState('All Campaigns')

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subscriber.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const exportToCsv = () => {
    const csvContent = [
      ['Email', 'Name', 'Campaign', 'Status', 'Joined Date', 'Last Active', 'Source'],
      ...filteredSubscribers.map(sub => [
        sub.email,
        sub.name,
        sub.campaignName,
        sub.status,
        sub.joinedDate,
        sub.lastActive,
        sub.source
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'email-list.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              👥
            </div>
            Emails List
          </h1>
          <p className="text-gray-600">Monitor your campaign subscribers</p>
        </div>
        <button 
          onClick={exportToCsv}
          className="btn-success inline-flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export List
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search subscribers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
        <select 
          value={selectedCampaign}
          onChange={(e) => setSelectedCampaign(e.target.value)}
          className="input w-48"
        >
          <option>All Campaigns</option>
          <option>Make your first money online today</option>
        </select>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>📧</span>
          <span>{filteredSubscribers.length} Total</span>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscriber
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaigns
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscribers.map((subscriber) => (
                <tr key={subscriber.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {subscriber.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{subscriber.name}</div>
                        <div className="text-sm text-gray-500">{subscriber.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {subscriber.campaignName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-800">
                      {subscriber.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    📅 {subscriber.joinedDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {subscriber.lastActive}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Total {filteredSubscribers.length} subscribers</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">1</span>
              <span className="text-sm text-gray-500">10 / page</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailsList
