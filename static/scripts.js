document.addEventListener("DOMContentLoaded", () => {
    fetchExams("");
});

function searchExam() {
    const input = document.getElementById("examInput").value.toLowerCase();
    fetchExams(input);
}

function searchExamHeader() {
    const input = document.getElementById("headerExamInput").value.toLowerCase();
    fetchExams(input);
}

function fetchExams(query) {
    fetch(`exam-syllabi-finder-backend-code-production.up.railway.app/api/exams?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(exams => {
            const examList = document.getElementById("examList");
            examList.innerHTML = '';
            exams.forEach(exam => {
                const li = document.createElement("li");
                li.textContent = exam.name;
                li.onclick = () => redirectToSyllabus(exam.url);
                examList.appendChild(li);
            });

            // Update the popular exams list as well
            const popularExamsList = document.getElementById("examList");
            popularExamsList.innerHTML = '';
            exams.forEach(exam => {
                const li = document.createElement("li");
                li.textContent = exam.name;
                li.onclick = () => redirectToSyllabus(exam.url);
                popularExamsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching exams:', error));
}

function redirectToSyllabus(url) {
    window.location.href = url;
}

