import { Link, useNavigate } from 'react-router-dom';
import { Plan } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Check } from 'lucide-react';

interface PricingCardProps {
  plan: Plan;
  isPopular?: boolean;
}

const PricingCard = ({ plan, isPopular = false }: PricingCardProps) => {
  const { user, updatePlan } = useAuth();
  const navigate = useNavigate();

  const handleSelectPlan = () => {
    if (!user) {
      navigate('/signup');
      return;
    }

    if (plan.price > 0) {
      // Store selected plan and redirect to payment
      sessionStorage.setItem('selectedPlan', JSON.stringify(plan));
      navigate('/payment');
    } else {
      // Free plan, apply immediately
      updatePlan(plan);
      navigate('/dashboard');
    }
  };

  const isCurrentPlan = user && user.plan.id === plan.id;

  return (
    <div
      className={`relative flex flex-col rounded-lg ${
        isPopular ? 'border-2 border-primary-500 shadow-lg' : 'border border-gray-200 shadow'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-primary-500 py-1 text-center text-sm font-medium text-white">
          Most Popular
        </div>
      )}

      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
        <div className="mt-4 flex items-baseline text-gray-900">
          <span className="text-4xl font-extrabold tracking-tight">${plan.price}</span>
          {plan.price > 0 && <span className="ml-1 text-xl font-medium text-gray-500">/month</span>}
        </div>
        <p className="mt-2 text-sm text-gray-500">Includes {plan.credits} credits per month</p>

        <ul className="mt-6 space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <button
            onClick={handleSelectPlan}
            disabled={isCurrentPlan}
            className={`w-full rounded-md px-4 py-2 text-center text-sm font-medium transition-colors ${
              isCurrentPlan
                ? 'cursor-default bg-gray-100 text-gray-500'
                : isPopular
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
            }`}
          >
            {isCurrentPlan ? 'Current Plan' : 'Get Started'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;