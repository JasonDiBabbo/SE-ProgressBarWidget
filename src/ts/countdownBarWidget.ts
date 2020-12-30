export class CountdownBarWidget {
    public visible = false;

    private countdownInterval: number;

    private countdownBar: HTMLElement;

    constructor() {
        this.countdownBar = document.querySelector('.countdown-bar');
    }

    public startCountdown(seconds: number): void {
        if (!this.visible) {
            this.showWidget();
        }

        // Allow one second to pass for the bar to animate to full
        window.setTimeout(() => {
            const intervalStep = 100 / seconds;

            this.countdownInterval = window.setInterval(() => {
                const currentWidth = parseFloat(this.countdownBar.style.width);

                if (currentWidth <= 0) {
                    clearInterval(this.countdownInterval);
                    this.countdownInterval = 0;

                    this.hideWidget();
                } else {
                    const nextWidth =
                        currentWidth - intervalStep <= 0 ? 0 : currentWidth - intervalStep;
                    this.countdownBar.style.width = `${nextWidth}%`;
                }
            }, 1000);
        }, 1000);
    }

    private showWidget(): void {
        this.visible = true;

        this.countdownBar.style.width = '100%';
    }

    private hideWidget(): void {
        this.visible = false;
        // TODO: Hide the widget. Shrink the bar left to right and then scale to zero the icon/text.
    }
}
