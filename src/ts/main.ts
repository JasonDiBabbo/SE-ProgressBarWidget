import { ProgressBarWidget } from './progressBarWidget';

declare const SE_API: {
    resumeQueue: () => void;
};

let progressBarWidget: ProgressBarWidget;

window.addEventListener('onWidgetLoad', () => {
    progressBarWidget = new ProgressBarWidget();
});

window.addEventListener('onEventReceived', (obj) => {
    const listener: string = obj['detail']['listener'];

    if (listener === 'cheer-latest') {
        progressBarWidget.startCountdown(10); // Temporary magic number. configure this in widget.json later
    } else {
        SE_API.resumeQueue();
    }
});
