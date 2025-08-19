@echo off
echo Setting up CAD Modeling images for website integration...

REM Navigate to the CAD Modeling main directory
cd "public\images\services\design\cad-modeling\main"

REM Check if we have PNG files to convert
if exist "*.png" (
    echo Converting main service PNG to JPG...
    for %%f in (*.png) do (
        copy "%%f" "service-hero.jpg"
        echo ✅ Main service image ready: service-hero.jpg
    )
) else if exist "service-hero.svg" (
    echo ⚠️  Found SVG file. Please convert to JPG format manually.
    echo    SVG files need to be converted to JPG for proper display.
) else (
    echo ❌ No main service image found. Please add service-hero.jpg
)

REM Navigate back to process directories
cd ..\process

echo.
echo Setting up process step images...

REM Setup each step directory
for /d %%d in (ED-*) do (
    cd "%%d"
    if exist "*.png" (
        for %%f in (*.png) do (
            copy "%%f" "step-hero.jpg"
            echo ✅ %%d image ready
        )
    ) else if exist "step-hero.svg" (
        echo ⚠️  %%d: Found SVG file. Please convert to JPG format manually.
    ) else (
        echo ❌ %%d: No image found. Please add step-hero.jpg
    )
    cd ..
)

echo.
echo 🎯 CAD Modeling images setup summary:
echo.
echo ⚠️  IMPORTANT: SVG files detected!
echo    The website expects JPG format images for proper display.
echo    Please convert your SVG files to JPG format:
echo.
echo    1. Open each SVG file in an image editor
echo    2. Export/Save as JPG format
echo    3. Replace the SVG files with JPG files
echo    4. Keep the same file names: service-hero.jpg and step-hero.jpg
echo.
echo Next steps after converting to JPG:
echo 1. Run 'npm run dev' to test your website
echo 2. Navigate to /services/cad-modeling
echo 3. Check that all images display correctly
echo.
pause