# Tracking System

A modern tracking system built with React, TypeScript, and Firebase.

## Features

- Real-time tracking updates
- Admin dashboard for managing tracking information
- User-friendly interface
- Responsive design
- Contact form
- About page

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Firebase account

## Setup Instructions

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd tracking-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Configure Firebase:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication and Firestore
   - Copy your Firebase configuration from Project Settings
   - Update the configuration in `src/config/firebase.ts`

5. Start the development server:
   ```bash
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── pages/         # Page components
  ├── config/        # Configuration files
  ├── App.tsx        # Main app component
  └── index.tsx      # Entry point
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Technologies Used

- React
- TypeScript
- Firebase (Authentication & Firestore)
- React Router
- Tailwind CSS
- Headless UI
- Hero Icons

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 