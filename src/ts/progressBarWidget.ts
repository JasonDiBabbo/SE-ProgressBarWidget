export class ProgressBarWidget {
    public visible = false;

    private countdownInterval: number;

    private progressBar: HTMLElement;

    constructor() {
        this.progressBar = document.querySelector('.progress-bar');
    }

    public startCountdown(seconds: number): void {
        this.progressBar.style.width = '100%';

        const intervalStep = 100 / seconds;
        this.countdownInterval = window.setInterval(() => {
            const currentWidth = parseInt(this.progressBar.style.width);

            if (currentWidth <= 0) {
                clearInterval(this.countdownInterval);
                this.countdownInterval = 0;

                // TODO: Hide the progress bar
            } else {
                this.progressBar.style.width = `${currentWidth - intervalStep}%`;
            }
        }, 1000);
    }
}
