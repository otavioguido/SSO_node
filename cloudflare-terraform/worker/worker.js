addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    // Retrieve secrets from KV
    const backendUrl = await MY_KV.get("BACKEND_URL");
    const token = await MY_KV.get("API_TOKEN");

    if (!backendUrl || !token) {
        return new Response("Secrets not found in KV", { status: 500 });
    }

    // Use these values in your logic
    return fetch(`${backendUrl}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}
