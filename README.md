# Searchbar Debouncing Project Suite

This repository contains a small collection of interactive Next.js applications built using the `app` directory and modern React patterns. The intent is to demonstrate multiple frontend features, including webcam capture, calculator logic, and nested comment interactions.

## Projects Included

### Camera / Webcam Application

- File: `src/app/camera/page.tsx`
- Uses `react-webcam` to render a live webcam feed in the browser.
- Supports capturing a photo and displaying a preview immediately after capture.
- Includes a retry workflow so users can retake the photo if needed.
- Implements a hydration-safe render by delaying the webcam component until the client is mounted.

### Calculator Application

- File: `src/app/calculator/page.tsx`
- Implements a simple calculator UI with digits and arithmetic operators.
- Uses `mathjs` for expression evaluation and result calculation.
- Stores input expression and output separately for clear user feedback.
- Includes responsive button interactions and a focused visual layout.

### Nested Comment Application

- File: `src/app/comment/page.tsx`
- Implements a basic comment system with nested reply support.
- Allows users to add a top-level comment and reply to individual comments.
- Uses local component state to manage comments, replies, and active reply forms.
- Presents replies in a nested structure for clarity.

### Search Application

- File: `src/app/search/page.tsx`
- Currently an empty placeholder file.
- Intended as a future location for a debounced search bar or search-related feature.

### Root Application

- File: `src/app/page.tsx`
- Contains the default landing page with a minimal welcome message.
- Acts as the application entry point for the Next.js `app` router.

## Running the Project

To start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser to view the application.

## Notes

- This repository is built on Next.js with TypeScript support.
- The app uses Tailwind CSS for styling and layout.
- Additional project pages may be added under `src/app` as separate features.
