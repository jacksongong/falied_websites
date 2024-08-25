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
                const snippet = doc.body.innerText.substring(index - 100, index + 100); // Grabs text around the query
                
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



function scrollImage() {
    var stickyImage = document.querySelector('.fixed-image');
    var initialPosition = 410; // The initial position (top: 400px)
    var navbarHeight = document.querySelector('header').offsetHeight;
    var scrollY = window.scrollY; // Current scroll position
    var paddingRight = 75; // Add padding to the right
    var paddingTop = 20; // Add padding below the navbar

    var bottomLimit = document.querySelector('.last_header_font').offsetTop

    // If the user scrolls past the image's top position, fix the image
    if (scrollY >= initialPosition - navbarHeight) {
        stickyImage.style.position = 'fixed';
        stickyImage.style.top = (navbarHeight + paddingTop) + 'px'; // Stick the image below the navbar with padding
        stickyImage.style.right = paddingRight + 'px'; // Add padding to the right side
        stickyImage.style.marginRight = '0'; // Remove any margin-right
    } 

    else if (scrollY >= bottomLimit) {
        stickyImage.style.position = 'absolute';
        stickyImage.style.top = bottomLimit + 'px'; // Set the top position to where the image should be in the flow
        stickyImage.style.right = '0'; // Ensure it stays aligned to the right
        stickyImage.style.marginRight = '75px'; // Reset the original margin-right
    }
    // When scrolling back up, return to the original position but don't go above it
    else {
        stickyImage.style.position = 'absolute';
        stickyImage.style.top = initialPosition + 'px'; // Reset to the initial top position
        stickyImage.style.right = '0'; // Ensure it stays aligned to the right
        stickyImage.style.marginRight = '75px'; // Reset the original margin-right
    }
}

window.addEventListener('scroll', scrollImage);



