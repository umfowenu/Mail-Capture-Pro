import { create } from 'zustand'

export interface Campaign {
  id: string
  name: string
  type: 'direct-cta' | 'content-sharing'
  redirectUrl: string
  status: 'active' | 'paused' | 'draft'
  createdAt: string
  views: number
  conversions: number
  conversionRate: number
  hooks: string[]
  preHeadline?: string
  headline?: string
  bulletPoints: string[]
  autoresponder?: string
  emailList?: string
  campaignGoal?: string
  targetAudience?: string
  platform?: string
}

export interface Subscriber {
  id: string
  email: string
  name: string
  campaignId: string
  campaignName: string
  status: 'active' | 'unsubscribed'
  joinedDate: string
  lastActive: string
  source: 'google' | 'facebook'
}

export interface Settings {
  autoresponder: {
    provider: 'aweber' | 'getresponse' | null
    connected: boolean
    lists: Array<{ id: string; name: string }>
  }
  openai: {
    apiKey: string
    model: string
    connected: boolean
  }
}

interface Store {
  user: {
    id: string
    name: string
    email: string
    role: 'user' | 'admin'
  }
  credits: number
  campaigns: Campaign[]
  subscribers: Subscriber[]
  settings: Settings
  
  // Actions
  addCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'views' | 'conversions' | 'conversionRate'>) => void
  updateCampaign: (id: string, updates: Partial<Campaign>) => void
  deleteCampaign: (id: string) => void
  addSubscriber: (subscriber: Omit<Subscriber, 'id'>) => void
  updateSettings: (settings: Partial<Settings>) => void
  useCredits: (amount: number) => void
  addCredits: (amount: number) => void
}

export const useStore = create<Store>((set, get) => ({
  user: {
    id: '1',
    name: 'Marius Nothling',
    email: 'marius@example.com',
    role: 'user'
  },
  credits: 100,
  campaigns: [
    {
      id: '1',
      name: 'Make your first money online today',
      type: 'direct-cta',
      redirectUrl: 'https://example.com/offer',
      status: 'active',
      createdAt: '2 months ago',
      views: 246,
      conversions: 2,
      conversionRate: 0.81,
      hooks: ['Unlock The Secrets Top Earners Won\'t Tell You About Building A Successful Online Business.'],
      preHeadline: 'Get Paid Per Click!',
      headline: 'Make your first money online while you build your list.',
      bulletPoints: [
        'No Tech Skills Needed',
        'Easy to Set Up',
        'Low Learning Curve',
        'Build An Email List',
        'Make Commissions Without Showing Your Face'
      ],
      autoresponder: 'aweber',
      emailList: 'Magic Link $7'
    }
  ],
  subscribers: [
    {
      id: '1',
      email: 'webdistributer@gmail.com',
      name: 'Christian Podboroczynski',
      campaignId: '1',
      campaignName: 'Make your first money online today',
      status: 'active',
      joinedDate: 'May 26, 2025',
      lastActive: 'May 26, 2025',
      source: 'google'
    },
    {
      id: '2',
      email: 'kinnier@gmail.com',
      name: 'Sharon Kinnier',
      campaignId: '1',
      campaignName: 'Make your first money online today',
      status: 'active',
      joinedDate: 'May 07, 2025',
      lastActive: 'May 07, 2025',
      source: 'google'
    }
  ],
  settings: {
    autoresponder: {
      provider: 'aweber',
      connected: true,
      lists: [
        { id: 'magic-link-7', name: 'Magic Link $7' },
        { id: 'never-succeed-report', name: 'Never Succeed Online Report' }
      ]
    },
    openai: {
      apiKey: '',
      model: 'GPT-4o',
      connected: true
    }
  },

  addCampaign: (campaignData) => set((state) => ({
    campaigns: [...state.campaigns, {
      ...campaignData,
      id: Date.now().toString(),
      createdAt: 'Just now',
      views: 0,
      conversions: 0,
      conversionRate: 0
    }]
  })),

  updateCampaign: (id, updates) => set((state) => ({
    campaigns: state.campaigns.map(campaign =>
      campaign.id === id ? { ...campaign, ...updates } : campaign
    )
  })),

  deleteCampaign: (id) => set((state) => ({
    campaigns: state.campaigns.filter(campaign => campaign.id !== id)
  })),

  addSubscriber: (subscriberData) => set((state) => {
    const newSubscriber = {
      ...subscriberData,
      id: Date.now().toString()
    }
    
    // Use 2 credits per subscriber
    const newCredits = Math.max(0, state.credits - 2)
    
    return {
      subscribers: [...state.subscribers, newSubscriber],
      credits: newCredits
    }
  }),

  updateSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings }
  })),

  useCredits: (amount) => set((state) => ({
    credits: Math.max(0, state.credits - amount)
  })),

  addCredits: (amount) => set((state) => ({
    credits: state.credits + amount
  }))
}))
