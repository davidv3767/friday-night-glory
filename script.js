let customization_data = {};
let ownTeam;
let roster;
let regionTeams = [];
let regionSchedule = [];

// Retrieves data from customization.json
async function retrieveJSON() {
    try {
        const response = await fetch('customization.json');
        if (!response.ok) {
            throw new Error(`Error for JSON customization data! Status: ${response.status}`);
        } else {
            customization_data = await response.json( );
        }
    } catch (error) {
        console.error('Failed to load JSON customization data', error);
    }
}

// Creates a fictionized name
function randomName() {
    const choice1 = Math.floor(Math.random() * customization_data.firstNames.length);
    const choice2 = Math.floor(Math.random() * customization_data.lastNames.length);
    const firstName = customization_data.firstNames[choice1];
    const lastName = customization_data.lastNames[choice2];
    const fullName = firstName + " " + lastName;
    return fullName;
} 

// Retrieves a team name/colors
function randomTeam() {
    const choice = String(Math.floor(Math.random() * 50) + 1);
    const team = customization_data.teams[choice];
    team["wins"] = 0;
    team["losses"] = 0;
    team["pointsScored"] = 0;
    team["pointsAllowed"] = 0;
    return team;
}

// Creates a fictionized roster
function randomRoster() {
    let roster = [];
    for (let i = 0; i < 16; i++) {
        const name = randomName();
        if (roster.includes(name)) {
            i--;
        } else {
            roster.push(name)
        }
    }
    return roster;
}

// Updates team to HTML
async function displayRandomTeam() {
    await retrieveJSON();
    ownTeam = randomTeam();
    if (ownTeam) {
        document.getElementById("ownteam-name").innerText = team["name"];
        document.getElementById("ownteam-color1").innerText = team["primary color"];
        document.getElementById("ownteam-color2").innerText = team["secondary color"];
    }
}

// Updates roster to HTML
async function displayRandomRoster() {
    await retrieveJSON();
    roster = randomRoster();
    if (roster) {
        document.getElementById("QB").innerText = roster[0];
        document.getElementById("RB").innerText = roster[1];
        document.getElementById("WR1").innerText = roster[2];
        document.getElementById("WR2").innerText = roster[3];
        document.getElementById("TE").innerText = roster[4];
        document.getElementById("OL").innerText = roster[5];
        document.getElementById("DL").innerText = roster[6];
        document.getElementById("LB").innerText = roster[7];
        document.getElementById("CB").innerText = roster[8];
        document.getElementById("S").innerText = roster[9];
        document.getElementById("K").innerText = roster[10];
        document.getElementById("SB1").innerText = roster[11];
        document.getElementById("SB2").innerText = roster[12];
        document.getElementById("SB3").innerText = roster[13];
        document.getElementById("SB4").innerText = roster[14];
        document.getElementById("SB5").innerText = roster[15];
    }
}

// This checks if everything was done for setup.html
function checkForSetupFinish() {
    if (ownTeam && ownTeam.length > 0 && roster && roster.length > 0) {
        createRegion();
    }
}

// This creates the regional opponents along with the regional schedule
function createRegion() {
    let regionNames = []
    for (let i = 0; i < 15; i++) {
        let regionTeam = randomTeam();
        regionTeam["roster"] = randomRoster();
        regionTeam["skill"] = Math.floor(Math.random() * 20) + 1;
        regionTeam["luck"] = Math.floor(Math.random() * 5) + 1;
        if (regionTeam["name"] != ownTeam["name"] && !regionNames.has(regionTeam["name"])) { 
            regionNames.push(regionTeam["name"])
            regionTeams.push(regionTeam);
        } else {
            i--;
        }
    }
    for (let k = 0; k < 12; k++) {
        let randomNum = Math.floor(Math.random() * 14) + 1;
        let team = regionTeams[randomNum];
        if (regionSchedule.includes(team)) {
            k--;
        } else {
            regionSchedule.push(team)
        }
    }
}

// This decides one's chance of winning/losing
function wlIndex() {
    let randomNum = 0; // will change later
    let opposingTeam = regionTeams[0];
}