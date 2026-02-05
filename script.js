
const codeOutput = document.getElementById('code-output');
const consoleOutput = document.getElementById('consoleOutput');
const playerName = document.getElementById('playerName');

// Typing Animation for Code Terminal
const typingTexts = [
    "Initializing development environment...",
    "Loading developer profile...",
    "Connecting to GitHub repositories...",
    "Analyzing code metrics...",
    "System ready for coding operations."
];

let typingIndex = 0;
let charIndex = 0;

function typeWriter() {
    if (typingIndex < typingTexts.length) {
        if (charIndex < typingTexts[typingIndex].length) {
            codeOutput.innerHTML += typingTexts[typingIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        } else {
            codeOutput.innerHTML += '<br>> ';
            typingIndex++;
            charIndex = 0;
            setTimeout(typeWriter, 1000);
        }
    } else {
        // Reset and start over
        setTimeout(() => {
            codeOutput.innerHTML = '';
            typingIndex = 0;
            charIndex = 0;
            typeWriter();
        }, 2000);
    }
}

// Stats Animation
function animateStats() {
    const stats = [
        { id: 'levelValue', target: 3, barId: 'levelBar', max: 5 },
        { id: 'kdrValue', target: 9, barId: 'kdrBar', max: 10 },
        { id: 'winsValue', target: 50, barId: 'winsBar', max: 100 },
        { id: 'hoursValue', target: 3, barId: 'hoursBar', max: 5 }
    ];

    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        const bar = document.getElementById(stat.barId);
        const targetValue = stat.target;
        const maxValue = stat.max;
        
        let current = 0;
        const increment = targetValue / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                current = targetValue;
                clearInterval(timer);
            }
            
            element.textContent = Math.floor(current) + (stat.id.includes('Value') && stat.id !== 'hoursValue' ? '+' : '');
            bar.style.width = (current / maxValue * 100) + '%';
        }, 20);
    });
}

// Skills Animation
function animateSkills() {
    const skills = [
        { id: 'reflexFill', percent: 100, textId: 'reflexPercent' },
        { id: 'strategyFill', percent: 90, textId: 'strategyPercent' },
        { id: 'teamworkFill', percent: 80, textId: 'teamworkPercent' },
        { id: 'aimFill', percent: 100, textId: 'aimPercent' },
        { id: 'awsFill', percent: 70, textId: 'awsPercent' },
        { id: 'dockerFill', percent: 100, textId: 'dockerPercent' }
    ];

    skills.forEach(skill => {
        const element = document.getElementById(skill.id);
        const textElement = document.getElementById(skill.textId);
        const targetPercent = skill.percent;
        
        let current = 0;
        const increment = targetPercent / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetPercent) {
                current = targetPercent;
                clearInterval(timer);
            }
            
            element.style.width = current + '%';
            textElement.textContent = Math.floor(current) + '%';
        }, 20);
    });
}

// Matrix Animation
function animateMatrix() {
    const matrixBars = document.querySelectorAll('.matrix-fill');
    
    matrixBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }, index * 200);
    });
}

// Console Output Animation
function animateConsole() {
    const messages = [
        "> System initialized successfully",
        "> Developer mode activated",
        "> All systems operational",
        "> Ready to code"
    ];
    
    let messageIndex = 0;
    
    function addMessage() {
        if (messageIndex < messages.length) {
            const line = document.createElement('span');
            line.className = 'output-line';
            line.textContent = messages[messageIndex];
            consoleOutput.appendChild(line);
            messageIndex++;
            
            // Auto-scroll to bottom
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
            
            setTimeout(addMessage, 1000);
        } else {
            // Clear and restart
            setTimeout(() => {
                consoleOutput.innerHTML = '';
                messageIndex = 0;
                addMessage();
            }, 2000);
        }
    }
    
    addMessage();
}

// Cursor Trail Effect
let cursorTrail = [];
const cursorTrailContainer = document.getElementById('cursor-trail');

function createCursorTrail(e) {
    const trail = document.createElement('div');
    trail.style.position = 'absolute';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.width = '4px';
    trail.style.height = '4px';
    trail.style.background = '#00f3ff';
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.transition = 'all 0.5s ease';
    trail.style.boxShadow = '0 0 10px #00f3ff';
    
    cursorTrailContainer.appendChild(trail);
    cursorTrail.push(trail);
    
    // Remove old trails
    if (cursorTrail.length > 20) {
        const oldTrail = cursorTrail.shift();
        oldTrail.remove();
    }
    
    // Fade out effect
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(2)';
        setTimeout(() => {
            trail.remove();
        }, 500);
    }, 100);
}

// Interactive Elements
function initInteractions() {
    // Tab switching for code editor
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
    
    // Button interactions
    const buttons = document.querySelectorAll('.editor-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
    });
    
    // Game card hover effects
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Window Load Event
window.addEventListener('load', () => {
    // Start animations
    typeWriter();
    animateStats();
    animateSkills();
    animateMatrix();
    animateConsole();
    initInteractions();
    
    // Cursor trail
    document.addEventListener('mousemove', createCursorTrail);
    
    // Typing effect for player name
    const nameText = playerName.textContent;
    playerName.textContent = '';
    let nameIndex = 0;
    
    const nameTimer = setInterval(() => {
        if (nameIndex < nameText.length) {
            playerName.textContent += nameText.charAt(nameIndex);
            nameIndex++;
        } else {
            clearInterval(nameTimer);
        }
    }, 100);
});

// Resize handler for responsive design
window.addEventListener('resize', () => {
    // Recalculate any responsive elements if needed
    animateMatrix();
});

// Performance optimization - throttle cursor trail
let lastTime = 0;
function throttleCursorTrail(e) {
    const now = Date.now();
    if (now - lastTime > 16) { // ~60fps
        createCursorTrail(e);
        lastTime = now;
    }
}

// Add some dynamic content updates
setInterval(() => {
    const linesOfCode = document.getElementById('linesOfCode');
    if (linesOfCode) {
        const current = parseInt(linesOfCode.textContent.replace(/,/g, ''));
        const increment = Math.floor(Math.random() * 100) + 50;
        linesOfCode.textContent = (current + increment).toLocaleString();
    }
}, 3000);

// Add hover effects to skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(10px)';
        item.style.borderLeft = '4px solid var(--neon-blue)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
        item.style.borderLeft = 'none';
    });
});

// Add click effects to social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const url = link.href;
        
        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '0px';
        ripple.style.height = '0px';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0, 243, 255, 0.5)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.transition = 'all 0.5s ease';
        ripple.style.pointerEvents = 'none';
        
        link.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
            window.open(url, '_blank');
        }, 500);
    });
});