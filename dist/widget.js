'use strict';

var CountdownBarWidget = /** @class */ (function () {
    function CountdownBarWidget() {
        this.visible = false;
        this.countdownBar = document.querySelector('.countdown-bar');
    }
    CountdownBarWidget.prototype.startCountdown = function (seconds) {
        var _this = this;
        if (!this.visible) {
            this.showWidget();
        }
        // Allow one second to pass for the bar to animate to full
        window.setTimeout(function () {
            var intervalStep = 100 / seconds;
            _this.countdownInterval = window.setInterval(function () {
                var currentWidth = parseFloat(_this.countdownBar.style.width);
                if (currentWidth <= 0) {
                    clearInterval(_this.countdownInterval);
                    _this.countdownInterval = 0;
                    _this.hideWidget();
                } else {
                    var nextWidth =
                        currentWidth - intervalStep <= 0 ? 0 : currentWidth - intervalStep;
                    _this.countdownBar.style.width = nextWidth + '%';
                }
            }, 1000);
        }, 1000);
    };
    CountdownBarWidget.prototype.showWidget = function () {
        this.visible = true;
        this.countdownBar.style.width = '100%';
    };
    CountdownBarWidget.prototype.hideWidget = function () {
        this.visible = false;
        // TODO: Hide the widget. Shrink the bar left to right and then scale to zero the icon/text.
    };
    return CountdownBarWidget;
})();

var countdownBarWidget;
var countdownDuration; // Default to one minute
window.addEventListener('onWidgetLoad', function (obj) {
    var fieldData = obj['detail']['fieldData'];
    countdownDuration = fieldData.countdownDuration || 60;
    countdownBarWidget = new CountdownBarWidget();
});
window.addEventListener('onEventReceived', function (obj) {
    var listener = obj['detail']['listener'];
    if (listener === 'cheer-latest') {
        countdownBarWidget.startCountdown(countdownDuration);
    } else {
        SE_API.resumeQueue();
    }
});
