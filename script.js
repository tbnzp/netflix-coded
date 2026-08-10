// ==========================================================
// 1. DATA DIRECTORIES MATRIX ARCHITECTURE (PROFILES CATALOGUE)
// ==========================================================
const profilesDatabase = {
    eia: {
        username: "Eia",
        avatarUrl: "https://unsplash.com",
        spotlight: {
            title: "Melody of Hearts",
            type: "Series",
            genre: "Romance",
            year: "2026",
            duration: "Season 1",
            ageLimit: "TV-PG",
            plot: "A beautiful, heartwarming journey mapping out every sweet laugh, shared milestone, and unforgettable memory held close to the core. Personalized completely for Lee's favorite person.",
            backdrop: "https://unsplash.com"
        },
        shelves: {
            rowOneTitle: "Your Favorite Comfort Shows",
            rowOneData: [
                { title: "The Soothing Voice", plot: "Episode 1: Chronicling the gentle, reassuring phone calls that can instantly wash away all doubts and make everything feel entirely peaceful.", img: "https://unsplash.com" },
                { title: "Sweet Inside Jokes", plot: "Episode 2: A lighthearted compilation tracking your contagious giggles and the unique vocabulary that belongs strictly to our world.", img: "https://unsplash.com" },
                { title: "Everyday Light", plot: "Episode 3: Documenting the beautiful soul and warmth you bring into my existence every single day without exception.", img: "https://unsplash.com" }
            ],
            rowTwoTitle: "Critically Acclaimed Masterpieces",
            rowTwoData: [
                { title: "The Anchor & Peace", plot: "Feature Film: An elegant look at your infinite patience, deep understanding, and why you remain my favorite anchor in this lifetime.", img: "https://unsplash.com" },
                { title: "Our Next Chapter", plot: "Special Preview: Exploring future milestones, upcoming trips, and all the gifts waiting for you once we meet face-to-face again.", img: "https://unsplash.com" }
            ]
        }
    },
    lee: {
        username: "Lee",
        avatarUrl: "https://unsplash.com",
        spotlight: {
            title: "EXTINCTION",
            type: "Film",
            genre: "Horror",
            year: "2015",
            duration: "1h 52m",
            ageLimit: "16+",
            plot: "Nine years after a zombie apocalypse, three survivors face an even deadlier threat in this thriller directed by Miguel Ángel Vivas (\"Kidnapped\").",
            backdrop: "https://unsplash.com"
        },
        shelves: {
            rowOneTitle: "Suspenseful Western TV Shows",
            rowOneData: [
                { title: "The Walking Dead", plot: "Season 1: Sheriff Deputy Rick Grimes wakes up from a coma to discover the world is in ruins and must lead a group of survivors to stay alive.", img: "https://unsplash.com" },
                { title: "The Last of Us", plot: "Season 1: After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.", img: "https://unsplash.com" },
                { title: "Stranger Things", plot: "Season 1: When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.", img: "https://unsplash.com" }
            ],
            rowTwoTitle: "Action-Packed Blockbusters",
            rowTwoData: [
                { title: "World War Z", plot: "Feature Length: Former United Nations investigator Gerry Lane travels the world in a race against time to stop a pandemic that is toppling armies.", img: "https://unsplash.com" },
                { title: "28 Days Later", plot: "Classic Cut: Four weeks after a mysterious, incurable virus spreads throughout the UK, a handful of survivors try to find sanctuary.", img: "https://unsplash.com" }
            ]
        }
    }
};

// ==========================================================
// 2. DOM ELEMENT NODES SELECTORS
// ==========================================================
const profileGate = document.getElementById('profileGate');
const dashboardArea = document.getElementById('dashboardArea');
const mainHeaderBar = document.getElementById('mainHeaderBar');

const navAvatarImageNode = document.getElementById('navAvatarImageNode');
const dropdownAlternateAvatarImageNode = document.getElementById('dropdownAlternateAvatarImageNode');
const dropdownAlternateProfileNameNode = document.getElementById('dropdownAlternateProfileNameNode');
const heroWallpaperCanvas = document.getElementById('heroWallpaperCanvas');
const heroTitleNode = document.getElementById('heroTitleNode');
const heroTypeBadge = document.getElementById('heroTypeBadge');
const heroGenreBadge = document.getElementById('heroGenreBadge');
const heroYearBadge = document.getElementById('heroYearBadge');
const heroDurationBadge = document.getElementById('heroDurationBadge');
const heroAgeLimitBadge = document.getElementById('heroAgeLimitBadge');
const heroPlotNode = document.getElementById('heroPlotNode');

const contentRowTitleOne = document.getElementById('contentRowTitleOne');
const contentRowTitleTwo = document.getElementById('contentRowTitleTwo');
const carouselRowOne = document.getElementById('carouselRowOne');
const carouselRowTwo = document.getElementById('carouselRowTwo');

const cinemaPreviewModal = document.getElementById('cinemaPreviewModal');
const modalDisplayTitle = document.getElementById('modalDisplayTitle');
const modalDisplayDescription = document.getElementById('modalDisplayDescription');
const closeCinemaModalBtn = document.getElementById('closeCinemaModalBtn');
const audioFeedbackMuteBtn = document.getElementById('audioFeedbackMuteBtn');
const moreInfoTrigger = document.getElementById('moreInfoTrigger');

// Runtime Tracking Memory State Variables
let currentSessionKey = "lee";

// ==========================================================
// 3. UI RENDERING CORE ENGINE LOGIC FUNCTIONS
// ==========================================================

function selectUserProfile(profileKey) {
    currentSessionKey = profileKey;
    const sessionData = profilesDatabase[profileKey];
    if (!sessionData) return;

    // A: Hydrate Navigation Profile Badges
    navAvatarImageNode.src = sessionData.avatarUrl;
    
    const alternateKey = (profileKey === "lee") ? "eia" : "lee";
    const alternateData = profilesDatabase[alternateKey];
    dropdownAlternateAvatarImageNode.src = alternateData.avatarUrl;
    dropdownAlternateProfileNameNode.textContent = alternateData.username;

    // B: Re-render Spotlight Spotlight Canvas Elements
    heroWallpaperCanvas.style.backgroundImage = `linear-gradient(to top, #141414 5%, rgba(20,20,20,0.1) 50%, rgba(0,0,0,0.4) 100%), url('${sessionData.spotlight.backdrop}')`;
    heroTitleNode.textContent = sessionData.spotlight.title;
    heroTypeBadge.textContent = sessionData.spotlight.type;
    heroGenreBadge.textContent = sessionData.spotlight.genre;
    heroYearBadge.textContent = sessionData.spotlight.year;
    heroDurationBadge.textContent = sessionData.spotlight.duration;
    heroAgeLimitBadge.textContent = sessionData.spotlight.ageLimit;
    heroPlotNode.textContent = sessionData.spotlight.plot;

    // C: Populate Horizontal Carousel Content Channels
    contentRowTitleOne.textContent = sessionData.shelves.rowOneTitle;
    contentRowTitleTwo.textContent = sessionData.shelves.rowTwoTitle;
    
    renderShelfCarouselCards(sessionData.shelves.rowOneData, carouselRowOne);
    renderShelfCarouselCards(sessionData.shelves.rowTwoData, carouselRowTwo);

    // D: Interface View Switch States
    profileGate.classList.add('hidden-display-layer');
    dashboardArea.classList.remove('hidden-display-layer');
    window.scrollTo(0, 0);
}

function renderShelfCarouselCards(movieDataArray, targetWrapperNode) {
    targetWrapperNode.innerHTML = ''; 
    
    movieDataArray.forEach(movie => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('movie-card-thumbnail-item');
        
        itemCard.innerHTML = `
            <img src="${movie.img}" alt="${movie.title}">
            <div class="movie-card-hover-text-overlay">
                <div class="inline-card-title">${movie.title}</div>
            </div>
        `;
        
        itemCard.addEventListener('click', () => {
            openCinemaTheaterPreviewPanel(movie.title, movie.plot);
        });
        
        targetWrapperNode.appendChild(itemCard);
    });
}

function toggleAlternativeUserSession() {
    const nextSessionKey = (currentSessionKey === "lee") ? "eia" : "lee";
    selectUserProfile(nextSessionKey);
}

function openCinemaTheaterPreviewPanel(title, description) {
    modalDisplayTitle.textContent = title;
    modalDisplayDescription.textContent = description;
    cinemaPreviewModal.classList.add('active');
}

function closeCinemaTheaterPreviewPanel() {
    cinemaPreviewModal.classList.remove('active');
}

function playSpotlightFeatureTitle() {
    const activeData = profilesDatabase[currentSessionKey];
    if (activeData) {
        openCinemaTheaterPreviewPanel(activeData.spotlight.title, activeData.spotlight.plot);
    }
}

function switchBackToProfiles() {
    dashboardArea.classList.add('hidden-display-layer');
    profileGate.classList.remove('hidden-display-layer');
}

// ==========================================================
// 4. GLOBAL INTERACTION ACTIONS EVENT LISTENERS
// ==========================================================

window.addEventListener('scroll', () => {
    if (window.scrollY > 35) {
        mainHeaderBar.classList.add('scrolled');
    } else {
        mainHeaderBar.classList.remove('scrolled');
    }
});

moreInfoTrigger.addEventListener('click', playSpotlightFeatureTitle);

let audioFeedbackStateMuted = false;
audioFeedbackMuteBtn.addEventListener('click', () => {
    audioFeedbackStateMuted = !audioFeedbackStateMuted;
    
    const panel = document.querySelector('.billboard-right-floating-controls-panel');
    if (audioFeedbackStateMuted) {
        panel.classList.add('muted');
    } else {
        panel.classList.remove('muted');
    }
});

closeCinemaModalBtn.addEventListener('click', closeCinemaTheaterPreviewPanel);

cinemaPreviewModal.addEventListener('click', (event) => {
    if (event.target === cinemaPreviewModal) {
        closeCinemaTheaterPreviewPanel();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeCinemaTheaterPreviewPanel();
    }
});
