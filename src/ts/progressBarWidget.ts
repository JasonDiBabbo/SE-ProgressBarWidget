export class ProgressBarWidget {
    public visible = false;

    private countdownInterval: number;

    private progressBar: HTMLElement;

    constructor() {
        this.progressBar = document.querySelector('.progress-bar');
    }

    public startCountdown(seconds: number): void {
        // TODO: Formally encapsulate loading the widget in a method
        this.progressBar.style.width = '100%';

        // Allow one second to pass for the bar to animate to full
        window.setTimeout(() => {
            const intervalStep = 100 / seconds;

            this.countdownInterval = window.setInterval(() => {
                const currentWidth = parseFloat(this.progressBar.style.width);

                if (currentWidth <= 0) {
                    clearInterval(this.countdownInterval);
                    this.countdownInterval = 0;

                    // TODO: Hide the widget. Shrink the bar left to right and then scale to zero the icon/text.
                } else {
                    const nextWidth =
                        currentWidth - intervalStep <= 0 ? 0 : currentWidth - intervalStep;
                    this.progressBar.style.width = `${nextWidth}%`;
                }
            }, 1000);
        }, 1000);
    }
}
