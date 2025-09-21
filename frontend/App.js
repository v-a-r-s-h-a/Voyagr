import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function App() {
    const [budget, setBudget] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [duration, setDuration] = useState('');
    const [startDate, setStartDate] = useState('');
    const [preferences, setPreferences] = useState('');
    const [groupType, setGroupType] = useState('solo');
    const [groupSize, setGroupSize] = useState('1');
    const [constraints, setConstraints] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        // Send data to backend (replace URL with actual backend endpoint)
        const response = await fetch('http://localhost:8000/generate-itinerary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                budget,
                currency,
                duration,
                startDate,
                preferences,
                groupType,
                groupSize,
                constraints
            })
        });
        const data = await response.json();
        setResult(data);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>AI Trip Planner</Text>
            <TextInput style={styles.input} placeholder="Budget" value={budget} onChangeText={setBudget} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Currency (e.g. USD)" value={currency} onChangeText={setCurrency} />
            <TextInput style={styles.input} placeholder="Trip Duration (days)" value={duration} onChangeText={setDuration} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Start Date (YYYY-MM-DD)" value={startDate} onChangeText={setStartDate} />
            <TextInput style={styles.input} placeholder="Preferences (e.g. food, adventure)" value={preferences} onChangeText={setPreferences} />
            <TextInput style={styles.input} placeholder="Group Type (solo, couple, family, friends)" value={groupType} onChangeText={setGroupType} />
            <TextInput style={styles.input} placeholder="Group Size" value={groupSize} onChangeText={setGroupSize} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Constraints (diet, accessibility)" value={constraints} onChangeText={setConstraints} />
            <Button title="Generate Itinerary" onPress={handleSubmit} />
            {result && (
                <View style={styles.result}>
                    <Text style={styles.resultTitle}>Itinerary:</Text>
                    <Text>{JSON.stringify(result.itinerary, null, 2)}</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
    result: { marginTop: 20, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5 },
    resultTitle: { fontWeight: 'bold', marginBottom: 5 }
});
