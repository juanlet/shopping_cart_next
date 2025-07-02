# Promotional Shopping Cart System 🛒

A high-quality shopping cart system built with Next.js, featuring dynamic promotional rules, tiered pricing for different user types, and a comprehensive automated test suite.

This project is designed to demonstrate a clean, scalable, and professional front-end architecture ready for a real-world e-commerce application.

---

## ✨ Key Features

-   **Dynamic "3 for 2" Promotion**: The system automatically discounts the lowest-priced item for every three products added to the cart.
-   **Exclusive VIP Discount**: A flat 15% discount is available for VIP customers.
-   **Smart Recommendation Engine**: Automatically calculates and applies the best deal for VIP customers, comparing the "3 for 2" promotion against their VIP discount.
-   **Full-Featured Shopping Cart**: Users can add, remove, and clear items with a real-time price calculation.
-   **Comprehensive Test Suite**: Over **80% code coverage** using Jest and React Testing Library, ensuring reliability and maintainability.
-   **Modern & Responsive UI**: A clean user interface built with the latest version of Tailwind CSS.

---

## 🛠️ Tech Stack

-   **Framework**: Next.js 15+ (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS v4
-   **State Management**: Redux Toolkit
-   **Testing**: Jest & React Testing Library
-   **Icons**: Lucide React

---

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### **Prerequisites**

-   Node.js (v18.x or later)
-   `npm` or `yarn`

### **Installation**

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/nextjs-shopping-cart.git](https://github.com/your-username/nextjs-shopping-cart.git)
    cd nextjs-shopping-cart
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

This project includes several scripts to streamline development and testing:

| Script             | Description                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| `npm run dev`      | Starts the development server with hot-reloading.                        |
| `npm run build`    | Creates a production-ready build of the application.                     |
| `npm run start`    | Starts the production server (requires `build` to be run first).         |
| `npm test`         | Runs the entire test suite in watch mode.                                |
| `npm run test:coverage` | Runs all tests and generates a detailed code coverage report.       |
| `npm run lint`     | Lints the codebase to check for errors and style issues.                 |


---

## 🧪 Testing

This project is equipped with a robust test suite to ensure quality.

### **Running Tests**
To run all unit and component tests in watch mode and with a complete code coverate report, use:
```bash
npm test
```

After running, a `coverage/` directory will be created. Open the `lcov-report/index.html` file in that directory to view a detailed, interactive report of test coverage across the entire application.