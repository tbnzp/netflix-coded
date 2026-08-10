// ==========================================
// 1. CHRONICLES AND DATA DIRECTORIES FOR PROFILES
// ==========================================
const userCatalogues = {
    beomgyu: {
        profileName: "Beomgyu",
        avatarIcon: "🧸",
        avatarColor: "#ff9f1c",
        spotlight: {
            title: "The Sound of Music",
            plot: "Season 1: Step into the artistic, brilliant world of Choi Beomgyu. Replay the beautiful melodies, the tireless guitar practice sessions, and the brightest energetic smiles that illuminate our everyday space completely.",
            backdrop: "https://unsplash.com"
        },
        rows: {
            rowOneTitle: "Trending Masterpieces",
            rowOneData: [
                { title: "Center Stage Energy", plot: "Episode 1: Chronicling the explosive charisma, unparalleled live focus, and beautiful performance expressions that captivate stadiums across the globe.", img: "https://unsplash.com" },
                { title: "Late Night Studio Jam", plot: "Episode 2: An intimate behind-the-scenes gaze at the acoustic composition runs, quiet strums, and dedicated lyric crafting drafts hidden inside the twilight studio.", img: "https://unsplash.com" },
                { title: "The Wittiest Comeback", plot: "Episode 3: A laughter-packed highlight reel tracking your signature humor, unmatched variety-show quickness, and joyful variety timing.", img: "https://unsplash.com" }
            ],
            rowTwoTitle: "Fan-Favorite Milestones",
            rowTwoData: [
                { title: "A Radiant Smile", plot: "Special Cut: Exploring the comforting warmth and contagious positivity that sweeps away standard worries and brightens our horizon instantly.", img: "https://unsplash.com" },
                { title: "Vulnerable Moments", plot: "Documentary Short: Revealing the deeply thoughtful, empathetic inner layers behind the energetic performer persona. A raw, authentic testament to pure dedication.", img: "https://unsplash.com" }
            ]
        }
    },
    soobin: {
        profileName: "Soobin",
        avatarIcon: "🐰",
        avatarColor: "#2ec4b6",
        spotlight: {
            title: "The Leader's Sanctuary",
            plot: "Season 1: Delve into the gentle, deeply reliable, and comforting cosmos of Choi Soobin. Uncover the story behind his steadfast quiet leadership, soothing tone, and the sanctuary of peace he builds daily.",
            backdrop: "https://unsplash.com"
        },
        rows: {
            rowOneTitle: "Most Replayed Collections",
            rowOneData: [
                { title: "The Reassuring Presence", plot: "Episode 1: Documenting the subtle gestures, calm leadership pillars, and grounded energy that transforms confusing trials into peaceful clarity.", img: "https://unsplash.com" },
                { title: "Cozy Bread Excursions", plot: "Episode 2: A whimsical, lighthearted look at your legendary culinary bakery quests, love for comforting snacks, and pure, unfiltered foodie happiness.", img: "https://unsplash.com" },
                { title: "Sweet Dimple Chronicles", plot: "Episode 3: A macro-lens look at the soft dimpled expression that brings immediate happiness to everyone around you across this entire lifetime.", img: "https://unsplash.com" }
            ],
            rowTwoTitle: "Late-Night Reflection Lanes",
            rowTwoData: [
                { title: "The Soothing Melodies", plot: "Special Track: Analyzing the vocal lines and delicate high notes that wrap around hearts like a warm blanket on freezing winter nights.", img: "https://unsplash.com" },
                { title: "Unwavering Kindness", plot: "Featurette: Retracing endless instances of your authentic empathy, patience, and comforting care extended toward the world.", img: "https://unsplash.com" }
            ]
        }
    }
};

// ==========================================
// 2. DOM INTERFACE ELEMENTS BINDINGS
// ==========================================
const profileGate = document.getElementById('profileGate');
const dashboardArea = document.getElementById('dashboardArea');
const mainHeader = document.getElementById('mainNavigation');
const navAvatarIcon = document.getElementById('navAvatarIcon');
const navAvatarDisplay = document.getElementById('navAvatarDisplay');

const heroDisplayArea = document.getElementById('heroDisplayArea');
const heroTitleNode = document.getElementById('heroTitleNode');
const heroPlotNode = document.getElementById('heroPlotNode');

const rowTitleOne = document.getElementById('rowTitleOne');
const rowTitleTwo = document.getElementById('rowTitleTwo');
const carouselRowOne = document.getElementById('carouselRowOne');
const carouselRowTwo = document.getElementById('carouselRowTwo');

const previewModal = document.getElementById('previewMediaModal');
const modalDisplayTitle = document.getElementById('modalDisplayTitle');
const modalDisplayDescription = document.getElementById('modalDisplayDescription');
const closeModalBtn = document.getElementById('closeModalBtn');

// Active state values tracking variables
let activeProfileData = null;

// ==========================================
// 3. ARCHITECTURE PLATFORM LOGIC & ENGINE
// ==========================================

// Handles profile transition selections
function selectUserProfile(userKey) {
    activeProfileData = userCatalogues[userKey];
    if (!activeProfileData) return;

    // A: Set up the Nav header badge indicators
    navAvatarIcon.textContent = activeProfileData.avatarIcon;
    navAvatarDisplay.style.backgroundColor = activeProfileData.avatarColor;

    // B: Inject the Main Spotlight Banner contents
    heroDisplayArea.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4) 60%, #141414 100%), url('${activeProfileData.spotlight.backdrop}')`;
    heroTitleNode.textContent = activeProfileData.spotlight.title;
    heroPlotNode.textContent = activeProfileData.spotlight.plot;

    // C: Populate Content Rows
    rowTitleOne.textContent = activeProfileData.rows.rowOneTitle;
    rowTitleTwo.textContent = activeProfileData.rows.rowTwoTitle;
    
    buildMovieCarouselCards(activeProfileData.rows.rowOneData, carouselRowOne);
    buildMovieCarouselCards(activeProfileData.rows.rowTwoData, carouselRowTwo);

    // D: Structural Layer Switching Animation Triggers
    profileGate.classList.add('hidden-layer');
    dashboardArea.classList.remove('hidden-layer');
    window.scrollTo(0, 0);
}

// Generates dynamic thumbnail markup elements
function buildMovieCarouselCards(movieArray, targetContainer) {
    targetContainer.innerHTML = ''; // Wipe past rows data cleanly
    
    movieArray.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        
        // Setup card content structures
        card.innerHTML = `
            <img src="${movie.img}" alt="${movie.title} Cover Snapshot">
            <div class="movie-card-hover-overlay">
                <div class="card-inline-title">${movie.title}</div>
            </div>
        `;
        
        // Inject active overlay actions on tap
        card.addEventListener('click', () => {
            openCinemaTheaterModal(movie.title, movie.plot);
        });
        
        targetContainer.appendChild(card);
    });
}

// Main Spotlight play control mapping logic
function triggerMainFeatureVideo() {
    if (activeProfileData) {
        openCinemaTheaterModal(activeProfileData.spotlight.title, activeProfileData.spotlight.plot);
    }
}

// Controls Theater expansion overlays view modules
function openCinemaTheaterModal(title, description) {
    modalDisplayTitle.textContent = title;
    modalDisplayDescription.textContent = description;
    previewModal.classList.add('active');
}

function closeCinemaTheaterModal() {
    previewModal.classList.remove('active');
}

// Switch back out to profile chooser interface menu
function switchBackToProfiles() {
    dashboardArea.classList.add('hidden-layer');
    profileGate.classList.remove('hidden-layer');
}

// ==========================================
// 4. GLOBAL EVENTS ACTION LISTENERS MAPPINGS
// ==========================================

// Handle sticky menu visibility changes on scroll movements
window.addEventListener('scroll', () => {
    if (window.scrollY > 45) {
        mainHeader.classList.add('scrolled-past');
    } else {
        mainHeader.classList.remove('scrolled-past');
    }
});

// Close interactive overlay events bindings
closeModalBtn.addEventListener('click', closeCinemaTheaterModal);

previewModal.addEventListener('click', (event) => {
    if (event.target === previewModal) {
        closeCinemaTheaterModal();
    }
});

// Close open overlay frames if hitting the Escape button on desktop boards
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeCinemaTheaterModal();
    }
});
