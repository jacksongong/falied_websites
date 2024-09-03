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

document.addEventListener('DOMContentLoaded', function () {
    // Ensure the image is correctly positioned at load
    positionImage('.fixed-image-blog1', '.article1', 200);
    positionImage('.fixed-image-blog2', '.article2', 0);
    
});


function positionImage(imageSelector, startSelector, offset) {
    var stickyImage = document.querySelector(imageSelector);
    var startElement = document.querySelector(startSelector);
    if (startElement && stickyImage) {
        var adjustedTopPosition = startElement.offsetTop + offset;
        stickyImage.style.position = 'absolute';
        stickyImage.style.top = adjustedTopPosition + 'px';
    } else {
        console.error('Element not found, check your selector or element existence.');
    }
}





function scroll_Image(startSelector, endSelector, startOffset = 0, endOffset = 0) {
    var stickyImage = document.querySelector('.fixed-image-blog');
    var startElement = document.querySelector(startSelector);
    var endElement = document.querySelector(endSelector);

    // Calculate the start and end positions including offsets
    var startPosition = startElement.offsetTop + startOffset;
    var endPosition = endElement.offsetTop + endOffset;

    var navbarHeight = document.querySelector('header').offsetHeight;
    var scrollY = window.scrollY;

    if (scrollY >= startPosition - navbarHeight && scrollY < endPosition) {
        stickyImage.style.position = 'fixed';
        stickyImage.style.top = navbarHeight + 'px'; // Adjust based on your header size
    } else if (scrollY >= endPosition) {
        stickyImage.style.position = 'absolute';
        stickyImage.style.top = endPosition + 'px'; // Fix the image at the end position
    } else {
        stickyImage.style.position = 'absolute';
        stickyImage.style.top = startPosition + 'px'; // Reset to the start position
    }
}


function scroll_Image(startSelector, endSelector, startOffset = 0, endOffset = 0) {
    var stickyImage = document.querySelector('.fixed-image-blog1');
    var startElement = document.querySelector(startSelector);
    var endElement = document.querySelector(endSelector);

    // Calculate the start and end positions including offsets
    var startPosition = startElement.offsetTop + startOffset;
    var endPosition = endElement.offsetTop + endOffset;

    var navbarHeight = document.querySelector('header').offsetHeight;
    var scrollY = window.scrollY;

    if (scrollY >= startPosition - navbarHeight && scrollY < endPosition) {
        stickyImage.style.position = 'fixed';
        stickyImage.style.top = navbarHeight + 'px'; // Adjust based on your header size
    } else if (scrollY >= endPosition) {
        stickyImage.style.position = 'absolute';
        stickyImage.style.top = endPosition + 'px'; // Fix the image at the end position
    } else {
        stickyImage.style.position = 'absolute';
        stickyImage.style.top = startPosition + 'px'; // Reset to the start position
    }
}

function scroll_Image1(startSelector, endSelector, startOffset = 0, endOffset = 0) {
    var stickyImage = document.querySelector('.fixed-image-blog2');
    var startElement = document.querySelector(startSelector);
    var endElement = document.querySelector(endSelector);

    // Calculate the start and end positions including offsets
    var startPosition = startElement.offsetTop + startOffset;
    var endPosition = endElement.offsetTop + endOffset;

    var navbarHeight = document.querySelector('header').offsetHeight;
    var scrollY = window.scrollY;

    if (scrollY >= startPosition - navbarHeight && scrollY < endPosition) {
        stickyImage.style.position = 'fixed';
        stickyImage.style.top = navbarHeight + 'px'; // Adjust based on your header size
    } else if (scrollY >= endPosition) {
        stickyImage.style.position = 'absolute';
        stickyImage.style.top = endPosition + 'px'; // Fix the image at the end position
    } else {
        stickyImage.style.position = 'absolute';
        stickyImage.style.top = startPosition + 'px'; // Reset to the start position
    }
}


function scrollImage(startSelector, endSelector, offset = 0) {
    var stickyImage = document.querySelector('.fixed-image');
    var startElement = document.querySelector(startSelector);
    var endElement = document.querySelector(endSelector);

    // Get the top position of the start and end elements
    var startPosition = startElement.offsetTop; // Adjust the start position by the offset
    var endPosition = endElement.offsetTop - offset;

    var navbarHeight = document.querySelector('header').offsetHeight;
    var scrollY = window.scrollY; // Current scroll position

    // If the user scrolls past the start position but before the end position, fix the image
    if (scrollY >= startPosition - navbarHeight && scrollY < endPosition) {
        stickyImage.style.position = 'fixed';
        stickyImage.style.top = navbarHeight + 'px'; // Stick the image below the navbar
    } 
    // If the user scrolls past the end position, fix the image at the end position
    else if (scrollY >= endPosition) {
        stickyImage.style.position = 'absolute';
        stickyImage.style.top = endPosition + 'px'; // Fix the image at the end position
    }
    // When scrolling back up, return to the start position but don't go above it
    else {
        stickyImage.style.position = 'absolute';
        stickyImage.style.top = startPosition + 'px'; // Reset to the start position
    }
}


function scroll_Image2(startSelector, endSelector, startOffset = 0, endOffset = 0) {
    var stickyImage = document.querySelector('.fixed-image-2');
    var startElement = document.querySelector(startSelector);
    var endElement = document.querySelector(endSelector);

    // Calculate the start and end positions including offsets
    var startPosition = startElement.offsetTop + startOffset;
    var endPosition = endElement.offsetTop + endOffset;

    var navbarHeight = document.querySelector('header').offsetHeight;
    var scrollY = window.scrollY;

    if (scrollY >= startPosition - navbarHeight && scrollY < endPosition) {
        stickyImage.style.position = 'fixed';
        stickyImage.style.top = navbarHeight + 'px'; // Adjust based on your header size
    } else if (scrollY >= endPosition) {
        stickyImage.style.position = 'absolute';
        stickyImage.style.top = endPosition + 'px'; // Fix the image at the end position
    } else {
        stickyImage.style.position = 'absolute';
        stickyImage.style.top = startPosition + 'px'; // Reset to the start position
    }
}






window.addEventListener('load', function() {
    const images = document.querySelectorAll('.leadership-profile img');
    let maxHeight = 0;

    // Step 1: Find the tallest image
    images.forEach(image => {
        const height = image.getBoundingClientRect().height;
        if (height > maxHeight) {
            maxHeight = height;
        }
    });

    // Step 2: Adjust top margin for shorter images to align their bottom with the tallest image
    images.forEach(image => {
        const currentHeight = image.getBoundingClientRect().height;
        if (currentHeight < maxHeight) {
            const topMargin = maxHeight - currentHeight;
            image.style.marginTop = `${topMargin}px`;
        }
    });
});





window.addEventListener('load', function() {
    console.log("Page fully loaded.");

    // Clear any lingering overlays or modal issues
    hideOverlaysAndResetFocus();

    // Log all buttons to ensure they're correctly detected
    var buttons = document.querySelectorAll('button');
    console.log("Buttons detected:", buttons);

    // Ensure buttons are enabled and interactive
    buttons.forEach(function(button) {
        button.disabled = false; // Make sure no button is disabled
        button.style.pointerEvents = 'auto'; // Ensure buttons are clickable
    });
});

function hideOverlaysAndResetFocus() {
    // Hide any modals that might still be active
    var modal = document.getElementById("image-modal");
    if (modal) {
        modal.style.display = "none"; // Ensure the modal is hidden on page load
        console.log("Modal hidden.");
    }

    // Remove focus from any active element
    if (document.activeElement) {
        document.activeElement.blur();
        console.log("Active element blurred.");
    }
}

// Modal functionality remains the same
var modal = document.getElementById("image-modal");
var modalImg = document.getElementById("modal-image");
var closeBtn = document.getElementsByClassName("close")[0];

var images = document.getElementsByClassName("enlargeable-image");

for (var i = 0; i < images.length; i++) {
    images[i].onclick = function(event) {
        event.preventDefault(); // Prevent default click behavior
        modal.style.display = "flex"; // Show the modal
        modal.classList.add("show"); // Add "show" class to trigger CSS transitions
        modalImg.src = this.src; // Set the modal image source to the clicked image
        console.log("Image clicked, modal shown.");
    }
}

closeBtn.onclick = function() {
    modal.classList.remove("show"); // Remove "show" class
    setTimeout(function() {
        modal.style.display = "none"; // Hide the modal after the transition
        console.log("Modal closed.");
    }, 500);
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove("show");
        setTimeout(function() {
            modal.style.display = "none";
            console.log("Modal closed by outside click.");
        }, 500);
    }
}