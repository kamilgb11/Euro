const sheetId = '1EJxYUQO3-3hcB8d5l6fviggd-cBL2GTI'; // Zamień na swój ID arkusza
const uczestnicy = [
    { name: "Uczestnik 1", img: "path/to/image1.jpg", range: 'B21:Z21' },
    { name: "Uczestnik 2", img: "path/to/image2.jpg", range: 'B22:Z22' },
    { name: "Uczestnik 3", img: "path/to/image3.jpg", range: 'B23:Z23' },
    { name: "Uczestnik 4", img: "path/to/image4.jpg", range: 'B24:Z24' },
    { name: "Uczestnik 5", img: "path/to/image5.jpg", range: 'B25:Z25' },
    { name: "Uczestnik 6", img: "path/to/image6.jpg", range: 'B26:Z26' },
    { name: "Uczestnik 7", img: "path/to/image7.jpg", range: 'B27:Z27' },
    { name: "Uczestnik 8", img: "path/to/image8.jpg", range: 'B28:Z28' },
    { name: "Uczestnik 9", img: "path/to/image9.jpg", range: 'B29:Z29' },
    { name: "Uczestnik 10", img: "path/to/image10.jpg", range: 'B30:Z30' },
    { name: "Uczestnik 11", img: "path/to/image11.jpg", range: 'B31:Z31' },
    { name: "Uczestnik 12", img: "path/to/image12.jpg", range: 'B32:Z32' }
];

function fetchSheetData(uczestnik) {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&range=${uczestnik.range}`;
    return fetch(url)
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split('\n');
            const values = rows.map(row => {
                const value = row.split(',')[0];
                return value ? parseInt(value, 10) : 0; // Upewnij się, że wartość jest liczbą
            });
            const points = values.reduce((a, b) => a + b, 0);
            return { name: uczestnik.name, img: uczestnik.img, points };
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return { name: uczestnik.name, img: uczestnik.img, points: 0 };
        });
}

function updateTable(uczestnicyData) {
    const tableBody = document.querySelector('#wynikiTable tbody');
    tableBody.innerHTML = ''; // Czyszczenie tabeli

    uczestnicyData.sort((a, b) => b.points - a.points); // Sortowanie według punktów

    uczestnicyData.forEach(uczestnik => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${uczestnik.img}" alt="${uczestnik.name}" width="50"></td>
            <td>${uczestnik.name}</td>
            <td>${uczestnik.points}</td>
        `;
        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    Promise.all(uczestnicy.map(fetchSheetData))
        .then(uczestnicyData => {
            updateTable(uczestnicyData);
        });
});
