
# Rwanda Mathematics Olympiad Website

A comprehensive website for the Rwanda Mathematics Olympiad program, showcasing our mission to identify and nurture Rwanda's top mathematics talent through rigorous competition and comprehensive training programs.

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

## Local Development

### Prerequisites
- Node.js & npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Setup Instructions

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Deployment on Netlify

### Option 1: Connect GitHub Repository (Recommended)

1. Push your code to a GitHub repository
2. Go to [Netlify](https://netlify.com) and sign up/login
3. Click "New site from Git"
4. Connect your GitHub account and select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

Netlify will automatically:
- Install dependencies
- Build your React app
- Deploy to a custom URL
- Handle React Router redirects (thanks to the `_redirects` file)
- Auto-deploy when you push changes to GitHub

### Option 2: Manual Deploy

1. Build your project locally:
   ```sh
   npm run build
   ```
2. Go to [Netlify](https://netlify.com)
3. Drag and drop the `dist` folder to the deploy area
4. Your site will be live with a random URL

### Custom Domain

To connect a custom domain:
1. Go to your Netlify site dashboard
2. Click "Domain settings"
3. Click "Add custom domain"
4. Follow the DNS configuration instructions

## Features

- **Home Page**: Overview of the Rwanda Mathematics Olympiad
- **About**: Information about our mission and programs
- **Impact**: Statistics and success stories
- **Team**: Meet our dedicated team members
- **Competition Results**: View past competition results
- **Summer Camp**: Manage campers and generate invitation letters
- **Get Involved**: Information for participants and supporters
- **Contact**: Get in touch with the organization

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── App.tsx             # Main application component
```

## Environment Variables

No environment variables are required for basic functionality. The app fetches data from Google Sheets using public URLs.

## Support

For questions or issues, please contact the Rwanda Mathematics Olympiad team through the contact page on the website.
