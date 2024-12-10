# Store Mobile App

A simple, responsive React Native app built with Expo that displays products from a fake store API. It allows users to view products, view more details via a collapsible panel, and load more products with infinite scroll. The app is designed for mobile devices and supports both iOS and Android.

## Features

- **Product List**: Displays a set of 5 products with images and names, and users can tap on a product to reveal more details in a collapsible panel.
- **Collapsible Panel**: Once a product is clicked, additional information about the product is shown in a collapsible panel. A minus sign is displayed to hide the additional details.
- **Infinite Scroll**: More products are loaded as the user scrolls to the bottom of the page.
- **Sort by Category**: Products can be sorted by category (ascending or descending).
- **Lazy Loading**: Product images are lazily loaded to improve performance.

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/jannytechservice/store-mobile-app
   cd store-mobile-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```
   npm start
   ```

The app will start, and you can view it on the emulator or a physical device.

## Available Scripts

- `npm start`: Starts the Expo development server and opens the app in your browser or mobile emulator.
- `npm run android`: Opens the app on an Android emulator or device.
- `npm run ios`: Opens the app on an iOS simulator or device.
- `npm run web`: Opens the app in a web browser.

## Libraries Used

- `React Native`: A framework for building native mobile apps using JavaScript and React.
- `Expo`: A framework and platform for universal React applications.
- `React Native Elements`: A library for pre-built UI components.
- `React Native Reanimated`: For smooth animations and gestures in React Native apps.
- `React Navigation`: For navigation between screens and product details.
- `Axios`: For making HTTP requests to the Fake Store API.
- `React Native Paper`: A library for material design components.
- `React Native Gesture Handler`: A library for handling gestures in React Native.
- `React Native Fast Image`: For improved image performance with caching.
- `TypeScript`: A statically typed superset of JavaScript.
