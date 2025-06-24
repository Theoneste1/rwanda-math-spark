
# Rwanda Mathematics Olympiad Website

A comprehensive website for the Rwanda Mathematics Olympiad program, showcasing our mission to identify and nurture Rwanda's top mathematics talent through rigorous competition and comprehensive training programs.

## New Competition Platform Features

🎯 **Competition System**: Full-featured mathematics competition platform with:
- User authentication and profiles
- Problem creation with LaTeX math support
- Filtering by topic, difficulty, and privacy
- Comments and answers system
- Reaction system (likes, upvotes, etc.)
- Real-time updates

## Project Info

**URL**: https://lovable.dev/projects/16ba45a9-b89e-4d2a-b3d2-53be5413b814

## Technologies Used

This project is built with:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router for navigation
- React Query for data fetching
- **Supabase** for backend (database, auth, real-time)
- **KaTeX** for LaTeX math rendering
- **React Hot Toast** for notifications

## Setup Instructions

### Prerequisites
- Node.js & npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Supabase account ([create free account](https://supabase.com))

### 1. Clone and Install

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install
```

### 2. Supabase Setup

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)

2. **Run the database schema**:
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the content from `supabase-schema.sql`
   - Execute the script to create all tables and policies

3. **Get your environment variables**:
   - Go to Project Settings > API
   - Copy your Project URL and anon/public key

### 3. Environment Variables

```sh
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start Development

```sh
# Start the development server
npm run dev
```

## Competition Platform Usage

### For Users:
1. **Sign Up/Login**: Create an account to participate
2. **Browse Problems**: Filter by topic, difficulty, and privacy
3. **Create Problems**: Share new math problems with the community
4. **Solve & Discuss**: Add answers and comments to problems
5. **React**: Like, upvote, or react to content

### For Administrators:
- All problems are user-generated
- Use Row Level Security for content moderation
- Monitor through Supabase dashboard

## Database Schema

### Tables:
- **users**: Extended user profiles
- **problems**: Math problems with LaTeX support
- **comments**: Nested comment system
- **answers**: Solution submissions
- **reactions**: Like/upvote system

### Key Features:
- **Row Level Security**: Automatic authorization
- **Real-time subscriptions**: Live updates
- **Soft deletes**: Problems marked as deleted
- **Nested comments**: Threaded discussions

## Deployment on Netlify

### Option 1: Connect GitHub Repository (Recommended)

1. Push your code to a GitHub repository
2. Go to [Netlify](https://netlify.com) and sign up/login
3. Click "New site from Git"
4. Connect your GitHub account and select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. **Add environment variables** in Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
7. Click "Deploy site"

### Option 2: Manual Deploy

1. Build your project locally:
   ```sh
   npm run build
   ```
2. Go to [Netlify](https://netlify.com)
3. Drag and drop the `dist` folder to the deploy area
4. Configure environment variables in site settings

## Features

- **Home Page**: Overview of the Rwanda Mathematics Olympiad
- **About**: Information about our mission and programs
- **Impact**: Statistics and success stories
- **Team**: Meet our dedicated team members
- **Competition Platform**: Full-featured problem solving system
- **Competition Results**: View past competition results
- **Summer Camp**: Manage campers and generate invitation letters
- **Get Involved**: Information for participants and supporters
- **Contact**: Get in touch with the organization

## Project Structure

```
src/
├── components/          # Reusable UI components
├── components/competition/  # Competition-specific components
├── contexts/           # React contexts (Auth)
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions & Supabase config
└── App.tsx             # Main application component
```

## Environment Variables

Required environment variables for the competition platform:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Support

For questions or issues:
1. Check the [Supabase documentation](https://supabase.com/docs)
2. Contact the Rwanda Mathematics Olympiad team through the website
3. Review the database schema in `supabase-schema.sql`

## Development Tips

- Use the Supabase dashboard to monitor database activity
- Test Row Level Security policies thoroughly
- LaTeX math is supported in problem content using KaTeX
- All real-time features use Supabase subscriptions
