#!/bin/bash

# Update RSS Feed Script
# This script runs the RSSPAPER jar and then applies the Matrix theme customizations

echo "[+] Starting RSS feed update process..."

# Create backup directories if needed
echo "[+] Ensuring theme backup is complete..."
mkdir -p matrix-theme-backup/css matrix-theme-backup/img

# Backup matrices.css if we already have it
if [ -f "dist/static/css/matrix.css" ]; then
  echo "[+] Backing up CSS files..."
  cp -f dist/static/css/matrix.css matrix-theme-backup/css/
fi

# Backup custom-matrix.css if we already have it
if [ -f "dist/static/css/custom-matrix.css" ]; then
  cp -f dist/static/css/custom-matrix.css matrix-theme-backup/css/
fi

# Step 1: Run the existing RSSPAPER jar to generate the feed
echo "[+] Running RSSPAPER jar to generate fresh content..."
java -jar rsspaper-1.2.4-standalone.jar

# Step 2: Apply Matrix theme customizations
echo "[+] Applying Matrix theme customizations..."

# Copy matrix.css to dist folder
cp -f matrix-theme-backup/css/matrix.css dist/static/css/
echo "[+] Matrix theme CSS copied"

# Copy custom-matrix.css to dist folder
cp -f matrix-theme-backup/css/custom-matrix.css dist/static/css/
echo "[+] Custom matrix theme CSS copied"

# Add CSS references to head if they don't exist
echo "[+] Updating stylesheet references..."
if ! grep -q "matrix.css" dist/index.html; then
  sed -i 's|<link href="static/css/desktop.css" rel="stylesheet" media="all and (min-width: 601px)">|<link href="static/css/desktop.css" rel="stylesheet" media="all and (min-width: 601px)">\n    <link rel="stylesheet" href="static/css/matrix.css">\n    <link rel="stylesheet" href="static/css/custom-matrix.css">|' dist/index.html
fi

# Fix header closing tag issue
echo "[+] Fixing HTML structure..."
sed -i 's|</div>\n                    </header>|</header>|g' dist/index.html
sed -i 's|<hr class="separator">|<hr class="separator">|g' dist/index.html
sed -i 's|</div>\s*</header>|</header>|g' dist/index.html

# Add Matrix background div
echo "[+] Adding Matrix background animation..."
if ! grep -q "matrix-bg" dist/index.html; then
  sed -i '/<body>/a \    <!-- Matrix Background -->\n    <div class="matrix-bg">\n        <div class="matrix-rain" id="matrix-rain"></div>\n    </div>' dist/index.html
fi

# Add terminal classes to all article headers
echo "[+] Adding terminal styling to articles..."
sed -i 's|<header class="article__header">|<header class="article__header terminal">|g' dist/index.html

# Fix article structure
echo "[+] Restructuring articles for terminal style..."
# Fix article header images - replace <p> with <div>
sed -i 's|<p class="article__header-img">|<div class="article__header-img">|g' dist/index.html
sed -i 's|</p>|</div>|g' dist/index.html

# Add terminal header to each article
sed -i '/<header class="article__header terminal">/a \                        <div class="terminal__header">\n                            <span class="terminal__prompt">root@hackers-den:~$ cat article</span>\n                            <span class="terminal__date"></span>\n                        </div>\n                        <div class="article__content-wrapper">' dist/index.html

# Close the content wrapper divs
sed -i 's|</header>|</div>\n                    </header>|g' dist/index.html

# Update page metadata
echo "[+] Updating page metadata..."
sed -i 's|<meta name="description" content="My static news generator">|<meta name="description" content="Hackers-Den - Matrix-themed cybersecurity and hacking news aggregator">|' dist/index.html
sed -i 's|<meta name="generator" content="RSSPAPER">|<meta name="generator" content="Hackers-Den">|' dist/index.html
sed -i 's|<meta name="theme-color" content="#2e3440">|<meta name="theme-color" content="#000000">|' dist/index.html
sed -i 's|<meta name="theme-color" content="#5e81ac" />|<meta name="theme-color" content="#00ff00" />|' dist/index.html

# Update the subtitle
echo "[+] Updating site subtitle..."
sed -i 's|<span class="subtitle__separator">~</span> <span class="subtitle__text">My static generate newspaper</span> <span class="subtitle__separator">~</span>|<span class="subtitle__separator">[</span> <span class="subtitle__text">Cybersecurity Intelligence</span> <span class="subtitle__separator">]</span>|' dist/index.html

# Update the footer
echo "[+] Adding your attribution to the footer..."
sed -i 's|Generated with <a class="footer__link" href="https://github.com/tanrax/RSSpaper">RSSpaper</a> and a lot of <span class="footer__heard">❤️</span>️|<a class="footer__link" href="https://github.com/CY83R-3X71NC710N/Hackers-Den">Hackers-Den By CY83R-3X71NC710N</a>|' dist/index.html

# Make sure the script is inside the body tag
echo "[+] Ensuring script is inside body tag..."
# First remove any existing script outside the body
sed -i '/<\/body>/,/<\/html>/d' dist/index.html
# Then add the closing body tag with the script inside

cat >> dist/index.html << 'MATRIX_END'
    <!-- Add Matrix Rain Animation -->
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            // Matrix rain animation
            const matrixRain = document.getElementById("matrix-rain");
            const characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const fontSize = 18;
            const drops = [];
            
            // Initialize canvas size
            function initCanvas() {
                const canvas = document.createElement("canvas");
                matrixRain.appendChild(canvas);
                const ctx = canvas.getContext("2d");
                
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                
                const columns = Math.ceil(canvas.width / fontSize);
                
                // Initialize drops
                for (let i = 0; i < columns; i++) {
                    drops[i] = Math.floor(Math.random() * -canvas.height / fontSize);
                }
                
                return { canvas, ctx, columns };
            }
            
            const { canvas, ctx, columns } = initCanvas();
            
            // Draw the Matrix rain
            function draw() {
                // Set semi-transparent black background to create fade effect
                ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                ctx.fillStyle = "#0f0"; // Green text
                ctx.font = fontSize + "px monospace";
                
                // Draw each drop
                for (let i = 0; i < columns; i++) {
                    // Choose a random character
                    const char = characters.charAt(Math.floor(Math.random() * characters.length));
                    
                    // Draw the character
                    ctx.fillText(char, i * fontSize, drops[i] * fontSize);
                    
                    // Move the drop down
                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    
                    drops[i]++;
                }
            }
            
            // Animation loop
            setInterval(draw, 45);
            
            // Resize canvas when window size changes
            window.addEventListener("resize", function() {
                const { canvas, ctx, columns } = initCanvas();
            });
            
            // Set dates on terminal headers
            const terminalDates = document.querySelectorAll('.terminal__date');
            terminalDates.forEach(element => {
                const now = new Date();
                element.textContent = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
            });
        });
    </script>
</body>
</html>
MATRIX_END

echo "[+] Matrix theme applied successfully!"
echo "[+] Your Hackers-Den is now ready at ./dist/index.html"