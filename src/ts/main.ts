import { CountdownBarWidget } from './countdownBarWidget';

declare const SE_API: {
    resumeQueue: () => void;
};

let countdownBarWidget: CountdownBarWidget;
let countdownDuration: number; // Default to one minute

window.addEventListener('onWidgetLoad', (obj) => {
    const fieldData = obj['detail']['fieldData'];

    countdownDuration = fieldData.countdownDuration || 60;
    countdownBarWidget = new CountdownBarWidget();
});

window.addEventListener('onEventReceived', (obj) => {
    const listener: string = obj['detail']['listener'];

    if (listener === 'cheer-latest') {
        countdownBarWidget.startCountdown(countdownDuration);
    } else {
        SE_API.resumeQueue();
    }
});
