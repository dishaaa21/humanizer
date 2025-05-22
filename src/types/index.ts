export type Plan = {
  id: string;
  name: string;
  price: number;
  credits: number;
  features: string[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  credits: number;
  savedTexts: SavedText[];
};

export type SavedText = {
  id: string;
  originalText: string;
  humanizedText: string;
  timestamp: number;
  title: string;
};

export type HumanizeSettings = {
  tone: 'casual' | 'formal' | 'creative' | 'professional';
  fluency: number; // 1-5
  length: 'shorter' | 'same' | 'longer';
};