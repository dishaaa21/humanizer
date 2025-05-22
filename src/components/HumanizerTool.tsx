import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { HumanizeSettings } from '../types';
import { mockHumanizerService } from '../services/mockHumanizerService';
import { Save, Play, Clock, AlertCircle } from 'lucide-react';

const defaultSettings: HumanizeSettings = {
  tone: 'casual',
  fluency: 3,
  length: 'same',
};

const HumanizerTool = () => {
  const { user, updateCredits } = useAuth();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [settings, setSettings] = useState<HumanizeSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (saveSuccess) {
      const timer = setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [saveSuccess]);

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to humanize');
      return;
    }

    if (user && user.credits <= 0) {
      setError('You have no credits left. Please upgrade your plan.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const result = await mockHumanizerService.humanize(inputText, settings, user);
      setOutputText(result);
      
      // Deduct credits if user is logged in
      if (user) {
        updateCredits(user.credits - 1);
      }
    } catch (err) {
      setError('An error occurred while humanizing the text');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!user) {
      setError('Please log in to save texts');
      return;
    }

    if (!inputText || !outputText) {
      setError('Both input and output texts must be present to save');
      return;
    }

    try {
      mockHumanizerService.saveText(inputText, outputText, user);
      setSaveSuccess(true);
      setError('');
    } catch (err) {
      setError('Failed to save text');
      console.error(err);
    }
  };

  const handleToneChange = (tone: HumanizeSettings['tone']) => {
    setSettings((prev) => ({ ...prev, tone }));
  };

  const handleFluencyChange = (fluency: number) => {
    setSettings((prev) => ({ ...prev, fluency }));
  };

  const handleLengthChange = (length: HumanizeSettings['length']) => {
    setSettings((prev) => ({ ...prev, length }));
  };

  const creditsText = user ? `${user.credits} credits remaining` : 'Sign in to track credits';

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">AI Text Humanizer</h2>
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{creditsText}</span>
        </div>
      </div>

      {/* Settings */}
      <div className="mb-6 grid grid-cols-1 gap-4 border-b border-gray-200 pb-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Tone</label>
          <div className="flex flex-wrap gap-2">
            {(['casual', 'formal', 'creative', 'professional'] as const).map((tone) => (
              <button
                key={tone}
                onClick={() => handleToneChange(tone)}
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                  settings.tone === tone
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Fluency Level</label>
          <div className="flex items-center space-x-2">
            <div className="flex flex-wrap gap-2">
  {[1, 2, 3, 4, 5].map((level) => (
    <button
      key={level}
      onClick={() => handleFluencyChange(level)}
      className={`h-6 w-6 rounded-full text-xs font-medium ${
        settings.fluency === level
          ? 'bg-primary-600 text-white'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
    >
      {level}
    </button>
  ))}
</div>

          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Length</label>
          <div className="flex flex-wrap gap-2">
            {(['shorter', 'same', 'longer'] as const).map((length) => (
              <button
                key={length}
                onClick={() => handleLengthChange(length)}
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                  settings.length === length
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {length}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Text Areas */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="input-text" className="mb-2 block text-sm font-medium text-gray-700">
            AI-Generated Text
          </label>
          <textarea
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="input min-h-[200px] font-mono text-sm"
            placeholder="Paste your AI-generated text here..."
          />
        </div>

        <div>
          <label htmlFor="output-text" className="mb-2 block text-sm font-medium text-gray-700">
            Humanized Text
          </label>
          <textarea
            id="output-text"
            value={outputText}
            onChange={(e) => setOutputText(e.target.value)}
            className="input min-h-[200px] font-mono text-sm"
            placeholder="Your humanized text will appear here..."
            readOnly={!outputText}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 flex items-center rounded-md bg-red-50 p-3 text-sm text-red-800">
          <AlertCircle className="mr-2 h-4 w-4" />
          {error}
        </div>
      )}

      {/* Success Message */}
      {saveSuccess && (
        <div className="mt-4 flex items-center rounded-md bg-green-50 p-3 text-sm text-green-800">
          <span className="mr-2">✓</span>
          Text saved successfully!
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={handleHumanize}
          disabled={isLoading || !inputText.trim()}
          className="btn btn-primary"
        >
          {isLoading ? (
            <span className="flex items-center">
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
            <span className="flex items-center">
              <Play className="mr-2 h-4 w-4" />
              Humanize Text
            </span>
          )}
        </button>

        <button
          onClick={handleSave}
          disabled={!outputText || !user}
          className="btn btn-outline"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Result
        </button>
      </div>
    </div>
  );
};

export default HumanizerTool;