import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Bell, Settings, CreditCard, Plus, Zap } from "lucide-react";
import SubscriptionsList from "./SubscriptionList";

export default function TracartHomepage() {
  const [activeSubscriptions, setActiveSubscriptions] = useState(0);
  const [totalYearly, setTotalYearly] = useState("₹0.00");
  const [orbitAngle, setOrbitAngle] = useState(0);

  // Animate orbit continuously
  useEffect(() => {
    const timer = setInterval(() => {
      setOrbitAngle((prev) => (prev + 0.2) % 360);
    }, 50);

    return () => clearInterval(timer);
  }, []);

  // Create orbital dots based on active subscriptions
  const createOrbitalDots = () => {
    const dots = [];
    const radius = 120;

    for (let i = 0; i < Math.max(3, activeSubscriptions); i++) {
      const angle = (360 / Math.max(3, activeSubscriptions)) * i + orbitAngle;
      const x = radius * Math.cos((angle * Math.PI) / 180);
      const y = radius * Math.sin((angle * Math.PI) / 180);

      const colors = [
        "bg-red-500",
        "bg-green-500",
        "bg-blue-500",
        "bg-yellow-500",
        "bg-pink-500",
        "bg-purple-500",
      ];
      const color = colors[i % colors.length];

      dots.push(
        <motion.div
          key={i}
          className={`absolute w-4 h-4 rounded-full ${color} flex items-center justify-center`}
          style={{ x, y }}
          whileHover={{ scale: 1.5 }}
        >
          <motion.div
            className="w-3 h-3 rounded-full bg-white"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        </motion.div>
      );
    }
    return dots;
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white font-medium">
      {/* Header */}
      <div className="pt-3 px-7 flex justify-between items-center">
        <h1 className="text-2xl font-black text-current">tracart</h1>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full bg-slate-800"
        >
          <Settings size={25} />
        </motion.button>
      </div>

      {/* Orbital Visualization */}
      <div className="relative w-full aspect-square max-h-80 flex items-center justify-center my-4">
        <motion.div
          className="absolute w-4/5 h-4/5 rounded-full border border-purple-500 opacity-20"
          style={{ transform: `rotate(${orbitAngle}deg)` }}
        />
        <motion.div
          className="absolute w-3/5 h-3/5 rounded-full border border-purple-500 opacity-30"
          style={{ transform: `rotate(${-orbitAngle * 1.5}deg)` }}
        />
        <motion.div
          className="absolute w-2/5 h-2/5 rounded-full border border-purple-500 opacity-40"
          style={{ transform: `rotate(${orbitAngle * 2}deg)` }}
        />

        {/* Center Orb */}
        <motion.div
          className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400"
          animate={{
            boxShadow: [
              "0 0 20px 0px rgba(236, 72, 153, 0.7)",
              "0 0 25px 5px rgba(236, 72, 153, 0.8)",
              "0 0 20px 0px rgba(236, 72, 153, 0.7)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Dynamic Subscription Indicators */}
        {createOrbitalDots()}
      </div>

      {/* Stats */}
      <div className="flex justify-between px-8 pb-4">
        <div className="text-center">
          <motion.div
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {activeSubscriptions}
          </motion.div>
          <div className="text-slate-400 text-sm">Active</div>
        </div>
        <div className="text-center">
          <motion.div
            className="text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {totalYearly}
          </motion.div>
          <div className="text-slate-400 text-sm">Yearly Cost</div>
        </div>
      </div>

      {/* Subscription List */}
      <SubscriptionsList
        setActiveSubscriptions={setActiveSubscriptions}
        setTotalYearly={setTotalYearly}
      />

      {/* Bottom Navigation */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 py-4 px-6 z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <div className="flex justify-around">
          <motion.button
            className="flex flex-col items-center text-purple-500"
            whileTap={{ scale: 0.9 }}
          >
            <CreditCard size={24} />
            <span className="text-xs mt-1">Subscriptions</span>
          </motion.button>
          <motion.button
            className="flex flex-col items-center text-slate-500"
            whileTap={{ scale: 0.9 }}
          >
            <Bell size={24} />
            <span className="text-xs mt-1">Alerts</span>
          </motion.button>
          <motion.button
            className="flex flex-col items-center text-slate-500"
            whileTap={{ scale: 0.9 }}
          >
            <Calendar size={24} />
            <span className="text-xs mt-1">Calendar</span>
          </motion.button>
          <motion.button
            className="flex flex-col items-center text-slate-500"
            whileTap={{ scale: 0.9 }}
          >
            <Settings size={24} />
            <span className="text-xs mt-1">Settings</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
