@echo off
echo ========================================
echo  Pushing PolyID to GitHub
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Initializing Git repository...
git init

echo.
echo Step 2: Adding remote repository...
git remote add origin https://github.com/anshuraj5679/polyid.git 2>nul
if errorlevel 1 (
    echo Remote already exists, updating URL...
    git remote set-url origin https://github.com/anshuraj5679/polyid.git
)

echo.
echo Step 3: Creating .gitignore...
(
echo node_modules/
echo backend/node_modules/
echo frontend/node_modules/
echo backend/.env
echo .env
echo backend/uploads/
echo *.log
echo .DS_Store
echo dist/
echo build/
) > .gitignore

echo.
echo Step 4: Adding all files...
git add .

echo.
echo Step 5: Committing changes...
git commit -m "Initial commit: PolyID credential management system with blockchain integration"

echo.
echo Step 6: Setting main branch...
git branch -M main

echo.
echo Step 7: Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo  Done! Check https://github.com/anshuraj5679/polyid
echo ========================================
echo.
pause
