
# 🛒 বাজার দর | Bazar Dor

### Everyday Market Prices at a Glance 🇧🇩

<p align="center">
  A modern, responsive Bengali market-price tracking platform that helps users explore essential product prices, monitor price changes, and make smarter shopping decisions.
</p>

<p align="center">
  <a href="https://bazar-dor-sable.vercel.app/">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_Website-15803D?style=for-the-badge" alt="Live Demo" />
  </a>
  <a href="https://github.com/mdsakibdev/Bazar-Dor">
    <img src="https://img.shields.io/badge/GitHub-Source_Code-181717?style=for-the-badge&logo=github" alt="GitHub Repository" />
  </a>
</p>

---

## 🖥️ Project Preview

<p align="center">
  <a href="https://bazar-dor-sable.vercel.app/">
    <img
      src="https://i.ibb.co/8DKRgzDB/Screenshot-54.jpg"
      alt="Bazar Dor Homepage Banner Preview"
      width="100%"
    />
  </a>
</p>

<p align="center">
  <em>A clean, Bengali-first interface for exploring everyday market prices.</em>
</p>

<p align="center">
  <a href="https://bazar-dor-sable.vercel.app/">
    <strong>🌐 Explore the Live Website →</strong>
  </a>
</p>

---

## 📖 About the Project

**বাজার দর (Bazar Dor)** is a Bengali-first web application designed to make everyday market prices easier to explore and understand.

Users can browse essential commodities, explore product categories, view price increases and decreases, and access market-price information through a clean and responsive interface.

The project focuses on accessibility, useful price information, and a smooth user experience across desktop, tablet, and mobile devices.

## ✨ Key Features

- 📊 **Market Price Tracking** — Explore prices of everyday essentials.
- 📈 **Price Change Indicators** — Identify products with increasing or decreasing prices.
- 🗂️ **Product Categories** — Browse products by category, such as rice, lentils, oil, vegetables, fish, and meat.
- ↕️ **Price Sorting** — Organize products by price where supported.
- 🏪 **Market Price Information** — Explore available market-level price details.
- 🔐 **User Authentication** — Sign in and create an account using the configured authentication options.
- 👤 **User Profile** — Access profile information and supported account updates.
- 📱 **Responsive Design** — Designed for mobile, tablet, and desktop screens.
- 🇧🇩 **Bengali-First Experience** — A localized interface for Bangladeshi users.
- ⚡ **Modern Web Experience** — Built with reusable components and Next.js App Router.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| React | Building interactive user interfaces |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS | Responsive styling |
| daisyUI | UI components and styling utilities |
| Better Auth | User authentication |
| React Icons | Icons throughout the interface |
| React-Toastify | Toast notifications |
| Cloudflare Workers API | Product and market data integration |
| Vercel | Deployment and hosting |

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/mdsakibdev/Bazar-Dor.git
```

### 2. Navigate to the Project Folder

```bash
cd Bazar-Dor
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root and add the environment variables required by your application.

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
```

Add any API URL or OAuth credentials required by your current project configuration. Use the actual variable names expected by your application.

**Important:** Never commit real API keys, database credentials, or authentication secrets to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```text
Bazar-Dor/
├── public/
├── src/
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

*Note: This is a simplified overview of the main project structure.*

## 🌐 Live Demo

Explore the deployed application:

**Live Website:** https://bazar-dor-sable.vercel.app/

**GitHub Repository:** https://github.com/mdsakibdev/Bazar-Dor

## 🔒 Security

- Keep sensitive environment variables private.
- Store production credentials in the deployment platform's environment settings.
- Never expose database credentials or authentication secrets in client-side code.
- Use environment variables for API configuration where appropriate.

## 🎯 Project Goals

- Make everyday market-price information easier to access.
- Provide a Bengali-first user experience.
- Help users understand price changes.
- Build a responsive and accessible web application.
- Practice modern full-stack development using Next.js and related technologies.

## 👨‍💻 Author

**Abdur Razzak Sakib**  
Full-Stack Web Developer

<p>
  <a href="https://github.com/mdsakibdev">GitHub</a> ·
  <a href="https://www.linkedin.com/in/abdurrazzak1">LinkedIn</a>
</p>

---

<p align="center">
  Made with ❤️ in Bangladesh 🇧🇩
</p>
