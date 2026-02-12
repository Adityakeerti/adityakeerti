# Adityakeerti — Developer Portfolio

Personal portfolio showcasing projects, experience, hackathon wins, and technical skills.

## Tech Stack

| Layer    | Technology                     |
|----------|--------------------------------|
| Frontend | React 19, Vite, Framer Motion  |
| Backend  | Python, FastAPI, Uvicorn       |
| Styling  | Vanilla CSS (glassmorphism, custom cursor, matrix loader) |

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+

### Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**

## Production Build
```bash
cd frontend
npm run build
```

Output goes to `frontend/dist/`.

## Project Structure
```
Work Portfolio/
├── backend/
│   ├── main.py              # FastAPI server
│   ├── requirements.txt
│   └── data/                # JSON data files
│       ├── about.json
│       ├── projects.json
│       ├── skills.json
│       ├── experience.json
│       └── achievements.json
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── public/
│   │   └── favicon.svg
│   └── src/
│       ├── App.jsx           # Main app + loader + cursor
│       ├── main.jsx
│       ├── index.css         # Complete design system
│       └── components/
│           ├── Navbar.jsx
│           ├── Hero.jsx
│           ├── Projects.jsx
│           ├── Experience.jsx
│           ├── Achievements.jsx
│           ├── Skills.jsx
│           └── Contact.jsx
└── .gitignore
```

## License
MIT
