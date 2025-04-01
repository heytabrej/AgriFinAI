# Agri-App

Agri-App is a comprehensive platform designed to empower Indian farmers by addressing key challenges in agriculture. By leveraging modern technology, the app provides solutions for fair market access, weather predictions, logistics, financial inclusion, and personalized crop advisories. This project integrates design thinking principles to create a user-centric platform that improves productivity, profitability, and sustainability for farmers.

---

## Why This Project Exists

### Our Problem Statement
Indian farmers face a cycle of uncertainty and financial instability due to four key challenges:

1. **Lack of Fair Market Access**: Farmers often sell their produce through middlemen who offer unfair prices, reducing their profit margins.
2. **Unpredictable Weather and Natural Disasters**: Erratic weather patterns and inadequate forecasts lead to poor decision-making in planting, irrigation, and harvesting.
3. **Access to Human Labor and Farm Machinery**: Delays in procuring labor or equipment during critical farming phases directly impact productivity.
4. **Limited Resources**: Farmers lack access to personalized crop advisories, efficient logistics support, and information about government schemes and policies.

These interconnected challenges create a vicious cycle, leaving farmers vulnerable and unable to maximize their productivity and profitability, which in turn affects the nation's food security.

---

## Our Approach

### Design Thinking Process
We adopted the **Design Thinking Process** to create a user-centric solution:

1. **Empathize**: Understand the challenges faced by farmers through sponsor interactions, persona creation, and journey mapping.
2. **Define**: Identify core problems such as fair market access, weather management, logistics, and financial inclusion.
3. **Ideate**: Brainstorm over 100 potential solutions and prioritize them based on feasibility, impact, and innovation.
4. **Prototype**: Develop low-fidelity prototypes and scalable system architecture.
5. **Test**: Validate the solution with real-world users and refine based on feedback.

---

## Key Features

- **Fair Market Access**: Connects farmers directly with retailers to eliminate middlemen and ensure better pricing.
- **Weather Insights**: Provides real-time weather forecasts and disaster alerts to help farmers make informed decisions.
- **Logistics Support**: Offers tools for efficient transportation and storage of produce.
- **Financial Inclusion**: Enables access to credit, subsidies, and insurance through a streamlined process.
- **Personalized Crop Advisories**: AI-driven recommendations for crop selection, pest control, and irrigation planning.
- **Multi-Language Support**: Ensures accessibility for farmers with varying literacy levels by providing regional language options.

---

## Technologies Used

- **Frontend**: React, TailwindCSS, Material Tailwind
- **Backend**: Next.js API routes
- **Database**: MongoDB
- **Cloud Services**: AWS S3 for storage
- **PDF Viewer**: `@react-pdf-viewer` for document viewing
- **Icons**: Heroicons, React Icons, Iconify
- **AI Integration**: AI-driven insights for crop recommendations and pest control

---

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- MongoDB instance
- AWS credentials for S3 integration

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/agri-app.git
   cd agri-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and configure the required environment variables (see [Environment Variables](#environment-variables)).

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Environment Variables

The project requires the following environment variables to be set in a `.env.local` file:

```env
# MongoDB connection string
MONGODB_URI=your-mongodb-uri

# AWS S3 credentials
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-region
AWS_BUCKET_NAME=your-bucket-name

# NextAuth secret
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

---

## Folder Structure

```
agri-app/
├── app/                # Application pages and components
├── public/             # Static assets
├── styles/             # Global styles
├── components/         # Reusable components
├── lib/                # Utility functions and helpers
├── pages/              # Next.js pages
├── api/                # API routes
├── .env.local          # Environment variables
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

---

## Scripts

The following scripts are available in the project:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

---

## Personas and Stakeholders

### Personas
- **Small-Scale Farmer**: Ramesh Kumar
- **Large-Scale Farmer**: Vikram Patel
- **Retail Business Owner**: Anita Sharma
- **Logistics Provider**: Rajesh Gupta
- **Microfinance Officer**: Pooja Verma

### Stakeholders
- Government schemes
- Agricultural ministries
- Farm cooperatives
- Retail buyers
- Agri-universities

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial.

You can also check out [the Next.js GitHub repository](https://github.com/vercel/next.js) for feedback and contributions.

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
