'use strict';

class CountdownBarWidget {
    constructor(duration) {
        this.work = 0;
        this.countingDown = false;
        this.countdownBarTray = document.querySelector('.countdown-bar-tray');
        this.countdownBarTimer = document.querySelector('.countdown-bar-timer');
        this.timerIncrement = 100 / duration;
        this.countdownBarTimer.addEventListener(
            'transitionend',
            this.handleTimerWidthTransitionEnd.bind(this)
        );
    }
    countdown() {
        this.work += 1;
        if (!this.countingDown) {
            this.countingDown = true;
            this.work -= 1;
            this.showWidget();
        }
    }
    calculateNextCountdownTimerWidth() {
        const currentWidth = parseFloat(this.countdownBarTimer.style.width);
        const nextWidth = currentWidth - this.timerIncrement;
        return nextWidth <= 0 ? 0 : nextWidth;
    }
    showWidget() {
        return this.revealCountdownTray().then(() => this.fillCountdownTimer());
    }
    hideWidget() {
        return this.emptyCountdownTimer().then(() => this.hideCountdownTray());
    }
    fillCountdownTimer() {
        return this.transitionToPromise(this.countdownBarTimer, 'width', '100%');
    }
    emptyCountdownTimer() {
        return this.transitionToPromise(this.countdownBarTimer, 'width', '0%');
    }
    revealCountdownTray() {
        return this.transitionToPromise(this.countdownBarTray, 'width', '100%');
    }
    hideCountdownTray() {
        return this.transitionToPromise(this.countdownBarTray, 'width', '0%');
    }
    transitionToPromise(element, property, value) {
        if (!element || !property || !value) {
            return Promise.reject();
        }
        if (element.style[property] === value) {
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            const handler = (event) => {
                if (event.propertyName === property) {
                    element.removeEventListener('transitionend', handler);
                    resolve();
                }
            };
            element.addEventListener('transitionend', handler);
            element.style[property] = value;
        });
    }
    handleTimerWidthTransitionEnd(event) {
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

let countdownBarWidget;
window.addEventListener('onWidgetLoad', (obj) => {
    const fieldData = obj['detail']['fieldData'];
    const countdownDuration = fieldData.countdownDuration || 60;
    countdownBarWidget = new CountdownBarWidget(countdownDuration);
});
window.addEventListener('onEventReceived', (obj) => {
    const listener = obj['detail']['listener'];
    // We only care about the latest cheer event
    if (listener !== 'cheer-latest') {
        return;
    }
    countdownBarWidget.countdown();
});
