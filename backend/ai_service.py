# AI logic for itinerary generation


import requests
from google.cloud import aiplatform
from google.auth import default

def generate_itinerary_gemini(user_profile, trip_params):
    # Example Gemini API call (pseudo-code)
    # Replace with actual Gemini endpoint and authentication
    url = "https://gemini.googleapis.com/v1/generateItinerary"
    headers = {"Authorization": "Bearer YOUR_TOKEN"}
    payload = {"userProfile": user_profile, "tripParams": trip_params}
    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        return {"error": str(e)}

def recommend_activities_vertex(location, preferences):
    # Example Vertex AI endpoint call (pseudo-code)
    endpoint = "projects/YOUR_PROJECT/locations/YOUR_LOCATION/endpoints/YOUR_ENDPOINT"
    instance = {"location": location, "preferences": preferences}
    # Use google-cloud-aiplatform for real calls
    # aiplatform.init(project="YOUR_PROJECT", location="YOUR_LOCATION")
    # prediction = aiplatform.Endpoint(endpoint).predict([instance])
    # return prediction
    return {"activities": ["Sample Activity 1", "Sample Activity 2"]}

def generate_itinerary(user_profile, trip_params):
    # Use Gemini for itinerary generation
    itinerary = generate_itinerary_gemini(user_profile, trip_params)
    # Optionally enrich with Vertex AI recommendations
    activities = recommend_activities_vertex(trip_params.get("destination", ""), user_profile.get("preferences", ""))
    return {"itinerary": itinerary, "recommended_activities": activities}

# def generate_itinerary(user_profile, trip_params):
#     # Mock response for development
#     return {
#         "itinerary": [
#             {"day": 1, "activity": "Arrive, check-in hotel, city walk", "cost": 100},
#             {"day": 2, "activity": "Museum visit, local food tour", "cost": 80},
#             {"day": 3, "activity": "Adventure activity, dinner", "cost": 120}
#         ]
#     }
