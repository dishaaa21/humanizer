import { User, Plan } from '../types';

// Mock plans
const plans: Record<string, Plan> = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    credits: 100,
    features: ['Up to 100 rewrites', 'Basic humanization', 'No payout', 'Standard support'],
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: 9.99,
    credits: 1000,
    features: [
      'Up to 1,000 rewrites',
      'Advanced humanization',
      'Priority support',
      'Export to docs',
    ],
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    price: 29.99,
    credits: 5000,
    features: [
      'Up to 5,000 rewrites',
      'Advanced humanization',
      'Team sharing',
      'Priority support',
      'API access',
      'Custom integrations',
    ],
  },
};

// Mock users database
let users: User[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    plan: plans.free,
    credits: 100,
    savedTexts: [],
  },
];

// Check local storage for users
const initUsers = () => {
  const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  } else {
    localStorage.setItem('users', JSON.stringify(users));
  }
};

// Check local storage for current user
const initCurrentUser = (): User | null => {
  const stored = localStorage.getItem('currentUser');
  return stored ? JSON.parse(stored) : null;
};

// Mock authentication service
export const mockAuthService = {
  // Set initial state
  init: () => {
    initUsers();
    return initCurrentUser();
  },

  // Get current user
  getCurrentUser: async (): Promise<User | null> => {
    return initCurrentUser();
  },

  // Login
  login: async (email: string, password: string): Promise<User> => {
    // In a real app, we would validate password here
    initUsers();
    const user = users.find((u) => u.email === email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  },

  // Signup
  signup: async (email: string, password: string, name: string): Promise<User> => {
    initUsers();
    
    // Check if user already exists
    if (users.some((user) => user.email === email)) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      plan: plans.free,
      credits: plans.free.credits,
      savedTexts: [],
    };
    
    // Update users list
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return newUser;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('currentUser');
  },

  // Update user
  updateUser: (updatedUser: User) => {
    initUsers();
    
    // Update in users array
    const index = users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Update current user
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  },

  // Get plans
  getPlans: () => {
    return Object.values(plans);
  },

  // Get plan by id
  getPlan: (id: string) => {
    return plans[id];
  },
};