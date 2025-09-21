-- Database schema for user profiles, trips, itinerary
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    start_date DATE,
    end_date DATE,
    budget NUMERIC
);

CREATE TABLE itinerary (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER REFERENCES trips(id),
    day INTEGER,
    activity VARCHAR(255),
    cost NUMERIC
);
