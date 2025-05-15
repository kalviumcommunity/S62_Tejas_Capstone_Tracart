import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SubscriptionForm from "./Subscriptionform";
import { useAuth } from "../context/AuthContext";
import {
  Calendar,
  Bell,
  Settings,
  CreditCard,
  Plus,
  ChevronRight,
  Zap,
} from "lucide-react";
import axios from "axios";
import { format, differenceInDays } from "date-fns";
import SubscriptionUpdateForm from "./SubscriptionUpdateForm";

export default function SubscriptionsList({
  setIsModalOpen,
  setActiveSubscriptions,
}) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [reload, setReload] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editSubscription, setEditSubscription] = useState({});
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const { logout, user } = useAuth();

  const calculateNextRenewDate = (startDate, billingCycle) => {
    const baseDate = new Date(startDate);
    let nextDate = new Date(baseDate);

    switch (billingCycle.toLowerCase()) {
      case "monthly":
        nextDate.setMonth(baseDate.getMonth() + 1);
        break;
      case "yearly":
        nextDate.setFullYear(baseDate.getFullYear() + 1);
        break;
      case "weekly":
        nextDate.setDate(baseDate.getDate() + 7);
        break;
      case "every 3 month":
        nextDate.setMonth(baseDate.getMonth() + 3);
        break;
      default:
        break;
    }

    return nextDate;
  };

  useEffect(() => {
    const colors = [
      "bg-red-600",
      "bg-green-500",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-pink-600",
      "bg-purple-500",
      "bg-orange-500",
    ];
    const icons = ["🔴", "🟢", "🔵", "🟡", "🟣", "🟠"];

    const fetchSubscriptions = async () => {
      const token = localStorage.getItem("auth_token");
      console.log("TOKEN", token);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/subscriptions`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(res.data.data);

        const subs = res.data.data.map((sub, index) => {
          const renewDate = calculateNextRenewDate(
            sub.start_date,
            sub.billing_cycle
          );
          return {
            id: sub._id,
            name: sub.service_name,
            service_name: sub.service_name,
            icon: icons[index % icons.length],
            currency: sub.currency,
            status: sub.status,
            start_date: sub.start_date.substring(0, 10),
            color: colors[index % colors.length],
            price: `${sub.currency === "INR" ? "₹" : ""}${sub.cost.toFixed(2)}`,
            cost: parseInt(sub.cost),
            billing_cycle: sub.billing_cycle,
            category: sub.billing_cycle.toLowerCase(),
            renewsIn: differenceInDays(renewDate, new Date()),
            renewDate: format(renewDate, "dd MMM yyyy"),
          };
        });
        setActiveSubscriptions(subs.length);
        setSubscriptions(subs);
      } catch (error) {
        console.error("Error fetching subscriptions", error);
      }
    };

    fetchSubscriptions();
  }, [reload]);

  return (
    <div className="px-6 pb-32">
      <AnimatePresence>
        {subscriptions.map((sub) => (
          <motion.div
            onClick={(e) => {
              setEditSubscription(sub);
              setIsUpdateModalOpen(true);
            }}
            key={sub.id}
            // onClick={}
            className="bg-slate-800 rounded-xl mb-3 p-4 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div
              className={`w-10 h-10 rounded-full ${sub.color} flex items-center justify-center mr-4 text-lg`}
            >
              {sub.icon}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{sub.name}</div>
              <div className="text-xs text-slate-400">
                Renews in {sub.renewsIn} days • {sub.renewDate}
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">{sub.price}</div>
              <ChevronRight size={16} className="ml-auto mt-1 text-slate-400" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add New Subscription Button */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus size={20} className="mr-2" />
        Add Subscription
      </motion.button>

      <motion.button
        onClick={() => logout(true)}
        className="mt-4 w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Logout
      </motion.button>
      <AnimatePresence>
        {isUpdateModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Creative Backdrop */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-pink-800/60 to-slate-900/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal Card */}
            <motion.div
              className="relative bg-slate-900 border border-purple-600/30 rounded-2xl w-full max-w-md p-6 shadow-xl shadow-purple-900/40"
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
            >
              <SubscriptionUpdateForm
                onSuccess={() => {
                  setIsUpdateModalOpen(false);
                  setReload((prev) => !prev);
                }}
                subscriptionBase={editSubscription}
                // setFormData={setEditSubscription}
              />

              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="mt-4 w-full text-sm text-slate-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
