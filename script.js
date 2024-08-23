async function searchSite() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    // Loop through each page's metadata
    for (const page of siteContentMetadata) {
        try {
            // Fetch the content of each page
            const response = await fetch(page.page);
            const htmlText = await response.text();
            
            // Create a temporary DOM to parse the fetched content
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            const pageText = doc.body.innerText.toLowerCase();

            // Check if the query exists in the page content
            if (pageText.includes(query) && query) {
                // Extract a snippet that includes the search query for context
                const index = pageText.indexOf(query);
                const snippet = doc.body.innerText.substring(index - 50, index + 50); // Grabs text around the query
                
                // Highlight the matching word in the snippet
                const highlightedSnippet = snippet.replace(new RegExp(query, 'gi'), match => `<mark>${match}</mark>`);

                // Create a result item to display
                const resultItem = document.createElement('div');
                resultItem.innerHTML = `
                    <h3>Section: ${page.section}</h3>
                    <p>...${highlightedSnippet}...</p>
                    <a href="${page.page}">Go to section</a>
                `;
                
                resultsContainer.appendChild(resultItem);
            }
        } catch (error) {
            console.error(`Error fetching content from ${page.page}:`, error);
        }
    }

    // Display a "No results found" message if no results were found
    if (!resultsContainer.innerHTML && query) {
        resultsContainer.innerHTML = '<p>No results found</p>';
    }
}
