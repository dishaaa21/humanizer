import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import HumanizerTool from '../components/HumanizerTool';
import CreditUsageChart from '../components/CreditUsageChart';
import SavedTextsList from '../components/SavedTextsList';
import { Link } from 'react-router-dom';
import { Settings, CreditCard, ArrowUpCircle } from 'lucide-react';

const DashboardPage = () => {
  const { user, updatePlan } = useAuth();
  const [activeTab, setActiveTab] = useState<'humanizer' | 'saved'>('humanizer');

  if (!user) {
    return null; // This should be handled by ProtectedRoute
  }

  return (
    <div className="py-12">
      <div className="container-wide">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900">Welcome, {user.name}</h2>
                <p className="mt-1 text-sm text-gray-600">{user.email}</p>

                <div className="mt-6">
                  <CreditUsageChart
                    totalCredits={user.plan.credits}
                    usedCredits={user.plan.credits - user.credits}
                  />
                </div>

                <div className="mt-6 rounded-md bg-primary-50 p-4 text-center">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{user.plan.name} Plan</span>
                  </p>
                  <Link
                    to="/pricing"
                    className="mt-2 inline-flex items-center text-xs font-medium text-primary-700 hover:text-primary-800"
                  >
                    <ArrowUpCircle className="mr-1 h-3 w-3" />
                    Upgrade Plan
                  </Link>
                </div>
              </div>

              <div className="mt-8 space-y-2">
                <button
                  onClick={() => setActiveTab('humanizer')}
                  className={`flex w-full items-center rounded-md px-3 py-2 text-sm font-medium ${
                    activeTab === 'humanizer'
                      ? 'bg-primary-100 text-primary-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex-1 text-left">Humanizer Tool</span>
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`flex w-full items-center rounded-md px-3 py-2 text-sm font-medium ${
                    activeTab === 'saved'
                      ? 'bg-primary-100 text-primary-800'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="flex-1 text-left">Saved Texts</span>
                  <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-700">
                    {user.savedTexts.length}
                  </span>
                </button>
                <Link
                  to="/payment"
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span className="flex-1 text-left">Billing</span>
                </Link>
                <Link
                  to="#"
                  className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span className="flex-1 text-left">Settings</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            {activeTab === 'humanizer' ? (
              <HumanizerTool />
            ) : (
              <div className="card">
                <h2 className="mb-4 text-xl font-bold text-gray-800">Your Saved Texts</h2>
                <SavedTextsList
                  savedTexts={user.savedTexts}
                  onUpdate={updatePlan}
                  user={user}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;