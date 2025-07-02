import React from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  BarChart3, 
  Download, 
  Edit, 
  Copy, 
  Eye, 
  Trash2,
  ExternalLink
} from 'lucide-react'
import { useStore } from '../store/useStore'

const Dashboard = () => {
  const { campaigns } = useStore()
  const [selectedCampaignType, setSelectedCampaignType] = React.useState<'direct-cta' | 'content-sharing'>('direct-cta')

  const handleCopyLink = (campaignId: string) => {
    const link = `${window.location.origin}/view/${campaignId}`
    navigator.clipboard.writeText(link)
    alert('Campaign link copied to clipboard!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mail Capture Pro</h1>
        <p className="text-gray-600 flex items-center gap-2">
          How it works? <ExternalLink className="h-4 w-4" />
        </p>
      </div>

      {/* Campaign Type Selection */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4">What would you like to do?</h2>
        
        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-3 p-4 border-2 border-primary-200 rounded-lg cursor-pointer hover:bg-primary-50">
            <input
              type="radio"
              name="campaignType"
              value="direct-cta"
              checked={selectedCampaignType === 'direct-cta'}
              onChange={(e) => setSelectedCampaignType(e.target.value as 'direct-cta')}
              className="text-primary-600"
            />
            <div>
              <div className="font-medium">Create A Direct CTA Campaign Without CTA Banner</div>
            </div>
          </label>
          
          <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="campaignType"
              value="content-sharing"
              checked={selectedCampaignType === 'content-sharing'}
              onChange={(e) => setSelectedCampaignType(e.target.value as 'content-sharing')}
              className="text-primary-600"
            />
            <div>
              <div className="font-medium">Create A Content Sharing Campaign With CTA Banners</div>
            </div>
          </label>
        </div>

        <Link
          to="/campaign/create"
          state={{ type: selectedCampaignType }}
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          Start Campaign
        </Link>
      </div>

      {/* Active Campaigns */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Active Campaigns</h3>
              <p className="text-gray-600">Monitor and optimize your running campaigns</p>
            </div>
            <div className="flex gap-2">
              <Link to="/analytics" className="btn-secondary inline-flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Campaigns Analytics
              </Link>
              <button className="btn-success inline-flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export to CSV
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  List
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <span>{campaign.createdAt}</span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-800">
                          {campaign.status}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {campaign.emailList}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div>{campaign.views} views • {campaign.conversions} conversions • {campaign.conversionRate}% CTR</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleCopyLink(campaign.id)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title="Copy Link"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600" title="Edit Campaign">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600" title="Preview">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Total {campaigns.length} campaigns</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
