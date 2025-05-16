# Project Idea: Tracart (a subscription tracker)

Deployed Backend Server: https://s62-tejas-capstone-tracart.onrender.com/

Deployed Frontend Server: https://s62-tejas-capstone-tracart.netlify.app/

## Problem Statement:

1.  Users often forget about their subscriptions, leading to unnecessary charges.
2.  Managing multiple subscriptions with different billing cycles can be overwhelming.
3.  Existing apps often lack engaging visual designs and timely reminders.

## Technical Analysis:

**MongoDB**:

1.  Store user profiles, subscription details, and payment cycles.
2.  Manage reminder schedules and notification logs.
3.  Track subscription history and analytics.

**Express/Node.js:**

1.  Handle authentication and authorization.
2.  API endpoints for CRUD operations on subscriptions.
3.  Integrate Redis for caching reminders and optimizing performance.
4.  Configure SMS/email notification services (e.g., Twilio, Nodemailer).

**React:**

1. Create an interactive and visually appealing user interface.
2. Implement real-time subscription updates.
3. Design a dynamic dashboard for managing subscriptions.

**Redis:**

1. Cache reminders to ensure timely notifications.
2. Enhance response times for frequently accessed data.

**Tailwind CSS:**

1.  Provide a clean and responsive design.
2.  Add animations for visual appeal.

**Additional Tools and Services:**

1. Twilio/Nodemailer: For SMS and email reminders.
2. Day.js: For date and time handling.
3. Framer Motion: To create smooth animations.
4. Chart.js/D3.js: For subscription analytics and visualizations.

And additional tools if required.

**Core Features:**

**User Management:**

1. User registration and login.
2. Profile setup to input default notification preferences (SMS or email).

**Subscription Management:**

1. Add, edit, or delete subscriptions.
2. Define billing frequency (weekly, monthly, yearly).
3. Set reminders for 1 week, 3 days, or 1 day before due dates.

**Notification System:**

1. Send SMS/email reminders.
2. Maintain a notification history.

**Dashboard:**

1. View all subscriptions at a glance.
2. Filter subscriptions by billing cycle or status (active/inactive).

**Advanced Features (Future Scope):**

1. Budget Tracking: Suggest budget limits based on user’s total subscription costs.
2. Family Sharing: Allow multiple users to share and manage subscriptions.
3. AI Insights: Use machine learning to suggest subscriptions to cancel or optimize.
4. Mobile App: Develop a mobile version with push notifications.
5. Dark Mode: Enhance UI experience with a dark mode option.

## Development Phases:

**Phase 1 (2 weeks):**

1. User authentication and profile setup.
2. Basic subscription management (CRUD operations).
3. Simple dashboard with animations.
4. Email/SMS notification system.

**Phase 2 (2 weeks):**

1. Advanced filtering and sorting for subscriptions.
2. Interactive analytics with Chart.js/D3.js.
3. Enhanced animations with Framer Motion.
4. Responsive design with Tailwind CSS.

**Phase 3 (3 weeks):**

1. Budget tracking and insights.
2. Integration with third-party APIs (e.g., bank subscriptions).
3. Mobile-friendly version.

## Technical Considerations:

**Database Design-**

**Collections:**

1. Users: {name, email, phone, password, preferences}
2. Subscriptions: {name, cost, type, frequency, nextBillingDate, userID}
3. Notifications: {subscriptionID, date, status (sent/pending)}
4. (and additional things will be added as application development continues.)

**API Structure:**

1. /api/auth - Authentication endpoints.
2. /api/users - User profile management.
3. /api/subscriptions - CRUD operations for subscriptions.
4. /api/notifications - Manage reminders and logs.
5. (and additional things will be added as application development continues.)

**Frontend Components:**

1. Navigation and Layout: User-friendly design for seamless navigation.
2. Dashboard: Fluid Animated visualization of subscriptions.
3. Forms: Intuitive forms for adding/editing subscriptions.
4. Notification Settings: Toggle between SMS and email reminders.
5. Analytics: Visual representation of total spending and subscription trends.

This project is:

1. Technical: Leverages advanced full-stack tools.
2. Challenging: Encourages solving real-world problems with scalable solutions.
3. Practical: Helps users save money and stay organized.
