import { useState } from 'react';
import { AtSign, MessageSquare, Phone, Send } from 'lucide-react';

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div className="py-12 md:py-16">
      <div className="container-narrow">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
            Have a question or feedback? We're here to help.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-lg bg-white p-8 shadow-md">
            {isSubmitted ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Message Sent!</h3>
                <p className="mt-2 text-gray-600">
                  Thank you for contacting us. We'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900">Send us a message</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>

                {error && (
                  <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleChange}
                      className="input mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="input mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formState.subject}
                      onChange={handleChange}
                      className="input mt-1"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="feature">Feature Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formState.message}
                      onChange={handleChange}
                      className="input mt-1"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full py-2"
                    >
                      {isSubmitting ? (
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
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <div className="rounded-lg bg-white p-8 shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">Get in Touch</h2>
              <p className="mt-2 text-sm text-gray-600">
                Here are a few ways you can reach out to us.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AtSign className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-3 text-sm">
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="mt-1 text-gray-600">support@texthuman.com</p>
                    <p className="mt-1 text-gray-600">For fastest response, please email us.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-3 text-sm">
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="mt-1 text-gray-600">+1 (555) 123-4567</p>
                    <p className="mt-1 text-gray-600">
                      Monday to Friday, 9am to 5pm PT
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-3 text-sm">
                    <p className="font-medium text-gray-900">Live Chat</p>
                    <p className="mt-1 text-gray-600">
                      Available for Premium and Professional plan customers.
                    </p>
                    <p className="mt-1 text-gray-600">
                      Log in to your account to access live chat support.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-white p-8 shadow-md">
              <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-base font-medium text-gray-900">
                    How does the humanization process work?
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Our advanced algorithms analyze AI-generated text and introduce human-like language patterns, making it indistinguishable from content written by humans.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900">
                    How many credits do I need?
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Each humanization uses 1 credit. How many you need depends on your usage. For occasional use, our Free plan with 100 credits may be sufficient. For regular use, consider our Premium or Professional plans.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900">
                    Can I cancel my subscription?
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Yes, you can cancel your subscription at any time. Your benefits will continue until the end of your current billing period.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;