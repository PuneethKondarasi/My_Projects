document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const output = document.getElementById("output");
    const page3 = document.querySelector(".page_3");

    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        const topic = document.getElementById("search").value;
        const videos = await searchYouTubeVideos(topic);
        displayYouTubeVideos(videos);
        searchStudyMaterial(topic);
    });
});

function searchStudyMaterial(topic) {
    const cx = config.googleCx;
    const apiKey = config.googleApiKey;

    const url = `https://www.googleapis.com/customsearch/v1?q=${topic}&cx=${cx}&key=${apiKey}&num=5`;  // Limit to 5 results

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Google Search Results:', data);
            displaySearchResults(data.items);
        })
        .catch(error => console.error('Error fetching Google search results:', error));
}

function displaySearchResults(results) {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "<h3>Here are some study materials for you: </h3>";

    results.forEach(item => {
        const link = document.createElement("a");
        link.href = item.link;
        link.textContent = item.title;
        outputDiv.appendChild(link);
        outputDiv.appendChild(document.createElement("br"));
    });
}

function searchYouTubeVideos(topic) {
    const apiKey = config.youtubeApiKey;
    const maxResults = 5;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${topic}&key=${apiKey}&maxResults=${maxResults}&type=video`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('YouTube Videos:', data);
            return data.items;
        })
        .catch(error => console.error('Error fetching YouTube videos:', error));
}

async function displayYouTubeVideos(videos) {
    const page3 = document.querySelector(".page_3");
    page3.innerHTML = "";
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("scrollable-row");
    const bestVideosTitle = document.createElement("h2");
    bestVideosTitle.textContent = "Best Videos";
    const bestVideosContainer = document.createElement("div");
    bestVideosContainer.classList.add("scrollable-row");
    for (const video of videos) {
        const videoDiv = document.createElement("div");
        videoDiv.classList.add("video");
        const videoTitle = document.createElement("h3");
        videoTitle.textContent = video.snippet.title;
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${video.id.videoId}`;
        iframe.width = "460";
        iframe.height = "250";
        iframe.allowFullscreen = true;
        iframe.title = video.snippet.title;
        videoDiv.appendChild(videoTitle);
        videoDiv.appendChild(iframe);
        bestVideosContainer.appendChild(videoDiv);
    }
    page3.appendChild(bestVideosTitle);
    page3.appendChild(bestVideosContainer);
}
