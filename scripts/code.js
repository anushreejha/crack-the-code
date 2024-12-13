const RAPIDAPI_KEY = '3c0ff122aemsh4334aacc701864fp125f27jsn851347e2201a'; // Your RapidAPI key

async function fetchWithRetry(url, options, retries = 5) {
    for (let i = 0; i < retries; i++) {
        const response = await fetch(url, options);
        if (response.ok) {
            return response;
        }
        if (response.status === 429) {
            const waitTime = Math.pow(2, i) * 1000; // Exponential backoff
            console.warn(`Rate limit exceeded. Retrying in ${waitTime / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }
    throw new Error('Max retries reached');
}

// Run code function
document.getElementById("run-button").addEventListener("click", async function() {
    const sourceCode = document.getElementById("code").value;
    const languageId = {
        javascript: 63, // JavaScript
        python: 71,     // Python
        c: 48           // C
    }[document.getElementById("language-select").value];

    try {
        // Create a submission
        const submissionResponse = await fetchWithRetry('https://judge0-ce.p.rapidapi.com/submissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-key': '3c0ff122aemsh4334aacc701864fp125f27jsn851347e2201a', // Use the API key here
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
            },
            body: JSON.stringify({
                source_code: sourceCode,
                language_id: languageId,
                stdin: '',
                expected_output: ''
            })
        });

        const submissionData = await submissionResponse.json();
        const token = submissionData.token; // Get the token for the submission

        // Check the submission result
        const resultResponse = await fetchWithRetry(`https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY, // Use the API key here
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
            }
        });

        const resultData = await resultResponse.json();
        document.getElementById("output").textContent = resultData.stdout || resultData.stderr || 'No output';
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("output").textContent = 'Error: ' + error.message;
    }
});
 