import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockAuthService } from '../services/mockAuthService';
import PricingCard from '../components/PricingCard';
import { Shield, Zap, Users, Check } from 'lucide-react';

const PricingPage = () => {
  const { user } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const plans = mockAuthService.getPlans();

  return (
    <div className="py-12 md:py-16">
      <div className="container-narrow">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
            Select the perfect plan for your needs with flexible options and powerful features.
          </p>

          {/* Billing Toggle */}
          <div className="mt-6 inline-flex items-center rounded-full bg-gray-100 p-1">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                billingPeriod === 'annual'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Annual
              <span className="ml-1 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={{
                ...plan,
                price: billingPeriod === 'annual' ? plan.price * 0.8 : plan.price,
                credits: billingPeriod === 'annual' ? plan.credits * 12 : plan.credits,
              }}
              isPopular={index === 1}
            />
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-900">Compare Plans</h2>
          
          <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Feature
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Free
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Premium
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                    Professional
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Monthly Credits</td>
                  <td className="px-3 py-4 text-center text-sm text-gray-500">100</td>
                  <td className="px-3 py-4 text-center text-sm text-gray-500">1,000</td>
                  <td className="px-3 py-4 text-center text-sm text-gray-500">5,000</td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Saved Texts</td>
                  <td className="px-3 py-4 text-center text-sm text-gray-500">5</td>
                  <td className="px-3 py-4 text-center text-sm text-gray-500">Unlimited</td>
                  <td className="px-3 py-4 text-center text-sm text-gray-500">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Advanced Tones</td>
                  <td className="px-3 py-4 text-center text-sm text-gray-500">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100">
                      <span className="text-red-600">✕</span>
                    </span>
                  </td>
                  <td className="px-3 py-4 text-center text-sm text-gray-500">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3.5 w-3.5 text-green-600" aria-hidden="true" />
                    </span>
                  </td>
                  <td className="px-3 py-4 text-center text-sm text-gray-500">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3.5 w-3.5 text-green-600" aria-hidden="true" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Priority Support</td>
                  <td className="px-3 py-4 text-center text-sm text-gray-500">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100">
                      <span className="text-red-600">✕</span>
                    </span>
                  </td>
                  <td className="px-3 py-4 text-center text-sm text-gray-500">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3.5 w-3.5 text-green-600" aria-hidden="true" />
                    </span>
                  </td>
                  <td className="px-3 py-4 text-center text-sm text-gray-500">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3.5 w-3.5 text-green-600" aria-hidden="true" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">API Access</td>
                  <td className="px-3 py-4 text-center text-sm text-gray-500">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100">
                      <span className="text-red-600">✕</span>
                    </span>
                  </td>
                  <td className="px-3 py-4 text-center text-sm text-gray-500">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100">
                      <span className="text-red-600">✕</span>
                    </span>
                  </td>
                  <td className="px-3 py-4 text-center text-sm text-gray-500">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3.5 w-3.5 text-green-600" aria-hidden="true" />
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">Team Members</td>
                  <td className="px-3 py-4 text-center text-sm text-gray-500">1</td>
                  <td className="px-3 py-4 text-center text-sm text-gray-500">1</td>
                  <td className="px-3 py-4 text-center text-sm text-gray-500">Up to 5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">All Plans Include</h2>
          
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div className="card flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">AI Detection Proof</h3>
              <p className="text-gray-600">
                All plans come with our advanced humanization technology that bypasses AI detectors.
              </p>
            </div>
            
            <div className="card flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-secondary-100 p-3 text-secondary-600">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Fast Processing</h3>
              <p className="text-gray-600">
                Get your humanized text in seconds with our high-performance processing engine.
              </p>
            </div>
            
            <div className="card flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-accent-100 p-3 text-accent-600">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">Customer Support</h3>
              <p className="text-gray-600">
                Access to our customer support team to help you get the most out of TextHuman.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          
          <dl className="mt-8 space-y-6 divide-y divide-gray-200">
            <div className="pt-6">
              <dt className="text-lg font-medium text-gray-900">What is a "credit" in TextHuman?</dt>
              <dd className="mt-2 text-gray-600">
                A credit is used each time you humanize a text. The number of credits you have depends on your plan.
              </dd>
            </div>
            
            <div className="pt-6">
              <dt className="text-lg font-medium text-gray-900">Can I upgrade or downgrade my plan?</dt>
              <dd className="mt-2 text-gray-600">
                Yes, you can change your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, your new plan will take effect at the next billing cycle.
              </dd>
            </div>
            
            <div className="pt-6">
              <dt className="text-lg font-medium text-gray-900">Is there a limit to the text length?</dt>
              <dd className="mt-2 text-gray-600">
                Free users can humanize up to 1,000 characters per request. Premium and Professional plans allow up to 5,000 and 10,000 characters respectively.
              </dd>
            </div>
            
            <div className="pt-6">
              <dt className="text-lg font-medium text-gray-900">Do unused credits roll over to the next month?</dt>
              <dd className="mt-2 text-gray-600">
                No, credits reset at the beginning of each billing cycle. This ensures that our system resources are fairly allocated among all users.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;