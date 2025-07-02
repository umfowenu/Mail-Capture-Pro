import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useStore } from '../store/useStore'

interface CampaignFormData {
  name: string
  redirectUrl: string
  campaignGoal: string
  targetAudience: string
  platform: string
  preHeadline: string
  headline: string
  bulletPoint1: string
  bulletPoint2: string
  bulletPoint3: string
  bulletPoint4: string
  bulletPoint5: string
  autoresponder: string
  emailList: string
}

const CreateCampaign = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { addCampaign, settings } = useStore()
  const campaignType = location.state?.type || 'direct-cta'
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CampaignFormData>({
    defaultValues: {
      autoresponder: settings.autoresponder.provider || ''
    }
  })

  const selectedAutoresponder = watch('autoresponder')

  const onSubmit = (data: CampaignFormData) => {
    const bulletPoints = [
      data.bulletPoint1,
      data.bulletPoint2,
      data.bulletPoint3,
      data.bulletPoint4,
      data.bulletPoint5
    ].filter(Boolean)

    const campaign = {
      name: data.name,
      type: campaignType as 'direct-cta' | 'content-sharing',
      redirectUrl: data.redirectUrl,
      status: 'draft' as const,
      hooks: [],
      preHeadline: data.preHeadline,
      headline: data.headline,
      bulletPoints,
      autoresponder: data.autoresponder,
      emailList: data.emailList,
      campaignGoal: data.campaignGoal,
      targetAudience: data.targetAudience,
      platform: data.platform
    }

    addCampaign(campaign)
    navigate('/campaign/temp-id/hooks', { state: { campaign } })
  }

  const generateHooks = () => {
    // This would normally call OpenAI API
    alert('AI Hook Generator would be called here with OpenAI integration')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mail Capture Pro</h1>
        <p className="text-gray-600 flex items-center gap-2">
          How it works? <span className="text-blue-600">🔗</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Campaign Details */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4">Create Direct CTA Campaign</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  * Campaign Name
                </label>
                <input
                  {...register('name', { required: 'Campaign name is required' })}
                  placeholder="e.g. Premium Access 2024"
                  className="input w-full"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  * Redirect URL
                </label>
                <input
                  {...register('redirectUrl', { required: 'Redirect URL is required' })}
                  placeholder="https://your-content.com"
                  className="input w-full"
                />
                {errors.redirectUrl && (
                  <p className="text-red-500 text-sm mt-1">{errors.redirectUrl.message}</p>
                )}
              </div>
            </div>

            {/* AI Hook Generator */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold">AI Hook Generator</h3>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                  <span className="text-sm">Campaign Details</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
                  <span className="text-sm text-gray-500">Select Hooks</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
                  <span className="text-sm text-gray-500">Edit & Save</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-3">Campaign Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Campaign Goal</label>
                    <input
                      {...register('campaignGoal')}
                      placeholder="e.g. email opt-in capture"
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Target Audience</label>
                    <input
                      {...register('targetAudience')}
                      placeholder="e.g. online content creators"
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Platform</label>
                    <input
                      {...register('platform')}
                      placeholder="e.g. Instagram, Email"
                      className="input w-full"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={generateHooks}
                className="btn-success inline-flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Generate Hooks
              </button>
            </div>

            {/* Landing Page Settings */}
            <div>
              <h3 className="font-semibold mb-4">Google Auth Landing Page Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pre-Headline (Optional but recommended)
                  </label>
                  <input
                    {...register('preHeadline')}
                    placeholder="Enter pre-headline text"
                    className="input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Headline (Optional)
                  </label>
                  <input
                    {...register('headline')}
                    placeholder="Enter main headline text"
                    className="input w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bullet Points (Optional)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    {...register('bulletPoint1')}
                    placeholder="Bullet point 1"
                    className="input w-full"
                  />
                  <input
                    {...register('bulletPoint2')}
                    placeholder="Bullet point 2"
                    className="input w-full"
                  />
                  <input
                    {...register('bulletPoint3')}
                    placeholder="Bullet point 3"
                    className="input w-full"
                  />
                  <input
                    {...register('bulletPoint4')}
                    placeholder="Bullet point 4"
                    className="input w-full"
                  />
                  <input
                    {...register('bulletPoint5')}
                    placeholder="Bullet point 5"
                    className="input w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Email Provider */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                ⏰
              </div>
              <span className="text-sm font-medium">CountDown Timer</span>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">PRO</span>
              <div className="ml-auto">
                <input type="checkbox" className="rounded" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Provider ℹ️
                </label>
                <select 
                  {...register('autoresponder')}
                  className="input w-full"
                >
                  <option value="">Select Provider</option>
                  <option value="aweber">AWeber</option>
                  <option value="getresponse">GetResponse</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AWeber List ℹ️
                </label>
                <select 
                  {...register('emailList')}
                  className="input w-full"
                  disabled={!selectedAutoresponder}
                >
                  <option value="">Select AWeber List</option>
                  {settings.autoresponder.lists.map(list => (
                    <option key={list.id} value={list.name}>{list.name}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="btn-success w-full inline-flex items-center justify-center gap-2"
              >
                🚀 Launch Campaign
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateCampaign
