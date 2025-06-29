# FitPlan Pro Frontend

Frontend application for FitPlan Pro - AI-powered fitness application built with Next.js 15, React, and TypeScript.

## 🚀 Features

- **Modern Stack** - Next.js 15 with App Router
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **Dark/Light Mode** - Automatic theme detection
- **Responsive Design** - Mobile-first approach
- **AI Integration** - Smart fitness recommendations

## 🛠 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes
- **State Management**: React Hooks
- **Package Manager**: Yarn
- **HTTP Client**: Axios

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Yarn 4.0+

### Installation

\`\`\`bash
cd frontend
yarn install
\`\`\`

### Development

\`\`\`bash
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

\`\`\`bash
yarn build
yarn start
\`\`\`

## 📚 Available Scripts

### Development
\`\`\`bash
yarn dev              # Start development server
yarn build            # Build for production
yarn start            # Start production server
yarn preview          # Build and start (combined)
\`\`\`

### Code Quality
\`\`\`bash
yarn lint             # Run ESLint
yarn lint:fix         # Fix ESLint issues
yarn type-check       # TypeScript type checking
\`\`\`

### Utilities
\`\`\`bash
yarn clean            # Clean build artifacts
\`\`\`

## 📁 Project Structure

\`\`\`
frontend/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard pages
│   │   ├── calendar/      # Calendar page
│   │   ├── calculator/    # Calculator page
│   │   ├── exercises/     # Exercises page
│   │   └── page.tsx       # Dashboard home
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   └── theme-provider.tsx # Theme provider
├── lib/                  # Utility functions
│   └── utils.ts          # Common utilities
├── public/               # Static assets
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
\`\`\`

## 🎨 Design System

### Colors
- **Primary**: Purple gradients (#8B5CF6 to #EC4899)
- **Secondary**: Blue accents (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Font**: Inter (system font)
- **Headings**: Bold weights (600-700)
- **Body**: Regular weight (400)
- **Captions**: Light weight (300)

### Components
- **Cards**: Glassmorphism effect with backdrop blur
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with proper validation
- **Navigation**: Responsive with mobile-first approach

## 🔧 Configuration

### Environment Variables

\`\`\`env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1

# App Configuration
NEXT_PUBLIC_APP_NAME=FitPlan Pro
NEXT_PUBLIC_APP_VERSION=1.0.0
\`\`\`

### Path Aliases

\`\`\`typescript
// tsconfig.json
"paths": {
  "@/*": ["./*"],
  "@/components/*": ["./components/*"],
  "@/app/*": ["./app/*"],
  "@/lib/*": ["./lib/*"],
  "@/hooks/*": ["./hooks/*"],
  "@/types/*": ["./types/*"],
  "@/utils/*": ["./utils/*"]
}
\`\`\`

## 📱 Pages

- **/** - Landing page with hero section and features
- **/dashboard** - Main dashboard with today's workout
- **/dashboard/calendar** - Weekly workout calendar
- **/dashboard/calculator** - Nutrition calculator (BMR/TDEE)
- **/dashboard/exercises** - Exercise library with AI suggestions

## 🎯 Key Features

### 🏠 Landing Page
- Hero section with call-to-action
- Feature showcase
- How it works section
- Responsive design

### 📊 Dashboard
- Today's workout display
- Custom workout creation
- AI workout suggestions
- Weekly overview
- Quick action cards

### 📅 Calendar
- Weekly workout planning
- Exercise scheduling
- Workout difficulty levels
- Progress tracking

### 🧮 Calculator
- BMR/TDEE calculation
- Macronutrient breakdown
- Goal-based recommendations
- Interactive form validation

### 🏋️ Exercises
- Exercise library browsing
- AI-powered suggestions
- Filtering by muscle group/level
- Exercise details and instructions

## 🚀 Deployment

### Vercel (Recommended)

\`\`\`bash
# Install Vercel CLI
yarn global add vercel

# Deploy
vercel --prod
\`\`\`

### Other Platforms
- **Netlify**: Connect GitHub repository
- **Railway**: \`railway up\`
- **DigitalOcean**: App Platform deployment

### Docker Deployment

\`\`\`bash
# Build image
docker build -t fitplan-pro-frontend .

# Run container
docker run -p 3000:3000 fitplan-pro-frontend
\`\`\`

## 🔗 API Integration

### HTTP Client Setup
\`\`\`typescript
// lib/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
\`\`\`

### Authentication
\`\`\`typescript
// Store JWT token
localStorage.setItem('token', response.data.access_token)

// Add to requests
api.defaults.headers.common['Authorization'] = \`Bearer \${token}\`
\`\`\`

## 🎨 Styling Guide

### Tailwind Classes
\`\`\`typescript
// Consistent spacing
className="p-4 m-2 gap-4"

// Color scheme
className="bg-purple-600 text-white"
className="bg-gradient-to-r from-purple-600 to-pink-600"

// Responsive design
className="grid md:grid-cols-2 lg:grid-cols-3"
\`\`\`

### Component Patterns
\`\`\`typescript
// Card component
<Card className="bg-white/80 dark:bg-white/5 backdrop-blur-sm">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>
\`\`\`

## 🧪 Testing

\`\`\`bash
# Component testing (future)
yarn test

# E2E testing (future)
yarn test:e2e

# Visual regression testing (future)
yarn test:visual
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (\`git checkout -b feature/amazing-feature\`)
3. Make your changes
4. Test thoroughly
5. Submit pull request

### Development Workflow
\`\`\`bash
# Install dependencies
yarn install

# Start development
yarn dev

# Type check
yarn type-check

# Lint code
yarn lint:fix

# Build for production
yarn build
\`\`\`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Yarn, Next.js, and TypeScript**
