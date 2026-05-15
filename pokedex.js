const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    fetch(url).then((res) => {
        if (res.status != "200") {
            pokeImage("./pokemaster.jpeg"); // Regresa a Pokemaster si no hay éxito
            resetData();
        } else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            // Actualizar Imagen
            pokeImage(data.sprites.front_default);

            // Datos en Español (Columna Izquierda)
            document.getElementById('pokename').innerHTML = `Nombre: ${data.forms[0].name}`;
            document.getElementById('pokeHe').innerHTML = `Altura: ${data.height / 10} m`;
            document.getElementById('pokeWe').innerHTML = `Peso: ${data.weight / 10} kg`;
            document.getElementById('pokeorder').innerHTML = `Orden: #${data.order}`;
            document.getElementById('pokeid').innerHTML = `ID: #${data.id}`;
            document.getElementById('pokeitem').innerHTML = `Habilidad: ${data.abilities[0].ability.name}`;
            document.getElementById('pokeType').innerHTML = `Tipo: ${data.types[0].type.name}`;

            // Movimientos (Columna Derecha)
            for (let i = 1; i <= 4; i++) {
                const mov = data.moves[i - 1] ? data.moves[i - 1].move.name : "--";
                document.getElementById(`pokemove${i}`).innerHTML = `Movimiento ${i}: ${mov}`;
            }

            // Actualizar Gráfica
            actualizarGrafica(data);
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const resetData = () => {
    document.getElementById('pokename').innerHTML = "Pokémon no encontrado";
    const ids = ['pokeHe', 'pokeWe', 'pokeorder', 'pokeid', 'pokeitem', 'pokeType', 'pokemove1', 'pokemove2', 'pokemove3', 'pokemove4'];
    ids.forEach(id => document.getElementById(id).innerHTML = "--");
}

const actualizarGrafica = (data) => {
    const miCanvas = document.getElementById("miCanvas").getContext("2d");
    
    if (window.miGrafica != undefined) {
        window.miGrafica.destroy();
    }

    window.miGrafica = new Chart(miCanvas, {
        type: "bar",
        data: {
            labels: ["Vida", "Ataque", "Defensa", "At. Esp", "Def. Esp", "Velocidad"],
            datasets: [{
                label: data.forms[0].name.toUpperCase(),
                data: [
                    data.stats[0].base_stat,
                    data.stats[1].base_stat,
                    data.stats[2].base_stat,
                    data.stats[3].base_stat,
                    data.stats[4].base_stat,
                    data.stats[5].base_stat
                ],
                backgroundColor: 'rgba(142, 68, 173, 0.6)',
                borderColor: 'rgba(142, 68, 173, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, ticks: { color: 'white' } },
                x: { ticks: { color: 'white' } }
            },
            plugins: { legend: { labels: { color: 'white' } } }
        }
    });
}
