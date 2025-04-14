#!/bin/bash

# Update RSS Feed Script
# This script runs the RSSPAPER jar and then applies the Matrix theme customizations

echo "[+] Starting RSS feed update process..."

# Create backup directories if needed
echo "[+] Ensuring theme backup is complete..."
mkdir -p matrix-theme-backup/css matrix-theme-backup/img matrix-theme-backup/js

# Backup matrices.css if we already have it
if [ -f "dist/static/css/matrix.css" ]; then
  echo "[+] Backing up CSS files..."
  cp -f dist/static/css/matrix.css matrix-theme-backup/css/
fi

# Backup custom-matrix.css if we already have it
if [ -f "dist/static/css/custom-matrix.css" ]; then
  cp -f dist/static/css/custom-matrix.css matrix-theme-backup/css/
fi

# Backup any JavaScript effects
if [ -f "dist/static/js/matrix-effects.js" ]; then
  echo "[+] Backing up JavaScript files..."
  cp -f dist/static/js/matrix-effects.js matrix-theme-backup/js/
fi

# Step 1: Run the existing RSSPAPER jar to generate the feed
echo "[+] Running RSSPAPER jar to generate fresh content..."
java -jar rsspaper-1.2.4-standalone.jar

# Create necessary directories
mkdir -p dist/static/js

# Step 2: Apply Matrix theme customizations
echo "[+] Applying Matrix theme customizations..."

# Ensure static directories exist
mkdir -p dist/static/css dist/static/js dist/static/fonts

# Copy matrix.css to dist folder
cp -f matrix-theme-backup/css/matrix.css dist/static/css/
echo "[+] Matrix theme CSS copied"

# Copy custom-matrix.css to dist folder
cp -f matrix-theme-backup/css/custom-matrix.css dist/static/css/
echo "[+] Custom matrix theme CSS copied"

# Copy matrix-effects.js to dist folder
cp -f matrix-theme-backup/js/matrix-effects.js dist/static/js/
echo "[+] Matrix theme JavaScript effects copied"

# Extract and install Source Code Pro font if needed
if [ ! -d "dist/static/fonts/source-code-pro" ]; then
  echo "[+] Installing Source Code Pro font..."
  mkdir -p dist/static/fonts/source-code-pro
  
  if [ -f "source-code-pro.zip" ]; then
    unzip -o source-code-pro.zip -d dist/static/fonts/source-code-pro
    echo "[+] Font installed"
  else
    echo "[!] Warning: source-code-pro.zip not found. Using web font instead."
  fi
fi

# Add CSS references to head if they don't exist
echo "[+] Updating stylesheet references..."
if ! grep -q "matrix.css" dist/index.html; then
  sed -i 's|<link href="static/css/desktop.css" rel="stylesheet" media="all and (min-width: 601px)">|<link href="static/css/desktop.css" rel="stylesheet" media="all and (min-width: 601px)">\n    <link rel="stylesheet" href="static/css/matrix.css">\n    <link rel="stylesheet" href="static/css/custom-matrix.css">|' dist/index.html
fi

# Add JavaScript references just before closing body tag
echo "[+] Adding JavaScript references..."
if ! grep -q "matrix-effects.js" dist/index.html; then
  sed -i 's|</body>|<script src="static/js/matrix-effects.js"></script>\n</body>|' dist/index.html
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

# Add font preloading for performance
echo "[+] Adding font preloading for performance..."
if ! grep -q "preload" dist/index.html; then
  sed -i '/<head>/a \    <link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n    <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;700&display=swap" rel="stylesheet">' dist/index.html
fi

# Add article numbers as custom properties for staggered animations
echo "[+] Adding article indexing for animations..."
sed -i 's|<article class="feed__article">|<article class="feed__article" style="--article-index: 0">|' dist/index.html
COUNTER=1
while read -r line; do
  if [[ $line == *"<article class="* ]]; then
    # Replace with incrementing counter
    sed -i "0,/<article class=\"feed__article\" style=\"--article-index: 0\">/s//<article class=\"feed__article\" style=\"--article-index: $COUNTER\">/" dist/index.html
    ((COUNTER++))
  fi
done < dist/index.html

# Add PWA manifest link
echo "[+] Adding PWA support..."
if ! grep -q "manifest.json" dist/index.html; then
  sed -i '/<link rel="icon"/a \    <link rel="manifest" href="manifest.json">' dist/index.html
fi

# Create .nojekyll file to prevent GitHub Pages from using Jekyll processing
echo "[+] Creating .nojekyll file to prevent GitHub Pages Jekyll processing..."
touch ./dist/.nojekyll

# Make sure the script is inside the body tag
echo "[+] Ensuring script is inside body tag..."
# First remove any existing script outside the body
sed -i '/<\/body>/,/<\/html>/d' dist/index.html
# Then add the closing body tag with the script inside

cat >> dist/index.html << 'MATRIX_END'
    <!-- Matrix Animation -->
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            // Initialize Matrix theme
            console.log("🔒 Initializing Hackers-Den Matrix theme...");
        });
    </script>
</body>
</html>
MATRIX_END

# Create VSCode extension recommendation file
echo "[+] Adding VSCode extension recommendations..."
mkdir -p .vscode
cat > .vscode/extensions.json << 'EOL'
{
  "recommendations": [
    "ritwickdey.liveserver",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode"
  ]
}
EOL

echo "[+] Matrix theme applied successfully!"
echo "[+] Your Hackers-Den is now ready at ./dist/index.html"

# Add final success message with timestamp
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
echo "[+] Build completed at $TIMESTAMP"
echo "[+] 🔒 SECURITY CLEARANCE GRANTED: ACCESS TO HACKERS-DEN AUTHORIZED 🔒"