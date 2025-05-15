import { useState } from "react";

export default function SubscriptionForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    service_name: "",
    cost: "",
    currency: "INR",
    start_date: "",
    billing_cycle: "Monthly",
    status: "Active",
    free_trial: false,
    remind_before: "1_day",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to create");

      setFormData({
        service_name: "",
        cost: "",
        currency: "INR",
        start_date: "",
        billing_cycle: "Monthly",
        free_trial: false,
        remind_before: "1_day",
      });
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 text-white p-6 rounded-lg w-full max-w-lg mx-auto space-y-4"
    >
      <h2 className="text-2xl font-semibold">Add Subscription</h2>
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Service Name */}
      <div>
        <label className="block mb-1 text-sm font-medium">Service Name</label>
        <input
          type="text"
          name="service_name"
          placeholder="e.g. YouTube Premium"
          className="w-full p-2 rounded bg-slate-700"
          value={formData.service_name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Cost + Currency */}
      <div className="flex gap-2">
        <div className="w-2/3">
          <label className="block mb-1 text-sm font-medium">Cost</label>
          <input
            type="number"
            name="cost"
            placeholder="e.g. 649"
            className="w-full p-2 rounded bg-slate-700"
            value={formData.cost}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-1/3">
          <label className="block mb-1 text-sm font-medium">Currency</label>
          <select
            name="currency"
            className="w-full p-2 rounded bg-slate-700"
            value={formData.currency}
            onChange={handleChange}
          >
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="GBP">£ GBP</option>
            <option value="JPY">¥ JPY</option>
            <option value="CAD">$ CAD</option>
            <option value="AUD">$ AUD</option>
          </select>
        </div>
      </div>

      {/* Start Date */}
      <div>
        <label className="block mb-1 text-sm font-medium">First Payment</label>
        <input
          type="date"
          name="start_date"
          className="w-full p-2 rounded bg-slate-700"
          value={formData.start_date}
          onChange={handleChange}
          required
        />
      </div>

      {/* Billing Cycle */}
      <div>
        <label className="block mb-1 text-sm font-medium">Billing Cycle</label>
        <select
          name="billing_cycle"
          className="w-full p-2 rounded bg-slate-700"
          value={formData.billing_cycle}
          onChange={handleChange}
        >
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
          <option value="Weekly">Weekly</option>
          <option value="Quarterly">Every 3 months</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Status</label>
        <select
          name="billing_cycle"
          className="w-full p-2 rounded bg-slate-700"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Paused">Paused</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Free Trial */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="free_trial"
          checked={formData.free_trial}
          onChange={handleChange}
          className="h-4 w-4"
        />
        <label className="text-sm font-medium">Free Trial</label>
      </div>

      {/* Remind Before */}
      <div>
        <label className="block mb-1 text-sm font-medium">Remind Before</label>
        <select
          name="remind_before"
          className="w-full p-2 rounded bg-slate-700"
          value={formData.remind_before}
          onChange={handleChange}
        >
          <option value="1_day">1 day before</option>
          <option value="3_days">3 days before</option>
          <option value="7_days">7 days before</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded font-medium"
      >
        {loading ? "Saving..." : "Save Subscription"}
      </button>
    </form>
  );
}
