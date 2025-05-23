# AI-Powered Portfolio Website

## Project Description

This is a modern, responsive portfolio website built with React, Vite, and TypeScript. It features multiple sections to showcase work and skills, including a services overview, portfolio items, an about me section, and a contact form. A key feature is the integrated AI-powered chatbot that utilizes Anthropic's Claude 3 model for interactive conversations. The application also supports internationalization.

## Key Features

*   **Responsive Design:** Built with Tailwind CSS for a seamless experience across all devices.
*   **Multiple Sections:** Includes Hero, Services, Portfolio, About, and Contact sections.
*   **AI Chatbot Integration:** Features a chatbot powered by Anthropic's Claude 3 model for engaging user interaction.
*   **Internationalization (i18n):** Supports multiple languages (English, Spanish, Portuguese) using `i18next`.
*   **Contact Form:** Integrated with EmailJS for direct messaging.
*   **Smooth Animations:** Utilizes Framer Motion for UI animations.
*   **Modern Tech Stack:** Leverages Vite, React, and TypeScript for a fast and robust development experience.

## Tech Stack

*   **Frontend:**
    *   Vite
    *   React
    *   TypeScript
    *   Tailwind CSS
    *   i18next & react-i18next (for internationalization)
    *   Framer Motion (for animations)
    *   Lucide React (for icons)
    *   EmailJS (for client-side email sending)
*   **Backend:**
    *   Node.js
    *   Express.js
    *   Anthropic AI SDK (for Claude 3 integration)
*   **Development Tools:**
    *   ESLint (for code linting)
    *   ts-node (for running TypeScript server directly)

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

*   Node.js (v18.x or later recommended)
*   npm (comes with Node.js) or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
    *(Replace `<repository-url>` with the actual URL and `<repository-directory>` with the project's root folder name)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    *(Or `yarn install` if you prefer yarn)*

3.  **Set up Environment Variables:**
    *   Create a `.env` file in the root of the project by copying the example file:
        ```bash
        cp .env.example .env
        ```
    *   Update the `.env` file with your actual credentials and settings:
        *   `VITE_ANTHROPIC_API_KEY`: Your API key for the Anthropic (Claude) service.
        *   `VITE_EMAILJS_PUBLIC_KEY`: Your Public Key from EmailJS.
        *   `VITE_EMAILJS_SERVICE_ID`: Your Service ID from EmailJS.
        *   `VITE_EMAILJS_TEMPLATE_ID`: Your Template ID from EmailJS.
        *   `PORT`: (Optional) The port for the backend server (defaults to 3000 if not set).

### Running the Application

1.  **Start the backend server:**
    Open a terminal and run:
    ```bash
    npm run server
    ```
    The server will typically run on `http://localhost:3000` (or the port specified in your `.env`).

2.  **Start the frontend development server:**
    Open another terminal and run:
    ```bash
    npm run dev
    ```
    The frontend application will usually be available at `http://localhost:5173`.

### Building for Production

To create a production build:
```bash
npm run build
```
The optimized static assets will be placed in the `dist` directory.

### Previewing the Production Build

To serve the production build locally for testing:
```bash
npm run preview
```

## Linting

This project uses ESLint for code quality and consistency. To run the linter:

```bash
npm run lint
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to fix a bug, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature` or `bugfix/YourBugfix`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.

*(This is a general guideline. You might want to add more specific instructions or a Code of Conduct if this project becomes more collaborative.)*

## License

This project is currently not licensed.

*(Consider adding an open-source license if you intend for others to use, modify, or distribute this code. Common choices include MIT License, Apache License 2.0, or GPLv3. You would typically add a `LICENSE` file to the root of your project and link to it here.)*
