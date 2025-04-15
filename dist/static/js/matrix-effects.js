/**
 * Enhanced Matrix Digital Rain Animation with NSA/Surveillance Theme
 * For Hackers-Den cybersecurity news aggregator
 * Note: This is fictional and for entertainment purposes only
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the Matrix rain animation with surveillance-themed elements
  initSurveillanceRain();
  
  // Add cybersecurity-themed interactive effects
  addInteractiveEffects();
  
  // Initialize article sequencing for a staggered reveal effect
  initArticleSequencing();
  
  // Add terminal date timestamps to all terminal headers
  updateTerminalDates();
  
  // Add NSA/Surveillance themed elements
  addFictionalSurveillanceElements();
  
  // Add disclaimer about fictional nature to ensure no legal issues
  addFictionalDisclaimer();
});

/**
 * Initialize the advanced surveillance-themed digital rain animation
 */
function initSurveillanceRain() {
  const matrixRain = document.getElementById("matrix-rain");
  
  // If there's no canvas container, create one
  if (!matrixRain) {
    console.warn("Matrix rain container not found, creating one");
    const matrixBg = document.createElement('div');
    matrixBg.className = 'matrix-bg';
    
    const rainContainer = document.createElement('div');
    rainContainer.id = 'matrix-rain';
    rainContainer.className = 'matrix-rain';
    
    matrixBg.appendChild(rainContainer);
    document.body.prepend(matrixBg);
    
    matrixRain = rainContainer;
  }
  
  // Create matrix canvas
  const canvas = document.createElement('canvas');
  matrixRain.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  
  // Mix of katakana, numbers, special symbols, and faux "data" characters
  // This creates a fictional intelligence-style look without using actual sensitive patterns
  const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789<>/\\[]{}$#@%&ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  // Surveillance themed phrases to occasionally insert into the rain
  const dataPhrases = [
    "ACCESS_DENIED",
    "SCANNING...",
    "ENCRYPTED",
    "TOP_SECRET",
    "CLASSIFIED",
    "INTERCEPTED",
    "ANALYZING",
    "MONITORING",
    "DECRYPTING",
    "REDACTED",
    "SEC_LEVEL_5",
    "PASSWORD_REQ"
  ];
  
  // Set up canvas dimensions
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Calculate columns based on font size
    const fontSize = window.innerWidth < 768 ? 14 : 18; 
    const columns = Math.ceil(canvas.width / fontSize);
    
    // Initialize drops array
    const drops = [];
    for (let i = 0; i < columns; i++) {
      // Random starting position above the screen
      drops[i] = Math.random() * -canvas.height / fontSize;
    }
    
    // Define varying speeds for more realistic effect
    const speeds = [];
    for (let i = 0; i < columns; i++) {
      speeds[i] = 0.5 + Math.random() * 1.5;
    }
    
    // Character brightness variation
    const brightness = [];
    for (let i = 0; i < columns; i++) {
      brightness[i] = 0.5 + Math.random() * 0.5;
    }
    
    // For special data streams
    const dataColumns = [];
    for (let i = 0; i < Math.floor(columns / 10); i++) { // About 10% of columns will be data streams
      dataColumns.push(Math.floor(Math.random() * columns));
    }

    return { fontSize, columns, drops, speeds, brightness, dataColumns };
  }
  
  let animation;
  let { fontSize, columns, drops, speeds, brightness, dataColumns } = resizeCanvas();
  
  // Matrix rain drawing function with surveillance twist
  function drawMatrixRain() {
    // Translucent black to create fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Loop through drops
    for (let i = 0; i < columns; i++) {
      // Determine if this column should show a data phrase
      const isDataColumn = dataColumns.includes(i);
      let char = chars.charAt(Math.floor(Math.random() * chars.length));
      
      // Occasionally show a data phrase instead of random chars
      if (isDataColumn && Math.random() > 0.97) {
        // Select a random data phrase
        const phrase = dataPhrases[Math.floor(Math.random() * dataPhrases.length)];
        
        // Draw the phrase vertically
        for (let j = 0; j < phrase.length; j++) {
          const y = (drops[i] + j) * fontSize;
          
          // Only draw if within canvas bounds
          if (y > 0 && y < canvas.height) {
            // Use blue color for data phrases
            ctx.fillStyle = `rgba(0, 100, 255, ${brightness[i]})`;
            ctx.font = `${fontSize * 0.8}px 'Source Code Pro', monospace`;
            ctx.fillText(phrase[j], i * fontSize, y);
          }
        }
      } else {
        // Calculate position
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Vary color for more intelligence-agency like effect
        // Use a mix of blue and green to create a more government-system feel
        let colorR = 0;
        let colorG = Math.floor(150 * brightness[i] + 30);
        let colorB = Math.floor(200 * brightness[i] * (Math.random() > 0.7 ? 1 : 0));
        
        ctx.fillStyle = `rgba(${colorR}, ${colorG}, ${colorB}, ${brightness[i]})`;
        
        // Set font size with slight variation
        const actualFontSize = fontSize * (0.9 + Math.random() * 0.2);
        ctx.font = `${actualFontSize}px 'Source Code Pro', monospace`;
        
        // Draw the character
        ctx.fillText(char, x, y);
        
        // Occasionally add binary "1" and "0" characters in brighter color to enhance surveillance feel
        if (Math.random() > 0.99) {
          ctx.fillStyle = `rgba(0, 200, 255, 0.9)`;
          ctx.fillText(Math.random() > 0.5 ? "1" : "0", x, y);
        }
      }
      
      // Move the drop down by its speed
      drops[i] += speeds[i];
      
      // Reset drop when it reaches bottom or randomly
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
        
        // Occasionally change speed and brightness for variety
        if (Math.random() > 0.8) {
          speeds[i] = 0.5 + Math.random() * 1.5;
          brightness[i] = 0.5 + Math.random() * 0.5;
        }
      }
    }
    
    // Add horizontal scan lines for surveillance effect
    for (let i = 0; i < canvas.height; i += 100) {
      if (Math.random() > 0.985) {
        const scanOpacity = 0.1 + Math.random() * 0.2;
        ctx.fillStyle = `rgba(0, 100, 200, ${scanOpacity})`;
        ctx.fillRect(0, i, canvas.width, 1);
      }
    }
    
    // Continue animation
    animation = requestAnimationFrame(drawMatrixRain);
  }
  
  // Start animation
  drawMatrixRain();
  
  // Handle window resize
  window.addEventListener('resize', function() {
    cancelAnimationFrame(animation);
    ({ fontSize, columns, drops, speeds, brightness, dataColumns } = resizeCanvas());
    drawMatrixRain();
  });
  
  // Performance optimization - pause animation when tab is not visible
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      cancelAnimationFrame(animation);
    } else {
      drawMatrixRain();
    }
  });
}

/**
 * Add fictional NSA/Government surveillance-themed elements and effects
 * Note: This is entirely fictional and for entertainment purposes only
 */
function addFictionalSurveillanceElements() {
  // Add fictional "TOP SECRET" watermark
  const watermark = document.createElement('div');
  watermark.className = 'confidential-watermark';
  watermark.textContent = 'TOP SECRET';
  watermark.setAttribute('aria-hidden', 'true'); // Accessibility attribute to indicate decorative
  document.body.appendChild(watermark);
  
  // Add fictional header elements to articles
  const articles = document.querySelectorAll('.feed__article');
  articles.forEach((article, index) => {
    // Create security clearance label
    const securityLevel = ['UNCLASSIFIED', 'CONFIDENTIAL', 'SECRET', 'TOP SECRET', 'RESTRICTED'];
    const clearanceLabel = document.createElement('div');
    clearanceLabel.className = 'clearance-label';
    clearanceLabel.textContent = securityLevel[Math.floor(Math.random() * securityLevel.length)];
    clearanceLabel.setAttribute('aria-hidden', 'true'); // Accessibility attribute
    
    // Try to find the article header, if it exists
    const header = article.querySelector('.article__header');
    if (header) {
      header.appendChild(clearanceLabel);
    }
    
    // Add redacted text effect randomly to some content
    const paragraphs = article.querySelectorAll('p');
    if (paragraphs.length > 0) {
      const randomParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
      const text = randomParagraph.textContent;
      if (text && text.length > 20) {
        const words = text.split(' ');
        for (let i = 0; i < words.length; i++) {
          if (Math.random() < 0.1 && words[i].length > 3) {
            words[i] = `<span class="redacted">${words[i]}</span>`;
          }
        }
        randomParagraph.innerHTML = words.join(' ');
      }
    }
  });

  // Add fictional timestamps to articles
  const articleHeaders = document.querySelectorAll('.terminal__header');
  articleHeaders.forEach(header => {
    const timestamp = document.createElement('div');
    timestamp.className = 'timestamp';
    
    // Generate a pseudo-random past date
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // Random day in the past month
    const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const mins = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const secs = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    
    timestamp.textContent = `${date.toISOString().split('T')[0]} ${hours}:${mins}:${secs} UTC-5`;
    timestamp.setAttribute('aria-hidden', 'true'); // Accessibility attribute
    header.appendChild(timestamp);
    
    // Add access data animation when article comes into view
    const accessBar = document.createElement('div');
    accessBar.className = 'access-bar';
    accessBar.setAttribute('aria-hidden', 'true'); // Accessibility attribute
    header.appendChild(accessBar);
  });

  // Add surveillance camera movement effect (simulated)
  let moveActive = true;
  let lastMoveTime = Date.now();
  
  function simulateCameraMovement() {
    if (!moveActive) return;
    
    const now = Date.now();
    if (now - lastMoveTime > 5000) { // Move every 5 seconds
      const intensity = 0.2 + Math.random() * 0.4; // Subtle movement
      const duration = 500 + Math.random() * 500;
      
      document.documentElement.style.setProperty('--camera-x', (Math.random() * 2 - 1) * intensity + 'px');
      document.documentElement.style.setProperty('--camera-y', (Math.random() * 2 - 1) * intensity + 'px');
      
      lastMoveTime = now;
      
      // Reset after movement
      setTimeout(() => {
        document.documentElement.style.setProperty('--camera-x', '0px');
        document.documentElement.style.setProperty('--camera-y', '0px');
      }, duration);
    }
    
    requestAnimationFrame(simulateCameraMovement);
  }
  
  // Start surveillance camera movement simulation
  simulateCameraMovement();
  
  // Add scan line effect
  const scanline = document.createElement('div');
  scanline.className = 'surveillance-scanline';
  scanline.setAttribute('aria-hidden', 'true');
  document.body.appendChild(scanline);
}

/**
 * Add fictional disclaimer to ensure no legal issues
 */
function addFictionalDisclaimer() {
  // Create a small, unintrusive disclaimer in the footer
  const footer = document.querySelector('.footer');
  
  if (footer) {
    const disclaimer = document.createElement('div');
    disclaimer.className = 'fictional-disclaimer';
    disclaimer.textContent = 'Theme is fictional and for entertainment purposes only. No affiliation with any agency.';
    disclaimer.style.fontSize = '0.7rem';
    disclaimer.style.opacity = '0.7';
    disclaimer.style.marginTop = '10px';
    disclaimer.style.fontStyle = 'italic';
    footer.appendChild(disclaimer);
  }
}

/**
 * Add interactive UI effects for cybersecurity theme
 */
function addInteractiveEffects() {
  // Add interactive terminal effect to article titles
  const articleTitles = document.querySelectorAll('.article__title a');
  articleTitles.forEach(title => {
    // Add cursor blink effect on hover
    title.addEventListener('mouseenter', function() {
      if (this.dataset.processing) return; // Prevent multiple executions
      
      this.dataset.processing = 'true';
      const cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      cursor.textContent = '█';
      cursor.setAttribute('aria-hidden', 'true');
      this.appendChild(cursor);
      
      // Simulate typing effect
      const originalText = this.textContent;
      const textWithoutCursor = originalText.replace('█', '');
      
      this.textContent = ''; // Clear text
      let i = 0;
      
      const typeInterval = setInterval(() => {
        if (i < textWithoutCursor.length) {
          this.textContent += textWithoutCursor.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
          this.textContent = textWithoutCursor + '█'; // Add cursor at end
          delete this.dataset.processing;
        }
      }, 20);
    });
    
    title.addEventListener('mouseleave', function() {
      // Remove cursor and restore original text
      const cursor = this.querySelector('.terminal-cursor');
      if (cursor) {
        cursor.remove();
      }
      delete this.dataset.processing;
    });
  });
  
  // Add glitch effect to title on scroll
  const title = document.querySelector('.title');
  if (title) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50 && !title.classList.contains('glitching')) {
        title.classList.add('glitching');
        
        // Remove class after animation completes
        setTimeout(() => {
          title.classList.remove('glitching');
        }, 1000);
      }
    });
  }
  
  // Add an intelligence briefing style header
  const mainHeader = document.querySelector('.header');
  if (mainHeader) {
    const briefingHeader = document.createElement('div');
    briefingHeader.className = 'document-header';
    briefingHeader.innerHTML = `
      <div class="document-stamp">CONFIDENTIAL</div>
      <div class="document-number">FILE-${Math.floor(Math.random() * 10000)}-D</div>
    `;
    mainHeader.parentNode.insertBefore(briefingHeader, mainHeader);
  }
}

/**
 * Update all terminal headers with current date and time
 */
function updateTerminalDates() {
  const terminalDates = document.querySelectorAll('.terminal__date');
  const now = new Date();
  
  // Format: YYYY-MM-DD HH:MM:SS
  const dateString = now.toISOString().replace('T', ' ').split('.')[0];
  
  terminalDates.forEach(element => {
    element.textContent = dateString;
    
    // Update the time every minute
    setInterval(() => {
      const now = new Date();
      element.textContent = now.toISOString().replace('T', ' ').split('.')[0];
    }, 60000);
  });
}

/**
 * Initialize article sequencing for staggered reveal
 */
function initArticleSequencing() {
  const articles = document.querySelectorAll('.feed__article');
  
  // Using Intersection Observer for revealing articles as they scroll into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('article-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  articles.forEach((article, index) => {
    article.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(article);
  });
}

// Add dark-styled cybersecurity CSS effects
function addDynamicStyles() {
  const style = document.createElement('style');
  style.textContent = `
    /* Surveillance theme CSS */
    :root {
      --nsa-blue: #003366;
      --nsa-dark-blue: #001830;
      --surveillance-amber: #ffbf00;
      --terminal-green: #00aa00;
    }
    
    body {
      transform: translate3d(var(--camera-x, 0), var(--camera-y, 0), 0);
      transition: transform 1s ease-out;
    }
    
    .surveillance-scanline {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: rgba(0, 150, 255, 0.15);
      box-shadow: 0 0 5px rgba(0, 100, 255, 0.2);
      opacity: 0.7;
      z-index: 9999;
      pointer-events: none;
      animation: scanline 8s linear infinite;
    }
    
    @keyframes scanline {
      0% { top: -5px; }
      100% { top: 100%; }
    }
    
    .confidential-watermark {
      position: fixed;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-30deg);
      font-size: 10vw;
      color: rgba(150, 0, 0, 0.05);
      font-family: 'Source Code Pro', monospace;
      letter-spacing: 0.2em;
      z-index: 99999;
      pointer-events: none;
      user-select: none;
      text-transform: uppercase;
      font-weight: 900;
      text-shadow: 0 0 15px rgba(150, 0, 0, 0.1);
    }
    
    .clearance-label {
      position: absolute;
      top: 10px;
      right: 10px;
      font-family: var(--matrix-font, 'Source Code Pro', monospace);
      font-size: 0.7rem;
      color: var(--surveillance-amber);
      background: rgba(0,0,0,0.7);
      padding: 2px 8px;
      border-radius: 2px;
      border: 1px solid var(--surveillance-amber);
      text-transform: uppercase;
      letter-spacing: 1px;
      z-index: 10;
      transform: rotate(2deg);
    }
    
    .document-header {
      display: flex;
      justify-content: space-between;
      padding: 8px;
      background-color: rgba(0, 10, 30, 0.8);
      border-bottom: 1px solid var(--nsa-blue);
      margin-bottom: 20px;
    }
    
    .document-stamp {
      color: var(--surveillance-amber);
      font-family: var(--matrix-font, 'Source Code Pro', monospace);
      font-size: 0.8rem;
      font-weight: bold;
      letter-spacing: 1px;
      padding: 2px 6px;
      border: 1px dashed var(--surveillance-amber);
      border-radius: 2px;
    }
    
    .document-number {
      color: rgba(200, 200, 200, 0.7);
      font-family: var(--matrix-font, 'Source Code Pro', monospace);
      font-size: 0.8rem;
      letter-spacing: 1px;
    }
    
    .redacted {
      background: #111;
      color: transparent !important;
      border-radius: 2px;
      padding: 0.1em 0.3em;
      position: relative;
      box-shadow: 0 0 1px #000;
    }
    
    .timestamp {
      position: absolute;
      bottom: 5px;
      right: 5px;
      color: rgba(0, 200, 255, 0.5);
      font-family: var(--matrix-font, 'Source Code Pro', monospace);
      font-size: 0.7rem;
      z-index: 100;
    }
    
    .access-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      width: 0%;
      background: var(--surveillance-amber);
      animation: accessData 2s forwards;
      z-index: 999;
    }
    
    @keyframes accessData {
      0% { width: 0%; }
      100% { width: 100%; }
    }
    
    .terminal__header {
      background-color: rgba(0, 15, 30, 0.95) !important;
      border-bottom: 1px solid rgba(0, 70, 150, 0.3) !important;
    }
    
    .terminal__prompt {
      color: var(--surveillance-amber) !important;
    }
    
    /* Make subtitle more intelligence-brief like */
    .subtitle__text {
      color: #eee !important;
      text-transform: uppercase;
    }
    
    .subtitle__separator {
      color: var(--surveillance-amber) !important;
    }
    
    /* Dark overlay for the shadowy feel without directly using a static image */
    body::before {
      content: "";
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      pointer-events: none;
      z-index: 9999;
      background: repeating-linear-gradient(
        0deg,
        rgba(0,0,0,0.7) 0px,
        rgba(0,0,0,0.72) 2px,
        rgba(0,0,0,0.75) 4px,
        transparent 6px
      ), 
      /* Self-generated noise pattern instead of external URL */
      radial-gradient(rgba(0,0,0,0.2) 1px, transparent 1px);
      background-size: 100% 6px, 4px 4px;
      opacity: 0.6;
    }
  `;
  
  document.head.appendChild(style);
}

// Call dynamic styles function 
addDynamicStyles();

// Create and add a favicon if it doesn't exist
function createFavicon() {
  if (!document.querySelector('link[rel="icon"]')) {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    // Draw a simple dark blue background
    ctx.fillStyle = '#001830';
    ctx.fillRect(0, 0, 32, 32);
    
    // Draw a matrix-like "HD" for Hackers-Den
    ctx.font = '20px monospace';
    ctx.fillStyle = '#00ff00';
    ctx.fillText('HD', 4, 22);
    
    // Create the favicon link element
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = canvas.toDataURL();
    document.head.appendChild(favicon);
  }
}

// Call favicon creation function
createFavicon();