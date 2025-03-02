# Visual Viewport Test

Testing [visualViewport](https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport) API for iOS virtual keyboard resizing.

This monorepo contains two projects built with Vite and TypeScript:

## The Problem

When the virtual keyboard is opened on iOS, the whole page is pushed up and some part of the page is hidden. This behavior sometimes are not desired, especially when the page is a single-page application.

<p align="center">
  <img src="./assets/without-visualViewport.gif" alt="without-visualViewport" width="30%">
</p>

## The Solution

The `visualViewport` API provides information about the visual viewport of a window. It can be used to detect the virtual keyboard resizing and adjust the layout accordingly.

<p align="center">
  <img src="./assets/with-visualViewport.gif" alt="with-visualViewport" width="30%">
</p>

## The Research

This issue involves the following aspects:

- ### Determining the Remaining Viewport Height

  To calculate the available viewport height when the keyboard is open, we use `visualViewport.height`. This approach is more reliable than `window.innerHeight`, which can behave inconsistently depending on the input field's position.

  If the input field is near the bottom of the screen, `window.innerHeight` decreases when the keyboard appears. However, if the input is further from the bottom, `window.innerHeight` may remain unchanged or change only slightly.

- ### Detecting Keyboard Visibility on iOS

  - #### **First Attempt: Comparing `window.innerHeight` with `visualViewport.height`**

    The initial approach was to detect the keyboard state by checking whether `window.innerHeight` is greater than `visualViewport.height`. If so, the keyboard is considered open.

    This method worked well when the input field wasn't near the bottom of the screen. However, if the input was positioned close to the bottom, `window.innerHeight` would also decrease, making it nearly equal to `visualViewport.height`, reducing reliability.

  - #### **Current Approach: Using `document.activeElement` and `visualViewport.height` Comparison**

    Since comparing `window.innerHeight` and `visualViewport.height` proved unreliable due to input position variability, we now detect keyboard state by comparing `document.activeElement` is current `input`. We then compare the initial `visualViewport.height` with its current value to determine if the keyboard has opened or closed.

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
