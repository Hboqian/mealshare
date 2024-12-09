export const BASE_URL = "http://18.227.161.136:5000/api";

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error: ${response.status}`);
  }
  return response.json();
}

export async function fetchMealEvents() {
  const res = await fetch(`${BASE_URL}/meal-events`, {
    method: 'GET'
  });
  return handleResponse(res);
}

export async function createMealEvent(eventData) {
  const res = await fetch(`${BASE_URL}/meal-events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  });
  return handleResponse(res);
}

export async function joinMealEvent(eventId, userId) {
  const res = await fetch(`${BASE_URL}/meal-events/${eventId}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({user_id: userId})
  });
  return handleResponse(res);
}

export async function fetchEventMessages(eventId) {
  const res = await fetch(`${BASE_URL}/meal-events/${eventId}/messages`, {
    method: 'GET'
  });
  return handleResponse(res);
}

export async function sendEventMessage(eventId, senderId, content) {
  const res = await fetch(`${BASE_URL}/meal-events/${eventId}/messages`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({sender_id: senderId, content})
  });
  return handleResponse(res);
}

export async function getUserEvents(userId) {
  const res = await fetch(`${BASE_URL}/users/${userId}/events`, {
    method: 'GET'
  });
  return handleResponse(res);
}

export async function fetchDiningHalls() {
  const res = await fetch(`${BASE_URL}/dining-halls`, {
    method: 'GET'
  });
  return handleResponse(res);
}

export async function leaveMealEvent(eventId, userId) {
  const res = await fetch(`${BASE_URL}/meal-events/${eventId}/leave`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({user_id: userId})
  });
  return handleResponse(res);
}
