# 🎓 AI Course Generator (Premium Edition)

A beautifully designed, AI-powered personalized course generator that creates structured learning paths based on user input. This platform utilizes the latest **Azure OpenAI (GPT-4o)** models to generate comprehensive curriculums and integrates the **YouTube Data API** to dynamically supplement courses with curated video content.

Recently overhauled with a stunning **Glassmorphic UI**, an intelligent **Gamified Reward System**, and robust **AI Image Generation placeholders**, this project guarantees a rich, engaging, and premium educational experience.

## 🚀 Key Features & Upgrades

- ✨ **Azure OpenAI Powered Generation**: Fully migrated to the cutting-edge **Azure OpenAI** service, natively generating multi-chapter course layouts, deep modular content, localized translations, and rigorous quizzes!
- 🏆 **Gamified Reward System**: Built-in progression tracking! Users earn **+100 Points** directly to their profile upon completing a course.
- 🛡️ **Watch-Time Enforcement**: Built-in logic using the custom YouTube Player API prevents points hoarding by requiring users to watch at least **50% of a video** before they can mark a chapter as completed.
- 📺 **Curated YouTube Integrations**: Automatically fetches and embeds the most relevant educational YouTube videos per chapter, uniquely configured to disable distracting cross-channel suggestions limit (`rel=0`).
- 💅 **Premium Aesthetic UI**: Rebuilt with modern, responsive **Glassmorphism**, floating layout grids, smooth Tailwind animations, and ambient background gradients.
- 🖼️ **Dynamic AI Cover Images**: Uses the **AI Guru Lab API** to generate targeted course thumbnails. Features a bulletproof fallback engine using **Pollinations.ai** and gorgeous native DOM gradients if external image limits are reached.
- 🔐 **Authentication**: Seamless, secure auth state management handled natively by **Clerk**.

---

## 🧠 How It Works

1. **User Input / Search**: Learners enter their desired topic, level of experience, and learning preferences.
2. **Azure OpenAI Processing**: GPT-4o dynamically orchestrates a highly-tailored course syllabus.
3. **Thumbnail Generation**: AI actively generates a customized 16:9 3D-illustration thumbnail representing the curriculum.
4. **YouTube Aggregation**: The system algorithms fetch the most highly-rated, highly-relevant educational videos per module.
5. **Interactive Dashboard**: Learners navigate a clean, beautifully styled dashboard tracking their progress, managing course completion, and pooling their total Reward Points.

---

## 🛠️ Complete Tech Stack

| Tech            | Description                                 |
|-----------------|---------------------------------------------|
| **Next.js 15**  | React framework for fast Server-Side rendering & custom API routes |
| **React 18**    | Declarative UI Component Library            |
| **Tailwind v4** | Utility-first CSS powering the aesthetic and animations |
| **Neon DB**     | Hyper-scalable Serverless PostgreSQL Database |
| **Drizzle ORM** | Lightning-fast, type-safe database queries & migrations |
| **Azure OpenAI**| The core "Brain" powering the course content generation |
| **YouTube API** | Fetching and embedding premium video content |
| **Clerk**       | Fully-managed User Authentication and metadata handling |

---

## 🧪 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/DeepakdevilB/AI_Course_Generator.git
cd AI-course-generator
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environmental Variables
Create a local `.env` file in the root of your project and configure the required keys:

```env
# Clerk Authentication Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Neon Database Configuration (PostgreSQL)
DATABASE_URL=
NEXT_PUBLIC_DATABASE_URL=

# Azure OpenAI Configuration (Core AI Engine)
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_VERSION=2023-05-15
AZURE_OPENAI_DEPLOYMENT=gpt-4o-mini # Change if your target deployment differs

# External Generative APIs
AI_GURU_LAB_API=
YOUTUBE_API_KEY=

```

### 4. Push Database Schema (Drizzle ORM)
Ensure your Neon PostgreSQL connection string is correct, then sync the DB.
```bash
npx drizzle-kit push
```

### 5. Run the Local Development Server
```bash
npm run dev
```

Your premium AI Course application will now be running on [http://localhost:3000](http://localhost:3000)!
