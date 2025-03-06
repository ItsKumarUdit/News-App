const API_KEY = "a7d1185aef9b439483c9fa3a54314b09";
        const BASE_URL = "https://newsapi.org/v2/everything";

        async function fetchNews() {
            const query = document.getElementById("query").value.trim();
            if (!query) {
                alert("Please enter a topic to search.");
                return;
            }

            const url = `${BASE_URL}?q=${query}&apiKey=${API_KEY}`;
            document.getElementById("news-container").innerHTML = "<p>Loading...</p>";

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (!data.articles || data.articles.length === 0) {
                    document.getElementById("news-container").innerHTML = "<p>No news found!</p>";
                    return;
                }

                document.getElementById("news-container").innerHTML = data.articles
                    .slice(0, 5)
                    .map(article => `
                        <div class="news-card">
                            <img src="${article.urlToImage || 'https://via.placeholder.com/400'}" alt="News Image">
                            <h3>${article.title}</h3>
                            <p>${article.description || 'No description available.'}</p>
                            <a href="${article.url}" target="_blank">Read More</a>
                        </div>
                    `)
                    .join("");
            } catch (error) {
                console.error("Error fetching news:", error);
                document.getElementById("news-container").innerHTML = "<p>Failed to load news. Please try again later.</p>";
            }
        }