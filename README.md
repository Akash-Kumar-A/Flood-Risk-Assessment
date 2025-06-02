# 🌊 Flood Risk Management System

A modular web application to assist district-level emergency response teams, NGOs, and government officials in visualizing and planning around potential flood risks. This project includes a **React-based frontend**, a **Node.js backend**, and GIS-based mapping tools.

---

## 🧱 Project Structure
Flood-Risk-Management/
│
├── frontend/ # React.js user interface
├── backend/ # Express.js backend API
├── prompts/ # All AI prompts used during development
├── package.json # Node.js metadata
└── README.md # Project documentation

---

## 🔧 Technologies Used

| Layer       | Tools/Frameworks          |
|-------------|---------------------------|
| Frontend    | React.js                  |
| Backend     | Node.js                   |
| Map/GIS     | OpenStreetMap             |
| Storage     | JSON                      |

---

## 🚀 Getting Started

### 🧰 Prerequisites

- Node.js (v16+ recommended)
- npm

### 📦 Installation Steps

```bash
# Clone the repository
git clone <your-private-repo-url>
cd Flood-Risk-Management

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
▶️ Running the Application

# Start backend
cd backend
npm start

# Start frontend
cd ../frontend
npm start

Access the app in your browser at:
➡️ http://localhost:3000

🌍 Features
Interactive flood risk map using Leaflet

Role-based UI ready (Field Staff, Command Center, Officials)

Prompts saved for reproducibility and evaluation

GIS-based data rendering for affected regions

🧠 AI Prompt Documentation
All prompts used in the development process (via ChatGPT & Claude.ai) are located in:
/prompts/ai_prompts.md

This ensures transparency and reproducibility of AI-assisted development.

