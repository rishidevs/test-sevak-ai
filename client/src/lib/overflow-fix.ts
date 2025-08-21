/**
 * Overflow Detection and Fix Utility
 * This utility helps detect and fix horizontal overflow issues in real-time
 */

export class OverflowFixer {
    private static instance: OverflowFixer;
    private isActive = false;
    private checkInterval: NodeJS.Timeout | null = null;

    static getInstance(): OverflowFixer {
        if (!OverflowFixer.instance) {
            OverflowFixer.instance = new OverflowFixer();
        }
        return OverflowFixer.instance;
    }

    /**
     * Start monitoring for overflow issues
     */
    start(): void {
        if (this.isActive) return;

        this.isActive = true;
        this.fixOverflow();

        // Check for overflow every 100ms
        this.checkInterval = setInterval(() => {
            this.fixOverflow();
        }, 100);

        // Also check on window resize
        window.addEventListener('resize', () => {
            this.fixOverflow();
        });

        // Check on scroll
        window.addEventListener('scroll', () => {
            this.fixOverflow();
        });

        console.log('OverflowFixer: Started monitoring for overflow issues');
    }

    /**
     * Stop monitoring for overflow issues
     */
    stop(): void {
        if (!this.isActive) return;

        this.isActive = false;

        if (this.checkInterval) {
            clearInterval(this.checkInterval);
            this.checkInterval = null;
        }

        window.removeEventListener('resize', this.fixOverflow);
        window.removeEventListener('scroll', this.fixOverflow);

        console.log('OverflowFixer: Stopped monitoring for overflow issues');
    }

    /**
     * Fix overflow issues by applying CSS rules
     */
    private fixOverflow(): void {
        try {
            // Only fix html and body overflow
            document.documentElement.style.overflowX = 'hidden';
            document.body.style.overflowX = 'hidden';

            // Check if there's actual overflow before applying fixes
            if (this.checkForOverflow()) {
                // Only fix elements that are actually causing overflow
                this.fixWideElements();
            }

        } catch (error) {
            console.warn('OverflowFixer: Error fixing overflow:', error);
        }
    }

    /**
     * Fix elements with absolute or fixed positioning that might cause overflow
     */
    private fixPositionedElements(): void {
        const positionedElements = document.querySelectorAll('[style*="position: absolute"], [style*="position: fixed"]');

        positionedElements.forEach((element) => {
            if (element instanceof HTMLElement) {
                element.style.maxWidth = '100vw';
                element.style.overflowX = 'hidden';

                // Fix right positioning
                if (element.style.right && element.style.right !== 'auto') {
                    const rightValue = parseInt(element.style.right);
                    if (rightValue < 0) {
                        element.style.right = '0';
                    }
                }

                // Fix left positioning
                if (element.style.left && element.style.left !== 'auto') {
                    const leftValue = parseInt(element.style.left);
                    if (leftValue < 0) {
                        element.style.left = '0';
                    }
                }
            }
        });
    }

    /**
     * Fix elements with widths that might cause overflow
     */
    private fixWideElements(): void {
        const wideElements = document.querySelectorAll('[style*="width"]');

        wideElements.forEach((element) => {
            if (element instanceof HTMLElement) {
                const style = window.getComputedStyle(element);
                const width = style.width;

                if (width && width !== 'auto') {
                    const widthValue = parseInt(width);
                    if (widthValue > window.innerWidth) {
                        element.style.maxWidth = '100vw';
                        element.style.width = '100%';
                    }
                }
            }
        });
    }

    /**
     * Fix elements with transforms that might cause overflow
     */
    private fixTransformElements(): void {
        const transformElements = document.querySelectorAll('[style*="transform"]');

        transformElements.forEach((element) => {
            if (element instanceof HTMLElement) {
                element.style.maxWidth = '100vw';
                element.style.overflowX = 'hidden';
            }
        });
    }

    /**
     * Check if there's currently horizontal overflow
     */
    checkForOverflow(): boolean {
        try {
            const body = document.body;
            const html = document.documentElement;

            const hasOverflow = body.scrollWidth > body.clientWidth ||
                html.scrollWidth > html.clientWidth;

            if (hasOverflow) {
                console.warn('OverflowFixer: Horizontal overflow detected');
                this.fixOverflow();
                return true;
            }

            return false;
        } catch (error) {
            console.warn('OverflowFixer: Error checking for overflow:', error);
            return false;
        }
    }

    /**
     * Force immediate overflow fix
     */
    forceFix(): void {
        this.fixOverflow();
    }

    /**
     * Get overflow statistics
     */
    getOverflowStats(): { hasOverflow: boolean; bodyWidth: number; bodyScrollWidth: number; htmlWidth: number; htmlScrollWidth: number } {
        try {
            const body = document.body;
            const html = document.documentElement;

            return {
                hasOverflow: body.scrollWidth > body.clientWidth || html.scrollWidth > html.clientWidth,
                bodyWidth: body.clientWidth,
                bodyScrollWidth: body.scrollWidth,
                htmlWidth: html.clientWidth,
                htmlScrollWidth: html.scrollWidth
            };
        } catch (error) {
            return {
                hasOverflow: false,
                bodyWidth: 0,
                bodyScrollWidth: 0,
                htmlWidth: 0,
                htmlScrollWidth: 0
            };
        }
    }
}

// Auto-start the overflow fixer when the module is imported
const overflowFixer = OverflowFixer.getInstance();

// Start monitoring after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        overflowFixer.start();
    });
} else {
    overflowFixer.start();
}

export default overflowFixer;
