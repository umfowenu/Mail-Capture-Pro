import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import EmailsList from './pages/EmailsList'
import CampaignAnalytics from './pages/CampaignAnalytics'
import Settings from './pages/Settings'
import CreateCampaign from './pages/CreateCampaign'
import SelectHooks from './pages/SelectHooks'
import EditHooks from './pages/EditHooks'
import OptinPage from './pages/OptinPage'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/view/:campaignId" element={<OptinPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="emails" element={<EmailsList />} />
          <Route path="analytics" element={<CampaignAnalytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="campaign/create" element={<CreateCampaign />} />
          <Route path="campaign/:id/hooks" element={<SelectHooks />} />
          <Route path="campaign/:id/edit-hooks" element={<EditHooks />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
