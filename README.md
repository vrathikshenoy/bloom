# 🌸 Bloom

**Bloom** is a full-stack web application combining a Flask backend with a Next.js frontend. The project is organized into two main directories:

* `flask/` – Contains the Flask backend application.
* `jas/` – Contains the Next.js frontend application.

---

## 🚀 Project Structure

```
bloom/
├── flask/       # Flask backend
│   ├── app.py
│   ├── requirements.txt
│   └── ...
├── jas/         # Next.js frontend
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── ...
└── README.md
```

---

## 🧰 Prerequisites

Ensure you have the following installed:

* **Python 3.12+** and **pip**
* **Node.js 15** and **npm**
* **pnpm** (optional, for faster frontend dependency management)

To install `pnpm` globally:

```bash
npm install -g pnpm
```

---

## ⚙️ Backend Setup (Flask)

1. Navigate to the `flask` directory:

   ```bash
   cd flask
   ```

2. (Optional) Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask application:

   ```bash
   flask run
   ```

   By default, the backend will be accessible at `http://localhost:5000`.

---

## 🎨 Frontend Setup (Next.js)

1. Navigate to the `jas` directory:

   ```bash
   cd jas
   ```

2. Install the frontend dependencies:

   ```bash
   pnpm install  # If pnpm is installed
   # or
   npm install   # If pnpm is not installed
   ```

3. Start the Next.js development server:

   ```bash
   pnpm dev  # If using pnpm
   # or
   npm run dev  # If using npm
   ```

   The frontend will be accessible at `http://localhost:3000`.

---

## 🔗 Connecting Frontend and Backend

Ensure both the Flask backend and Next.js frontend servers are running concurrently:

* Flask backend: `http://localhost:5000`
* Next.js frontend: `http://localhost:3000`

Configure API requests in the frontend to target the backend's base URL (`http://localhost:5000`). You can manage environment variables in the `jas/.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

This setup allows the frontend to communicate seamlessly with the backend API.

---

## 📂 Folder Overview

* **`flask/`**: Contains the Flask application, including routes, models, and configurations.
* **`jas/`**: Contains the Next.js application, including pages, components, and styles.

---



## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this `README.md` further to suit your project's specific needs.
