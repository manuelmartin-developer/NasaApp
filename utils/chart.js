let myChart;
let getData = async () => {
    const response = await fetch('http://localhost:3000/api/astronomy/neas', {
        method: 'GET',
        mode: "cors",
        cache: "default"
    })
    const data = await response.json();
    return data
}
let renderData = async () => {

    const data = await getData();
    let apollo = [];
    let amor = [];
    let aten = [];
    let comet = [];
    let jupiter_family = [];
    let jupiter_family_ = [];
    let halley_type = [];
    let parabolic_comet = [];
    let encke_type = [];
    let countNeas = [];

    const labels = [];

    for (let nea of data) {
        if (labels.indexOf(nea.orbit_class) === -1) {
            labels.push(nea.orbit_class);
        }
        if (nea.orbit_class === "Apollo") {
            apollo.push(nea);
        } else if (nea.orbit_class === "Amor") {
            amor.push(nea);
        } else if (nea.orbit_class === "Aten") {
            aten.push(nea);
        } else if (nea.orbit_class === "Comet") {
            comet.push(nea);
        } else if (nea.orbit_class === "Jupiter-family Comet") {
            jupiter_family.push(nea);
        } else if (nea.orbit_class === "Jupiter-family Comet*") {
            jupiter_family_.push(nea);
        } else if (nea.orbit_class === "Halley-type Comet") {
            halley_type.push(nea);
        } else if (nea.orbit_class === "Parabolic Comet") {
            parabolic_comet.push(nea);
        } else if (nea.orbit_class === "Encke-yype Comet") {
            encke_type.push(nea);
        }

    }

    countNeas = [apollo.length, amor.length, aten.length, comet.length, jupiter_family.length, jupiter_family_.length, halley_type.length, parabolic_comet.length, encke_type.length];

    const dates = {
        labels: labels,
        datasets: [{
            label: neas.orbit_class,
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            data: countNeas,
            hoverOffset: 4
        }]
    };
    const config = {
        type: 'doughnut',
        data: dates,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'NEAs by orbit class'
                }
            }
        },
    }
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

    let resultTable_neas = document.querySelector("#resultTable_neas");
    let row = "";
    for (let nea of data) {
        row += `<tr>
                    <td>${nea.designation}</td>
                    <td>${nea.discovery_date.slice(0,nea.discovery_date.indexOf("T"))}</td>
                    <td>${nea.period_yr}</td>
                </tr>`
    }
    resultTable_neas.innerHTML = `
    <tr>
        <th>Designation</th>
        <th>Discovery date</th>
        <th>Period year</th>
    </tr>
    ${row}
    `
};
renderData();

let button_orbit = document.querySelector("#button_orbit");
let button_date = document.querySelector("#button_date");
let btn_reset = document.querySelector("#btn_reset");

let inputOrbit = document.querySelector("#inputOrbit");
let input_date_from = document.querySelector("#input_date_from");
let input_date_to = document.querySelector("#input_date_to");

button_orbit.disabled = true;
button_date.disabled = true;


let neas_orbit_class = [];
for (let nea of neas) {
    if (neas_orbit_class.indexOf(nea.orbit_class) === -1) {
        neas_orbit_class.push(nea.orbit_class);
    }
}
inputOrbit.addEventListener('input', () => {
    let orbit_value = inputOrbit.value;
    neas_orbit_class.includes(orbit_value) ? button_orbit.disabled = false :
        button_orbit.disabled = true;
})

input_date_from.addEventListener('input', () => {
    let from_value = input_date_from.value;
    from_value != "" ? button_date.disabled = false :
        button_date.disabled = true;
})
input_date_to.addEventListener('input', () => {
    let to_value = input_date_to.value;
    to_value != "" ? button_date.disabled = false :
        button_date.disabled = true;
})

button_orbit.addEventListener('click', () => {
    getData = async function () {
        const response = await fetch(`http://localhost:3000/api/astronomy/neas?class=${inputOrbit.value}`, {
            method: 'GET',
            mode: "cors",
            cache: "default"
        });
        const data = await response.json();
        data_length.innerHTML = `${data.length} `;
        return data
    }
    myChart.destroy();
    renderData();
});

button_date.addEventListener('click', () => {
    getData = async function () {
        const response = await fetch(`http://localhost:3000/api/astronomy/neas?from=${input_date_from.value}&to=${input_date_to.value}`, {
            method: 'GET',
            mode: "cors",
            cache: "default"
        });
        const data = await response.json();
        data_length.innerHTML = `${data.length} `;
        return data
    }
    myChart.destroy();
    renderData();
});

btn_reset.addEventListener('click', () => {
    getData = async function () {
        const response = await fetch(`http://localhost:3000/api/astronomy/neas`, {
            method: 'GET',
            mode: "cors",
            cache: "default"
        });
        const data = await response.json();
        data_length.innerHTML = `${data.length} `;
        return data
    }
    myChart.destroy();
    renderData();

    inputOrbit.value = "";
    input_date_from.value = "";
    input_date_to.value = "";

    button_orbit.disabled = true;
    button_date.disabled = true;
});