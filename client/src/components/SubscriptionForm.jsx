import { useState } from "react";
import {
  X,
  Calendar,
  Bell,
  CreditCard,
  Tag,
  Sparkles,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SubscriptionForm({ onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    service_name: "",
    cost: "",
    currency: "INR",
    start_date: "",
    billing_cycle: "Monthly",
    status: "Active",
    category: "Entertainment",
    free_trial: false,
    trial_end_date: "",
    reminder_days: 1,
    color: "#8B5CF6",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);

  const categories = [
    { value: "Entertainment", label: "🎬 Entertainment", color: "bg-pink-500" },
    { value: "Productivity", label: "💼 Productivity", color: "bg-blue-500" },
    { value: "Cloud", label: "☁️ Cloud", color: "bg-cyan-500" },
    { value: "Fitness", label: "💪 Fitness", color: "bg-green-500" },
    { value: "News", label: "📰 News", color: "bg-orange-500" },
    { value: "Education", label: "📚 Education", color: "bg-purple-500" },
    { value: "Other", label: "✨ Other", color: "bg-gray-500" },
  ];

  const billingCycles = [
    { value: "Monthly", label: "Monthly", price: "/month" },
    { value: "Yearly", label: "Yearly", price: "/year", popular: true },
    { value: "Quarterly", label: "Every 3 Months", price: "/3 months" },
    { value: "Weekly", label: "Weekly", price: "/week" },
  ];

  const colors = [
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#6366F1", // Indigo
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("auth_token");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/subscriptions/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            cost: parseFloat(formData.cost),
            trial_end_date: formData.free_trial
              ? formData.trial_end_date
              : null,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || "Failed to create subscription");

      onSuccess();
      if (onClose) onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const formatCurrency = (amount, currency) => {
    const symbols = {
      INR: "₹",
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      CAD: "C$",
      AUD: "A$",
    };
    return `${symbols[currency] || "$"}${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700 w-full max-w-2xl overflow-hidden shadow-2xl"
    >
      {/* Header */}
      <div className="p-8 border-b border-slate-700">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Add New Subscription
            </h2>
            <p className="text-slate-400 mt-1">
              Track your recurring payments effortlessly
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center mt-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`
                w-8 h-8 rounded-full flex items-center justify-center font-semibold
                ${
                  step >= s
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-slate-700 text-slate-400"
                }
              `}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`
                  w-16 h-1 mx-2
                  ${
                    step > s
                      ? "bg-gradient-to-r from-purple-600 to-pink-600"
                      : "bg-slate-700"
                  }
                `}
                />
              )}
            </div>
          ))}
          <div className="ml-4 text-sm text-slate-400">
            {step === 1 && "Basic Info"}
            {step === 2 && "Pricing"}
            {step === 3 && "Settings"}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Service Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  <div className="flex items-center gap-2">
                    <Tag size={16} />
                    Service Name
                  </div>
                </label>
                <input
                  type="text"
                  name="service_name"
                  placeholder="e.g., Netflix, Spotify Premium, Adobe Creative Cloud"
                  className="w-full p-4 rounded-xl bg-slate-800 border-2 border-slate-700 focus:border-purple-500 focus:outline-none text-white placeholder-slate-500"
                  value={formData.service_name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Category
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {categories.map((cat) => (
                    <button
                      type="button"
                      key={cat.value}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          category: cat.value,
                        }))
                      }
                      className={`
                        p-4 rounded-xl border-2 transition-all
                        ${
                          formData.category === cat.value
                            ? "border-purple-500 bg-slate-800"
                            : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                        }
                      `}
                    >
                      <div className="text-left">
                        <div className="text-lg mb-1">
                          {cat.label.split(" ")[0]}
                        </div>
                        <div className="text-xs text-slate-400">
                          {cat.label.split(" ")[1]}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Brand Color
                </label>
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <button
                      type="button"
                      key={color}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, color }))
                      }
                      className={`
                        w-10 h-10 rounded-full border-2 transition-transform
                        ${
                          formData.color === color
                            ? "border-white scale-110"
                            : "border-slate-700"
                        }
                      `}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Billing Cycle */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} />
                    Billing Cycle
                  </div>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {billingCycles.map((cycle) => (
                    <button
                      type="button"
                      key={cycle.value}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          billing_cycle: cycle.value,
                        }))
                      }
                      className={`
                        p-4 rounded-xl border-2 transition-all relative
                        ${
                          formData.billing_cycle === cycle.value
                            ? "border-purple-500 bg-gradient-to-r from-purple-900/30 to-pink-900/30"
                            : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                        }
                      `}
                    >
                      {cycle.popular && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full">
                            <Sparkles size={10} className="inline mr-1" />
                            Popular
                          </div>
                        </div>
                      )}
                      <div className="text-center">
                        <div className="font-semibold text-lg">
                          {cycle.label}
                        </div>
                        <div className="text-sm text-slate-400 mt-1">
                          {cycle.price}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cost & Currency */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Monthly Cost
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-slate-300">
                      {formatCurrency(0, formData.currency).charAt(0)}
                    </span>
                    <input
                      type="number"
                      name="cost"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full p-4 pl-12 rounded-xl bg-slate-800 border-2 border-slate-700 focus:border-purple-500 focus:outline-none text-white text-2xl"
                      value={formData.cost}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="text-right mt-2 text-slate-400 text-sm">
                    Yearly:{" "}
                    {formatCurrency(
                      (parseFloat(formData.cost) || 0) * 12,
                      formData.currency
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Currency
                  </label>
                  <div className="relative">
                    <Globe
                      size={16}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
                    />
                    <select
                      name="currency"
                      className="w-full p-4 pl-12 rounded-xl bg-slate-800 border-2 border-slate-700 focus:border-purple-500 focus:outline-none text-white appearance-none"
                      value={formData.currency}
                      onChange={handleChange}
                    >
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="JPY">JPY (¥)</option>
                      <option value="CAD">CAD (C$)</option>
                      <option value="AUD">AUD (A$)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    Start Date
                  </div>
                </label>
                <input
                  type="date"
                  name="start_date"
                  className="w-full p-4 rounded-xl bg-slate-800 border-2 border-slate-700 focus:border-purple-500 focus:outline-none text-white"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Status
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["Active", "Paused", "Cancelled"].map((status) => (
                    <button
                      type="button"
                      key={status}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, status }))
                      }
                      className={`
                        p-4 rounded-xl border-2 transition-all
                        ${
                          formData.status === status
                            ? status === "Active"
                              ? "border-green-500 bg-green-900/20"
                              : status === "Paused"
                              ? "border-yellow-500 bg-yellow-900/20"
                              : "border-red-500 bg-red-900/20"
                            : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                        }
                      `}
                    >
                      <div className="text-center">
                        <div className="font-semibold">{status}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Free Trial */}
              <div className="bg-slate-800/50 rounded-xl p-4 border-2 border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">Free Trial</div>
                    <div className="text-sm text-slate-400">
                      Is this service on a free trial?
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="free_trial"
                      checked={formData.free_trial}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-purple-600 to-pink-600"></div>
                  </label>
                </div>

                {formData.free_trial && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4"
                  >
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Trial End Date
                    </label>
                    <input
                      type="date"
                      name="trial_end_date"
                      className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-purple-500 focus:outline-none text-white"
                      value={formData.trial_end_date}
                      onChange={handleChange}
                    />
                  </motion.div>
                )}
              </div>

              {/* Reminder */}
              <div className="bg-slate-800/50 rounded-xl p-4 border-2 border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                  <Bell size={20} className="text-purple-400" />
                  <div>
                    <div className="font-medium text-white">
                      Payment Reminder
                    </div>
                    <div className="text-sm text-slate-400">
                      Get notified before renewal
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[1, 3, 7].map((days) => (
                    <button
                      type="button"
                      key={days}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          reminder_days: days,
                        }))
                      }
                      className={`
                        p-3 rounded-lg border-2 transition-all text-center
                        ${
                          formData.reminder_days === days
                            ? "border-purple-500 bg-gradient-to-r from-purple-900/30 to-pink-900/30"
                            : "border-slate-700 bg-slate-800 hover:border-slate-600"
                        }
                      `}
                    >
                      <div className="font-semibold">
                        {days} Day{days > 1 ? "s" : ""}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">Before</div>
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-900/30 border border-red-700 text-red-300 p-4 rounded-xl">
                  {error}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 rounded-xl border-2 border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Back
              </button>
            )}
          </div>

          <div className="flex gap-3">
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding...
                  </>
                ) : (
                  "Add Subscription"
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </motion.div>
  );
}
