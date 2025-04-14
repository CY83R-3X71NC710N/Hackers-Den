/**
 * Enhanced Matrix Digital Rain Animation
 * For Hackers-Den cybersecurity news aggregator
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the Matrix rain animation
  initMatrixRain();
  
  // Add cybersecurity-themed interactive effects
  addInteractiveEffects();
  
  // Initialize article sequencing for a staggered reveal effect
  initArticleSequencing();
  
  // Add terminal date timestamps to all terminal headers
  updateTerminalDates();
});

/**
 * Initialize the advanced Matrix digital rain animation
 */
function initMatrixRain() {
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
  
  // Matrix characters - mix of katakana, numbers, and hacking symbols
  const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789<>/\\[]{}$#@%&ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
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

    return { fontSize, columns, drops, speeds, brightness };
  }
  
  let animation;
  let { fontSize, columns, drops, speeds, brightness } = resizeCanvas();
  
  // Matrix rain drawing function
  function drawMatrixRain() {
    // Translucent black to create fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Loop through drops
    for (let i = 0; i < columns; i++) {
      // Choose a random character
      const char = chars.charAt(Math.floor(Math.random() * chars.length));
      
      // Calculate position
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      
      // Vary color for more matrix-like effect
      const green = Math.floor(190 * brightness[i] + 65);
      ctx.fillStyle = `rgba(0, ${green}, 0, ${brightness[i]})`;
      
      // Set font size with slight variation
      const actualFontSize = fontSize * (0.9 + Math.random() * 0.2);
      ctx.font = `${actualFontSize}px 'Source Code Pro', monospace`;
      
      // Draw the character
      ctx.fillText(char, x, y);
      
      // Move the drop down by its speed
      drops[i] += speeds[i];
      
      // Reset drop when it reaches bottom or randomly
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
        
        // Occasionally change speed and brightness for variety
        if (Math.random() > 0.8) {
          speeds[i] = 0.5 + Math.random() * 1.5;
          brightness[i] = 0.5 + Math.random() * 0.5;
        }
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
    ({ fontSize, columns, drops, speeds, brightness } = resizeCanvas());
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
 * Add interactive UI effects for cybersecurity theme
 */
function addInteractiveEffects() {
  // Add interactive terminal effect to article titles
  const articleTitles = document.querySelectorAll('.article__title a');
  articleTitles.forEach(title => {
    // Add cursor blink effect on hover
    title.addEventListener('mouseenter', function() {
      const cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      cursor.textContent = '█';
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
        }
      }, 20);
    });
    
    title.addEventListener('mouseleave', function() {
      // Remove cursor and restore original text
      const cursor = this.querySelector('.terminal-cursor');
      if (cursor) {
        cursor.remove();
      }
    });
  });
  
  // Add data connection visualization between articles
  const articles = document.querySelectorAll('.feed__article');
  articles.forEach((article, index) => {
    article.style.setProperty('--article-index', index);
    
    // Create data flow lines between articles on hover
    article.addEventListener('mouseenter', function() {
      if (index < articles.length - 1) {
        const nextArticle = articles[index + 1];
        const connector = document.createElement('div');
        connector.className = 'data-connector';
        document.body.appendChild(connector);
        
        const rect1 = article.getBoundingClientRect();
        const rect2 = nextArticle.getBoundingClientRect();
        
        connector.style.top = (rect1.bottom + window.scrollY) + 'px';
        connector.style.left = (rect1.left + rect1.width / 2) + 'px';
        connector.style.height = (rect2.top - rect1.bottom) + 'px';
      }
    });
    
    article.addEventListener('mouseleave', function() {
      const connectors = document.querySelectorAll('.data-connector');
      connectors.forEach(conn => conn.remove());
    });
  });
  
  // Add glitch effect to title on scroll
  const title = document.querySelector('.title');
  if (title) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        title.classList.add('glitching');
        
        // Remove class after animation completes
        setTimeout(() => {
          title.classList.remove('glitching');
        }, 1000);
      }
    });
  }
  
  // Add subtle Matrix scan line effect to the entire page
  const scanline = document.createElement('div');
  scanline.className = 'matrix-scanline';
  document.body.appendChild(scanline);
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
 * Add cybersecurity easter eggs and interactive elements
 */
window.addEventListener('load', function() {
  // Console message for visitors who open developer tools
  setTimeout(() => {
    console.log("%c⚠️ SECURITY ALERT", "color: red; font-size: 24px; font-weight: bold");
    console.log("%cThis is a feature of Hackers-Den, not a security breach.", "color: #0f0; font-size: 16px");
    console.log("%cImpressed by your curiosity! Visit https://github.com/CY83R-3X71NC710N/Hackers-Den for more.", "color: #0f0; font-size: 14px");
  }, 1000);
  
  // Add konami code easter egg (up, up, down, down, left, right, left, right, b, a)
  let konamiCode = [];
  const secretCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  
  window.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    // Keep only the last 10 keys
    if (konamiCode.length > 10) {
      konamiCode.shift();
    }
    
    // Check if the Konami code has been entered
    if (konamiCode.join(',') === secretCode.join(',')) {
      activateMatrixMode();
      konamiCode = [];
    }
  });
  
  // Function to activate "full Matrix mode"
  function activateMatrixMode() {
    // Create falling characters all over the screen
    const chars = 'HACKERS-DEN10';
    const body = document.body;
    
    for (let i = 0; i < 100; i++) {
      const char = document.createElement('div');
      char.className = 'matrix-char';
      char.style.left = Math.random() * window.innerWidth + 'px';
      char.style.animationDuration = 1 + Math.random() * 3 + 's';
      char.style.animationDelay = Math.random() * 2 + 's';
      char.textContent = chars[Math.floor(Math.random() * chars.length)];
      body.appendChild(char);
      
      // Remove after animation
      setTimeout(() => {
        char.remove();
      }, 5000);
    }
    
    // Add glowing effect to all articles
    const articles = document.querySelectorAll('.article__header');
    articles.forEach(article => {
      article.classList.add('matrix-activated');
      
      // Remove class after 5 seconds
      setTimeout(() => {
        article.classList.remove('matrix-activated');
      }, 5000);
    });
  }
});

// Add cursor trail effect that follows mouse movement
function addCursorTrailEffect() {
  const trailContainer = document.createElement('div');
  trailContainer.className = 'cursor-trail-container';
  document.body.appendChild(trailContainer);
  
  const trail = [];
  const trailLength = 10;
  
  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.opacity = 1 - (i / trailLength);
    dot.style.width = `${8 - i * 0.5}px`;
    dot.style.height = `${8 - i * 0.5}px`;
    trailContainer.appendChild(dot);
    trail.push(dot);
  }
  
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function updateTrail() {
    trail.forEach((dot, index) => {
      setTimeout(() => {
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
      }, index * 30);
    });
    
    requestAnimationFrame(updateTrail);
  }
  
  updateTrail();
}

// Call cursor trail effect function
addCursorTrailEffect();

// Add additional CSS for new interactive elements
function addDynamicStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .matrix-scanline {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: rgba(0, 255, 0, 0.3);
      opacity: 0.7;
      z-index: 9999;
      pointer-events: none;
      animation: scanline 5s linear infinite;
    }
    
    @keyframes scanline {
      0% { top: -5px; }
      100% { top: 100%; }
    }
    
    .terminal-cursor {
      animation: blink 1s step-start infinite;
    }
    
    .data-connector {
      position: absolute;
      width: 2px;
      background: linear-gradient(to bottom, rgba(0, 255, 0, 0.7), rgba(0, 255, 0, 0));
      z-index: 1;
      pointer-events: none;
    }
    
    .cursor-trail {
      position: fixed;
      background-color: rgba(0, 255, 0, 0.7);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 9999;
    }
    
    .article-visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .feed__article {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .glitching {
      animation: glitch 0.3s linear infinite;
    }
    
    .matrix-char {
      position: fixed;
      color: #0f0;
      text-shadow: 0 0 5px #0f0;
      animation: fall-down 3s linear forwards;
      z-index: 9998;
      pointer-events: none;
      font-family: monospace;
      font-size: 24px;
    }
    
    @keyframes fall-down {
      0% { transform: translateY(-100vh); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(100vh); opacity: 0; }
    }
    
    .matrix-activated {
      animation: pulse-glow 0.5s ease infinite alternate;
      border: 1px solid #0f0;
    }
    
    @keyframes pulse-glow {
      from { box-shadow: 0 0 5px #0f0, 0 0 10px #0f0; }
      to { box-shadow: 0 0 15px #0f0, 0 0 30px #0f0; }
    }
    
    /* Hacking text effect for titles */
    .hacking-text {
      position: relative;
      display: inline-block;
    }
    
    .hacking-text::before {
      content: attr(data-text);
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      background: black;
      clip-path: inset(0 calc(100% - var(--hacking-progress, 0%)) 0 0);
      color: #0f0;
    }
  `;
  
  document.head.appendChild(style);
}

// Add the dynamic styles
addDynamicStyles();