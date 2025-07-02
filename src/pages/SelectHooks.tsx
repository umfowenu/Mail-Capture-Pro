import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const SelectHooks = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedHooks, setSelectedHooks] = React.useState<string[]>([])

  const hooks = {
    curiosity: [
      "Unlock The Secrets Top Earners Won't Tell You About Building A Successful Online Business.",
      "What's The One Strategy Successful Entrepreneurs Are Using In 2024 That You Haven't Tried?",
      "Discover The Hidden Mistakes That Are Keeping You From Scaling Your Online Income.",
      "Are You Making One Of These Three Common Errors That Stalled Your Business Growth Last Year?"
    ],
    fomo: [
      "Only 24 Hours Left To Access This Exclusive Training Before It's Gone Forever.",
      "Join The 1% Who Are Already Using This Method While Everyone Else Falls Behind.",
      "This Opportunity Closes At Midnight - Don't Let Another Year Pass You By.",
      "Limited Spots Available: Secure Your Access Before We Reach Capacity."
    ],
    scarcity: [
      "Just 50 Spots Remaining For This Life-Changing Program.",
      "Only Available To The First 100 Action-Takers Who Claim Their Spot Today.",
      "Exclusive Access Ends In 72 Hours - Reserve Your Place Now.",
      "Final Call: Last Chance To Join Before We Close Enrollment."
    ],
    benefit: [
      "Generate Your First $1,000 Online In The Next 30 Days With This Proven System.",
      "Build A Passive Income Stream That Works While You Sleep.",
      "Transform Your Skills Into A Profitable Online Business In Just 7 Days.",
      "Discover How To Make Money Online Without Showing Your Face Or Creating Content."
    ]
  }

  const handleHookToggle = (hook: string) => {
    setSelectedHooks(prev => {
      if (prev.includes(hook)) {
        return prev.filter(h => h !== hook)
      } else if (prev.length < 4) {
        return [...prev, hook]
      }
      return prev
    })
  }

  const handleContinue = () => {
    if (selectedHooks.length === 0) {
      alert('Please select at least one hook to continue.')
      return
    }
    navigate('/campaign/temp-id/edit-hooks', { 
      state: { 
        ...location.state,
        selectedHooks 
      } 
    })
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
            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
            <span className="text-sm">Select Hooks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
            <span className="text-sm text-gray-500">Edit & Save</span>
          </div>
        </div>

        {/* Hook Selection */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-blue-800 text-sm">
            📝 Select 1-4 hooks to use in your campaign • {selectedHooks.length} selected
          </p>
        </div>

        {/* Hook Categories */}
        <div className="space-y-6">
          <div className="flex gap-4 border-b border-gray-200">
            <button className="pb-2 px-1 border-b-2 border-blue-600 text-blue-600 font-medium">Curiosity</button>
            <button className="pb-2 px-1 text-gray-500">Fomo</button>
            <button className="pb-2 px-1 text-gray-500">Scarcity</button>
            <button className="pb-2 px-1 text-gray-500">Benefit</button>
          </div>

          <div className="space-y-3">
            {hooks.curiosity.map((hook, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedHooks.includes(hook)}
                  onChange={() => handleHookToggle(hook)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="text-sm">{hook}</p>
                  {index === 0 && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-blue-600">ℹ️</span>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-blue-600">ℹ️</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <button 
            onClick={() => navigate(-1)}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <button 
            onClick={handleContinue}
            className="btn-success inline-flex items-center gap-2"
            disabled={selectedHooks.length === 0}
          >
            Continue with {selectedHooks.length} Hooks
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelectHooks
