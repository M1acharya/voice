import json
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow frontend to access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

CONFIG_FILE = "config.json"

def read_config():
    if not os.path.exists(CONFIG_FILE):
        return {}
    with open(CONFIG_FILE, "r") as f:
        return json.load(f)

def write_config(data):
    with open(CONFIG_FILE, "w") as f:
        json.dump(data, f, indent=2)

class PromptUpdate(BaseModel):
    system_prompt: str
    end_condition: str

class ApiKeyUpdate(BaseModel):
    openai: str
    livekit: str
    sarvam: str

class AdminUpdate(BaseModel):
    username: str
    password: str

@app.get("/api/config")
def get_config():
    return read_config()

@app.post("/api/config/prompt")
def update_prompt(data: PromptUpdate):
    config = read_config()
    config["system_prompt"] = data.system_prompt
    config["end_condition"] = data.end_condition
    write_config(config)
    return {"status": "success", "message": "Prompt updated successfully"}

@app.post("/api/config/apikeys")
def update_apikeys(data: ApiKeyUpdate):
    config = read_config()
    if "api_keys" not in config:
        config["api_keys"] = {}
    config["api_keys"]["openai"] = data.openai
    config["api_keys"]["livekit"] = data.livekit
    config["api_keys"]["sarvam"] = data.sarvam
    write_config(config)
    return {"status": "success", "message": "API keys updated successfully"}

@app.post("/api/config/admin")
def update_admin(data: AdminUpdate):
    config = read_config()
    if "admin" not in config:
        config["admin"] = {}
    config["admin"]["username"] = data.username
    config["admin"]["password"] = data.password
    write_config(config)
    return {"status": "success", "message": "Admin credentials updated successfully"}
