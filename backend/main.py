from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import json

app = FastAPI(title="Aditya Keerti Portfolio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = Path(__file__).parent / "data"


def load_json(filename: str):
    with open(DATA_DIR / filename, "r", encoding="utf-8") as f:
        return json.load(f)


@app.get("/api/about")
def get_about():
    return load_json("about.json")


@app.get("/api/projects")
def get_projects():
    return load_json("projects.json")


@app.get("/api/skills")
def get_skills():
    return load_json("skills.json")


@app.get("/api/experience")
def get_experience():
    return load_json("experience.json")


@app.get("/api/achievements")
def get_achievements():
    return load_json("achievements.json")


@app.get("/api/health")
def health():
    return {"status": "ok"}
