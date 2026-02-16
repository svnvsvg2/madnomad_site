@echo off
echo ==========================================
echo       DEPLOYING SITE TO VERCEL           
echo ==========================================

echo Staging changes...
git add .

set /p commitMsg="Enter commit message (Press Enter for default 'Update site content'): "
if "%commitMsg%"=="" set commitMsg="Update site content"

echo Committing changes...
git commit -m "%commitMsg%"

echo Pushing to GitHub (Vercel will auto-deploy)...
git push origin main

echo ==========================================
echo             DEPLOY COMPLETE              
echo ==========================================
pause
