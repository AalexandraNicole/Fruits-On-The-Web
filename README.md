# Fruits-On-The-Web (FrOW)

## Overview

Fruits-On-The-Web (FrOW) is an educational gaming website designed to help users learn about fruits in an engaging way. The application consists of a frontend built with Vanilla JavaScript and a backend powered by Node.js, with data stored in a MongoDB database. It includes various features such as user authentication, gaming functionalities, scoring, and a leaderboard.

### System Context
- **Users**: Interact with the web application through a browser.
- **FrOW (Fruits-On-The-Web)**: The main system providing educational games and content.
- **REST API**: A backend system implemented with Node.js, providing necessary data and functionalities.
- **Database**: A MongoDB database to store user data, game scores, and other relevant information.

### Architectural choices
- **Frontend (Vanilla JS)**: 
  - **Browser**: Runs the frontend code and interacts with users.
- **Backend (Node.js)**: 
  - **REST API**: Handles HTTP requests and business logic.
- **Database (MongoDB)**: Stores persistent data for the application.

### Detailed Design
- **Backend Components**:
  - **Authenticator**: Handles user authentication and authorization.
  - **Game Handlers**: Manages game logic and interactions.
  - **Score Service**: Updates and retrieves game scores.
  - **User Verification Service**: Verifies user information.
  - **Repositories**: Interfaces for database operations for users and scores.
- **Frontend Components**:
  - **Home Page**: Landing page for unlogged users.
  - **Login Page**: User login interface.
  - **Game Page**: Main interface for logged-in users to play games.
  - **Leaderboard Page**: Displays user rankings. Using RSS feed.
  - **Profile Page**: Shows user profile and settings.

### Code
- **Frontend Functions**:
  - `login()`, `register()`, `viewMenu()`, `viewGames()`, `deleteUser()`, `searchUser()`, `contactSend()`, `fillChallenge()`, `fetchNewChallenge()`, `submitGuess()`, `fetchScore()`, `generateQA()`, `fetchProfile()`, `changePassword()`, `updateRanksBox()`, `parseRSSFeed()`.
- **Backend Functions**:
  - **Auth Handler**: Manages authentication processes.
  - **Game Handlers**: Implements game logic.
  - **Score Service**: Handles score updates.
  - **User Verification Service**: Manages user data verification.

## Features

- **User Authentication**: Secure login and registration system.
- **Educational Games**: Interactive games to learn about fruits.
- **Score Tracking**: Keeps track of user scores and progress.
- **Leaderboard**: Displays the top players.
- **Profile Management**: Users can manage their profiles and change settings.

## Installation

### Prerequisites
- Node.js
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/AalexandraNicole/Fruits-On-The-Web.git
   ```
2. Navigate to the backend directory and install dependencies:
  ```bash
  cd backend
  npm install
  ```
3. Start the backend server:
  ```bash
  npm start
  ```
