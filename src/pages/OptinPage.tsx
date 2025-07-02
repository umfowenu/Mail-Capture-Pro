import React from 'react'
import { useParams } from 'react-router-dom'
import { Check, Clock } from 'lucide-react'
import { useStore } from '../store/useStore'

const OptinPage = () => {
  const { campaignId } = useParams()
  const { campaigns, addSubscriber } = useStore()
  const [timeLeft, setTimeLeft] = React.useState(102) // 1:42 in seconds

  // Find campaign (in real app, this would be fetched by ID)
  const campaign = campaigns.find(c => c.id === campaignId) || campaigns[0]

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleGoogleAuth = () => {
    // Simulate Google OAuth flow
    const mockUser = {
      email: 'user@example.com',
      name: 'New User',
      campaignId: campaignId || '1',
      campaignName: campaign?.name || 'Test Campaign',
      status: 'active' as const,
      joinedDate: new Date().toLocaleDateString(),
      lastActive: new Date().toLocaleDateString(),
      source: 'google' as const
    }

    addSubscriber(mockUser)
    
    // Redirect to campaign's redirect URL
    if (campaign?.redirectUrl) {
      window.location.href = campaign.redirectUrl
    } else {
      alert('Thank you for signing up! You would normally be redirected to the campaign URL.')
    }
  }

  const handleFacebookAuth = () => {
    // Simulate Facebook OAuth flow
    const mockUser = {
      email: 'fbuser@example.com',
      name: 'Facebook User',
      campaignId: campaignId || '1',
      campaignName: campaign?.name || 'Test Campaign',
      status: 'active' as const,
      joinedDate: new Date().toLocaleDateString(),
      lastActive: new Date().toLocaleDateString(),
      source: 'facebook' as const
    }

    addSubscriber(mockUser)
    
    if (campaign?.redirectUrl) {
      window.location.href = campaign.redirectUrl
    } else {
      alert('Thank you for signing up! You would normally be redirected to the campaign URL.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Pre-headline */}
        {campaign?.preHeadline && (
          <div className="bg-yellow-400 text-black text-center py-2 px-4 rounded-lg font-bold text-sm mb-6">
            {campaign.preHeadline}
          </div>
        )}

        {/* Main Headline */}
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6 leading-tight">
          {campaign?.headline || 'Make your first money online while you build your list.'}
        </h1>

        {/* Bullet Points */}
        <div className="space-y-3 mb-6">
          {campaign?.bulletPoints.map((point, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-gray-700 text-sm">{point}</span>
            </div>
          ))}
        </div>

        {/* Timer */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Clock className="h-5 w-5 text-blue-600" />
          <span className="text-2xl font-bold text-blue-600">{formatTime(timeLeft)}</span>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-8 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>

        {/* Auth Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleAuth}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <button
            onClick={handleFacebookAuth}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>
        </div>

        {/* Consent */}
        <div className="mt-6 text-center">
          <label className="flex items-start gap-2 text-xs text-gray-600">
            <input type="checkbox" className="mt-1" defaultChecked />
            <span>
              I consent to receive emails related to this content and agree to the{' '}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and{' '}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>. I understand I can unsubscribe anytime.
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default OptinPage
