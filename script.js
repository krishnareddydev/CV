var typed = new Typed(".text", {
    strings: ["Automation fremwork Developer . . ." , "Python Programmer . . ." , "Web Developer . . ."],
    typeSpeed: 70,
    backSpeed: 50,
    backDelay: 1000,
    loop: true
})

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file first.');
        return;
    }

    const reader = new FileReader();
    
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        displayData(json);
    };

    reader.readAsArrayBuffer(file);
}

// Function to display data in the table
function displayData(data) {
    const dataRows = document.getElementById('dataRows');
    dataRows.innerHTML = ''; // Clear previous data

    data.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        dataRows.appendChild(tr);
    });
}

// Function to search data in the table
function search() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#dataRows tr');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        let found = false;

        cells.forEach(cell => {
            if (cell.textContent.toLowerCase().includes(searchInput)) {
                found = true;
            }
        });

        row.style.display = found ? '' : 'none';
    });
}

// Function to reset the table and search input
function reset() {
    document.getElementById('searchInput').value = '';
    const rows = document.querySelectorAll('#dataRows tr');
    rows.forEach(row => row.style.display = '');
}
