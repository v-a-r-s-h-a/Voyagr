# Entry point for backend (FastAPI)

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow frontend to connect (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TripRequest(BaseModel):
    budget: str
    currency: str
    duration: str
    startDate: str
    preferences: str
    groupType: str
    groupSize: str
    constraints: str

@app.get("/")
def root():
    return {"message": "Trip Planner Backend Running"}

from .ai_service import generate_itinerary

@app.post("/generate-itinerary")
async def generate_itinerary_endpoint(request: TripRequest):
    user_profile = request.dict()
    trip_params = request.dict()
    result = generate_itinerary(user_profile, trip_params)
    return result
