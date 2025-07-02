# Promotional Shopping Cart System 🛒

A high-quality shopping cart system built with Next.js, featuring dynamic promotional rules, tiered pricing for different user types, and a comprehensive automated test suite.

This project is designed to demonstrate a clean, scalable, and professional front-end architecture ready for a real-world e-commerce application.

---

### ##  Architecture & Design Decisions

The following decisions were made to ensure a robust and maintainable application.

* **Next.js (App Router)**
    I chose **Next.js** as the core framework, specifically utilizing the **App Router**. This provides a powerful, integrated environment for both the front-end and back-end. API Routes (Route Handlers) allow to build a secure, server-side API within the same project, which is essential for pricing logic.

* **TypeScript**
    The entire codebase is written in **TypeScript**. For an application with complex business rules, type safety is non-negotiable. TypeScript catches errors during development, not in production, and makes the code self-documenting and easier to refactor.

* **Server-Side Business Logic**
    All critical calculations (promotions, discounts, and final pricing) are handled exclusively on the server-side via the `/api/cart/calculate` endpoint. This is a crucial security measure that prevents any possibility of client-side price manipulation and ensures that the business rules are the single source of truth. 

    NOTE: In a production environment that endpoint would have been protected by an authentication middleware to check for a jwt token or any other authentication solution, but since it was not specified on the exercise I skipped it

* **State Management with Redux Toolkit**
    I chose **Redux Toolkit** for managing the client-side state of the shopping cart. It provides a scalable and predictable state container. Its "slice" pattern reduces boilerplate, and its integration with Redux DevTools offers powerful debugging capabilities, making it ideal for an application that could grow in complexity.

* **Multi-Layered Testing Strategy**
    I implemented a comprehensive test suite with over 90% coverage using **Jest** and **React Testing Library**. My strategy includes Unit Tests for pure logic, Integration Tests for the API route, and Component Tests that simulate real user interaction. This multi-layered approach provides maximum confidence in the application's reliability.

* **Utility-First Styling with Tailwind CSS**
    The user interface is built with **Tailwind CSS**. Its utility-first approach allows for rapid development and ensures design consistency. The `tailwind.config.ts` file provides a centralized place to manage the design system, making it easy to customize and maintain the look and feel.

---

## ✨ Key Features

-   **Dynamic "3 for 2" Promotion**: The system automatically discounts the lowest-priced item for every three products added to the cart.
-   **Exclusive VIP Discount**: A flat 15% discount is available for VIP customers.
-   **Smart Recommendation Engine**: Automatically calculates and applies the best deal for VIP customers, comparing the "3 for 2" promotion against their VIP discount.
-   **Full-Featured Shopping Cart**: Users can add, remove, and clear items with a real-time price calculation.
-   **Comprehensive Test Suite**: Over **90% code coverage** using Jest and React Testing Library, ensuring reliability and maintainability.
-   **Modern & Responsive UI**: A clean user interface built with the latest version of Tailwind CSS.

---

## 🛠️ Tech Stack

-   **Framework**: Next.js 15+ (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS v4
-   **State Management**: Redux Toolkit
-   **Testing**: Jest & React Testing Library

---

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### **Prerequisites**

-   Node.js (v18.x or later)
-   `npm`

### **Installation**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/juanlet/shopping_cart_next
    cd shopping_cart_next
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
| `npm test`         | Runs the entire test with code coverage report                           |
| `npm run lint`     | Lints the codebase to check for errors and style issues.                 |


---

## 🧪 Testing

This project is equipped with a robust test suite to ensure quality.

### **Running Tests**
To run all unit and component tests with a complete code coverate report, use:
```bash
npm test
```

After running, a `coverage/` directory will be created. Open the `lcov-report/index.html` file in that directory to view a detailed, interactive report of test coverage across the entire application.