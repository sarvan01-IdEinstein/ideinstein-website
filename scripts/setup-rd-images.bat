@echo off
echo Setting up R&D images for website integration...

REM Navigate to the R&D main directory
cd "public\images\services\engineering\research-development\main"

REM Copy the main service image to the correct name
if exist "Research & Development Service.png" (
    copy "Research & Development Service.png" "service-hero.jpg"
    echo ✅ Main service image ready: service-hero.jpg
)

REM Navigate back to process directories
cd ..\process

REM Setup Step 1
cd "RD-1-Define Project Scope and Design Constraints"
if exist "Define Project Scope and Design Constraints.png" (
    copy "Define Project Scope and Design Constraints.png" "step-hero.jpg"
    echo ✅ Step 1 image ready
)
cd ..

REM Setup Step 2
cd "RD-2-Research & Initial Concept Design"
if exist "Research & Initial Concept Design.png" (
    copy "Research & Initial Concept Design.png" "step-hero.jpg"
    echo ✅ Step 2 image ready
)
cd ..

REM Setup Step 3
cd "RD-3-Proof of Concept"
if exist "Proof of Concept.png" (
    copy "Proof of Concept.png" "step-hero.jpg"
    echo ✅ Step 3 image ready
)
cd ..

REM Setup Step 4
cd "RD-4-Engineering Analysis"
if exist "Engineering Analysis.png" (
    copy "Engineering Analysis.png" "step-hero.jpg"
    echo ✅ Step 4 image ready
)
cd ..

REM Setup Step 5
cd "RD-5-Final Design & Full Prototype"
if exist "Final Design & Full Prototype.png" (
    copy "Final Design & Full Prototype.png" "step-hero.jpg"
    echo ✅ Step 5 image ready
)
cd ..

REM Setup Step 6
cd "RD-6-User Validation & Iteration"
if exist "User Validation & Iteration.png" (
    copy "User Validation & Iteration.png" "step-hero.jpg"
    echo ✅ Step 6 image ready
)
cd ..

REM Setup Step 7
cd "RD-7-Regulatory & Compliance Assessment"
if exist "Regulatory & Compliance Assessment.png" (
    copy "Regulatory & Compliance Assessment.png" "step-hero.jpg"
    echo ✅ Step 7 image ready
)
cd ..

REM Setup Step 8
cd "RD-8-Manufacturing Plan"
if exist "Manufacturing Plan.png" (
    copy "Manufacturing Plan.png" "step-hero.jpg"
    echo ✅ Step 8 image ready
)
cd ..

REM Setup Step 9 (if it exists)
if exist "RD-9-Marketing Renders & Launch Support" (
    cd "RD-9-Marketing Renders & Launch Support"
    if exist "Marketing Renders & Launch Support.png" (
        copy "Marketing Renders & Launch Support.png" "step-hero.jpg"
        echo ✅ Step 9 image ready
    )
    cd ..
)

echo.
echo 🎉 R&D images setup complete!
echo Your Research & Development service should now display all generated images.
echo.
echo Next steps:
echo 1. Run 'npm run dev' to test your website
echo 2. Navigate to /services/research-development
echo 3. Check that all images display correctly
echo.
pause