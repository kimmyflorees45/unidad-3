const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./pokemon1.gif")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);

            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);

            let name = document.getElementById('pokeName');
            name.innerHTML = `Name: ${data.forms[0].name}`;

            let element1 = document.getElementById('pokeHe');
            element1.innerHTML = `Height: ${data.height}`;

            let element2 = document.getElementById('pokeWe');
            element2.innerHTML = `Weight: ${data.weight}`;

            let element3 = document.getElementById('pokeorder');
            element3.innerHTML = `Order: #${data.order}`;

            let element4 = document.getElementById('pokeid');
            element4.innerHTML = `Id: #${data.id}`;

            let element5 = document.getElementById('pokeitem');
            element5.innerHTML = `Ability: ${data.abilities[0].ability.name}`;

            let element6 = document.getElementById('pokeType');
            element6.innerHTML = `Type: ${data.types[0].type.name}`;

            let element7 = document.getElementById('pokemove1');
            element7.innerHTML = `Move 1: ${data.moves[0].move.name}`;

            let element8 = document.getElementById('pokemove2');
            element8.innerHTML = `Move 2: ${data.moves[1].move.name}`;

            let element9 = document.getElementById('pokemove3');
            element9.innerHTML = `Move 3: ${data.moves[2].move.name}`;

            let element10 = document.getElementById('pokemove4');
            element10.innerHTML = `Move 4: ${data.moves[3].move.name}`;

            const miCanvas = document.getElementById("miCanvas").getContext("2d");
            if (window.miCanvas != undefined) {
                window.miCanvas.destroy();
            }
            window.miCanvas = new Chart(miCanvas, {
                type: "bar",
                data: {
                    labels: ["HP", "Attack", "Defense", "Special-A", "Special-D", "Speed"],
                    datasets: [
                        {
                            label: `${data.forms[0].name}`,
                            backgroundColor: 'rgba(54, 162, 235, 1)',
                            data: [
                                `${data.stats[0].base_stat}`,
                                `${data.stats[1].base_stat}`,
                                `${data.stats[2].base_stat}`,
                                `${data.stats[3].base_stat}`,
                                `${data.stats[4].base_stat}`,
                                `${data.stats[5].base_stat}`
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgb(175, 54, 235)',
                                'rgb(255, 86, 249)',
                                'rgb(192, 75, 137)',
                                'rgb(149, 132, 185)',
                                'rgb(217, 64, 255)'
                            ],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(185, 98, 147, 0.82)',
                                'rgba(255, 206, 86, 0.5)',
                                'rgba(247, 156, 236, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 64, 204, 0.5)'
                            ],
                            borderWidth: 1,
                        }
                    ]
                },
                options: {
                    scales: {
                        x: {
                            ticks: {
                                maxRotation: 90,
                                minRotation: 90,
                                color: 'purple',
                                font: { size: 15 },
                            }
                        }
                    }
                }
            });
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}