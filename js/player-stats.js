// This will run when the page loads
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get('playerId'); // Get playerId from URL
    if (playerId) {
        fetchPlayerStats(playerId); // Fetch player stats if playerId exists
    } else {
        alert('Player ID is missing in the URL');
    }
};

// Function to fetch stats for a specific player based on playerId
async function fetchPlayerStats(playerId) {
    try {
        const response = await fetch(`http://localhost:8080/api/players/${playerId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const player = await response.json();
        console.log("Player Stats:", player); // Debugging: Check the API response

        displayPlayerStats(player);
    } catch (error) {
        console.error("Error fetching player stats:", error);
        alert("Failed to load stats. Check console for details.");
    }
}

// Function to display stats for the specific player
// Function to display stats for the specific player in a table
function displayPlayerStats(player) {
    const statsDiv = document.getElementById("stats");
    statsDiv.innerHTML = ""; // Clear previous data

    if (!player) {
        statsDiv.innerHTML = "<p>No player stats available.</p>";
        return;
    }

    console.log("Player Data:", player); // Debugging: Check the actual player data

    // Create the table structure
    const table = document.createElement("table");
    table.classList.add("stats-table");

    // Create the table header
    const header = document.createElement("thead");
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
        <th>Stat</th>
        <th>Value</th>
    `;
    header.appendChild(headerRow);
    table.appendChild(header);

    // Create the table body with player stats
    const body = document.createElement("tbody");

    const stats = [
        ["Games Played", player.gp],
        ["Wins", player.w],
        ["Losses", player.l],
        ["Win Percentage", player.wpct ? player.wpct.toFixed(2) : "N/A"],
        ["Minutes Played", player.min],
        ["Offensive Rating", player.eoffRating],
        ["Defensive Rating", player.edefRating],
        ["Net Rating", player.enetRating],
        ["Pace", player.epace],
        ["Turnover Percentage", player.etovPct],
    ];

    stats.forEach(([label, value]) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${label}</strong></td>
            <td>${value !== null && value !== undefined ? value : "N/A"}</td>
        `;
        body.appendChild(row);
    });

    table.appendChild(body);

    // Append the table to the statsDiv
    statsDiv.appendChild(table);
}
