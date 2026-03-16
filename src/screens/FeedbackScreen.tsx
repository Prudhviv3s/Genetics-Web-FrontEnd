import React, { useState } from 'react';
import { MessageSquare, Star, Send, CheckCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import { DesktopLayout } from '../components/DesktopLayout';
import { useAppContext } from '../context/AppContext';
import { API_BASE_URL } from '../config';

export default function FeedbackScreen() {
  const navigate = useNavigate();
  const { currentUser } = useAppContext();
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!rating || !feedbackType || !message.trim()) return;

    const token = localStorage.getItem('token');

    if (!token) {
      setError("You are not logged in. Please log in again.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // MAPPING SECTION: Easily switch field names corresponding to backend requirements
    const payload = {
      rating: rating,
      feedback_type: feedbackType, // e.g. change to 'type' if needed
      message: message // e.g. change to 'comment' if needed
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/feedback/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(payload)
      });

      // Avoid crashing if response body is empty or non-JSON
      let data: any = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }

      if (response.ok && data.status) {
        setSubmitted(true);
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        // Parse backend errors safely
        if (data.errors) {
          const errorList = Object.entries(data.errors)
            .map(([field, errs]) => {
              const msg = Array.isArray(errs) ? errs.join(', ') : errs;
              return `${field}: ${msg}`;
            })
            .join(' | ');

          setError(data.message ? `${data.message} - ${errorList}` : errorList);
        } else if (data.message) {
          setError(data.message);
        } else {
          setError(`Error ${response.status}: Failed to submit feedback.`);
        }
      }
    } catch (err) {
      console.error("Feedback error:", err);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const feedbackTypes = [
    { value: 'Bug Report', label: 'Bug Report', emoji: '🐛' },
    { value: 'Feature Request', label: 'Feature Request', emoji: '💡' },
    { value: 'Improvement', label: 'Improvement', emoji: '⚡' },
    { value: 'Compliment', label: 'Compliment', emoji: '❤️' },
    { value: 'Other', label: 'Other', emoji: '💬' },
  ];

  if (submitted) {
    return (
      <DesktopLayout title="Feedback" defaultUserRole={currentUser?.role || 'patient'}>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Thank You!</h3>
              <p className="text-gray-600 mb-6 text-lg">
                Your feedback has been submitted successfully. We appreciate your input!
              </p>

              {/* Logout Button */}
              <button
                onClick={() => navigate('/logout')}
                className="mt-6 mx-auto bg-white border-2 border-red-600 text-red-600 rounded-xl px-8 py-3 font-semibold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </DesktopLayout>
    );
  }

  return (
    <DesktopLayout title="Send Feedback" defaultUserRole={currentUser?.role || 'patient'}>
      <div className="max-w-3xl mx-auto">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 rounded-lg p-3 flex-shrink-0">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">We Value Your Feedback</h3>
              <p className="text-gray-700">
                Help us improve by sharing your thoughts, reporting bugs, or suggesting features.
              </p>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm space-y-8">
          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-4">
              Rate Your Experience
            </label>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-12 h-12 transition-colors ${star <= rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 hover:text-gray-400'
                      }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-base text-gray-600 mt-3">
                {rating === 5 && '⭐ Excellent! Thank you!'}
                {rating === 4 && '😊 Great! We appreciate it!'}
                {rating === 3 && '👍 Good, thanks for the feedback!'}
                {rating === 2 && '😐 We can do better.'}
                {rating === 1 && '😞 Sorry to hear that.'}
              </p>
            )}
          </div>

          {/* Feedback Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-4">
              Feedback Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {feedbackTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setFeedbackType(type.value)}
                  className={`p-4 rounded-lg border-2 text-center transition-all hover:shadow-md ${feedbackType === type.value
                    ? 'border-blue-600 bg-blue-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl">{type.emoji}</span>
                    <span className={`text-sm font-medium ${feedbackType === type.value ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                      {type.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Your Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you think..."
              rows={8}
              maxLength={500}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base"
            />
            <p className="text-sm text-gray-500 mt-2">
              {message.length}/500 characters
            </p>
          </div>

          {/* Buttons */}
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => navigate(-1)}
              disabled={isLoading}
              className="flex-1 bg-white text-gray-700 border-2 border-gray-300 rounded-lg px-6 py-3 font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!rating || !feedbackType || !message.trim() || isLoading}
              className={`flex-1 rounded-lg px-6 py-3 font-semibold transition-all flex items-center justify-center gap-2 ${!rating || !feedbackType || !message.trim() || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                }`}
            >
              <Send size={20} />
              {isLoading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}
