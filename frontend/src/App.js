

import React, { useState } from 'react';

const bgImage = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';
const currencyOptions = ['USD', 'EUR', 'INR', 'GBP', 'JPY'];
const groupTypeOptions = ['solo', 'couple', 'family', 'friends'];
const preferenceOptions = ['culture', 'food', 'adventure', 'relaxation', 'nightlife', 'family-friendly'];


export default function App() {
    const [budget, setBudget] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [duration, setDuration] = useState('');
    const [startDate, setStartDate] = useState('');
    const [preferences, setPreferences] = useState([]);
    const [groupType, setGroupType] = useState('solo');
    const [groupSize, setGroupSize] = useState('1');
    const [constraints, setConstraints] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8000/generate-itinerary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    budget,
                    currency,
                    duration,
                    startDate,
                    preferences: preferences.join(', '),
                    groupType,
                    groupSize,
                    constraints
                })
            });
            if (!response.ok) throw new Error('Failed to fetch itinerary');
            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError('Could not generate itinerary. Please check your backend and try again.');
        }
        setLoading(false);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${bgImage}) center/cover no-repeat`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Segoe UI, Arial, sans-serif'
        }}>
            <div style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: 16,
                boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                padding: 32,
                maxWidth: 420,
                width: '100%'
            }}>
                <img src={bgImage} alt="Travel" style={{ width: '100%', borderRadius: 12, marginBottom: 16 }} />
                <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#2d3e50' }}>AI Trip Planner</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <input placeholder="Budget" value={budget} onChange={e => setBudget(e.target.value)} type="number" style={inputStyle} />
                    <select value={currency} onChange={e => setCurrency(e.target.value)} style={inputStyle}>
                        {currencyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <input placeholder="Trip Duration (days)" value={duration} onChange={e => setDuration(e.target.value)} type="number" style={inputStyle} />
                    <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        style={inputStyle}
                    />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {preferenceOptions.map(opt => (
                            <label key={opt} style={{ fontSize: 14 }}>
                                <input
                                    type="checkbox"
                                    checked={preferences.includes(opt)}
                                    onChange={e => {
                                        if (e.target.checked) setPreferences([...preferences, opt]);
                                        else setPreferences(preferences.filter(p => p !== opt));
                                    }}
                                    style={{ marginRight: 4 }}
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                    <select value={groupType} onChange={e => setGroupType(e.target.value)} style={inputStyle}>
                        {groupTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <input placeholder="Group Size" value={groupSize} onChange={e => setGroupSize(e.target.value)} type="number" style={inputStyle} />
                    <input placeholder="Constraints (diet, accessibility)" value={constraints} onChange={e => setConstraints(e.target.value)} style={inputStyle} />
                    <button onClick={handleSubmit} style={buttonStyle} disabled={loading}>
                        {loading ? 'Generating...' : 'Generate Itinerary'}
                    </button>
                    {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
                </div>
                {result && (
                    <div style={{ background: '#f0f6fa', padding: 16, borderRadius: 10, marginTop: 24 }}>
                        <strong style={{ color: '#2d3e50' }}>Itinerary:</strong>
                        <ul style={{ paddingLeft: 20 }}>
                            {Array.isArray(result.itinerary) ? result.itinerary.map((item, idx) => (
                                <li key={idx} style={{ marginBottom: 8 }}>
                                    <span style={{ fontWeight: 'bold', color: '#3a7ca5' }}>Day {item.day}:</span> {item.activity} <span style={{ color: '#7a7a7a' }}>(${item.cost})</span>
                                </li>
                            )) : <li>{JSON.stringify(result.itinerary)}</li>}
                        </ul>
                        {result.recommended_activities && result.recommended_activities.activities && (
                            <div style={{ marginTop: 12 }}>
                                <strong style={{ color: '#2d3e50' }}>Recommended Activities:</strong>
                                <ul style={{ paddingLeft: 20 }}>
                                    {result.recommended_activities.activities.map((act, idx) => (
                                        <li key={idx} style={{ color: '#3a7ca5' }}>{act}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

const inputStyle = {
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid #cfd8dc',
    fontSize: 16,
    outline: 'none',
    background: '#f7fafc'
};

const buttonStyle = {
    padding: '12px',
    borderRadius: 8,
    border: 'none',
    background: 'linear-gradient(90deg,#3a7ca5,#2d3e50)',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    cursor: 'pointer',
    marginTop: 8
};
