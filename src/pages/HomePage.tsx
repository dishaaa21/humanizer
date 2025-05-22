import { Link } from 'react-router-dom';
import HumanizerTool from '../components/HumanizerTool';
import { MessageSquare, Zap, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
        <div className="container-wide">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Make AI Text Sound</span>
                <span className="block text-primary-600">Human Again</span>
              </h1>
              <p className="text-lg text-gray-600 md:text-xl">
                Transform robotic AI-generated text into natural, human-like content that bypasses AI detectors and engages your audience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup" className="btn btn-primary px-8 py-3 text-base">
                  Get Started
                </Link>
                <Link to="/pricing" className="btn btn-outline px-8 py-3 text-base">
                  View Pricing
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 pt-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                  <span>No signup required</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                  <span>Bypasses AI detectors</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                  <span>Multiple tone options</span>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-in-right">
              <HumanizerTool />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Use TextHuman?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Our advanced humanization engine transforms AI text in ways that make it indistinguishable from human writing.
            </p>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="card flex flex-col items-center text-center transition-transform hover:translate-y-[-4px]">
              <div className="mb-4 rounded-full bg-primary-100 p-3 text-primary-600">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">Natural Language</h3>
              <p className="text-gray-600">
                Transforms mechanical AI sentences into natural, flowing human language with varied sentence structure.
              </p>
            </div>
            
            <div className="card flex flex-col items-center text-center transition-transform hover:translate-y-[-4px]">
              <div className="mb-4 rounded-full bg-secondary-100 p-3 text-secondary-600">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">Adjustable Settings</h3>
              <p className="text-gray-600">
                Customize tone, fluency level, and length to match your specific writing style and purpose.
              </p>
            </div>
            
            <div className="card flex flex-col items-center text-center transition-transform hover:translate-y-[-4px]">
              <div className="mb-4 rounded-full bg-accent-100 p-3 text-accent-600">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">AI Detection Proof</h3>
              <p className="text-gray-600">
                Our algorithm introduces human-like patterns that bypass even the most sophisticated AI detection tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container-wide">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Users Say
          </h2>
          
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="card">
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600">
                "TextHuman transformed my AI-written content into something that feels authentic and engaging. It's become an essential tool for my content creation process."
              </p>
              <div className="mt-4">
                <p className="font-medium text-gray-900">Sarah Johnson</p>
                <p className="text-sm text-gray-500">Content Marketer</p>
              </div>
            </div>
            
            <div className="card">
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600">
                "My professor couldn't tell the difference between my humanized AI text and my own writing. This tool saved me hours of work while maintaining academic integrity."
              </p>
              <div className="mt-4">
                <p className="font-medium text-gray-900">Michael Chen</p>
                <p className="text-sm text-gray-500">Graduate Student</p>
              </div>
            </div>
            
            <div className="card">
              <div className="mb-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600">
                "As a small business owner, I need to create a lot of content quickly. TextHuman helps me use AI efficiently while still maintaining an authentic voice for my brand."
              </p>
              <div className="mt-4">
                <p className="font-medium text-gray-900">David Williams</p>
                <p className="text-sm text-gray-500">Small Business Owner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16 md:py-20">
        <div className="container-narrow text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to humanize your AI content?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
            Join thousands of writers, marketers, and students who use TextHuman to create more natural, engaging content.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link
              to="/signup"
              className="btn inline-flex w-full items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-primary-600 hover:bg-gray-100 sm:w-auto"
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              to="/pricing"
              className="btn inline-flex w-full items-center justify-center rounded-md border border-white bg-transparent px-6 py-3 text-base font-medium text-white hover:bg-primary-700 sm:w-auto"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;