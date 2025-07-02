import React from 'react'
import { ExternalLink, Check, X } from 'lucide-react'
import { useStore } from '../store/useStore'

const Settings = () => {
  const { settings, updateSettings } = useStore()
  const [openaiKey, setOpenaiKey] = React.useState(settings.openai.apiKey)
  const [openaiModel, setOpenaiModel] = React.useState(settings.openai.model)

  const handleUpdateAI = () => {
    updateSettings({
      openai: {
        ...settings.openai,
        apiKey: openaiKey,
        model: openaiModel,
        connected: openaiKey.length > 0
      }
    })
    alert('AI settings updated successfully!')
  }

  const handleDisconnectAweber = () => {
    updateSettings({
      autoresponder: {
        ...settings.autoresponder,
        provider: null,
        connected: false,
        lists: []
      }
    })
    alert('AWeber disconnected successfully!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account settings and integrations</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
          Pro Account
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Autoresponder Settings */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Autoresponder</h3>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-800">
              AWeber Connected
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Email Provider:
              </label>
              <select className="input w-full">
                <option>AWeber</option>
                <option>GetResponse</option>
              </select>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700 mb-2">
                AWeber requires OAuth2 authentication{' '}
                <a href="#" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800">
                  Visit AWeber <ExternalLink className="h-3 w-3" />
                </a>
              </p>
            </div>

            <div className="bg-success-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-success-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-success-900 mb-2">AWeber Account Connected!</h4>
              <p className="text-sm text-success-700 mb-4">
                Your AWeber account is successfully connected and ready to use with your campaigns.
              </p>
              <button 
                onClick={handleDisconnectAweber}
                className="btn-danger text-sm"
              >
                Disconnect AWeber
              </button>
            </div>
          </div>
        </div>

        {/* OpenAI Integration */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">OpenAI Integration</h3>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-800">
              Connected
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Need an API key?{' '}
                <a href="#" className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-800">
                  Create one here <ExternalLink className="h-3 w-3" />
                </a>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  placeholder="Enter your OpenAI API key"
                  className="input w-full pr-10"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  👁️
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OpenAI Models
              </label>
              <select 
                value={openaiModel}
                onChange={(e) => setOpenaiModel(e.target.value)}
                className="input w-full"
              >
                <option>GPT-4o</option>
                <option>GPT-4</option>
                <option>GPT-3.5-turbo</option>
              </select>
            </div>

            <button 
              onClick={handleUpdateAI}
              className="btn-success w-full"
            >
              Update AI Settings
            </button>
          </div>
        </div>

        {/* Pro License (Hidden as requested) */}
        <div className="card p-6" style={{ display: 'none' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Pro License</h3>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Pro
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Upgrade to Pro to unlock premium features and advanced capabilities
            </p>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="License key"
                className="input w-full"
              />
              <button className="btn-success w-full">
                Update License
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
