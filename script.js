const circle = document.getElementById('circle');
const pillTrack = document.querySelector('.pill-track');
const sectionLabels = document.querySelectorAll('.section-label');
const mainContent = document.getElementById('main-content');

let isDragging = false;
const sectionsArray = ['home', 'about', 'projects'];

// Function to load sections dynamically
async function loadSections() {
    try {
        const sectionFiles = [
            'sections/home.html',
            'sections/about.html', 
            'sections/projects.html'
        ];
        
        const sectionPromises = sectionFiles.map(async (file) => {
            const response = await fetch(file);
            return await response.text();
        });
        
        const sectionHTML = await Promise.all(sectionPromises);
        mainContent.innerHTML = sectionHTML.join('');
        
        // Re-initialize after sections are loaded
        initializeNavigation();
    } catch (error) {
        console.error('Error loading sections:', error);
    }
}

// Function to initialize navigation after sections are loaded
function initializeNavigation() {
    // Re-query sections after they're loaded
    window.sections = document.querySelectorAll('.section');
}

// Function to update circle position based on scroll
function updateCirclePosition() {
    const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    const maxTop = pillTrack.clientHeight - circle.clientHeight;
    const newTop = scrollProgress * maxTop;
    circle.style.top = newTop + 'px';
    updateActiveSection();
}

// Function to update active section
function updateActiveSection() {
    let currentSection = '';
    
    if (window.sections) {
        window.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute('id');
            }
        });
    }
    
    sectionLabels.forEach(label => {
        label.classList.remove('active');
        if (label.getAttribute('data-section') === currentSection) {
            label.classList.add('active');
        }
    });
}

// Function to scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Circle drag functionality
circle.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const rect = pillTrack.getBoundingClientRect();
    const trackTop = rect.top;
    const trackHeight = pillTrack.clientHeight;
    const circleHeight = circle.clientHeight;
    
    let newTop = e.clientY - trackTop - (circleHeight / 2);
    newTop = Math.max(0, Math.min(newTop, trackHeight - circleHeight));
    
    circle.style.top = newTop + 'px';
    
    // Calculate which section based on circle position
    const progress = newTop / (trackHeight - circleHeight);
    const sectionIndex = Math.round(progress * (sectionsArray.length - 1));
    const targetSection = sectionsArray[sectionIndex];
    
    // Scroll to that section
    const targetSectionElement = document.getElementById(targetSection);
    if (targetSectionElement) {
        const sectionTop = targetSectionElement.offsetTop;
        window.scrollTo({
            top: sectionTop,
            behavior: 'auto'
        });
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Click on pill track to move circle
pillTrack.addEventListener('click', (e) => {
    if (isDragging) return;
    
    const rect = pillTrack.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const circleHeight = circle.clientHeight;
    const maxTop = pillTrack.clientHeight - circleHeight;
    
    let newTop = clickY - (circleHeight / 2);
    newTop = Math.max(0, Math.min(newTop, maxTop));
    
    circle.style.top = newTop + 'px';
    
    // Calculate and scroll to section
    const progress = newTop / maxTop;
    const sectionIndex = Math.round(progress * (sectionsArray.length - 1));
    scrollToSection(sectionsArray[sectionIndex]);
});

// Click on section labels
sectionLabels.forEach((label, index) => {
    label.addEventListener('click', () => {
        scrollToSection(label.getAttribute('data-section'));
    });
});

// Update on scroll
window.addEventListener('scroll', updateCirclePosition);

// Initialize everything when the page loads
window.addEventListener('load', async () => {
    await loadSections();
    updateCirclePosition();
});
