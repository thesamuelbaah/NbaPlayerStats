document.addEventListener("DOMContentLoaded", async function () {
    const galleryDiv = document.getElementById("player-gallery");
    const searchBar = document.getElementById("searchBar");

    let playersData = []; // Store all players data globally for search

    try {
        const response = await fetch("http://localhost:8080/api/players");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        playersData = await response.json(); // Store fetched data

        if (!Array.isArray(playersData) || playersData.length === 0) {
            galleryDiv.innerHTML = "<p>No player data available.</p>";
            return;
        }

        displayPlayers(playersData); // Display all players initially

    } catch (error) {
        console.error("Error fetching players:", error);
        galleryDiv.innerHTML = "<p>Failed to load players. Check console for details.</p>";
    }

    // Function to display players
    function displayPlayers(players) {
        galleryDiv.innerHTML = ""; // Clear existing players
        players.forEach(player => {
            const playerDiv = document.createElement("div");
            playerDiv.classList.add("player-card");

            const playerImage = `images/${player.playerId}.jpg`; // Example image path

            playerDiv.innerHTML = `
                <img src="${playerImage}" alt="${player.playerName}" class="player-photo" onclick="window.location.href='player-stats.html?playerId=${player.playerId}'">
                <h3>${player.playerName}</h3>
            `;

            galleryDiv.appendChild(playerDiv);
        });
    }

    // Search bar functionality
    searchBar.addEventListener("input", function () {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredPlayers = playersData.filter(player =>
            player.playerName.toLowerCase().includes(searchTerm)
        );
        displayPlayers(filteredPlayers); // Update displayed players
    });
});
