import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import { Plan } from '../types';

const PaymentPage = () => {
  const { user, updatePlan } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [formValues, setFormValues] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);

  // Retrieve selected plan from session storage
  useEffect(() => {
    const storedPlan = sessionStorage.getItem('selectedPlan');
    if (storedPlan) {
      setSelectedPlan(JSON.parse(storedPlan));
    }
  }, []);

  // Redirect if no plan is selected or user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!selectedPlan && !sessionStorage.getItem('selectedPlan')) {
      navigate('/pricing');
    }
  }, [user, selectedPlan, navigate]);
  
  const applyDiscount = () => {
    if (couponCode.toLowerCase() === 'welcome20') {
      setDiscountApplied(0.2); // 20% discount
    } else if (couponCode.toLowerCase() === 'texthuman10') {
      setDiscountApplied(0.1); // 10% discount
    } else {
      setErrors({ coupon: 'Invalid coupon code' });
      setDiscountApplied(0);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validate card number (simple 16-digit check)
    if (!/^\d{16}$/.test(formValues.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    // Validate card name
    if (!formValues.cardName.trim()) {
      newErrors.cardName = 'Please enter the name on card';
    }
    
    // Validate expiry (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(formValues.expiry)) {
      newErrors.expiry = 'Please enter expiry in MM/YY format';
    } else {
      const [month, year] = formValues.expiry.split('/').map(Number);
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      
      if (month < 1 || month > 12) {
        newErrors.expiry = 'Invalid month';
      } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiry = 'Card has expired';
      }
    }
    
    // Validate CVC
    if (!/^\d{3,4}$/.test(formValues.cvc)) {
      newErrors.cvc = 'Please enter a valid 3-4 digit CVC';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    
    // Format card number with spaces every 4 digits
    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .substring(0, 19);
    }
    
    // Format expiry with slash
    if (name === 'expiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '$1/$2')
        .substring(0, 5);
    }
    
    setFormValues(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      if (selectedPlan) {
        // Update user's plan
        updatePlan(selectedPlan);
        
        // Clear stored plan
        sessionStorage.removeItem('selectedPlan');
        
        setIsLoading(false);
        setIsProcessed(true);
        
        // Redirect to dashboard after showing success message
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      }
    }, 2000);
  };
  
  if (!selectedPlan) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading plan information...</p>
        </div>
      </div>
    );
  }
  
  const calculateTotal = () => {
    if (!selectedPlan) return 0;
    return selectedPlan.price * (1 - discountApplied);
  };
  
  return (
    <div className="py-12">
      <div className="container-narrow">
        <button 
          onClick={() => navigate('/pricing')} 
          className="mb-8 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to pricing
        </button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Complete Your Purchase
          </h1>
          <p className="mt-2 text-gray-600">
            You're just one step away from humanizing your AI content
          </p>
        </div>
        
        {isProcessed ? (
          <div className="mt-12 rounded-lg bg-white p-8 text-center shadow-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Payment Successful!</h2>
            <p className="mt-2 text-gray-600">
              Thank you for upgrading to the {selectedPlan.name} plan. Your account has been updated.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              You'll be redirected to your dashboard in a moment...
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Payment Form */}
            <div className="rounded-lg bg-white p-6 shadow-md md:p-8">
              <h2 className="mb-6 text-xl font-bold text-gray-900">Payment Information</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="cardNumber" className="mb-2 block text-sm font-medium text-gray-700">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={formValues.cardNumber}
                        onChange={handleChange}
                        maxLength={19}
                        className={`input pl-10 ${errors.cardNumber ? 'border-red-500' : ''}`}
                      />
                      <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                    {errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="cardName" className="mb-2 block text-sm font-medium text-gray-700">
                      Name on Card
                    </label>
                    <input
                      id="cardName"
                      name="cardName"
                      type="text"
                      placeholder="John Smith"
                      value={formValues.cardName}
                      onChange={handleChange}
                      className={`input ${errors.cardName ? 'border-red-500' : ''}`}
                    />
                    {errors.cardName && (
                      <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="mb-2 block text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <input
                        id="expiry"
                        name="expiry"
                        type="text"
                        placeholder="MM/YY"
                        value={formValues.expiry}
                        onChange={handleChange}
                        className={`input ${errors.expiry ? 'border-red-500' : ''}`}
                      />
                      {errors.expiry && (
                        <p className="mt-1 text-sm text-red-600">{errors.expiry}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="cvc" className="mb-2 block text-sm font-medium text-gray-700">
                        CVC / CVV
                      </label>
                      <input
                        id="cvc"
                        name="cvc"
                        type="text"
                        placeholder="123"
                        value={formValues.cvc}
                        onChange={handleChange}
                        maxLength={4}
                        className={`input ${errors.cvc ? 'border-red-500' : ''}`}
                      />
                      {errors.cvc && (
                        <p className="mt-1 text-sm text-red-600">{errors.cvc}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex h-5 items-center">
                      <input
                        id="terms"
                        type="checkbox"
                        required
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-gray-700">
                        I agree to the{' '}
                        <a href="#" className="text-primary-600 hover:text-primary-500">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-primary-600 hover:text-primary-500">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-primary w-full py-2"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="mr-2 h-4 w-4 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Lock className="mr-2 h-4 w-4" />
                          Complete Purchase
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
              
              <div className="mt-8 flex items-center justify-center">
                <div className="text-center text-sm text-gray-500">
                  <div className="flex justify-center space-x-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" className="h-6" />
                  </div>
                  <p className="mt-2 flex items-center justify-center">
                    <Lock className="mr-1 h-3 w-3" />
                    Secure payment processing
                  </p>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="rounded-lg bg-white p-6 shadow-md md:p-8">
              <h2 className="mb-6 text-xl font-bold text-gray-900">Order Summary</h2>
              
              <div className="rounded-md bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedPlan.name} Plan</h3>
                    <p className="mt-1 text-sm text-gray-600">{selectedPlan.credits} credits</p>
                    <ul className="mt-2 space-y-1 text-xs text-gray-600">
                      {selectedPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="mr-1 h-3 w-3 flex-shrink-0 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">${selectedPlan.price.toFixed(2)}</p>
                </div>
              </div>
              
              {/* Coupon Code */}
              <div className="mt-6">
                <label htmlFor="coupon" className="mb-2 block text-sm font-medium text-gray-700">
                  Coupon Code
                </label>
                <div className="flex space-x-2">
                  <input
                    id="coupon"
                    type="text"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      if (errors.coupon) {
                        setErrors(prev => ({ ...prev, coupon: '' }));
                      }
                    }}
                    className={`input flex-1 ${errors.coupon ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={applyDiscount}
                    className="btn btn-outline"
                  >
                    Apply
                  </button>
                </div>
                {errors.coupon && (
                  <p className="mt-1 text-sm text-red-600">{errors.coupon}</p>
                )}
                {discountApplied > 0 && (
                  <p className="mt-1 text-sm text-green-600">
                    {(discountApplied * 100).toFixed(0)}% discount applied!
                  </p>
                )}
              </div>
              
              {/* Total */}
              <div className="mt-6 space-y-2 border-t border-dashed border-gray-200 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium text-gray-900">${selectedPlan.price.toFixed(2)}</p>
                </div>
                
                {discountApplied > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-gray-600">Discount ({(discountApplied * 100).toFixed(0)}%)</p>
                    <p className="font-medium text-red-600">-${(selectedPlan.price * discountApplied).toFixed(2)}</p>
                  </div>
                )}
                
                <div className="flex items-center justify-between border-t border-gray-200 pt-2">
                  <p className="text-base font-medium text-gray-900">Total</p>
                  <p className="text-lg font-bold text-gray-900">${calculateTotal().toFixed(2)}</p>
                </div>
              </div>
              
              {/* Billing Period */}
              <div className="mt-6 rounded-md bg-primary-50 p-4 text-sm text-gray-800">
                <p className="flex items-center">
                  <InfoIcon className="mr-2 h-4 w-4 text-primary-600" />
                  You will be billed monthly for the {selectedPlan.name} plan. You can cancel or change your subscription at any time.
                </p>
              </div>
              
              {/* Money Back Guarantee */}
              <div className="mt-6 flex items-center justify-center text-center text-sm text-gray-600">
                <div>
                  <p className="font-medium">30-day money-back guarantee</p>
                  <p className="mt-1">Not satisfied? Get a full refund within 30 days</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper info icon component
const InfoIcon = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
};

export default PaymentPage;