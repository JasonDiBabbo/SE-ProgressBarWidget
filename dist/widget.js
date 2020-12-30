'use strict';

var ProgressBarWidget = /** @class */ (function () {
    function ProgressBarWidget() {
        this.visible = false;
        this.progressBar = document.querySelector('.progress-bar');
    }
    ProgressBarWidget.prototype.startCountdown = function (seconds) {
        var _this = this;
        // TODO: Formally encapsulate loading the widget in a method
        this.progressBar.style.width = '100%';
        // Allow one second to pass for the bar to animate to full
        window.setTimeout(function () {
            var intervalStep = 100 / seconds;
            _this.countdownInterval = window.setInterval(function () {
                var currentWidth = parseFloat(_this.progressBar.style.width);
                if (currentWidth <= 0) {
                    clearInterval(_this.countdownInterval);
                    _this.countdownInterval = 0;
                    // TODO: Hide the widget. Shrink the bar left to right and then scale to zero the icon/text.
                } else {
                    var nextWidth =
                        currentWidth - intervalStep <= 0 ? 0 : currentWidth - intervalStep;
                    _this.progressBar.style.width = nextWidth + '%';
                }
            }, 1000);
        }, 1000);
    };
    return ProgressBarWidget;
})();

var progressBarWidget;
var countdownDuration; // Default to one minute
window.addEventListener('onWidgetLoad', function (obj) {
    var fieldData = obj['detail']['fieldData'];
    countdownDuration = fieldData.countdownDuration || 60;
    progressBarWidget = new ProgressBarWidget();
});
window.addEventListener('onEventReceived', function (obj) {
    var listener = obj['detail']['listener'];
    if (listener === 'cheer-latest') {
        progressBarWidget.startCountdown(countdownDuration);
    } else {
        SE_API.resumeQueue();
    }
});
