import BaseLayout from '@/layouts/BaseLayout'
import PageTransition from '@/components/PageTransition'
import { useAuth } from '@/contexts/AuthContext'

function SettingsPage() {
  const { user } = useAuth()

  return (
    <BaseLayout>
      <PageTransition>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-primary mb-8">Settings</h1>
        
        <div className="bg-surface border border-theme rounded-lg divide-y divide-theme">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-primary mb-4">Account</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-secondary">Email</label>
                <p className="text-primary">{user?.email || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm text-secondary">Username</label>
                <p className="text-primary">{user?.username || 'Not set'}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h2 className="text-lg font-semibold text-primary mb-4">Preferences</h2>
            <p className="text-secondary text-sm">
              Additional settings and preferences will be available here.
            </p>
          </div>
        </div>
        </div>
      </PageTransition>
    </BaseLayout>
  )
}

export default SettingsPage
