const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    fetch(url).then((res) => {
        if (res.status != "200") {
            pokeImage("./pokemaster.jpeg");
            resetData();
        } else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            pokeImage(data.sprites.front_default);

            // Información a la izquierda
            document.getElementById('pokename').innerHTML = `Nombre: ${data.forms[0].name.toUpperCase()}`;
            document.getElementById('pokeHe').innerHTML = `Altura: ${data.height / 10} m`;
            document.getElementById('pokeWe').innerHTML = `Peso: ${data.weight / 10} kg`;
            document.getElementById('pokeorder').innerHTML = `Orden: #${data.order}`;
            document.getElementById('pokeid').innerHTML = `ID: #${data.id}`;
            document.getElementById('pokeitem').innerHTML = `Habilidad: ${data.abilities[0].ability.name}`;
            document.getElementById('pokeType').innerHTML = `Tipo: ${data.types[0].type.name}`;

            // Movimientos a la derecha
            for (let i = 1; i <= 4; i++) {
                const mov = data.moves[i - 1] ? data.moves[i - 1].move.name : "--";
                document.getElementById(`pokemove${i}`).innerHTML = `Movimiento ${i}: ${mov}`;
            }

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
    const ctx = document.getElementById("miCanvas").getContext("2d");
    
    if (window.miGrafica) {
        window.miGrafica.destroy();
    }

    window.miGrafica = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Vida", "Ataque", "Defensa", "At. Esp", "Def. Esp", "Velocidad"],
            datasets: [{
                label: 'Puntos de Base',
                data: data.stats.map(s => s.base_stat),
                backgroundColor: 'rgba(142, 68, 173, 0.7)',
                borderColor: '#8e44ad',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true, ticks: { color: 'white' } },
                x: { ticks: { color: 'white' } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}
