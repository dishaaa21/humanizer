import { SavedText, HumanizeSettings, User } from '../types';

// Mock humanizer service
export const mockHumanizerService = {
  // Humanize text
  humanize: async (
    text: string,
    settings: HumanizeSettings,
    user: User | null
  ): Promise<string> => {
    // Simulate API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user has enough credits
    if (user && user.credits <= 0) {
      throw new Error('Not enough credits');
    }

    // Simple transformation logic based on settings
    let result = text;

    // Apply tone transformations
    switch (settings.tone) {
      case 'casual':
        result = makeCasual(result);
        break;
      case 'formal':
        result = makeFormal(result);
        break;
      case 'creative':
        result = makeCreative(result);
        break;
      case 'professional':
        result = makeProfessional(result);
        break;
      default:
        break;
    }

    // Apply fluency transformations
    result = improveText(result, settings.fluency);

    // Apply length transformations
    switch (settings.length) {
      case 'shorter':
        result = makeTextShorter(result);
        break;
      case 'longer':
        result = makeTextLonger(result);
        break;
      default:
        break;
    }

    return result;
  },

  // Save text
  saveText: (
    originalText: string,
    humanizedText: string,
    user: User
  ): SavedText => {
    const savedText: SavedText = {
      id: Date.now().toString(),
      originalText,
      humanizedText,
      timestamp: Date.now(),
      title: originalText.substring(0, 30) + '...',
    };

    // Add to user's saved texts
    user.savedTexts.push(savedText);

    // Update localStorage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const userIndex = users.findIndex((u: User) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    }

    return savedText;
  },

  // Delete saved text
  deleteSavedText: (textId: string, user: User): User => {
    const updatedUser = {
      ...user,
      savedTexts: user.savedTexts.filter((text) => text.id !== textId),
    };

    // Update localStorage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const userIndex = users.findIndex((u: User) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }
    }

    return updatedUser;
  },
};

// Helper functions for text transformation

function makeCasual(text: string): string {
  // Replace formal phrases with casual ones
  const replacements: [RegExp, string][] = [
    [/therefore/gi, 'so'],
    [/however/gi, 'but'],
    [/nevertheless/gi, 'still'],
    [/in addition/gi, 'also'],
    [/regarding/gi, 'about'],
    [/utilize/gi, 'use'],
    [/sufficient/gi, 'enough'],
    [/obtain/gi, 'get'],
    [/purchase/gi, 'buy'],
    [/require/gi, 'need'],
  ];

  let result = text;
  replacements.forEach(([pattern, replacement]) => {
    result = result.replace(pattern, replacement);
  });

  return result;
}

function makeFormal(text: string): string {
  // Replace casual phrases with formal ones
  const replacements: [RegExp, string][] = [
    [/\bso\b/gi, 'therefore'],
    [/\bbut\b/gi, 'however'],
    [/\bstill\b/gi, 'nevertheless'],
    [/\balso\b/gi, 'in addition'],
    [/\babout\b/gi, 'regarding'],
    [/\buse\b/gi, 'utilize'],
    [/\benough\b/gi, 'sufficient'],
    [/\bget\b/gi, 'obtain'],
    [/\bbuy\b/gi, 'purchase'],
    [/\bneed\b/gi, 'require'],
  ];

  let result = text;
  replacements.forEach(([pattern, replacement]) => {
    result = result.replace(pattern, replacement);
  });

  return result;
}

function makeCreative(text: string): string {
  // Add creative elements and varied sentence structures
  // This is a simplified approximation
  let sentences = text.split(/(?<=[.!?])\s+/);
  
  sentences = sentences.map((sentence, index) => {
    // Every third sentence, add a metaphor or interesting phrase
    if (index % 3 === 0 && sentence.length > 20) {
      const creativeAdditions = [
        " Like a hidden gem, ",
        " Imagine this: ",
        " Picture this: ",
        " Fascinatingly, ",
        " Remarkably, ",
        " Unexpectedly, ",
      ];
      const randomAddition = creativeAdditions[Math.floor(Math.random() * creativeAdditions.length)];
      return sentence.replace(/^/, randomAddition);
    }
    return sentence;
  });
  
  return sentences.join(' ');
}

function makeProfessional(text: string): string {
  // Replace casual phrases with professional ones
  const replacements: [RegExp, string][] = [
    [/\blike\b/gi, 'such as'],
    [/\bkind of\b/gi, 'somewhat'],
    [/\bjust\b/gi, ''],
    [/\bmake sure\b/gi, 'ensure'],
    [/\bfix\b/gi, 'resolve'],
    [/\blook at\b/gi, 'examine'],
    [/\blook into\b/gi, 'investigate'],
    [/\bfind out\b/gi, 'determine'],
    [/\bcome up with\b/gi, 'develop'],
    [/\btalk about\b/gi, 'discuss'],
  ];

  let result = text;
  replacements.forEach(([pattern, replacement]) => {
    result = result.replace(pattern, replacement);
  });

  return result;
}

function improveText(text: string, fluency: number): string {
  // Basic improvements based on fluency level
  let result = text;
  
  // Fix common errors and improve readability
  result = result.replace(/\bi\b/g, 'I');
  result = result.replace(/\s{2,}/g, ' ');
  
  if (fluency >= 3) {
    // Improved punctuation
    result = result.replace(/([.!?])\s*([a-z])/g, (_, p, c) => `${p} ${c.toUpperCase()}`);
  }
  
  if (fluency >= 4) {
    // Remove repetitive words
    const words = result.split(/\s+/);
    for (let i = 0; i < words.length - 1; i++) {
      if (words[i].toLowerCase() === words[i + 1].toLowerCase()) {
        words.splice(i, 1);
        i--;
      }
    }
    result = words.join(' ');
  }
  
  return result;
}

function makeTextShorter(text: string): string {
  // Simplify by removing some adverbs and adjectives
  const result = text
    .replace(/\b(very|extremely|really|quite|somewhat)\s/gi, '')
    .replace(/\b(great|significant|substantial)\s/gi, '')
    .replace(/\b(in order to)\b/gi, 'to')
    .replace(/\b(due to the fact that)\b/gi, 'because')
    .replace(/\b(in spite of the fact that)\b/gi, 'although');
  
  return result;
}

function makeTextLonger(text: string): string {
  // Add additional descriptive elements
  let sentences = text.split(/(?<=[.!?])\s+/);
  
  sentences = sentences.map(sentence => {
    // Add descriptive phrases
    if (sentence.length > 10 && !sentence.includes(',')) {
      const elaborations = [
        ", broadly speaking,",
        ", for the most part,",
        ", in essence,",
        ", in many cases,",
        ", all things considered,",
      ];
      const randomElaboration = elaborations[Math.floor(Math.random() * elaborations.length)];
      
      // Insert the elaboration around the middle of the sentence
      const words = sentence.split(' ');
      const midPoint = Math.floor(words.length / 2);
      
      words.splice(midPoint, 0, randomElaboration);
      return words.join(' ');
    }
    return sentence;
  });
  
  return sentences.join(' ');
}