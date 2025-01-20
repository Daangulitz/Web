const url = '/assets/data/barchart.json';

fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log("success!");
        // console.log(data);
        console.log(data.languages);
        sortArrayOfObjects(data.languages, 'experience');
        setBarchart(data.languages);
    })
    .catch((error) => {
        console.error('There has been a problem with your fetch operation:', error);
    });

function setBarchart(data) {
    const canvas = document.getElementById('barchart');

    const languages = data.map((element) => element.language);

    const experiences = data.map((element) => element.experience);

    const colors = data.map((element) => {
        if (element.experience >= 80) return '#FF2C05';
        else if (element.experience >= 60) return '#FD6104';
        else if (element.experience >= 40) return '#FD9A01';
        else if (element.experience >= 20) return '#FFCE03';
        else return '#FEF001';
    });

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: languages,
            datasets: [
                {
                    label: 'Amount of players (percentage)',
                    data: experiences,
                    backgroundColor: colors,
                    borderWidth: 1,
                },
            ],
        },
    });
}