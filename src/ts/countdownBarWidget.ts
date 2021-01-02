export class CountdownBarWidget {
    private countdownBarTimer: HTMLElement;

    private countdownBarTray: HTMLElement;

    private timerIncrement: number;

    private work = 0;

    private countingDown = false;

    constructor(duration: number) {
        this.countdownBarTray = document.querySelector('.countdown-bar-tray');
        this.countdownBarTimer = document.querySelector('.countdown-bar-timer');
        this.timerIncrement = 100 / duration;

        this.countdownBarTimer.addEventListener(
            'transitionend',
            this.handleTimerWidthTransitionEnd.bind(this)
        );
    }

    public countdown(): void {
        this.work += 1;

        if (!this.countingDown) {
            this.countingDown = true;
            this.work -= 1;
            this.showWidget();
        }
    }

    private calculateNextCountdownTimerWidth(): number {
        const currentWidth = parseFloat(this.countdownBarTimer.style.width);
        const nextWidth = currentWidth - this.timerIncrement;

        return nextWidth <= 0 ? 0 : nextWidth;
    }

    private showWidget(): Promise<void> {
        return this.revealCountdownTray().then(() => this.fillCountdownTimer());
    }

    private hideWidget(): Promise<void> {
        return this.emptyCountdownTimer().then(() => this.hideCountdownTray());
    }

    private fillCountdownTimer(): Promise<void> {
        return this.transitionToPromise(this.countdownBarTimer, 'width', '100%');
    }

    private emptyCountdownTimer(): Promise<void> {
        return this.transitionToPromise(this.countdownBarTimer, 'width', '0%');
    }

    private revealCountdownTray(): Promise<void> {
        return this.transitionToPromise(this.countdownBarTray, 'width', '100%');
    }

    private hideCountdownTray(): Promise<void> {
        return this.transitionToPromise(this.countdownBarTray, 'width', '0%');
    }

    private transitionToPromise(
        element: HTMLElement,
        property: string,
        value: string
    ): Promise<void> {
        if (!element || !property || !value) {
            return Promise.reject();
        }

        if (element.style[property] === value) {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            const handler = (event: TransitionEvent) => {
                if (event.propertyName === property) {
                    element.removeEventListener('transitionend', handler);
                    resolve();
                }
            };

            element.addEventListener('transitionend', handler);
            element.style[property] = value;
        });
    }

    private handleTimerWidthTransitionEnd(event: TransitionEvent): void {
        if (event.propertyName !== 'width') {
            return;
        }

        const newCountdownRequested = this.work > 0;

        if (newCountdownRequested) {
            this.work -= 1;
            this.fillCountdownTimer();
        } else {
            const currentWidth = parseFloat(this.countdownBarTimer.style.width);

            if (currentWidth <= 0) {
                this.countingDown = false;
                this.hideWidget();
            } else {
                const nextWidth = this.calculateNextCountdownTimerWidth();
                this.transitionToPromise(this.countdownBarTimer, 'width', `${nextWidth}%`);
            }
        }
    }
}
