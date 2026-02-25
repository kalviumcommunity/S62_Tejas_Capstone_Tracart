import { useEffect, useState } from "react";

export default function SubscriptionUpdateForm({
  onSuccess,
  subscriptionBase,
}) {
  const [formData, setFormData] = useState({
    service_name: "",
    cost: "",
    currency: "INR",
    start_date: "",
    billing_cycle: "Monthly",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete: ${formData.service_name}?`
      )
    ) {
      const token = localStorage.getItem("auth_token");

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/subscriptions/${formData.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to delete subscription.");
        }

        onSuccess();
      } catch (err) {
        alert("Failed to delete subscription: " + err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("auth_token");

    // Prepare data for API
    const submissionData = {
      service_name: formData.service_name,
      cost: parseFloat(formData.cost),
      currency: formData.currency,
      billing_cycle: formData.billing_cycle,
      start_date: formData.start_date,
      status: formData.status,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/subscriptions/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(submissionData),
        }
      );

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || "Failed to update subscription");

      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subscriptionBase && subscriptionBase.id) {
      // Format the date properly for input field (YYYY-MM-DD)
      const date = new Date(subscriptionBase.start_date);
      const formattedDate = date.toISOString().split("T")[0];

      setFormData({
        id: subscriptionBase.id,
        service_name: subscriptionBase.service_name || "",
        cost: subscriptionBase.cost || "",
        currency: subscriptionBase.currency || "INR",
        start_date: formattedDate,
        billing_cycle: subscriptionBase.billing_cycle || "Monthly",
        status: subscriptionBase.status || "Active",
      });
    }
  }, [subscriptionBase]);

  const currencySymbols = {
    INR: "₹",
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CAD: "C$",
    AUD: "A$",
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl w-full max-w-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Edit Subscription
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-300 rounded text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Service Name */}
        <div>
          <label className="block mb-2 text-sm font-medium">Service Name</label>
          <input
            type="text"
            name="service_name"
            placeholder="e.g. Netflix, Spotify"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-purple-500 focus:outline-none"
            value={formData.service_name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Cost + Currency in one row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium">
              Monthly Cost
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                {currencySymbols[formData.currency] || "$"}
              </span>
              <input
                type="number"
                name="cost"
                step="0.01"
                placeholder="0.00"
                className="w-full p-3 pl-10 rounded-lg bg-slate-800 border border-slate-700 focus:border-purple-500 focus:outline-none"
                value={formData.cost}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Currency</label>
            <select
              name="currency"
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-purple-500 focus:outline-none"
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

        {/* Start Date */}
        <div>
          <label className="block mb-2 text-sm font-medium">Start Date</label>
          <input
            type="date"
            name="start_date"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-purple-500 focus:outline-none"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Billing Cycle & Status in one row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Billing Cycle
            </label>
            <select
              name="billing_cycle"
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-purple-500 focus:outline-none"
              value={formData.billing_cycle}
              onChange={handleChange}
            >
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
              <option value="Weekly">Weekly</option>
              <option value="Quarterly">Quarterly</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Status</label>
            <select
              name="status"
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-purple-500 focus:outline-none"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onSuccess}
            className="flex-1 py-3 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-700 font-medium transition-colors disabled:opacity-50"
          >
            Delete
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-medium transition-all disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
