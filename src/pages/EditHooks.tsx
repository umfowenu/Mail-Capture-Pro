import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit } from 'lucide-react'
import { useStore } from '../store/useStore'

const EditHooks = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { updateCampaign } = useStore()
  const selectedHooks = location.state?.selectedHooks || []
  const [editedHooks, setEditedHooks] = React.useState(selectedHooks)

  const handleHookChange = (index: number, value: string) => {
    setEditedHooks((prev: string[]) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  const handleSave = () => {
    // In a real app, you'd update the campaign with the final hooks
    alert('Campaign saved successfully! Your unique campaign link has been generated.')
    navigate('/')
  }

  const handleBackToSelection = () => {
    navigate(-1)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mail Capture Pro</h1>
        <p className="text-gray-600 flex items-center gap-2">
          How it works? <span className="text-blue-600">🔗</span>
        </p>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4">Create Direct CTA Campaign</h2>
        
        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">✓</div>
            <span className="text-sm">Campaign Details</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">✓</div>
            <span className="text-sm">Select Hooks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
            <span className="text-sm">Edit & Save</span>
          </div>
        </div>

        {/* Hook Editing */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2">
            <Edit className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-800">Customize Your {editedHooks.length} Hooks</span>
          </div>
          <p className="text-blue-700 text-sm mt-1">
            Fine-tune your hooks or keep the AI-generated versions. These will be used for testing your campaign.
          </p>
        </div>

        <div className="space-y-4">
          {editedHooks.map((hook: string, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Variation {index + 1}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Curiosity
                </span>
                <Edit className="h-4 w-4 text-gray-400" />
              </div>
              <textarea
                value={hook}
                onChange={(e) => handleHookChange(index, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                rows={3}
              />
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>{hook.length} characters</span>
                <span>Recommended: 50-120 chars</span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <button 
            onClick={handleBackToSelection}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Selection
          </button>
          <button 
            onClick={handleSave}
            className="btn-success"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditHooks
