const fs = require('fs');
const path = require('path');

// Responsive design analysis for SevakAI website
class ResponsiveDesignAnalyzer {
    constructor() {
        this.issues = [];
        this.warnings = [];
        this.passes = [];
        this.breakpoints = {
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            '2xl': 1536
        };
    }

    analyze() {
        console.log('🔍 Analyzing SevakAI website for responsive design...\n');
        
        this.checkViewportMeta();
        this.checkTailwindConfig();
        this.checkCSSFiles();
        this.checkComponentFiles();
        this.checkImageOptimization();
        this.checkTouchTargets();
        this.checkTypography();
        this.checkLayoutIssues();
        
        this.generateReport();
    }

    checkViewportMeta() {
        console.log('📱 Checking viewport meta tag...');
        try {
            const htmlContent = fs.readFileSync('index.html', 'utf8');
            if (htmlContent.includes('viewport') && htmlContent.includes('width=device-width')) {
                this.passes.push('✅ Viewport meta tag is properly configured');
            } else {
                this.issues.push('❌ Missing or incorrect viewport meta tag');
            }
        } catch (error) {
            this.issues.push('❌ Could not read index.html file');
        }
    }

    checkTailwindConfig() {
        console.log('🎨 Checking Tailwind configuration...');
        try {
            const configContent = fs.readFileSync('tailwind.config.ts', 'utf8');
            
            // Check for responsive breakpoints
            if (configContent.includes('screens')) {
                this.passes.push('✅ Tailwind responsive breakpoints configured');
            } else {
                this.warnings.push('⚠️  No custom responsive breakpoints found in Tailwind config');
            }

            // Check for container configuration
            if (configContent.includes('container')) {
                this.passes.push('✅ Container configuration found');
            } else {
                this.warnings.push('⚠️  No container configuration found');
            }
        } catch (error) {
            this.issues.push('❌ Could not read tailwind.config.ts file');
        }
    }

    checkCSSFiles() {
        console.log('🎯 Checking CSS files for responsive patterns...');
        try {
            const cssContent = fs.readFileSync('src/index.css', 'utf8');
            
            // Check for overflow prevention
            if (cssContent.includes('overflow-x: hidden')) {
                this.passes.push('✅ Horizontal overflow prevention implemented');
            } else {
                this.warnings.push('⚠️  No horizontal overflow prevention found');
            }

            // Check for image scaling
            if (cssContent.includes('max-width: 100%') && cssContent.includes('height: auto')) {
                this.passes.push('✅ Responsive image scaling implemented');
            } else {
                this.warnings.push('⚠️  Image scaling rules not found');
            }

            // Check for mobile-first approach
            if (cssContent.includes('@media')) {
                this.passes.push('✅ Media queries found in CSS');
            } else {
                this.warnings.push('⚠️  No media queries found in CSS');
            }
        } catch (error) {
            this.issues.push('❌ Could not read CSS files');
        }
    }

    checkComponentFiles() {
        console.log('🧩 Checking component files for responsive classes...');
        
        const srcDir = 'src';
        const componentFiles = this.getFilesRecursively(srcDir, ['.tsx', '.ts']);
        
        let responsiveClassCount = 0;
        let mobileClassCount = 0;
        let tabletClassCount = 0;
        let desktopClassCount = 0;

        componentFiles.forEach(file => {
            try {
                const content = fs.readFileSync(file, 'utf8');
                
                // Count responsive classes
                const responsiveMatches = content.match(/sm:|md:|lg:|xl:|2xl:/g);
                if (responsiveMatches) {
                    responsiveClassCount += responsiveMatches.length;
                }

                // Count specific breakpoint usage
                const smMatches = content.match(/sm:/g);
                const mdMatches = content.match(/md:/g);
                const lgMatches = content.match(/lg:/g);
                const xlMatches = content.match(/xl:/g);

                if (smMatches) mobileClassCount += smMatches.length;
                if (mdMatches) tabletClassCount += mdMatches.length;
                if (lgMatches) desktopClassCount += lgMatches.length;
                if (xlMatches) desktopClassCount += xlMatches.length;

            } catch (error) {
                // Skip files that can't be read
            }
        });

        if (responsiveClassCount > 0) {
            this.passes.push(`✅ Found ${responsiveClassCount} responsive classes across components`);
            this.passes.push(`   - Mobile (sm): ${mobileClassCount} classes`);
            this.passes.push(`   - Tablet (md): ${tabletClassCount} classes`);
            this.passes.push(`   - Desktop (lg/xl): ${desktopClassCount} classes`);
        } else {
            this.issues.push('❌ No responsive classes found in components');
        }
    }

    checkImageOptimization() {
        console.log('🖼️  Checking image optimization...');
        
        const publicDir = 'public';
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
        
        try {
            const imageFiles = this.getFilesRecursively(publicDir, imageExtensions);
            
            if (imageFiles.length > 0) {
                this.passes.push(`✅ Found ${imageFiles.length} image files in public directory`);
                
                // Check for different image sizes
                const hasMultipleSizes = imageFiles.some(file => 
                    file.includes('-1.') || file.includes('-2.') || file.includes('-3.')
                );
                
                if (hasMultipleSizes) {
                    this.passes.push('✅ Multiple image sizes found (good for responsive design)');
                } else {
                    this.warnings.push('⚠️  Consider providing multiple image sizes for different devices');
                }
            } else {
                this.warnings.push('⚠️  No image files found in public directory');
            }
        } catch (error) {
            this.warnings.push('⚠️  Could not analyze image files');
        }
    }

    checkTouchTargets() {
        console.log('👆 Checking touch target sizes...');
        
        const srcDir = 'src';
        const componentFiles = this.getFilesRecursively(srcDir, ['.tsx', '.ts']);
        
        let buttonCount = 0;
        let smallButtonCount = 0;

        componentFiles.forEach(file => {
            try {
                const content = fs.readFileSync(file, 'utf8');
                
                // Count buttons
                const buttonMatches = content.match(/Button|button/g);
                if (buttonMatches) {
                    buttonCount += buttonMatches.length;
                }

                // Check for small button sizes
                const smallButtonMatches = content.match(/size="sm"|h-8|h-9/g);
                if (smallButtonMatches) {
                    smallButtonCount += smallButtonMatches.length;
                }

            } catch (error) {
                // Skip files that can't be read
            }
        });

        if (buttonCount > 0) {
            this.passes.push(`✅ Found ${buttonCount} button elements`);
            
            if (smallButtonCount > 0) {
                this.warnings.push(`⚠️  Found ${smallButtonCount} small buttons - ensure they meet 44px minimum touch target`);
            } else {
                this.passes.push('✅ No small buttons detected');
            }
        }
    }

    checkTypography() {
        console.log('📝 Checking typography responsiveness...');
        
        const srcDir = 'src';
        const componentFiles = this.getFilesRecursively(srcDir, ['.tsx', '.ts']);
        
        let textSizeClasses = [];
        let responsiveTextCount = 0;

        componentFiles.forEach(file => {
            try {
                const content = fs.readFileSync(file, 'utf8');
                
                // Find text size classes
                const textMatches = content.match(/text-\w+/g);
                if (textMatches) {
                    textSizeClasses.push(...textMatches);
                }

                // Count responsive text classes
                const responsiveTextMatches = content.match(/text-\w+\.md:|text-\w+\.lg:|text-\w+\.xl:/g);
                if (responsiveTextMatches) {
                    responsiveTextCount += responsiveTextMatches.length;
                }

            } catch (error) {
                // Skip files that can't be read
            }
        });

        if (textSizeClasses.length > 0) {
            this.passes.push(`✅ Found ${textSizeClasses.length} text size classes`);
            
            if (responsiveTextCount > 0) {
                this.passes.push(`✅ Found ${responsiveTextCount} responsive text classes`);
            } else {
                this.warnings.push('⚠️  Consider adding responsive text sizing for better mobile experience');
            }
        }
    }

    checkLayoutIssues() {
        console.log('📐 Checking layout patterns...');
        
        const srcDir = 'src';
        const componentFiles = this.getFilesRecursively(srcDir, ['.tsx', '.ts']);
        
        let gridCount = 0;
        let flexCount = 0;
        let responsiveGridCount = 0;

        componentFiles.forEach(file => {
            try {
                const content = fs.readFileSync(file, 'utf8');
                
                // Count layout classes
                const gridMatches = content.match(/grid/g);
                const flexMatches = content.match(/flex/g);
                const responsiveGridMatches = content.match(/grid-cols-\d+\.md:|grid-cols-\d+\.lg:/g);

                if (gridMatches) gridCount += gridMatches.length;
                if (flexMatches) flexCount += flexMatches.length;
                if (responsiveGridMatches) responsiveGridCount += responsiveGridMatches.length;

            } catch (error) {
                // Skip files that can't be read
            }
        });

        if (gridCount > 0 || flexCount > 0) {
            this.passes.push(`✅ Found ${gridCount} grid and ${flexCount} flex layouts`);
            
            if (responsiveGridCount > 0) {
                this.passes.push(`✅ Found ${responsiveGridCount} responsive grid layouts`);
            } else {
                this.warnings.push('⚠️  Consider adding responsive grid layouts for better mobile experience');
            }
        }
    }

    getFilesRecursively(dir, extensions) {
        let files = [];
        
        try {
            const items = fs.readdirSync(dir);
            
            items.forEach(item => {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    files = files.concat(this.getFilesRecursively(fullPath, extensions));
                } else if (stat.isFile()) {
                    const ext = path.extname(item);
                    if (extensions.includes(ext)) {
                        files.push(fullPath);
                    }
                }
            });
        } catch (error) {
            // Directory doesn't exist or can't be read
        }
        
        return files;
    }

    generateReport() {
        console.log('\n📊 RESPONSIVE DESIGN ANALYSIS REPORT');
        console.log('=====================================\n');

        console.log('✅ PASSES:');
        this.passes.forEach(pass => console.log(`   ${pass}`));
        
        if (this.warnings.length > 0) {
            console.log('\n⚠️  WARNINGS:');
            this.warnings.forEach(warning => console.log(`   ${warning}`));
        }
        
        if (this.issues.length > 0) {
            console.log('\n❌ ISSUES:');
            this.issues.forEach(issue => console.log(`   ${issue}`));
        }

        console.log('\n📋 RECOMMENDATIONS:');
        console.log('   1. Test on actual devices (iPhone, Android, iPad, desktop)');
        console.log('   2. Use browser dev tools to test different screen sizes');
        console.log('   3. Check for touch target sizes (minimum 44px)');
        console.log('   4. Ensure text is readable on small screens (minimum 16px)');
        console.log('   5. Test loading performance on slow connections');
        console.log('   6. Verify all interactive elements work on touch devices');
        console.log('   7. Check for proper spacing and padding on mobile');
        console.log('   8. Ensure images scale properly without overflow');

        const score = this.calculateScore();
        console.log(`\n🎯 OVERALL SCORE: ${score}/100`);
        
        if (score >= 90) {
            console.log('🌟 Excellent responsive design implementation!');
        } else if (score >= 75) {
            console.log('👍 Good responsive design with room for improvement');
        } else if (score >= 60) {
            console.log('⚠️  Responsive design needs attention');
        } else {
            console.log('🚨 Responsive design requires significant work');
        }
    }

    calculateScore() {
        const totalChecks = this.passes.length + this.warnings.length + this.issues.length;
        if (totalChecks === 0) return 0;
        
        const passScore = this.passes.length * 10;
        const warningScore = this.warnings.length * 5;
        const issueScore = this.issues.length * 0;
        
        return Math.min(100, Math.round((passScore + warningScore + issueScore) / totalChecks * 10));
    }
}

// Run the analysis
const analyzer = new ResponsiveDesignAnalyzer();
analyzer.analyze();
