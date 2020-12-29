'use strict';

window.addEventListener('onEventReceived', function (obj) {
    var listener = obj['detail']['listener'];
    if (listener === 'cheer-latest');
    else {
        SE_API.resumeQueue();
    }
});
