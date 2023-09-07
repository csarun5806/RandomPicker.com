document.addEventListener("DOMContentLoaded", () => {
    const candidateForm = document.getElementById("candidateForm");
    const resultDiv = document.getElementById("result");

    candidateForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        resultDiv.innerHTML = ""; // Clear previous result

        const fileInput = document.getElementById("file");
        const file = fileInput.files[0];

        if (!file) {
            alert("Please select an Excel file.");
            return;
        }

        const formData = new FormData();
        formData.append("excelFile", file);

        try {
            const response = await fetch("/pickRandomCandidate", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Server error");
            }

            const data = await response.json();
            if (data.candidate) {
                const { earn_points, earn_date, first_name, mobile } = data.candidate;
                resultDiv.innerHTML = `
                    <h2>Selected Candidate</h2>
                    <p><strong>earn_points:</strong> ${earn_points}</p>
                    <p><strong>earn_date:</strong> ${earn_date}</p>
                    <p><strong>first_name:</strong> ${first_name}</p>
                    <p><strong>mobile:</strong> ${mobile}</p>
                `;
            } else {
                resultDiv.innerHTML = "<p>No candidates found in the Excel file.</p>";
            }
        } catch (error) {
            console.error(error);
            resultDiv.innerHTML = "<p>An error occurred. Please try again.</p>";
        }
    });
});
