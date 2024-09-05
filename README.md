# Project Description

This is a superlab interview assessment project which involves implementing a visually appealing and interactive coin collection game. Users tap the screen to generate coins, which animate realistically using the `@react-spring/web` library. The game tracks points earned and allows users to spend points on upgrades like increased coin collection speed and additional coin slots.

## Installation and Setup

1. **Prerequisites:**

   - Node.js and yarn installed on your system.
     (if you have node and you dont have yarn simply type
     ```
     npm install -g yarn
     ```
     )

2. **Clone or Download the Project:**

   - Obtain the project code from github by cloning or downloading the zip file.

3. **Install Dependencies:**

   - Navigate to the project directory in your terminal and run:

     ```bash
      yarn install
     ```

**Running the Application**

1. **Start the Development Server:**

   - In your terminal, run:

     ```bash
     # yarn dev
     ```

   - This will start the development server, typically running at `http://localhost:3000`.

2. **Open the Application:**
   - Open the provided URL (`http://localhost:3000`) in your web browser.

## Key Features

- **Coin Animation:** Coins are animated using `useSpring` from `@react-spring/web`, creating a smooth and engaging experience.
- **Point System:** Users earn points for collecting coins.
- **Upgrade System:** Users can spend points to buy speed boosts (reducing the time between coin generation) and additional coin slots (increasing the maximum number of coins on screen).
- **Toast Notifications:** The `useToast` hook is used to display feedback messages to users, such as successful upgrades or insufficient points.
- **Local Storage:** Game state (points, speed, and max coins) is saved to and loaded from local storage for persistence.
- **Responsive Design:** The application adjusts its layout based on screen size using `useEffect` for a pleasant experience on various devices.
- **Drawer Menu:** A visually appealing bottom drawer provides access to upgrade options. The drawer animation is handled by `useSpring`.
- **Interactive Elements:** Users can tap the screen to generate coins and interact with the drawer menu for upgrades.

## Code Breakdown

**CoinAnimation.tsx**

- **Imports:**

  - `debounce` from `lodash` is used for debounced saving of game state to localStorage.
  - `useSpring` and `animated` from `@react-spring/web` are used for animation.
  - `useState` and `useEffect` from React for state management and side effects.
  - `Icon` from `@iconify/react` for displaying icons.
  - `useToast` from `@/components/Toast/ToastContext` for toast notifications.

- **Coin Interface:**

  - Defines an interface `CoinProps` to type coins with properties `x` (horizontal position), `y` (vertical position), and `id` (unique identifier).

- **Coin Component:**

  - Takes `x` and `y` props as input.
  - Uses `useSpring` to animate the coin's position from off-screen (`top: -50px`) to the provided `y` coordinate.
  - Renders an `animated.div` with the animated style and a coin icon (`🪙`).

- **CoinAnimation Function Component:**

  - Manages the game state:
    - `totalPoints`: Number of points earned (default 0).
    - `maxCoins`: Maximum number of coins allowed on screen (default 100).
    - `rechargingSpeed`: Time between coin generation in milliseconds (default 15000).
    - `coins`: Array of coin objects with `x`, `y`, and `id` properties.
    - `screenDimensions`: Object containing `width` and `height` of the screen (initially 0, updated on resize).
    - `isRemovingCoins`: Boolean flag indicating whether coins are currently being removed (initially false).
    - `isDrawerOpen`: Boolean flag indicating whether the upgrade drawer is open (initially false).

- **Handle Drawer Functions:**

  - `handleOpenDrawer`: Opens the upgrade drawer (sets `isDrawerOpen` to true).
  - `handleCloseDrawer`: Closes the upgrade drawer (sets `isDrawerOpen` to false).
