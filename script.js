
document.addEventListener("DOMContentLoaded", function() {
    fetch("roster_data.json")
        .then(response => response.json())
        .then(data => {
            const rosterContainer = document.getElementById("roster-container");
            rosterContainer.innerHTML = ""; // Clear loading message

            data.factions.forEach(faction => {
                const factionSection = document.createElement("section");
                factionSection.classList.add("faction-section");

                const factionHeader = document.createElement("h2");
                factionHeader.classList.add("faction-header");
                factionHeader.textContent = faction.name;
                factionSection.appendChild(factionHeader);

                const characterGrid = document.createElement("div");
                characterGrid.classList.add("character-grid");

                faction.characters.forEach(character => {
                    const characterCard = document.createElement("div");
                    characterCard.classList.add("character-card");

                    const priorityClass = character.priority === "N/A" ? "NA" : character.priority;
                    const statusClass = character.status.toLowerCase();

                    // Check if icon exists and is not N/A
                    const iconHtml = character.icon && character.icon !== "N/A" ? `<img src="${character.icon}" alt="${character.name} icon" class="character-icon">` : '';

                    // Check if advice exists and is not N/A
                    const teamCompHtml = character.team_comp_advice && character.team_comp_advice !== "N/A" ? `<p class="team-comp-advice"><b>Team Comp:</b> ${character.team_comp_advice}</p>` : '';
                    const positioningHtml = character.positioning_advice && character.positioning_advice !== "N/A" ? `<p class="positioning-advice"><b>Positioning:</b> ${character.positioning_advice}</p>` : '';

                    characterCard.innerHTML = `
                        ${iconHtml}
                        <h3>${character.name}</h3>
                        <p class="character-id">${character.id}</p>
                        <p class="status ${statusClass}">${character.status}</p>
                        <p class="rank-stars">Rank: ${character.rank}</p>
                        <p class="level-cap">Level: ${character.level}</p>
                        <p class="abilities">Abilities: ${character.abilities}</p>
                        <p class="priority ${priorityClass}">Priority: ${character.priority}</p>
                        <p class="description">${character.description}</p>
                        ${teamCompHtml}
                        ${positioningHtml}
                    `;
                    characterGrid.appendChild(characterCard);
                });

                factionSection.appendChild(characterGrid);
                rosterContainer.appendChild(factionSection);
            });
        })
        .catch(error => {
            console.error("Error loading roster data:", error);
            document.getElementById("roster-container").innerHTML = "<p>Failed to load roster data. Please try again later.</p>";
        });
});




