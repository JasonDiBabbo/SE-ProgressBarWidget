'use strict';

var ProgressBarWidget = /** @class */ (function () {
    function ProgressBarWidget() {
        this.visible = false;
        this.progressBar = document.querySelector('.progress-bar');
    }
    ProgressBarWidget.prototype.startCountdown = function (seconds) {
        var _this = this;
        this.progressBar.style.width = '100%';
        var intervalStep = 100 / seconds;
        this.countdownInterval = window.setInterval(function () {
            var currentWidth = parseInt(_this.progressBar.style.width);
            if (currentWidth <= 0) {
                clearInterval(_this.countdownInterval);
                _this.countdownInterval = 0;
                // TODO: Hide the progress bar
            } else {
                _this.progressBar.style.width = currentWidth - intervalStep + '%';
            }
        }, 1000);
    };
    return ProgressBarWidget;
})();

var progressBarWidget;
window.addEventListener('onWidgetLoad', function () {
    progressBarWidget = new ProgressBarWidget();
});
window.addEventListener('onEventReceived', function (obj) {
    var listener = obj['detail']['listener'];
    if (listener === 'cheer-latest') {
        progressBarWidget.startCountdown(10); // Temporary magic number. configure this in widget.json later
    } else {
        SE_API.resumeQueue();
    }
});
