const apiUrl = 'https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/arrivals?station=UT';

function fetchTrainData() {
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache',
            'Ocp-Apim-Subscription-Key': '6efe8b15f76e49c8b019e7639be187e1'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tbody = document.querySelector('#train-board tbody');
            tbody.innerHTML = ''; // Clear existing rows

            // Filter trains for a specific platform (Spoor 5)
            const specificPlatform = '5'; // Change this to the desired platform number
            const filteredTrains = data.payload.arrivals.filter(train => train.plannedTrack === specificPlatform);

            if (filteredTrains.length > 0) {
                const nextTrain = filteredTrains[0]; // Get only the first train

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${nextTrain.trainNumber}</td>
                    <td>${nextTrain.origin}</td>
                    <td>${nextTrain.destination}</td>
                    <td>${new Date(nextTrain.plannedDateTime).toLocaleTimeString()}</td>
                    <td>${nextTrain.actualTrack || nextTrain.plannedTrack}</td>
                    <td>${nextTrain.actualDateTime ? 'On time' : 'Delayed'}</td>
                `;
                tbody.appendChild(row);
            } else {
                // If no trins are available for the specified platform
                const row = document.createElement('tr');
                row.innerHTML = `<td colspan="6">No upcoming trains for platform ${specificPlatform}</td>`;
                tbody.appendChild(row);
            }
        })
        .catch(error => {
            console.error('Error fetching train data:', error);
        });
}

// Fetch train data every 30 seconds
setInterval(fetchTrainData, 30000);

// Initial fetch
fetchTrainData();
