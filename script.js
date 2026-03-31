document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 2. Sticky Navbar on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Audio Player Logic
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const trackTitle = document.getElementById('track-title');
    const progressContainer = document.getElementById('progress-container');
    const progress = document.getElementById('progress');
    const playlist = document.querySelectorAll('#playlist li');
    
    let currentTrackIndex = 0;
    let isPlaying = false;

    // Load initial track
    loadTrack(currentTrackIndex);

    function loadTrack(index) {
        // Remove active class from all
        playlist.forEach(item => item.classList.remove('active'));
        
        // Add active class to current
        playlist[index].classList.add('active');
        
        // Update audio source and title
        audio.src = playlist[index].getAttribute('data-src');
        trackTitle.textContent = playlist[index].textContent;
        
        // Only auto-play if it wasn't the initial load
        if (isPlaying) {
            audio.play();
        }
    }

    function playTrack() {
        isPlaying = true;
        playBtn.textContent = '⏸';
        audio.play();
    }

    function pauseTrack() {
        isPlaying = false;
        playBtn.textContent = '▶';
        audio.pause();
    }

    // Play/Pause button event
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    });

    // Next Track
    function nextTrack() {
        currentTrackIndex++;
        if (currentTrackIndex > playlist.length - 1) {
            currentTrackIndex = 0; // Loop back to start
        }
        loadTrack(currentTrackIndex);
        playTrack();
    }

    // Previous Track
    function prevTrack() {
        currentTrackIndex--;
        if (currentTrackIndex < 0) {
            currentTrackIndex = playlist.length - 1; // Loop to end
        }
        loadTrack(currentTrackIndex);
        playTrack();
    }

    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', prevTrack);

    // Click on playlist item to play
    playlist.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            playTrack();
        });
    });

    // Update Progress Bar
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    }

    audio.addEventListener('timeupdate', updateProgress);

    // Set Progress Bar by clicking
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        
        audio.currentTime = (clickX / width) * duration;
    }

    progressContainer.addEventListener('click', setProgress);

    // Auto next track when current ends
    audio.addEventListener('ended', nextTrack);
    
    
    // 4. Contact Form Submission Prevent Default
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn');
            const originalText = btn.textContent;
            btn.textContent = 'Transmission Sent.';
            btn.style.backgroundColor = 'var(--primary-color)';
            btn.style.color = 'var(--bg-color)';
            
            setTimeout(() => {
                contactForm.reset();
                btn.textContent = originalText;
                btn.style.backgroundColor = 'transparent';
                btn.style.color = 'var(--primary-color)';
            }, 3000);
        });
    }
});
