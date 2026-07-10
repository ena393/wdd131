// Character object
const character = {
    name: "Snortleblat",
    class: "Swamp Beast Diplomat",
    level: 1,
    health: 100,
    image: "https://andejuli.github.io/wdd131/character_card/snortleblat.webp",

    attacked() {
        if (this.health <= 0) {
            alert(`${this.name} is already dead.`);
            return;
        }

        this.health -= 20;

        if (this.health <= 0) {
            this.health = 0;
            updateDisplay();
            alert(`${this.name} has died.`);
        } else {
            updateDisplay();
        }
    },

    levelUp() {
        this.level += 1;
        updateDisplay();
    }
};

// Update DOM elements
function updateDisplay() {
    document.getElementById("charName").textContent = character.name;
    document.getElementById("charClass").textContent = `Class: ${character.class}`;
    document.getElementById("charLevel").textContent = `Level: ${character.level}`;
    document.getElementById("charHealth").textContent = `Health: ${character.health}`;
}

// Initialize display
updateDisplay();
