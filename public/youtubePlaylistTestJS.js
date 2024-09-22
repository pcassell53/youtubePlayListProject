// below listed default settings
AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    easing: 'ease-out-back',
    duration: 800,
    delay: 300,
    disable: 'mobile'
    });
    const menuBtn = document.querySelector('.menu-btn');
    let menuOpen = false;
    menuBtn.addEventListener('click', () => {
    if(!menuOpen) {
    menuBtn.classList.add('open');
    menuOpen = true;
    } else {
    menuBtn.classList.remove('open');
    menuOpen = false;
    }
    });
    
    // Youtube Playlist
    // Example of your client-side code that manages the playlist and video display
    const playlist = [
        { videoId: 'KNTbtDhaTVA', title: 'Video 1' },
        { videoId: 'q0LmOlSb8EU', title: 'Video 2' },
        { videoId: 'wHYdiZ-pydU', title: 'Video 3' },
        { videoId: 't9AoCGwxtNM', title: 'Video 4' },
        { videoId: 'VmFbyCWOr3E', title: 'Video 5' },
        { videoId: 'HUTthghQm60', title: 'Video 6' }
    ];
    
    const playerContainer = document.getElementById('player');
    const playlistContainer = document.getElementById('playlist');
    
    // Create video items in the playlist
    playlist.forEach(video => {
        createPlaylistItem(video, playlistContainer);
    });
    
    // Function to load a video into the player
    function loadVideo(videoId) {
        playerContainer.src = `https://www.youtube.com/embed/${videoId}?rel=0`;
    }
    
    // Function to create a playlist item
    function createPlaylistItem(video, container) {
        // Fetch video details from your server instead of YouTube API directly
        fetch(`/api/videos?id=${video.videoId}`)
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    const videoDetails = data.items[0].snippet;
    
                    // Create a list item for each video
                    const listItem = document.createElement('li');
                    listItem.dataset.videoId = video.videoId;
                    listItem.classList.add('playlist-item');
    
                    // Create a thumbnail image element
                    const thumbnail = document.createElement('img');
                    thumbnail.src = videoDetails.thumbnails.high.url; // Use high resolution thumbnail
                    thumbnail.alt = 'Video Thumbnail';
                    thumbnail.classList.add('thumbnail');
                    listItem.appendChild(thumbnail);
    
                    // Create the video title element
                    const videoTitle = document.createElement('span');
                    videoTitle.textContent = videoDetails.title;
                    videoTitle.classList.add('video-title');
                    listItem.appendChild(videoTitle);
    
                    // Add a click event listener to load the video
                    listItem.addEventListener('click', () => {
                        loadVideo(video.videoId);
                    });
    
                    // Append the list item to the container
                    container.appendChild(listItem);
    
                    // Load the first video by default (without autoplay)
                    if (container.childElementCount === 1) {
                        loadVideo(video.videoId);
                    }
                }
            })
            .catch(error => console.error('Error fetching video details:', error));
    }
    
    // Initially load the first video's details and thumbnail
    if (playlist.length > 0) {
        loadVideo(playlist[0].videoId);
    }
    // Youtube Playlist