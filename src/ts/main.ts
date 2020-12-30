import { ProgressBarWidget } from './progressBarWidget';

declare const SE_API: {
    resumeQueue: () => void;
};

let progressBarWidget: ProgressBarWidget;
let countdownDuration: number; // Default to one minute

window.addEventListener('onWidgetLoad', (obj) => {
    const fieldData = obj['detail']['fieldData'];

    countdownDuration = fieldData.countdownDuration || 60;
    progressBarWidget = new ProgressBarWidget();
});

window.addEventListener('onEventReceived', (obj) => {
    const listener: string = obj['detail']['listener'];

    if (listener === 'cheer-latest') {
        progressBarWidget.startCountdown(countdownDuration);
    } else {
        SE_API.resumeQueue();
    }
});
