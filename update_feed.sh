#!/bin/bash

# Update RSS Feed Script
# This script runs the RSSPAPER jar and then applies the Matrix theme customizations

echo "[+] Starting RSS feed update process..."

# Create or update backup of current theme if needed
echo "[+] Ensuring theme backup is complete..."
mkdir -p matrix-theme-backup/css matrix-theme-backup/img

# If we already have a working Matrix theme, back it up
if [ -f "dist/index.html" ] && [ -f "dist/static/css/matrix.css" ]; then
  echo "[+] Backing up current Matrix theme..."
  cp dist/index.html matrix-theme-backup/
  cp dist/static/css/matrix.css matrix-theme-backup/css/
  cp dist/static/manifest.json matrix-theme-backup/
fi

# Step 1: Run the RSSPAPER jar to generate the feed
echo "[+] Running RSSPAPER jar to generate fresh content..."
java -jar rsspaper-1.2.4-standalone.jar

# Step 2: Apply Matrix theme customizations
echo "[+] Applying Matrix theme customizations..."

# If this is the first run and we don't have backups yet, create a new matrix.css
if [ ! -f "matrix-theme-backup/css/matrix.css" ]; then
  echo "[+] Creating new Matrix theme CSS..."
  cat > dist/static/css/matrix.css << 'MATRIX_CSS'
/* Matrix Rain Effect */
@keyframes matrix-rain {
  0% {
    top: -10%;
    opacity: 0;
  }
  20% {
    opacity: 0.8;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    top: 110%;
    opacity: 0;
  }
}

@keyframes flicker {
  0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
    opacity: 0.99;
    text-shadow: 0 0 5px #0f0, 0 0 10px #0f0, 0 0 15px #0f0, 0 0 20px #0f0;
  }
  20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
    opacity: 0.4;
    text-shadow: none;
  }
}

@keyframes pulse {
  0% {
    text-shadow: 0 0 5px #0f0, 0 0 10px #0f0;
  }
  50% {
    text-shadow: 0 0 20px #0f0, 0 0 30px #0f0;
  }
  100% {
    text-shadow: 0 0 5px #0f0, 0 0 10px #0f0;
  }
}

.matrix-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.matrix-rain {
  position: relative;
  height: 100%;
  width: 100%;
}

.matrix-drop {
  position: absolute;
  color: #0f0;
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 0 0 5px #0f0;
  opacity: 0;
  animation: matrix-rain 8s linear infinite;
}

.title {
  animation: flicker 3s infinite;
  text-shadow: 0 0 5px #0f0, 0 0 10px #0f0;
}

.article__title a {
  color: #0f0;
  text-shadow: 0 0 2px #0f0;
  transition: all 0.3s ease;
}

.article__title a:hover {
  color: #fff;
  text-shadow: 0 0 5px #0f0, 0 0 10px #0f0, 0 0 15px #0f0;
}

.article__header {
  border: 1px solid #0f0;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  transition: all 0.3s ease;
}

.article__header:hover {
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
  transform: translateY(-5px);
}

.subtitle__separator {
  color: #0f0;
  animation: pulse 2s infinite;
}

/* Terminal Styling */
.terminal {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 5px;
}

.terminal__header {
  border-bottom: 1px solid #0f0;
  padding-bottom: 5px;
  margin-bottom: 10px;
  font-family: 'Courier New', monospace;
  display: flex;
  align-items: center;
}

.terminal__prompt {
  color: #0f0;
  font-family: 'Courier New', monospace;
  margin-right: 5px;
}

.terminal__date {
  margin-left: auto;
  color: #0f0;
  font-size: 0.8em;
}

/* Optimized loading for images */
img {
  transition: opacity 0.3s ease;
}

img.lazy-load {
  opacity: 0;
}

img.lazy-loaded {
  opacity: 1;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: #000;
}

::-webkit-scrollbar-thumb {
  background-color: #0f0;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #00ff00aa;
}
MATRIX_CSS
  cp dist/static/css/matrix.css matrix-theme-backup/css/
  
  # Backup the original index.html for future reference
  cp dist/index.html matrix-theme-backup/original_index.html
fi

# Copy our matrix.css file to the static/css directory
cp matrix-theme-backup/css/matrix.css dist/static/css/

# Copy our custom-matrix.css file to the static/css directory if it exists
if [ -f "matrix-theme-backup/css/custom-matrix.css" ]; then
  echo "[+] Adding custom Matrix style enhancements..."
  cp matrix-theme-backup/css/custom-matrix.css dist/static/css/
fi

# Add Matrix theme reference to the index.html if it doesn't exist
if ! grep -q "matrix.css" dist/index.html; then
  echo "[+] Injecting Matrix CSS reference into index.html..."
  sed -i 's|<link rel="stylesheet" href="static/css/desktop.css" rel="stylesheet" media="all and (min-width: 601px)">|<link href="static/css/desktop.css" rel="stylesheet" media="all and (min-width: 601px)">\n    <link rel="stylesheet" href="static/css/matrix.css">|' dist/index.html
fi

# Add custom Matrix theme reference to the index.html if it doesn't exist
if ! grep -q "custom-matrix.css" dist/index.html && [ -f "dist/static/css/custom-matrix.css" ]; then
  echo "[+] Injecting custom Matrix CSS reference into index.html..."
  sed -i 's|<link rel="stylesheet" href="static/css/matrix.css">|<link rel="stylesheet" href="static/css/matrix.css">\n    <link rel="stylesheet" href="static/css/custom-matrix.css">|' dist/index.html
fi

# Inject the Matrix background animation if not present
if ! grep -q "matrix-bg" dist/index.html; then
  echo "[+] Injecting Matrix background animation into index.html..."
  sed -i 's|<body>|<body>\n    <!-- Matrix Background -->\n    <div class="matrix-bg">\n        <div class="matrix-rain" id="matrix-rain"></div>\n    </div>\n|' dist/index.html
fi

# Inject the Matrix rain animation script if not present
if ! grep -q "matrix-rain animation" dist/index.html; then
  echo "[+] Injecting Matrix rain animation script into index.html..."
  sed -i 's|</body>|    <!-- Add Matrix Rain Animation -->\n    <script>\n        document.addEventListener("DOMContentLoaded", function() {\n            // Matrix rain animation\n            const matrixRain = document.getElementById("matrix-rain");\n            const characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";\n            const numDrops = 35;\n\n            // Create matrix drops\n            for (let i = 0; i < numDrops; i++) {\n                const drop = document.createElement("div");\n                drop.className = "matrix-drop";\n                drop.style.left = `${Math.random() * 100}%`;\n                drop.style.animationDelay = `${Math.random() * 5}s`;\n                drop.style.animationDuration = `${Math.random() * 5 + 5}s`;\n                drop.textContent = characters.charAt(Math.floor(Math.random() * characters.length));\n                matrixRain.appendChild(drop);\n            }\n\n            // Update matrix drops with new characters periodically\n            setInterval(() => {\n                document.querySelectorAll(".matrix-drop").forEach(drop => {\n                    drop.textContent = characters.charAt(Math.floor(Math.random() * characters.length));\n                });\n            }, 1000);\n\n            // Lazy load images\n            document.querySelectorAll("img.lazy-load").forEach(img => {\n                img.onload = function() {\n                    this.classList.add("lazy-loaded");\n                }\n            });\n        });\n    </script>\n</body>|' dist/index.html
fi

# Update main.css with Matrix theme colors and styles
echo "[+] Updating CSS with Matrix theme styles..."
sed -i 's/--color__nord-dark: #[0-9a-fA-F]\{6\};/--color__nord-dark: #000000;/g' dist/static/css/main.css
sed -i 's/--color__nord-medium: #[0-9a-fA-F]\{6\};/--color__nord-medium: #00ff00;/g' dist/static/css/main.css
sed -i 's/--color__nord-light: #[0-9a-fA-F]\{6\};/--color__nord-light: #00ff00;/g' dist/static/css/main.css

# Update manifest.json for better PWA support with Matrix theme
echo "[+] Updating manifest.json with Matrix theme colors..."
cat > dist/static/manifest.json << 'MANIFEST_JSON'
{
  "name": "Hackers-Den",
  "short_name": "HD",
  "theme_color": "#00ff00",
  "icons": [
    {
      "src": "img/icons/manifest-icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "img/icons/manifest-icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "start_url": "..",
  "display": "standalone",
  "background_color": "#000000"
}
MANIFEST_JSON

echo "[+] Matrix theme applied successfully!"
echo "[+] Your Hacker's Den RSS feed has been updated and is available at dist/index.html"