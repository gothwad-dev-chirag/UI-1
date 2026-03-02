import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import { ArrowLeft, Star, Share2, ShoppingCart, Download, CheckCircle, User, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import React from 'react';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, apps, addToCart, addReview, installApp, isAppInstalled } = useStore();
  const [isAdded, setIsAdded] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [isInstalling, setIsInstalling] = useState(false);

  const item = products.find(p => p.id === id) || apps.find(a => a.id === id);

  if (!item) return <div className="p-8 text-center">Item not found</div>;

  const isApp = item.type === 'app';
  const isInstalled = isApp && isAppInstalled(item.id);

  const handleAction = () => {
    if (isApp) {
      if (isInstalled) return; // Already installed
      
      setIsInstalling(true);
      setTimeout(() => {
        installApp(item.id);
        setIsInstalling(false);
        setIsAdded(true);
      }, 2000);
    } else {
      addToCart(item);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const handleBuyNow = () => {
    addToCart(item);
    navigate('/cart');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    
    addReview(item.id, {
      user: 'You',
      rating: reviewRating,
      text: reviewText
    });
    setReviewText('');
    setReviewRating(5);
  };

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100">
          <ArrowLeft size={24} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Share2 size={24} />
        </button>
      </div>

      {/* Image */}
      <div className="px-6 py-4 flex justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`rounded-3xl overflow-hidden shadow-lg ${isApp ? 'w-40 h-40' : 'w-full aspect-square max-w-sm'}`}
        >
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </motion.div>
      </div>

      {/* Info */}
      <div className="px-6 pt-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h1>
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          {isApp && <span className="text-sm text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-md">{item.developer}</span>}
          <div className="flex items-center text-yellow-500 font-bold">
            {item.rating} <Star size={16} fill="currentColor" className="ml-1" />
          </div>
          <span className="text-gray-400 text-sm">•</span>
          <span className="text-gray-500 text-sm">{isApp ? item.size : 'Free Returns'}</span>
          {isApp && item.downloads !== undefined && (
            <>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-500 text-sm">{item.downloads.toLocaleString()} Downloads</span>
            </>
          )}
        </div>

        <div className="border-t border-gray-100 py-6">
          <h3 className="font-bold text-lg mb-2">Description</h3>
          <p className="text-gray-600 leading-relaxed">{item.description}</p>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-gray-100 py-6">
          <h3 className="font-bold text-lg mb-4">Reviews ({item.reviews?.length || 0})</h3>
          
          {/* Review Form */}
          <form onSubmit={handleSubmitReview} className="mb-8 bg-gray-50 p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium">Rate this:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className={`${star <= reviewRating ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    <Star size={20} fill="currentColor" />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write a review..."
                className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <button 
                type="submit"
                className="bg-black text-white p-2 rounded-full hover:bg-gray-800 disabled:opacity-50"
                disabled={!reviewText.trim()}
              >
                <Send size={18} />
              </button>
            </div>
          </form>

          {/* Review List */}
          <div className="space-y-4">
            {item.reviews && item.reviews.length > 0 ? (
              item.reviews.map((review) => (
                <div key={review.id} className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 text-gray-500">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{review.user}</span>
                      <div className="flex text-yellow-500 text-xs">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={10} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{review.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm text-center py-4">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 max-w-md mx-auto z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <span className="text-xs text-gray-500 block">Total Price</span>
            <span className="text-2xl font-bold text-gray-900">
              {item.price === 0 ? 'Free' : `$${item.price}`}
            </span>
          </div>
          
          {!isApp && (
            <button 
              onClick={handleBuyNow}
              className="flex-1 py-3.5 px-4 rounded-full font-bold text-black bg-gray-100 hover:bg-gray-200 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              Buy Now
            </button>
          )}

          <button 
            onClick={handleAction}
            disabled={isAdded || isInstalling || isInstalled}
            className={`flex-1 py-3.5 px-4 rounded-full font-bold text-white flex items-center justify-center gap-2 transition-all ${
              isAdded || isInstalled ? 'bg-green-600' : 'bg-emerald-600 active:scale-95 hover:bg-emerald-700'
            } ${isInstalled ? 'opacity-100 cursor-default' : ''}`}
          >
            {isInstalling ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Installing...
              </>
            ) : (isAdded || isInstalled) ? (
              <>
                <CheckCircle size={20} /> {isApp ? 'Installed' : 'Added'}
              </>
            ) : isApp ? (
              <>
                <Download size={20} /> Install
              </>
            ) : (
              <>
                <ShoppingCart size={20} /> Add Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
