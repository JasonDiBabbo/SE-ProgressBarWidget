declare const SE_API: {
    resumeQueue: () => void;
};

window.addEventListener('onEventReceived', function (obj) {
    const listener: string = obj['detail']['listener'];

    if (listener === 'cheer-latest') {
        // Handle cheer event
    } else {
        SE_API.resumeQueue();
    }
});
