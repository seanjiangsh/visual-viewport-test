# Visual Viewport Test

Testing [visualViewport](https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport) API for iOS virtual keyboard resizing.

This monorepo contains two projects built with Vite and TypeScript:

## Live Demo

- [Vanilla JS](https://seanjiangsh.github.io/visual-viewport-test/vanilla)
- [React](https://seanjiangsh.github.io/visual-viewport-test/react)

## Projects

### 1. Vanilla SPA

- **Location:** `packages/vanilla-spa`
- **Description:** A simple single-page application built with vanilla JavaScript and TypeScript.
- **Entry Point:** `src/main.ts`
- **HTML Structure:** `src/index.html`
- **Configuration:**
  - `package.json`: Lists dependencies and scripts.
  - `tsconfig.json`: TypeScript configuration.
  - `vite.config.ts`: Vite configuration.

### 2. React SPA

- **Location:** `packages/react-spa`
- **Description:** A single-page application built with React and TypeScript.
- **Entry Point:** `src/main.tsx`
- **Main Component:** `src/App.tsx`
- **HTML Structure:** `src/index.html`
- **Configuration:**
  - `package.json`: Lists dependencies and scripts.
  - `tsconfig.json`: TypeScript configuration.
  - `vite.config.ts`: Vite configuration.

## Setup Instructions

0. **Make sure you have pnpm installed globally**
   You can install pnpm globally by running the following command:

   ```
    npm install -g pnpm
   ```

1. **Install Dependencies:**
   Run the following command in the root of the monorepo:

   ```
   pnpm install
   ```

2. **Run Projects:**

   - For the Vanilla SPA:
     ```
     cd packages/vanilla-spa
     pnpm dev
     ```
   - For the React SPA:
     ```
     cd packages/react-spa
     pnpm dev
     ```
   - Run all projects:

     ```
     # In the root of the monorepo
     npm run dev
     ```

   - Build all projects:

     ```
     # In the root of the monorepo
     npm run build
     ```
