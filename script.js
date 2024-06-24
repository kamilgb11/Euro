const uczestnicy = [
    { name: "Miki", img: "zdjecia/miki.png", rangeStart: 21 },  
    { name: "jędrek", img: "zdjecia/jedrek.jpg", rangeStart: 22 }, 
    { name: "Szymon Sialala", img: "zdjecia/tomala.jpg", rangeStart: 23 },
    { name: "Dupiaty", img: "zdjecia/kowalik.jpg", rangeStart: 24 },
    { name: "Grzesiu", img: "zdjecia/grzesiu.png", rangeStart: 25 },
    { name: "Buła", img: "zdjecia/buła.png", rangeStart: 26 },
    { name: "Mientus", img: "zdjecia/mientus.jpg", rangeStart: 27 },
    { name: "Partycki", img: "zdjecia/partycki.png", rangeStart: 28 },
    { name: "Stary Parzy", img: "zdjecia/guest.png", rangeStart: 29 },
    { name: "Młody Parzy", img: "zdjecia/guest.png", rangeStart: 30 },
    { name: "Damian", img: "zdjecia/guest.png", rangeStart: 31 },
    { name: "Seba", img: "zdjecia/guest.png", rangeStart: 32 }   
];

function fetchSheetData() {
    return fetch('TABELA.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const uczestnicyData = uczestnicy.map(uczestnik => {
                let points = 0;
                const rangeStart = uczestnik.rangeStart;
                const rangeEnd = rangeStart; 

                for (let row = rangeStart - 1; row <= rangeEnd - 1; row++) {
                    for (let col = 1; col <= 60; col++) { // Zakres od B do Z!!!
                        const cellAddress = XLSX.utils.encode_cell({ c: col, r: row });
                        const cell = sheet[cellAddress];
                        const value = cell ? parseInt(cell.v, 10) : 0;
                        if (!isNaN(value) && (value === 0 || value === 1 || value === 3)) {
                            points += value;
                        }
                    }
                }
                return { name: uczestnik.name, img: uczestnik.img, points };
            });
            updateTable(uczestnicyData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function updateTable(uczestnicyData) {
    const tableBody = document.querySelector('#wynikiTable tbody');
    tableBody.innerHTML = ''; 

    uczestnicyData.sort((a, b) => b.points - a.points); // Sortowanie

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

document.addEventListener('DOMContentLoaded', fetchSheetData);
