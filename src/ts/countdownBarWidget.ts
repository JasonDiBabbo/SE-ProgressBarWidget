export class CountdownBarWidget {
    public visible = false;

    private countdownInterval: number;

    private countdownBar: HTMLElement;

    constructor() {
        this.countdownBar = document.querySelector('.countdown-bar');
    }

    public startCountdown(seconds: number): void {
        // TODO: Formally encapsulate loading the widget in a method
        this.countdownBar.style.width = '100%';

        // Allow one second to pass for the bar to animate to full
        window.setTimeout(() => {
            const intervalStep = 100 / seconds;

            this.countdownInterval = window.setInterval(() => {
                const currentWidth = parseFloat(this.countdownBar.style.width);

                if (currentWidth <= 0) {
                    clearInterval(this.countdownInterval);
                    this.countdownInterval = 0;

                    // TODO: Hide the widget. Shrink the bar left to right and then scale to zero the icon/text.
                } else {
                    const nextWidth =
                        currentWidth - intervalStep <= 0 ? 0 : currentWidth - intervalStep;
                    this.countdownBar.style.width = `${nextWidth}%`;
                }
            }, 1000);
        }, 1000);
    }
}
