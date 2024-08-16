# Chatter

Welcome to **Chatter**, a modern blogging platform inspired by Medium. Chatter is designed to provide a seamless writing and reading experience, allowing users to share their thoughts, stories, and knowledge with the world.

This project is developed as part of my capstone project for Altschool.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication**: Sign up, log in, and manage your profile. Users can sign in with email/password or social providers like Google and Facebook.
- **Post Creation and Editing**: Write, edit, and publish articles with an easy-to-use editor.
- **Image Upload**: Add images to your posts for better engagement.
- **Follow Users**: Follow other users to keep up with their latest posts.
- **Like and Comment**: Engage with posts by liking and commenting.
- **Responsive Design**: A fully responsive design that works across desktops, tablets, and mobile devices.
- **Search Functionality**: Easily find articles or users through a robust search feature.

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, vite
- **Backend**: Firebase Authentication, Firestore Database, Firebase Storage
- **Deployment**: Netlify

## Installation

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase account

### Steps

1. **Clone the repository**

   `git clone https://github.com/your-username/chatter.git`
   `cd chatter`

2. **Install dependencies**

Using npm:

3. **Create a new Firebase project at the Firebase Console.**

- Enable Firebase Authentication (Email/Password, Google, and Facebook providers).
- Enable Firestore Database.
- Enable Firebase Storage for image uploads.
- Copy your Firebase config and add it to the .env file (details in the Environment Variables section).

4. **Environment Variables**

Create a .env file at the root of the project and add your Firebase configuration:

````REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id```

5. **Run the project**

Using npm:
`npm run dev`

The app should now be running on http://localhost:5173.

## Usage

- **Sign Up** and **Log In**: Create a new account or log in with an existing account.
- **Create** and **Edit Posts**: Use the editor to write new posts or edit existing ones.
- **Explore** and **Interact**: Browse through posts, follow other users, like and comment on posts.
- **Profile Management**: Update your bio, profile picture, and other account details.

## Folder Structure

Here is an overview of the project's folder structure:

```chatter/
│
├── public/
│ ├── index.html
│ └── ...
│
├── src/
│ ├── assets/ # Images, fonts, etc.
│ ├── components/ # Reusable components
│ ├── context/ # React context providers
│ ├── firebase/ # Firebase configuration
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # Main pages (Home, Profile, Post, etc.)
│ ├── utils/ # Utility functions and helpers
│ ├── App.tsx # Main App component
│ └── index.tsx # Entry point of the application
│
├── .env # Environment variables
├── .gitignore # Git ignore file
├── package.json # Project dependencies and scripts
├── tailwind.config.js # TailwindCSS configuration
└── tsconfig.json # TypeScript configuration
````

## Deployment

The project is deployed on Netlify. To deploy your version:

Connect the repository to Netlify

Go to the Netlify Dashboard and click "New site from Git".
Connect your GitHub repository containing this project.
Configure build settings

Set the build command to vite build
Set the publish directory to build.
Add environment variables

In your site's settings on Netlify, add the environment variables from your .env file.
Deploy the site

Netlify will automatically build and deploy your site.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any inquiries, please reach out via email at akbenngold@example.com.

This Markdown file provides detailed instructions and information about your project, making it easier for others to understand, use, and contribute to it.
