# AIRTEL DECEMBER CASH BONANZA 2026

> **Live Promotional Campaign & Administrative Management System**
>
> Official telecommunications promotional rewards campaign platform. Featuring four USD cash prize categories, live subscriber verification, and a protected administrative control dashboard.

---

## 🌟 Overview

**Airtel December Cash Bonanza 2026** is a modern, responsive telecommunications promotional web platform built with Airtel-inspired branding. The application showcases four festive cash reward tiers denominated in USD starting from $500 up to $200,000, a dynamic Christmas countdown timer (closing December 25, 2026), a transparent three-step participation guide, a verified winners showcase, an interactive FAQ knowledge base, subscriber lead capture, and a protected administrative control dashboard.

---

## 🎨 Branding & Design System

- **Primary Color:** Airtel Red (`#E60000`)
- **Secondary Color:** Pure White (`#FFFFFF`)
- **Accent Color:** Festive Gold (`#FFD700`, with amber accents `#F59E0B`)
- **Dark Text:** `#202020`
- **Surface Background:** Clean neutral tone (`#FAFAFA` / `#F5F5F5`)

---

## 🎁 Prize Categories (USD)

1. **Card 1: Instant Cash Rewards**
   - Prize range: **$500 – $1,000 USD**
   - Description: *"Exciting instant cash reward opportunities."*
   - Action: `EXPLORE REWARDS`
2. **Card 2: Daily Cash Rewards**
   - Prize range: **$1,000 – $5,000 USD**
   - Description: *"Discover exciting daily reward opportunities."*
   - Action: `VIEW DAILY PRIZES`
3. **Card 3: Weekly Cash Rewards**
   - Prize range: **$5,000 – $10,000 USD**
   - Description: *"Celebrate the week with exciting cash prizes."*
   - Action: `VIEW WEEKLY PRIZES`
4. **Card 4: Grand Prize**
   - Prize range: **$50,000 – $200,000 USD**
   - Description: *"Discover the ultimate December grand prize."*
   - Action: `VIEW GRAND PRIZE`
   - Announcement & Disbursement: **December 25, 2026 (Christmas Day)**

---

## 📱 Phone Leads Capture
- Clicking **Explore Cash Rewards** prompts visitors to enter their mobile number.
- Numbers automatically start with their selected country dial code (e.g. `+254`, `+234`, `+256`, `+233`, `+260`, `+255`, `+250`, `+243`).
- All leads are recorded in real time and displayed in the Admin Dashboard (`/admin`) under **Phone Leads** with CSV export.

---

## 🧭 How It Works (Strict 3-Step Compliance)

- **STEP 1:** Discover the promotion.
- **STEP 2:** Review the official participation requirements.
- **STEP 3:** Follow the authorized participation process and check verified winner announcements.

*Security Notice:* Airtel will **NEVER** request passwords, Airtel Money PINs, One-Time Passwords (OTPs), or upfront participation fees.

---

## 🏆 Verified Winners Showcase

- Displays: Winner Name, Country, Prize Category, Prize Amount in USD, Date Announced, Reference Code
- Clear `DEMO DATA` badge on all preview records
- Built-in category filters and live search
- Verification disclaimer establishing that only audited, authorized winners are recognized

---

## ⏳ Dynamic December Countdown

- Real-time countdown clock tracking: **Days, Hours, Minutes, Seconds**
- Calculates dynamically against the **administrator-configured closing date**
- Automatically switches to a *"Campaign Concluded"* state when the date passes

---

## 🛡️ Protected Administrative Dashboard (`/admin`)

- **Secure Authentication:** Server-side JWT session authorization with bcrypt-hashed passwords.
- **Campaign Settings:**
  - Edit campaign title, headlines, subheadlines, and badge text
  - Modify start date and closing date/time (countdown target)
  - Toggle live publication status (`Published` / `Draft Mode`)
  - Enable/disable top promotional disclaimer banner
- **Reward Categories Manager:**
  - Update prize amounts (enforced $\ge \$100$ USD)
  - Edit descriptions, draw frequencies, and button text
  - Enable or disable individual prize tiers
- **Verified Winners Manager:**
  - Add new verified winner entries
  - Edit or delete existing winners
  - Toggle demonstration markers
- **FAQ Manager:**
  - Add, edit, and delete questions and answers
- **Content Editor:**
  - Update Terms & Conditions and Privacy Policy markdown text
- **Banner Theme Selector:**
  - Select active promotional banner themes
- **Demo Reset:**
  - One-click reset to restore the baseline demo dataset

### Default Admin Credentials (Configured in `.env`):
- **Username:** `admin`
- **Password:** `AirtelBonanza2026!`

---

## 🛠️ Technology Stack

- **Frontend:**
  - React 19
  - Vite
  - TypeScript
  - Tailwind CSS
  - Lucide React Icons
  - Canvas Confetti
  - React Router DOM v7
- **Backend:**
  - Node.js
  - Express
  - JSON Web Tokens (`jsonwebtoken`)
  - Password Hashing (`bcryptjs`)
  - CORS, Dotenv
- **Data Store:**
  - Atomic persistent JSON store (`server/data/store.json`) with auto-seeding

---

## 🚀 Running the Project

### 1. Start the Production Server (Client + API):
\`\`\`bash
npm run build
npm start
\`\`\`
Visit: `http://localhost:5000`

### 2. Development Mode (Hot Reload):
\`\`\`bash
# Run both client (port 3000) and backend (port 5000) concurrently:
npm run dev
\`\`\`

---

## 🗺️ Required Routes

- `/` — Homepage Hero, Countdown, Rewards, How It Works, Winners, FAQs
- `/rewards` — Cash Rewards Detailed Explorer
- `/winners` — Verified Winners Showcase with Search and Filters
- `/how-it-works` — How It Works (3-step guide & anti-fraud advisory)
- `/faq` — Expandable Categorized FAQs
- `/terms` — Terms and Conditions
- `/privacy` — Subscriber Data Privacy Policy
- `/admin` — Protected Admin Control Dashboard

