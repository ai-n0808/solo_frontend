# Pokemon Game Review Platform

This is the frontend repository for Pokemon Game Review Platform.

## Table of contents

- [Pokemon Game Review Platform](#pokemon-game-review-platform)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Technology](#technology)
  - [Component](#component)
  - [Installation](#installation)
    - [Clone the Repository](#clone-the-repository)
    - [Install Dependencies](#install-dependencies)
    - [Configure Environment Variables](#configure-environment-variables)
    - [Start the development server](#start-the-development-server)
  - [Endpoints](#endpoints)

## Overview

---

## Features

- **Game List**: Users can add games to their personal library as favorite list.
- **Game Reviews**: Users can add reviews.
- **Favorite Games**: Users can mark certain games as favorites.
- **User Authentication**: Use a basic username/password login, keeping it simple with an option to register or log in. Also protected routes in the backend using Express.js to secure user data.
- **Responsive UI with React**: Simple, clean UI allowing users to quickly add, review. Use TypeScript in React to type the components and enhance reliability.

---

## Technology

- React
- TypeScript

---

## Component

- **App**: The main component that manages user state and renders the login/signup or main application views.
- **Login**: Handles userf login.
- **SignUp**: Handles user registration.
- **LogOut**: Handles user logout.
- **Allgames**: For managing all of the game.
- **Favorite**: For managing your favorite games as list.
- **Header**: Displays header ot top page.
- **Singlegame**: Displays each game and to take you to write your review.
- **Review**:For writing your review.

---

## Installation

### Clone the Repository

Clone this reposirtory in your local machine.

### Install Dependencies

Install the required dependencies.

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project directory and add the following variables.

```env
VITE_API_URL=<your_api_url>
```

### Start the development server

```bash
npm run dev
```

Then open the Application in your browser.

## Endpoints

- POST/ signup : Sign the user up.
- POST/ login : Log the user in.
- POST/ favorites : Mark a Game as Favorite.
- POST/ reviews : Add the user's review.
- GET/ games : Show all of the games for user
- GET/ favorites/:user_id : Get all favorite games for user.
- GET/ /reviews/:game_id : Fetch All Reviews for a Particular Game
- DELETE/ favorites/:id : Remove a Game from Favorites
