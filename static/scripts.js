//document.addEventListener('DOMContentLoaded', fetchPopularExams);
//
//async function fetchPopularExams() {
//    const popularExamsList = document.getElementById('popular-exams-list');
//    const response = await fetch('/popular-exams');
//    const popularExams = await response.json();
//
//    popularExams.forEach(exam => {
//        const li = document.createElement('li');
//        li.textContent = exam.name;
//        popularExamsList.appendChild(li);
//    });
//}
//
//async function searchExams() {
//    const query = document.getElementById('main-search').value;
//    const resultsList = document.getElementById('search-results');
//    resultsList.innerHTML = '';
//
//    const response = await fetch(`/search?query=${query}`);
//    const results = await response.json();
//
//    results.forEach(result => {
//        const li = document.createElement('li');
//        const a = document.createElement('a');
//        a.href = result.url;
//        a.textContent = result.name;
//        li.appendChild(a);
//        resultsList.appendChild(li);
//    });
//}
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
    fetch(`/api/exams?q=${encodeURIComponent(query)}`)
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

