import { CountdownBarWidget } from './countdownBarWidget';

let countdownBarWidget: CountdownBarWidget;

window.addEventListener('onWidgetLoad', (obj) => {
    const fieldData = obj['detail']['fieldData'];

    const countdownDuration = fieldData.countdownDuration || 60;
    countdownBarWidget = new CountdownBarWidget(countdownDuration);
});

window.addEventListener('onEventReceived', (obj) => {
    const listener: string = obj['detail']['listener'];

    // We only care about the latest cheer event
    if (listener !== 'cheer-latest') {
        return;
    }

    countdownBarWidget.countdown();
});
