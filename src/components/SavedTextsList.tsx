import { useState } from 'react';
import { SavedText, User } from '../types';
import { mockHumanizerService } from '../services/mockHumanizerService';
import { Trash2, ChevronDown, ChevronUp, Clock } from 'lucide-react';

interface SavedTextsListProps {
  savedTexts: SavedText[];
  onUpdate: (user: User) => void;
  user: User;
}

const SavedTextsList = ({ savedTexts, onUpdate, user }: SavedTextsListProps) => {
  const [expandedTextId, setExpandedTextId] = useState<string | null>(null);

  const handleDelete = (textId: string) => {
    const updatedUser = mockHumanizerService.deleteSavedText(textId, user);
    onUpdate(updatedUser);
  };

  const toggleExpand = (textId: string) => {
    setExpandedTextId(expandedTextId === textId ? null : textId);
  };

  if (savedTexts.length === 0) {
    return (
      <div className="mt-6 rounded-lg border border-dashed border-gray-300 p-6 text-center">
        <p className="text-gray-500">You haven't saved any texts yet.</p>
        <p className="mt-1 text-sm text-gray-400">
          Humanized texts will appear here when you save them.
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-6 divide-y divide-gray-200">
      {savedTexts.map((text) => (
        <li key={text.id} className="py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => toggleExpand(text.id)}
              className="flex flex-1 items-center text-left font-medium text-gray-900 hover:text-primary-600"
            >
              <span className="mr-2">
                {expandedTextId === text.id ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </span>
              <span className="truncate">{text.title}</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="mr-1 h-3 w-3" />
                <span>{new Date(text.timestamp).toLocaleDateString()}</span>
              </div>
              
              <button
                onClick={() => handleDelete(text.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {expandedTextId === text.id && (
            <div className="mt-4 grid grid-cols-1 gap-4 rounded-md bg-gray-50 p-4 text-sm md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-medium text-gray-700">Original Text:</h4>
                <p className="whitespace-pre-wrap text-gray-600">{text.originalText}</p>
              </div>
              <div>
                <h4 className="mb-2 font-medium text-gray-700">Humanized Text:</h4>
                <p className="whitespace-pre-wrap text-gray-600">{text.humanizedText}</p>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SavedTextsList;