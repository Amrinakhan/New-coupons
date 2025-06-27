import React, { useEffect } from "react";

interface CouponModalProps {
  open: boolean;
  onClose: () => void;
  vendor: {
    name: string;
    email: string;
    phone: string;
  } | null;
}

const rules = [
  "Buy-one-get-one & 25% off total bill offers cannot be used on the same bill.",
  "Splitting of bills is not allowed per booking, table or group."
];

export default function CouponModal({ open, onClose, vendor }: CouponModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open || !vendor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={onClose}>
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 animate-fadeIn overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        {/* Logo */}
        <div className="flex flex-col items-center pt-6 pb-2">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 border-2 border-gray-200 shadow">
            {/* Placeholder logo or vendor initial */}
            <span className="text-3xl font-bold text-red-500">
              {vendor.name.length > 1 ? vendor.name.slice(0,2).toUpperCase() : vendor.name[0].toUpperCase()}
            </span>
          </div>
          <div className="text-lg font-semibold text-gray-700 mt-1 mb-2 text-center">
            Main course <span className="block text-xs font-normal text-gray-400">of equal or lesser value</span>
          </div>
        </div>
        {/* Offer Icons */}
        <div className="flex justify-center gap-8 mb-2">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full border border-blue-200 mb-1">
              <span className="text-blue-600 text-xl font-bold">2•1</span>
            </div>
            <span className="text-xs text-gray-500">Buy 1 Get 1 Free</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full border border-blue-200 mb-1">
              <span className="text-blue-600 text-xl">🍽️</span>
            </div>
            <span className="text-xs text-gray-500">Dine-in only</span>
          </div>
        </div>
        {/* Coupon Section with Blue Border */}
        <div className="border-2 border-blue-400 rounded-xl mx-4 my-4 p-4 flex flex-col items-center">
          <span className="text-2xl font-bold text-blue-700 mb-1">AED 56</span>
          <span className="text-xs text-gray-500 mb-2">Your Estimated Savings</span>
          <span className="text-gray-600 text-sm mb-2 text-center">Please ask {vendor.name} to enter their PIN</span>
          <div className="flex gap-2 mb-2">
            {[0,1,2,3].map(i => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="w-10 h-12 text-center border border-gray-300 rounded-lg text-xl font-mono focus:outline-blue-400 shadow-sm"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            ))}
          </div>
        </div>
        {/* Validity */}
        <div className="text-center text-xs text-gray-500 mb-2 font-semibold tracking-wider">
          VALID TO 31 DEC 2025
        </div>
        {/* Rules */}
        <div className="px-6 pb-4">
          <div className="text-xs text-gray-700 mb-2">
            Offers are subject to <span className="text-blue-700 underline cursor-pointer">Rules of Use</span>
          </div>
          <ul className="text-xs text-gray-500 list-disc pl-5">
            {rules.map((rule, i) => (
              <li key={i} className="mb-1 last:mb-0">{rule}</li>
            ))}
          </ul>
        </div>
        {/* Optional Footer Branding */}
        {/* <div className="text-center text-xs text-gray-400 pb-2">Powered by YourBrand</div> */}
      </div>
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
} 