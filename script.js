
const news = [
    {
        title: "Maharashtra Announces New Technology Initiative",
        description: "The Maharashtra government has announced a new initiative to support technology and digital innovation.",
        category: "Technology",
        state: "Maharashtra",
        language: "English",
        date: "today",
        source: "ShortNews",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },

    {
        title: "India Wins Exciting Cricket Match",
        description: "India secured a thrilling victory after a close match in front of a packed stadium.",
        category: "Sports",
        state: "Maharashtra",
        language: "English",
        date: "today",
        source: "Sports Desk",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e"
    },

    {
        title: "मुंबई में नई बिजनेस योजना की घोषणा",
        description: "मुंबई में छोटे व्यवसायों को बढ़ावा देने के लिए नई योजना की घोषणा की गई है।",
        category: "Business",
        state: "Maharashtra",
        language: "Hindi",
        date: "today",
        source: "ShortNews Hindi",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e"
    },

    {
        title: "नवीन तंत्रज्ञानामुळे महाराष्ट्रात रोजगाराच्या संधी वाढणार",
        description: "नवीन तंत्रज्ञानामुळे राज्यात रोजगाराच्या नवीन संधी निर्माण होण्याची अपेक्षा आहे.",
        category: "Technology",
        state: "Maharashtra",
        language: "Marathi",
        date: "yesterday",
        source: "ShortNews Marathi",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    },

    {
        title: "New Business Investment Announced in Gujarat",
        description: "A major investment proposal is expected to create thousands of new jobs in Gujarat.",
        category: "Business",
        state: "Gujarat",
        language: "English",
        date: "yesterday",
        source: "Business Desk",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72"
    },

    {
        title: "Delhi Hosts Major Political Meeting",
        description: "Senior political leaders gathered in Delhi for an important meeting today.",
        category: "Politics",
        state: "Delhi",
        language: "English",
        date: "today",
        source: "Political Desk",
        image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620"
    },

    {
        title: "New Film Creates Buzz Across India",
        description: "The upcoming movie has generated strong interest among audiences across the country.",
        category: "Entertainment",
        state: "Karnataka",
        language: "Hindi",
        date: "yesterday",
        source: "Entertainment Desk",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
    },

    {
        title: "Bengaluru Startup Launches New AI Product",
        description: "A Bengaluru-based startup has launched a new artificial intelligence product.",
        category: "Technology",
        state: "Karnataka",
        language: "English",
        date: "today",
        source: "Tech Desk",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
    }
];


const newsContainer = document.getElementById("newsContainer");
const noNews = document.getElementById("noNews");
const newsCount = document.getElementById("newsCount");

const categoryFilter = document.getElementById("categoryFilter");
const stateFilter = document.getElementById("stateFilter");
const languageFilter = document.getElementById("languageFilter");
const dateFilter = document.getElementById("dateFilter");


function displayNews(filteredNews) {

    newsContainer.innerHTML = "";

    newsCount.innerText = `${filteredNews.length} news`;

    if (filteredNews.length === 0) {
        noNews.style.display = "block";
        return;
    }

    noNews.style.display = "none";


    filteredNews.forEach(item => {

        const card = document.createElement("div");

        card.className = "news-card";

        card.innerHTML = `
            <img
                src="${item.image}"
                alt="${item.title}"
                class="news-image"
            >

            <div class="news-content">

                <span class="news-category">
                    ${item.category}
                </span>

                <h3 class="news-title">
                    ${item.title}
                </h3>

                <p class="news-description">
                    ${item.description}
                </p>

                <div class="news-meta">
                    <p><strong>State:</strong> ${item.state}</p>
                    <p><strong>Language:</strong> ${item.language}</p>
                    <p><strong>Date:</strong> ${capitalize(item.date)}</p>
                    <p><strong>Source:</strong> ${item.source}</p>
                </div>

            </div>
        `;

        newsContainer.appendChild(card);

    });
}


function filterNews() {

    const category = categoryFilter.value;
    const state = stateFilter.value;
    const language = languageFilter.value;
    const date = dateFilter.value;


    const filteredNews = news.filter(item => {

        const categoryMatch =
            category === "all" ||
            item.category === category;

        const stateMatch =
            state === "all" ||
            item.state === state;

        const languageMatch =
            language === "all" ||
            item.language === language;

        const dateMatch =
            date === "all" ||
            item.date === date;


        return (
            categoryMatch &&
            stateMatch &&
            languageMatch &&
            dateMatch
        );

    });


    displayNews(filteredNews);
}


function capitalize(value) {

    return value.charAt(0).toUpperCase() + value.slice(1);

}


categoryFilter.addEventListener("change", filterNews);
stateFilter.addEventListener("change", filterNews);
languageFilter.addEventListener("change", filterNews);
dateFilter.addEventListener("change", filterNews);


displayNews(news);
