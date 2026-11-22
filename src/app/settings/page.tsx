'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'anyone',
    showDistance: true,
    showOnlineStatus: true,
    allowMessages: 'matches',
    showInterests: true,
  })

  const [notifications, setNotifications] = useState({
    matchAlerts: true,
    messageNotifications: true,
    emailNotifications: false,
    pushNotifications: false,
  })

  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'notifications' | 'account'>('profile')
  const [isSaving, setIsSaving] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleSaveProfile = async () => {
    // Save profile logic
  }

  const handleSavePrivacy = async () => {
    // Save privacy settings
  }

  const handleSaveNotifications = async () => {
    // Save notification settings
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const handleDeleteAccount = async () => {
    localStorage.removeItem('mock_user')
    router.push('/login')
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-6 6h13a7 7 0 00-6-6z" />
      </svg>
    )},
    { id: 'privacy', label: 'Privacy', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2h12z" />
      </svg>
    )},
    { id: 'notifications', label: 'Notifications', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 21l1.405-1.405A2.032 2.032 0 006 14.158V14a6 6 0 004 5.66V21H5a2 2 0 01-2-2v-1z" />
      </svg>
    )},
    { id: 'account', label: 'Account', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
    { id: 'danger', label: 'Danger Zone', icon: (
      <svg className="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/home" className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-xl font-semibold">Settings</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Tabs */}
        <nav className="border-b sticky top-16 z-40 bg-background/80 backdrop-blur">
          <div className="flex overflow-x-auto px-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <p className="text-sm text-muted-foreground">Manage your profile information</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                      <svg className="w-10 h-10 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-6 6h13a7 7 0 00-6-6z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Profile Photo</h3>
                      <p className="text-sm text-muted-foreground">Upload a new photo</p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        disabled
                      />
                      <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>

                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <Card>
                <CardHeader>
                  <CardTitle>Privacy</CardTitle>
                  <p className="text-sm text-muted-foreground">Control who can see your information</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Profile Visibility</h4>
                    <div className="space-y-2">
                      {['anyone', 'matches_only', 'none'].map((option) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="profileVisibility"
                            value={option}
                            checked={privacySettings.profileVisibility === option}
                            onChange={(e) => setPrivacySettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                            className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                          />
                          <span className="capitalize">{option.replace('_', ' ')}</span>
                        </label>
                      ))}
                      <p className="text-sm text-muted-foreground ml-6">Who can see your full profile</p>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium">What Others See</h4>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Show Distance</p>
                            <p className="text-sm text-muted-foreground">Let others see how far away you are</p>
                          </div>
                          <Switch
                            checked={privacySettings.showDistance}
                            onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, showDistance: checked }))}
                          />
                        </label>
                        <label className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Show Online Status</p>
                            <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                          </div>
                          <Switch
                            checked={privacySettings.showOnlineStatus}
                            onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, showOnlineStatus: checked }))}
                          />
                        </label>
                        <label className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Show Interests</p>
                            <p className="text-sm text-muted-foreground">Display your interests on your profile</p>
                          </div>
                          <Switch
                            checked={privacySettings.showInterests}
                            onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, showInterests: checked }))}
                          />
                        </label>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium">Who Can Message You</h4>
                      <div className="space-y-2">
                        {['matches', 'anyone', 'none'].map((option) => (
                          <label key={option} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="allowMessages"
                              value={option}
                              checked={privacySettings.allowMessages === option}
                              onChange={(e) => setPrivacySettings(prev => ({ ...prev, allowMessages: e.target.value }))}
                              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                            />
                            <span className="capitalize">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Push Notifications</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Match Alerts</p>
                          <p className="text-sm text-muted-foreground">Get notified when you have a new match</p>
                        </div>
                        <Switch
                          checked={notifications.matchAlerts}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, matchAlerts: checked }))}
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Message Notifications</p>
                          <p className="text-sm text-muted-foreground">Get notified when you receive a message</p>
                        </div>
                        <Switch
                          checked={notifications.messageNotifications}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, messageNotifications: checked }))}
                        />
                      </label>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Email Notifications</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive email updates about activity</p>
                        </div>
                        <Switch
                          checked={notifications.emailNotifications}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailNotifications: checked }))}
                        />
                      </label>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Push Notifications</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                        </div>
                        <Switch
                          checked={notifications.pushNotifications}
                          onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, pushNotifications: checked }))}
                        />
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <p className="text-sm text-muted-foreground">Manage your account settings</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Email</h4>
                      <div className="space-y-2">
                        <Input value={profileData.email} disabled />
                        <p className="text-sm text-muted-foreground">Email cannot be changed</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium">Password</h4>
                      <Button variant="outline">Change Password</Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium">Data</h4>
                      <div className="flex gap-2">
                        <Button variant="outline">Download My Data</Button>
                        <Button variant="outline">Delete My Data</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-destructive/50 bg-destructive/5">
                  <CardHeader>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <p className="text-sm text-destructive/80">Irreversible actions</p>
                  </CardHeader>
                  <CardContent>
                    <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete your account, all your matches, messages, and data. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteAccount}>Delete Account</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4">
                    <Button variant="secondary" className="w-full" onClick={handleLogout}>
                      Log Out
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}