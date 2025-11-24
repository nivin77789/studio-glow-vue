import { useState, useEffect } from "react";
import { Star, X } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function RatingWidget() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [hover, setHover] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const submittedFlag = localStorage.getItem("studio_glow_rating_submitted");
    setSubmitted(!!submittedFlag);
  }, []);

  const submitRating = async () => {
    if (!rating || !customerName.trim()) return;
    try {
      await addDoc(collection(db, "ratings"), {
        rating,
        customerName: customerName.trim(),
        comment: comment || null,
        page: window.location.pathname,
        createdAt: serverTimestamp(),
      });
      localStorage.setItem("studio_glow_rating_submitted", "1");
      setSubmitted(true);
      setOpen(false);
    } catch (err) {
      console.error("Failed to submit rating:", err);
      // keep UI open so user can retry
    }
  };

  return (
    <div>
      {/* Floating button */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="relative">
          <button
            aria-label="Rate our service"
            className="w-12 h-12 rounded-full bg-amber-500 text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
            onClick={() => setOpen((v) => !v)}
            title={submitted ? "Thanks for rating" : "Rate our service"}
          >
            {submitted ? (
              <Star className="w-5 h-5 text-white" />
            ) : (
              <span className="text-sm font-semibold">★</span>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed bottom-20 left-6 z-50 w-[320px] max-w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-800">
            <div className="font-medium">Rate Our Service</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4">
            {submitted ? (
              <div className="text-center py-6">
                <div className="text-lg font-semibold mb-2">Thanks for your feedback!</div>
                <div className="text-sm text-muted-foreground">We appreciate you taking the time.</div>
              </div>
            ) : (
              <>
                <div className="mb-3">
                  <label className="text-sm text-muted-foreground block mb-1">Your name</label>
                  <input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full rounded-md border border-gray-200 dark:border-slate-700 px-3 py-2 text-sm bg-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-3 text-sm text-muted-foreground">How would you rate your experience?</div>
                <div className="flex items-center gap-2 mb-3">
                  {[1,2,3,4,5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setRating(n)}
                      onMouseEnter={() => setHover(n)}
                      onMouseLeave={() => setHover(null)}
                      className={`p-2 rounded-md transition-colors ${ (hover ?? rating ?? 0) >= n ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300' }`}
                      aria-label={`Rate ${n}`}
                    >
                      <Star className="w-5 h-5" />
                    </button>
                  ))}
                </div>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full rounded-md border border-gray-200 dark:border-slate-700 px-3 py-2 text-sm bg-transparent resize-none"
                  rows={3}
                  placeholder="Optional feedback (help us improve)"
                />

                <div className="mt-3 flex justify-end gap-2">
                  <button onClick={() => { setOpen(false); }} className="px-3 py-2 rounded-md border border-gray-200 dark:border-slate-700 text-sm">Cancel</button>
                  <button onClick={submitRating} className={`px-3 py-2 rounded-md text-sm ${rating && customerName.trim() ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`} disabled={!rating || !customerName.trim()}>Submit</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
