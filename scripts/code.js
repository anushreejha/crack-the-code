// Initialize CodeMirror
const codeMirror = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    mode: "javascript",
    theme: "default"
});

// Sample problems
const problems = [
    {
        title: "Reverse a String",
        description: "Given a string, return it reversed.",
        examples: [
            { input: '"hello"', output: '"olleh"' },
            { input: '"world"', output: '"dlrow"' }
        ],
        constraints: "The input string will have at most 1000 characters.",
        reference: "https://example.com/problem1"
    },
    // Add more problems as needed
];

let currentProblemIndex = 0;

function loadProblem(index) {
    const problem = problems[index];
    document.getElementById("problem-title").innerText = `Problem ${index + 1}: ${problem.title}`;
    document.getElementById("problem-description").innerText = problem.description;
    const examplesList = problem.examples.map(example => `<li>Input: ${example.input} → Output: ${example.output}</li>`).join('');
    document.getElementById("examples-list").innerHTML = examplesList;
    document.getElementById("problem-constraints").innerText = problem.constraints;
}

document.getElementById("prev-question").addEventListener("click", () => {
    if (currentProblemIndex > 0) {
        currentProblemIndex--;
        loadProblem(currentProblemIndex);
    }
});

document.getElementById("next-question").addEventListener("click", () => {
    if (currentProblemIndex < problems.length - 1) {
        currentProblemIndex++;
        loadProblem(currentProblemIndex);
    }
});

// Compile button functionality
document.getElementById("compile-button").addEventListener("click", () => {
    const code = codeMirror.getValue();
    const language = document.getElementById("language-select").value; // Get selected language
    let output;

    try {
        if (language === "javascript") {
            output = eval(code); // Execute JavaScript code
        } else if (language === "python") {
            // Simulate Python execution (you can use a library like Brython for real execution)
            output = "Python execution not supported in this demo.";
        }
    } catch (error) {
        output = error.message; // Capture any errors
    }

    document.getElementById("output").textContent = output;
});

// Load the first problem on page load
loadProblem(currentProblemIndex);
 