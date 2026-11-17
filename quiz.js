// BRAINBUZZ

let currentUser = null;
let currentCategory = "";
let currentLevel = "";
let questions = [];
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// PAGE NAVIGATION

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
    });
    document.getElementById(pageId).classList.remove("hidden");
    window.scrollTo(0, 0);
}

// LOCAL STORAGE

function getUsers() {
    return JSON.parse(localStorage.getItem("quizoraUsers")) || [];
}
function saveUsers(users) {
    localStorage.setItem("quizoraUsers", JSON.stringify(users));
}

// REGISTRATION

document.getElementById("registerForm")
.addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("regName").value.trim();
    let email = document.getElementById("regEmail").value.trim().toLowerCase();
    let password = document.getElementById("regPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let error = document.getElementById("registerError");
    if (!name || !email || !password || !confirmPassword) {
    error.textContent = "Please fill in all fields.";
    return;
}
    if (password !== confirmPassword) {
        error.textContent = "Passwords do not match.";
        return;
    }
    let users = getUsers();
    let existingUser = users.find(user => user.email === email);
    if (existingUser) {
        error.textContent = "Email already registered.";
        return;
    }
    let newUser = {
        name: name,
        email: email,
        password: password
    };
    users.push(newUser);
    saveUsers(users);
    currentUser = newUser;
    localStorage.setItem("quizoraSession", email);
    error.textContent = "";
    document.getElementById("registerForm").reset();
    updateNavbar();
    showPage("categoryPage");
    alert("Registration successful!");
});

// LOGIN

document.getElementById("loginForm")
.addEventListener("submit", function(event) {
    event.preventDefault();
    let email = document.getElementById("loginEmail").value.trim().toLowerCase();
    let password = document.getElementById("loginPassword").value;
    let users = getUsers();
    let user = users.find(item =>
        item.email === email && item.password === password
    );
    if (!user) {
        document.getElementById("loginError").textContent =
            "Invalid email or password.";
        return;
    }
    currentUser = user;
    localStorage.setItem("quizoraSession", email);
    document.getElementById("loginError").textContent = "";
    document.getElementById("loginForm").reset();
    updateNavbar();
    showPage("categoryPage");
    alert("Login successful!");
});

// NAVBAR

function updateNavbar() {
    if (currentUser) {
        document.getElementById("userGreeting").textContent =
            "Hi, " + currentUser.name;
        document.getElementById("profileBtn").classList.remove("hidden");
        document.getElementById("logoutBtn").classList.remove("hidden");
    } else {
        document.getElementById("userGreeting").textContent = "";
        document.getElementById("profileBtn").classList.add("hidden");
        document.getElementById("logoutBtn").classList.add("hidden");
    }
}

function logout() {
    localStorage.removeItem("quizoraSession");
    currentUser = null;
    document.getElementById("loginForm").reset();
    document.getElementById("userGreeting").textContent = "";
    document.getElementById("profileBtn").classList.add("hidden");
    document.getElementById("logoutBtn").classList.add("hidden");
    showPage("homePage");
}

// CATEGORY SELECTION

function selectCategory(category) {
    currentCategory = category;
    document.getElementById("selectedCategoryTitle").textContent =
        category + " - Choose Difficulty";
    showPage("difficultyPage");
}

// QUESTION BANK

const questionBank = {

    // SPORTS

    Sports: {

        Easy: [
            { question: "How many players are in a football team on the field?", options: ["9", "10", "11", "12"], answer: 2 },
            { question: "Which sport uses a shuttlecock?", options: ["Tennis", "Badminton", "Cricket", "Hockey"], answer: 1 },
            { question: "How many rings are in the Olympic symbol?", options: ["4", "5", "6", "7"], answer: 1 },
            { question: "Which sport uses a bat and ball?", options: ["Swimming", "Cricket", "Boxing", "Running"], answer: 1 },
            { question: "Which country is famous for sumo wrestling?", options: ["India", "China", "Japan", "Brazil"], answer: 2 },
            { question: "How many players are on a basketball team on court?", options: ["4", "5", "6", "7"], answer: 1 },
            { question: "Which sport is played at Wimbledon?", options: ["Football", "Tennis", "Cricket", "Golf"], answer: 1 },
            { question: "What is the shape of a football?", options: ["Square", "Circular", "Oval", "Triangle"], answer: 1 },
            { question: "Which sport uses a racket?", options: ["Tennis", "Boxing", "Swimming", "Running"], answer: 0 },
            { question: "How many wickets does each team have in cricket?", options: ["8", "10", "12", "15"], answer: 1 },
            { question: "Which sport is associated with the Tour de France?", options: ["Cycling", "Running", "Swimming", "Tennis"], answer: 0 },
            { question: "Which sport is played in a swimming pool?", options: ["Golf", "Water polo", "Cricket", "Hockey"], answer: 1 },
            { question: "What is the national sport of Japan traditionally associated with wrestling?", options: ["Judo", "Sumo", "Karate", "Kendo"], answer: 1 },
            { question: "Which sport uses a golf club?", options: ["Golf", "Tennis", "Baseball", "Hockey"], answer: 0 },
            { question: "How many points is a free throw worth in basketball?", options: ["1", "2", "3", "4"], answer: 0 }
        ],

        Medium: [
            { question: "Which country won the FIFA World Cup in 2022?", options: ["France", "Brazil", "Argentina", "Germany"], answer: 2 },
            { question: "How long is a standard football match excluding added time?", options: ["60 minutes", "80 minutes", "90 minutes", "100 minutes"], answer: 2 },
            { question: "Which player is known as the King of Football?", options: ["Pele", "Maradona", "Ronaldo", "Messi"], answer: 0 },
            { question: "How many players from one volleyball team are on court?", options: ["5", "6", "7", "8"], answer: 1 },
            { question: "Which country hosted the 2016 Summer Olympics?", options: ["China", "Brazil", "Japan", "UK"], answer: 1 },
            { question: "What is the maximum score with one dart in standard darts?", options: ["20", "50", "60", "100"], answer: 2 },
            { question: "Which country invented table tennis?", options: ["China", "England", "Japan", "India"], answer: 1 },
            { question: "What is the distance of a marathon?", options: ["21.1 km", "40 km", "42.195 km", "45 km"], answer: 2 },
            { question: "How many Grand Slam tournaments are there in tennis?", options: ["2", "3", "4", "5"], answer: 2 },
            { question: "Which sport uses the terms birdie and eagle?", options: ["Golf", "Cricket", "Tennis", "Rugby"], answer: 0 },
            { question: "Which country won the first Cricket World Cup in 1975?", options: ["Australia", "India", "West Indies", "England"], answer: 2 },
            { question: "How many players are on a baseball team on the field?", options: ["7", "8", "9", "11"], answer: 2 },
            { question: "Which athlete is famous for winning eight Olympic gold medals in 2008?", options: ["Usain Bolt", "Michael Phelps", "Carl Lewis", "Mark Spitz"], answer: 1 },
            { question: "In which sport is the Davis Cup awarded?", options: ["Football", "Tennis", "Golf", "Hockey"], answer: 1 },
            { question: "What is the term for three strikes in a row in bowling?", options: ["Spare", "Turkey", "Eagle", "Triple"], answer: 1 }
        ],

        Hard: [
            { question: "Who holds the record for the most men's singles Grand Slam titles as of 2024?", options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras"], answer: 2 },
            { question: "In which year were the first modern Olympic Games held?", options: ["1888", "1896", "1900", "1920"], answer: 1 },
            { question: "Which country won the first FIFA World Cup in 1930?", options: ["Brazil", "Italy", "Uruguay", "Argentina"], answer: 2 },
            { question: "What is the standard height of a basketball hoop?", options: ["8 feet", "9 feet", "10 feet", "11 feet"], answer: 2 },
            { question: "In cricket, what is a hat-trick?", options: ["Three boundaries", "Three wickets in consecutive deliveries", "Three catches", "Three sixes"], answer: 1 },
            { question: "Which country has won the most men's Hockey World Cup titles through 2023?", options: ["India", "Australia", "Pakistan", "Germany"], answer: 2 },
            { question: "What is the maximum break in snooker?", options: ["100", "147", "155", "180"], answer: 1 },
            { question: "Which swimming stroke is generally considered the fastest?", options: ["Breaststroke", "Backstroke", "Butterfly", "Freestyle"], answer: 3 },
            { question: "How many events are in a decathlon?", options: ["7", "8", "10", "12"], answer: 2 },
            { question: "Which country hosted the first Asian Games in 1951?", options: ["Japan", "India", "China", "Thailand"], answer: 1 },
            { question: "What is the length of an Olympic swimming pool?", options: ["25 metres", "40 metres", "50 metres", "100 metres"], answer: 2 },
            { question: "Which chess piece moves in an L shape?", options: ["Bishop", "Knight", "Rook", "Queen"], answer: 1 },
            { question: "Which country won the 2011 Cricket World Cup?", options: ["Australia", "Sri Lanka", "India", "Pakistan"], answer: 2 },
            { question: "What is the term for a score of zero in tennis?", options: ["Nil", "Love", "Duck", "Blank"], answer: 1 },
            { question: "Which athlete is known for the 100m world record of 9.58 seconds?", options: ["Carl Lewis", "Tyson Gay", "Usain Bolt", "Yohan Blake"], answer: 2 }
        ]

    },


    // SCIENCE

    Science: {

        Easy: [
            { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1 },
            { question: "Which gas do plants absorb?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], answer: 2 },
            { question: "What is the chemical formula of water?", options: ["CO2", "H2O", "O2", "NaCl"], answer: 1 },
            { question: "How many bones are in an adult human body?", options: ["196", "206", "216", "226"], answer: 1 },
            { question: "Which organ pumps blood?", options: ["Lungs", "Brain", "Heart", "Kidney"], answer: 2 },
            { question: "What is the closest star to Earth?", options: ["Sirius", "Sun", "Polaris", "Vega"], answer: 1 },
            { question: "Which part of a plant absorbs water?", options: ["Leaves", "Flower", "Roots", "Fruit"], answer: 2 },
            { question: "Which sense organ helps us hear?", options: ["Eyes", "Ears", "Nose", "Skin"], answer: 1 },
            { question: "What is the freezing point of water in Celsius?", options: ["0°C", "10°C", "50°C", "100°C"], answer: 0 },
            { question: "Which planet is famous for its rings?", options: ["Mars", "Saturn", "Mercury", "Earth"], answer: 1 },
            { question: "What do humans breathe in to survive?", options: ["Carbon dioxide", "Oxygen", "Helium", "Hydrogen"], answer: 1 },
            { question: "Which part of the body controls thinking?", options: ["Heart", "Brain", "Liver", "Stomach"], answer: 1 },
            { question: "What is the main source of energy for Earth?", options: ["Moon", "Sun", "Wind", "Ocean"], answer: 1 },
            { question: "Which animal is a mammal?", options: ["Crocodile", "Dolphin", "Frog", "Snake"], answer: 1 },
            { question: "Which vitamin is produced in the skin through sunlight exposure?", options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"], answer: 3 }
        ],

        Medium: [
            { question: "What is the atomic number of oxygen?", options: ["6", "7", "8", "9"], answer: 2 },
            { question: "Which blood cells help fight infections?", options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"], answer: 1 },
            { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Cell wall"], answer: 2 },
            { question: "Which gas is most abundant in Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Argon"], answer: 1 },
            { question: "What is the pH of pure water at 25°C?", options: ["3", "5", "7", "9"], answer: 2 },
            { question: "Which planet has the shortest year?", options: ["Earth", "Mercury", "Venus", "Mars"], answer: 1 },
            { question: "What is the SI unit of force?", options: ["Joule", "Watt", "Newton", "Pascal"], answer: 2 },
            { question: "Which part of the eye controls the amount of light entering?", options: ["Retina", "Iris", "Cornea", "Lens"], answer: 1 },
            { question: "What is the chemical symbol for sodium?", options: ["S", "So", "Na", "N"], answer: 2 },
            { question: "Which scientist proposed the three laws of motion?", options: ["Einstein", "Newton", "Darwin", "Galileo"], answer: 1 },
            { question: "What is the largest organ of the human body?", options: ["Liver", "Brain", "Skin", "Lungs"], answer: 2 },
            { question: "Which vitamin helps blood clotting?", options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"], answer: 3 },
            { question: "Which layer protects Earth from much of the Sun's ultraviolet radiation?", options: ["Ozone layer", "Troposphere", "Crust", "Mantle"], answer: 0 },
            { question: "What is the process by which plants make food?", options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"], answer: 1 },
            { question: "Which instrument measures atmospheric pressure?", options: ["Thermometer", "Barometer", "Hygrometer", "Anemometer"], answer: 1 }
        ],

        Hard: [
            { question: "What is the approximate speed of light in vacuum?", options: ["3 × 10^6 m/s", "3 × 10^8 m/s", "3 × 10^10 m/s", "3 × 10^5 m/s"], answer: 1 },
            { question: "Which particle has a negative electric charge?", options: ["Proton", "Neutron", "Electron", "Photon"], answer: 2 },
            { question: "What is the SI unit of electrical resistance?", options: ["Volt", "Ampere", "Ohm", "Watt"], answer: 2 },
            { question: "Which organelle is responsible for protein synthesis?", options: ["Lysosome", "Ribosome", "Mitochondrion", "Golgi body"], answer: 1 },
            { question: "What is the approximate Avogadro constant?", options: ["6.022 × 10^23", "3.14 × 10^8", "9.8 × 10^2", "1.6 × 10^-19"], answer: 0 },
            { question: "Which law explains the relationship between pressure and volume at constant temperature?", options: ["Charles's law", "Boyle's law", "Ohm's law", "Newton's law"], answer: 1 },
            { question: "What is the oxidation state of oxygen in most compounds?", options: ["+1", "-1", "-2", "+2"], answer: 2 },
            { question: "Which type of bond involves sharing electron pairs?", options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], answer: 1 },
            { question: "Which scientist developed the theory of general relativity?", options: ["Newton", "Einstein", "Bohr", "Faraday"], answer: 1 },
            { question: "What is the SI unit of magnetic flux?", options: ["Tesla", "Weber", "Henry", "Gauss"], answer: 1 },
            { question: "Which enzyme begins starch digestion in the mouth?", options: ["Pepsin", "Amylase", "Lipase", "Trypsin"], answer: 1 },
            { question: "Which element has the atomic number 26?", options: ["Copper", "Iron", "Nickel", "Zinc"], answer: 1 },
            { question: "What is the term for the change of a solid directly into a gas?", options: ["Condensation", "Sublimation", "Evaporation", "Fusion"], answer: 1 },
            { question: "Which part of the brain regulates balance and coordination?", options: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"], answer: 1 },
            { question: "What is the SI unit of frequency?", options: ["Joule", "Hertz", "Newton", "Pascal"], answer: 1 }
        ]

    },


    // HISTORY

    History: {

        Easy: [
            { question: "Who was the first President of India?", options: ["Nehru", "Rajendra Prasad", "Sardar Patel", "Gandhi"], answer: 1 },
            { question: "In which year did India gain independence?", options: ["1945", "1946", "1947", "1950"], answer: 2 },
            { question: "Who built the Taj Mahal?", options: ["Akbar", "Shah Jahan", "Babur", "Aurangzeb"], answer: 1 },
            { question: "Who is known as the Father of the Nation in India?", options: ["Nehru", "Mahatma Gandhi", "Subhas Bose", "Bhagat Singh"], answer: 1 },
            { question: "Where is the Great Wall located?", options: ["India", "China", "Japan", "Egypt"], answer: 1 },
            { question: "Who was the first Prime Minister of India?", options: ["Rajendra Prasad", "Jawaharlal Nehru", "Lal Bahadur Shastri", "Indira Gandhi"], answer: 1 },
            { question: "Which ancient civilization built the pyramids at Giza?", options: ["Roman", "Greek", "Egyptian", "Mayan"], answer: 2 },
            { question: "Who discovered the sea route to India around the Cape of Good Hope?", options: ["Columbus", "Vasco da Gama", "Magellan", "Cook"], answer: 1 },
            { question: "Who was the first Mughal emperor?", options: ["Akbar", "Babur", "Humayun", "Shah Jahan"], answer: 1 },
            { question: "Which monument is located in Agra?", options: ["Qutub Minar", "Taj Mahal", "India Gate", "Charminar"], answer: 1 },
            { question: "Who was known as the Iron Man of India?", options: ["Nehru", "Sardar Patel", "Gandhi", "Tilak"], answer: 1 },
            { question: "In which country did the Renaissance begin?", options: ["France", "Italy", "England", "Germany"], answer: 1 },
            { question: "Who was the first woman Prime Minister of India?", options: ["Sarojini Naidu", "Indira Gandhi", "Pratibha Patil", "Sonia Gandhi"], answer: 1 },
            { question: "Which Indian emperor embraced Buddhism after the Kalinga War?", options: ["Chandragupta", "Ashoka", "Harsha", "Akbar"], answer: 1 },
            { question: "Which city was the capital of the Roman Empire?", options: ["Athens", "Rome", "Paris", "London"], answer: 1 }
        ],

        Medium: [
            { question: "In which year did the French Revolution begin?", options: ["1776", "1789", "1804", "1815"], answer: 1 },
            { question: "Who founded the Maurya Empire?", options: ["Ashoka", "Chandragupta Maurya", "Bindusara", "Harsha"], answer: 1 },
            { question: "Which treaty ended World War I between Germany and the Allied Powers?", options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Rome", "Treaty of Vienna"], answer: 1 },
            { question: "Who was the first emperor of Rome?", options: ["Julius Caesar", "Augustus", "Nero", "Trajan"], answer: 1 },
            { question: "In which year did the Battle of Plassey take place?", options: ["1757", "1764", "1857", "1773"], answer: 0 },
            { question: "Who led the Salt March in 1930?", options: ["Nehru", "Mahatma Gandhi", "Subhas Bose", "Tilak"], answer: 1 },
            { question: "Which civilization developed cuneiform writing?", options: ["Egyptian", "Sumerian", "Roman", "Greek"], answer: 1 },
            { question: "Who was the founder of the Mughal Empire in India?", options: ["Akbar", "Babur", "Humayun", "Jahangir"], answer: 1 },
            { question: "When did World War II end?", options: ["1942", "1943", "1945", "1947"], answer: 2 },
            { question: "Who was the first European to reach India by sea around Africa?", options: ["Columbus", "Vasco da Gama", "Magellan", "Marco Polo"], answer: 1 },
            { question: "Which Indian movement began in 1942?", options: ["Swadeshi Movement", "Quit India Movement", "Non-Cooperation Movement", "Civil Disobedience Movement"], answer: 1 },
            { question: "Who was the last Mughal emperor?", options: ["Akbar II", "Bahadur Shah Zafar", "Shah Alam II", "Aurangzeb"], answer: 1 },
            { question: "Which war was fought between the North and South of the United States?", options: ["Revolutionary War", "Civil War", "World War I", "Cold War"], answer: 1 },
            { question: "Who founded the Indian National Congress in 1885 with other early leaders?", options: ["A.O. Hume", "Lord Curzon", "Warren Hastings", "Lord Mountbatten"], answer: 0 },
            { question: "Which ancient university was located in Bihar?", options: ["Taxila", "Nalanda", "Oxford", "Takshashila"], answer: 1 }
        ],

        Hard: [
            { question: "In which year was the Magna Carta signed?", options: ["1066", "1215", "1492", "1648"], answer: 1 },
            { question: "Who was the first ruler of the Gupta Empire?", options: ["Samudragupta", "Chandragupta I", "Chandragupta II", "Skandagupta"], answer: 1 },
            { question: "Which battle in 1526 established Mughal rule in India?", options: ["Battle of Haldighati", "First Battle of Panipat", "Battle of Plassey", "Battle of Talikota"], answer: 1 },
            { question: "Who wrote the Arthashastra?", options: ["Kalidasa", "Kautilya", "Banabhatta", "Megasthenes"], answer: 1 },
            { question: "Which year marked the fall of Constantinople to the Ottomans?", options: ["1204", "1453", "1492", "1517"], answer: 1 },
            { question: "Who was the first woman ruler of the Delhi Sultanate?", options: ["Nur Jahan", "Razia Sultan", "Chand Bibi", "Rani Durgavati"], answer: 1 },
            { question: "The Treaty of Westphalia was signed in which year?", options: ["1517", "1648", "1715", "1815"], answer: 1 },
            { question: "Which Chola ruler led a naval expedition against Srivijaya?", options: ["Rajaraja I", "Rajendra I", "Kulothunga I", "Vijayalaya"], answer: 1 },
            { question: "Who was the British Prime Minister during most of World War II?", options: ["Neville Chamberlain", "Winston Churchill", "Clement Attlee", "Anthony Eden"], answer: 1 },
            { question: "Which ancient Greek historian is often called the Father of History?", options: ["Plato", "Herodotus", "Aristotle", "Socrates"], answer: 1 },
            { question: "In which year was the Battle of Talikota fought?", options: ["1526", "1565", "1576", "1600"], answer: 1 },
            { question: "Who founded the Vijayanagara Empire with his brother Bukka?", options: ["Krishnadevaraya", "Harihara I", "Devaraya II", "Rama Raya"], answer: 1 },
            { question: "Which revolution began in Russia in 1917 and brought the Bolsheviks to power?", options: ["French Revolution", "October Revolution", "Industrial Revolution", "Glorious Revolution"], answer: 1 },
            { question: "Who was the first Governor-General of independent India?", options: ["C. Rajagopalachari", "Lord Mountbatten", "Warren Hastings", "Lord Wavell"], answer: 1 },
            { question: "Which dynasty built the Brihadeeswarar Temple at Thanjavur?", options: ["Pallava", "Chola", "Pandya", "Chera"], answer: 1 }
        ]

    },


    // MATHS

    Maths: {

        Easy: [
            { question: "What is 12 × 8?", options: ["86", "92", "96", "108"], answer: 2 },
            { question: "What is the square root of 144?", options: ["10", "11", "12", "14"], answer: 2 },
            { question: "What is 25% of 200?", options: ["25", "40", "50", "75"], answer: 2 },
            { question: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], answer: 1 },
            { question: "What is 15 + 25?", options: ["30", "35", "40", "45"], answer: 2 },
            { question: "What is 100 - 45?", options: ["45", "50", "55", "65"], answer: 2 },
            { question: "What is 9 × 9?", options: ["72", "81", "90", "99"], answer: 1 },
            { question: "What is half of 80?", options: ["20", "30", "40", "50"], answer: 2 },
            { question: "How many degrees are in a right angle?", options: ["45", "90", "180", "360"], answer: 1 },
            { question: "What is 7 + 8?", options: ["13", "14", "15", "16"], answer: 2 },
            { question: "What is 64 divided by 8?", options: ["6", "7", "8", "9"], answer: 2 },
            { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: 2 },
            { question: "What is 5 squared?", options: ["10", "15", "20", "25"], answer: 3 },
            { question: "How many centimetres are in one metre?", options: ["10", "50", "100", "1000"], answer: 2 },
            { question: "What is the perimeter of a square with side 5 cm?", options: ["10 cm", "15 cm", "20 cm", "25 cm"], answer: 2 }
        ],

        Medium: [
            { question: "Solve: 15 × 12", options: ["160", "170", "180", "190"], answer: 2 },
            { question: "What is 30% of 450?", options: ["125", "135", "145", "150"], answer: 1 },
            { question: "What is the value of 2³?", options: ["4", "6", "8", "16"], answer: 2 },
            { question: "What is the average of 10, 20 and 30?", options: ["15", "20", "25", "30"], answer: 1 },
            { question: "What is the area of a rectangle of length 8 cm and width 5 cm?", options: ["13", "26", "40", "45"], answer: 2 },
            { question: "Solve: 144 ÷ 12", options: ["10", "11", "12", "14"], answer: 2 },
            { question: "What is the next number: 2, 4, 8, 16, ?", options: ["20", "24", "32", "36"], answer: 2 },
            { question: "What is the value of 5² + 3²?", options: ["25", "30", "34", "40"], answer: 2 },
            { question: "What is 3/4 of 100?", options: ["25", "50", "75", "80"], answer: 2 },
            { question: "Solve: 125 × 8", options: ["800", "900", "1000", "1200"], answer: 2 },
            { question: "What is the sum of the angles in a triangle?", options: ["90°", "180°", "270°", "360°"], answer: 1 },
            { question: "If x + 5 = 12, what is x?", options: ["5", "6", "7", "8"], answer: 2 },
            { question: "What is the LCM of 4 and 6?", options: ["8", "10", "12", "24"], answer: 2 },
            { question: "What is 15% of 300?", options: ["30", "40", "45", "50"], answer: 2 },
            { question: "Convert 0.75 into a fraction.", options: ["1/2", "2/3", "3/4", "4/5"], answer: 2 }
        ],

        Hard: [
            { question: "Solve: 15² - 9²", options: ["124", "134", "144", "154"], answer: 2 },
            { question: "What is the derivative of x²?", options: ["x", "2x", "x³", "2"], answer: 1 },
            { question: "What is the value of log₁₀(1000)?", options: ["2", "3", "4", "10"], answer: 1 },
            { question: "Solve: 2x + 7 = 21", options: ["5", "6", "7", "8"], answer: 2 },
            { question: "What is the sum of the first 20 natural numbers?", options: ["190", "200", "210", "220"], answer: 2 },
            { question: "What is the determinant of [[2, 3], [1, 4]]?", options: ["3", "5", "8", "11"], answer: 1 },
            { question: "What is the probability of getting a sum of 7 when two dice are rolled?", options: ["1/12", "1/6", "1/4", "1/3"], answer: 1 },
            { question: "What is the integral of 2x with respect to x?", options: ["x", "x² + C", "2x² + C", "2 + C"], answer: 1 },
            { question: "What is the value of sin 30°?", options: ["0", "1/2", "√3/2", "1"], answer: 1 },
            { question: "What is the smallest positive prime number greater than 50?", options: ["51", "53", "55", "57"], answer: 1 },
            { question: "Solve: (3² × 3³)", options: ["3⁵", "3⁶", "3⁹", "9⁵"], answer: 0 },
            { question: "What is the sum of the interior angles of a pentagon?", options: ["360°", "450°", "540°", "720°"], answer: 2 },
            { question: "If a = 3 and b = 4, what is √(a² + b²)?", options: ["4", "5", "6", "7"], answer: 1 },
            { question: "What is the value of 7!?", options: ["720", "2520", "5040", "7200"], answer: 2 },
            { question: "What is the slope of the line y = 3x + 5?", options: ["3", "5", "8", "1"], answer: 0 }
        ]

    },


    // WORLD

    World: {

        Easy: [
            { question: "What is the capital of Japan?", options: ["Seoul", "Tokyo", "Beijing", "Bangkok"], answer: 1 },
            { question: "Which is the largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 2 },
            { question: "Where is the Eiffel Tower?", options: ["London", "Paris", "Rome", "Berlin"], answer: 1 },
            { question: "Which continent contains the Sahara Desert?", options: ["Asia", "Africa", "Europe", "Australia"], answer: 1 },
            { question: "What is the currency of the UK?", options: ["Euro", "Dollar", "Pound Sterling", "Yen"], answer: 2 },
            { question: "Which country is famous for the pyramids of Giza?", options: ["Egypt", "India", "China", "Mexico"], answer: 0 },
            { question: "What is the capital of India?", options: ["Mumbai", "Chennai", "New Delhi", "Kolkata"], answer: 2 },
            { question: "Which country is shaped like a boot?", options: ["Spain", "Italy", "France", "Germany"], answer: 1 },
            { question: "Which is the largest continent?", options: ["Africa", "Europe", "Asia", "Australia"], answer: 2 },
            { question: "Which country is famous for kangaroos?", options: ["Canada", "Australia", "Brazil", "Russia"], answer: 1 },
            { question: "What is the capital of France?", options: ["Paris", "Madrid", "Lisbon", "Vienna"], answer: 0 },
            { question: "Which ocean lies between Africa and Australia?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], answer: 2 },
            { question: "Which country is home to the Great Wall?", options: ["Japan", "China", "South Korea", "Thailand"], answer: 1 },
            { question: "Which is the coldest continent?", options: ["Europe", "Asia", "Antarctica", "Africa"], answer: 2 },
            { question: "What is the capital of the USA?", options: ["New York", "Washington, D.C.", "Los Angeles", "Chicago"], answer: 1 }
        ],

        Medium: [
            { question: "Which country has the most natural lakes?", options: ["USA", "Canada", "Russia", "Brazil"], answer: 1 },
            { question: "What is the capital of New Zealand?", options: ["Auckland", "Wellington", "Christchurch", "Hamilton"], answer: 1 },
            { question: "Which river flows through Egypt?", options: ["Amazon", "Nile", "Danube", "Ganges"], answer: 1 },
            { question: "Mount Kilimanjaro is located in which country?", options: ["Kenya", "Tanzania", "Uganda", "Ethiopia"], answer: 1 },
            { question: "Which country has the city of Istanbul?", options: ["Greece", "Turkey", "Iran", "Iraq"], answer: 1 },
            { question: "What is the capital of Argentina?", options: ["Santiago", "Lima", "Buenos Aires", "Bogota"], answer: 2 },
            { question: "Which strait separates Europe and Africa?", options: ["Bering Strait", "Strait of Gibraltar", "Malacca Strait", "Dover Strait"], answer: 1 },
            { question: "Which is the smallest independent country in the world by area?", options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"], answer: 2 },
            { question: "Which country has the city of Marrakech?", options: ["Egypt", "Morocco", "Algeria", "Tunisia"], answer: 1 },
            { question: "Which mountain range separates Europe and Asia in part?", options: ["Alps", "Andes", "Ural Mountains", "Himalayas"], answer: 2 },
            { question: "What is the capital of South Korea?", options: ["Busan", "Seoul", "Incheon", "Daegu"], answer: 1 },
            { question: "Which desert is located in Mongolia and China?", options: ["Sahara", "Gobi", "Kalahari", "Atacama"], answer: 1 },
            { question: "Which country has the city of Dubrovnik?", options: ["Croatia", "Serbia", "Bulgaria", "Romania"], answer: 0 },
            { question: "Which river flows through London?", options: ["Seine", "Thames", "Rhine", "Tiber"], answer: 1 },
            { question: "Which is the largest island in the world?", options: ["Madagascar", "Greenland", "Borneo", "New Guinea"], answer: 1 }
        ],

        Hard: [
            { question: "Which country has the longest coastline in the world?", options: ["Russia", "Canada", "Australia", "Indonesia"], answer: 1 },
            { question: "What is the capital of Bhutan?", options: ["Paro", "Thimphu", "Punakha", "Kathmandu"], answer: 1 },
            { question: "Which African country was formerly known as Abyssinia?", options: ["Ethiopia", "Sudan", "Somalia", "Eritrea"], answer: 0 },
            { question: "Which strait connects the Persian Gulf to the Gulf of Oman?", options: ["Malacca Strait", "Strait of Hormuz", "Bering Strait", "Bab-el-Mandeb"], answer: 1 },
            { question: "Which country contains the ancient city of Petra?", options: ["Lebanon", "Jordan", "Syria", "Iraq"], answer: 1 },
            { question: "What is the capital of Kyrgyzstan?", options: ["Tashkent", "Bishkek", "Dushanbe", "Almaty"], answer: 1 },
            { question: "Which river forms much of the border between Mexico and the USA?", options: ["Colorado", "Rio Grande", "Mississippi", "Amazon"], answer: 1 },
            { question: "Which country has the most time zones when including its overseas territories?", options: ["Russia", "France", "USA", "China"], answer: 1 },
            { question: "Which sea has no land coastline and is defined by ocean currents?", options: ["Arabian Sea", "Sargasso Sea", "Coral Sea", "Baltic Sea"], answer: 1 },
            { question: "Which is the deepest known ocean trench?", options: ["Java Trench", "Tonga Trench", "Mariana Trench", "Peru-Chile Trench"], answer: 2 },
            { question: "Which country is completely surrounded by South Africa?", options: ["Eswatini", "Lesotho", "Botswana", "Namibia"], answer: 1 },
            { question: "Which river flows through Baghdad?", options: ["Euphrates", "Tigris", "Jordan", "Nile"], answer: 1 },
            { question: "What is the capital of Madagascar?", options: ["Antananarivo", "Maputo", "Lusaka", "Harare"], answer: 0 },
            { question: "Which country has the city of Samarkand?", options: ["Kazakhstan", "Uzbekistan", "Turkmenistan", "Tajikistan"], answer: 1 },
            { question: "Which lake is the deepest freshwater lake in the world?", options: ["Lake Superior", "Lake Victoria", "Lake Baikal", "Lake Tanganyika"], answer: 2 }
        ]

    },


    // TECHNOLOGY

    Technology: {

        Easy: [
            { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "Hyper Tool Markup Language", "Home Text Language"], answer: 0 },
            { question: "Which language makes websites interactive?", options: ["HTML", "CSS", "JavaScript", "SQL"], answer: 2 },
            { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Power Unit", "Control Program Unit"], answer: 0 },
            { question: "Which one is a web browser?", options: ["Linux", "Chrome", "Python", "MySQL"], answer: 1 },
            { question: "What does CSS control?", options: ["Database", "Server", "Website styling", "Programming logic"], answer: 2 },
            { question: "Which device is used to type text?", options: ["Monitor", "Keyboard", "Speaker", "Printer"], answer: 1 },
            { question: "What does URL stand for?", options: ["Uniform Resource Locator", "Universal Record Link", "User Reference Location", "Uniform Reading Language"], answer: 0 },
            { question: "Which company developed Windows?", options: ["Apple", "Google", "Microsoft", "IBM"], answer: 2 },
            { question: "Which device displays computer output?", options: ["Keyboard", "Mouse", "Monitor", "Scanner"], answer: 2 },
            { question: "What does RAM stand for?", options: ["Read Access Memory", "Random Access Memory", "Rapid Action Module", "Run Application Memory"], answer: 1 },
            { question: "Which of these is a programming language?", options: ["HTML", "JavaScript", "HTTP", "CSS"], answer: 1 },
            { question: "What is used to connect to the internet wirelessly?", options: ["Wi-Fi", "HDMI", "USB", "VGA"], answer: 0 },
            { question: "Which company created the Android operating system originally?", options: ["Apple", "Google", "Samsung", "Microsoft"], answer: 1 },
            { question: "What does USB stand for?", options: ["Universal Serial Bus", "United System Board", "Universal Software Base", "User Service Bus"], answer: 0 },
            { question: "Which symbol is commonly used for email addresses?", options: ["#", "@", "&", "%"], answer: 1 }
        ],

        Medium: [
            { question: "Which HTML tag creates a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], answer: 1 },
            { question: "Which CSS property changes text colour?", options: ["font-style", "color", "background", "text-size"], answer: 1 },
            { question: "Which JavaScript keyword declares a block-scoped variable?", options: ["var", "let", "define", "static"], answer: 1 },
            { question: "What does API stand for?", options: ["Application Programming Interface", "Advanced Program Internet", "Application Process Integration", "Automated Programming Input"], answer: 0 },
            { question: "Which database language is used to query relational databases?", options: ["HTML", "SQL", "CSS", "XML"], answer: 1 },
            { question: "What does DOM stand for?", options: ["Document Object Model", "Data Operation Method", "Digital Output Module", "Document Order Management"], answer: 0 },
            { question: "Which HTTP method is commonly used to retrieve data?", options: ["POST", "GET", "DELETE", "PATCH"], answer: 1 },
            { question: "What is Git mainly used for?", options: ["Image editing", "Version control", "Web hosting", "Database management"], answer: 1 },
            { question: "Which JavaScript method converts JSON text into an object?", options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.object()"], answer: 1 },
            { question: "What does responsive web design mean?", options: ["Fast website loading", "Website adapts to different screen sizes", "Website uses animations", "Website stores data"], answer: 1 },
            { question: "Which protocol is used for secure web communication?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], answer: 2 },
            { question: "Which CSS layout system is one-dimensional?", options: ["Grid", "Flexbox", "Table", "Float"], answer: 1 },
            { question: "What does JSON stand for?", options: ["JavaScript Object Notation", "Java Standard Object Network", "JavaScript Online Network", "Joint System Object Name"], answer: 0 },
            { question: "Which JavaScript array method creates a new array by transforming elements?", options: ["forEach()", "map()", "push()", "pop()"], answer: 1 },
            { question: "Which company developed the React library?", options: ["Google", "Meta", "Microsoft", "Amazon"], answer: 1 }
        ],

        Hard: [
            { question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n²)", "O(1)"], answer: 1 },
            { question: "Which data structure follows LIFO?", options: ["Queue", "Stack", "Tree", "Graph"], answer: 1 },
            { question: "What is a closure in JavaScript?", options: ["A loop", "A function with access to its outer lexical scope", "An object method", "An HTML element"], answer: 1 },
            { question: "Which HTTP status code means Not Found?", options: ["200", "301", "404", "500"], answer: 2 },
            { question: "What is the time complexity of accessing an array element by index?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], answer: 0 },
            { question: "Which database property ensures atomicity in ACID?", options: ["Atomicity", "Consistency", "Isolation", "Durability"], answer: 0 },
            { question: "What is the purpose of the event loop in JavaScript?", options: ["Style HTML", "Coordinate asynchronous callbacks", "Create databases", "Compile CSS"], answer: 1 },
            { question: "Which sorting algorithm has average time complexity O(n log n)?", options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Linear Search"], answer: 2 },
            { question: "What does REST stand for?", options: ["Representational State Transfer", "Remote System Technology", "Resource Standard Transfer", "Representational Server Technology"], answer: 0 },
            { question: "Which JavaScript method creates a promise that settles when all input promises settle?", options: ["Promise.all()", "Promise.race()", "Promise.allSettled()", "Promise.resolve()"], answer: 2 },
            { question: "What is the main purpose of an index in a database?", options: ["Encrypt data", "Improve data retrieval speed", "Delete duplicate records", "Create tables"], answer: 1 },
            { question: "Which data structure is commonly used in breadth-first search?", options: ["Stack", "Queue", "Heap", "Hash table"], answer: 1 },
            { question: "What is the output of typeof null in JavaScript?", options: ["null", "undefined", "object", "number"], answer: 2 },
            { question: "Which principle hides internal implementation details?", options: ["Inheritance", "Encapsulation", "Polymorphism", "Recursion"], answer: 1 },
            { question: "What is the time complexity of merge sort in the average case?", options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"], answer: 2 }
        ]

    }

};

// START QUIZ

function startQuiz(level) {
    currentLevel = level;
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    questions = [...questionBank[currentCategory][currentLevel]];

    // Shuffle questions

    questions.sort(() => Math.random() - 0.5);
    showPage("quizPage");
    document.getElementById("quizCategory").textContent =
        currentCategory + " - " + currentLevel;
    displayQuestion();
}

// DISPLAY QUESTION

function displayQuestion() {
    selectedAnswer = null;
    let question = questions[currentQuestion];
    let total = questions.length;
    let percentage = Math.round(
        ((currentQuestion + 1) / total) * 100
    );
    document.getElementById("questionNumber").textContent =
        `Question ${currentQuestion + 1} of ${total}`;
    document.getElementById("progressPercent").textContent =
        percentage + "%";
    document.getElementById("progress").style.width =
        percentage + "%";
    document.getElementById("questionText").textContent =
        question.question;
    let optionsHTML = "";
    question.options.forEach((option, index) => {
        optionsHTML += `
            <button class="option-btn"
                onclick="selectAnswer(${index}, this)">
                ${String.fromCharCode(65 + index)}. ${option}
            </button>
        `;
    });
    document.getElementById("optionsContainer").innerHTML =
        optionsHTML;
    let nextBtn = document.getElementById("nextBtn");
    nextBtn.disabled = true;
    nextBtn.textContent =
        currentQuestion === total - 1
            ? "Finish Quiz →"
            : "Next Question →";

}

// SELECT ANSWER

function selectAnswer(index, button) {
    selectedAnswer = index;
    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.classList.remove("selected");
    });
    button.classList.add("selected");
    document.getElementById("nextBtn").disabled = false;
}

// NEXT QUESTION

document.getElementById("nextBtn").addEventListener("click", function() {
    if (selectedAnswer === null) return;
    if (selectedAnswer === questions[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
});

// RESULTS

function showResults() {
    showPage("resultPage");

    let total = questions.length;
    let wrong = total - score;
    let percentage = Math.round((score / total) * 100);
    document.getElementById("scoreText").textContent =
        score + "/" + total;
    document.getElementById("correctCount").textContent =
        score;
    document.getElementById("wrongCount").textContent =
        wrong;
    document.getElementById("resultMessage").textContent =
        percentage === 100
            ? "Perfect Score!"
            : percentage >= 60
                ? "Excellent Work!"
                : "Keep Practising!";
    document.getElementById("resultDescription").textContent =
        `You scored ${percentage}%. Keep learning and improving!`;
}

// EXIT QUIZ

function exitQuiz() {
    if (confirm("Are you sure you want to exit the quiz?")) {
        showPage("categoryPage");
    }
}

// PROFILE

function showProfile() {
    if (!currentUser) return;
    document.getElementById("profileName").textContent =
        currentUser.name;
    document.getElementById("profileEmail").textContent =
        currentUser.email;
    document.getElementById("profileAvatar").textContent =
        currentUser.name.charAt(0).toUpperCase();
    document.getElementById("editName").value =
        currentUser.name;
    document.getElementById("editEmail").value =
        currentUser.email;
    showPage("profilePage");
}

// EDIT PROFILE

document.getElementById("editProfileForm")
.addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("editName").value.trim();
    let email = document.getElementById("editEmail").value.trim().toLowerCase();
    if (!name || !email) {
    alert("Please fill in all fields.");
    return;
    }
    let users = getUsers();
    let duplicate = users.some(user =>
        user.email === email && user.email !== currentUser.email
    );
    if (duplicate) {
        alert("This email is already registered.");
        return;
    }
    let index = users.findIndex(user =>
        user.email === currentUser.email
    );
    if (index === -1) return;
    users[index].name = name;
    users[index].email = email;
    saveUsers(users);
    currentUser = users[index];
    localStorage.setItem("quizoraSession", email);
    updateNavbar();
    showProfile();
    alert("Profile updated successfully!");
});

// CHANGE PASSWORD

document.getElementById("changePasswordForm")
.addEventListener("submit", function(event) {
    event.preventDefault();
    if (!currentUser) return;
    let oldPassword = document.getElementById("oldPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    
    // Check empty fields

    if (!oldPassword || !newPassword) {
        alert("Please fill in all fields.");
        return;
    }

    // Check current password

    if (oldPassword !== currentUser.password) {
        alert("Current password is incorrect.");
        return;
    }
    let users = getUsers();
    let index = users.findIndex(user =>
        user.email === currentUser.email
    );
    users[index].password = newPassword;
    saveUsers(users);
    currentUser = users[index];
    document.getElementById("changePasswordForm").reset();
    alert("Password changed successfully!");
});

// DELETE ACCOUNT

function deleteAccount() {
    let confirmDelete = confirm(
        "Are you sure you want to delete your account?"
    );
    if (!confirmDelete) return;
    let users = getUsers();
    users = users.filter(user =>
        user.email !== currentUser.email
    );
    saveUsers(users);
    localStorage.removeItem("quizoraSession");
    currentUser = null;
    updateNavbar();
    showPage("homePage");
    alert("Account deleted successfully!");
}

// RESTORE LOGIN SESSION

function restoreSession() {
    let email = localStorage.getItem("quizoraSession");
    if (!email) return;
    let user = getUsers().find(item => item.email === email);
    if (user) {
        currentUser = user;
        updateNavbar();
        showPage("categoryPage");
    }
}

// INITIALIZE APPLICATION

restoreSession();