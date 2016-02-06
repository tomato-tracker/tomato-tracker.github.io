/**
 * Created by artem.kolosovich on 23.01.2016.
 */
System.register(["angular2/core", "./app.notification.service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, app_notification_service_1;
    var ClockService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_notification_service_1_1) {
                app_notification_service_1 = app_notification_service_1_1;
            }],
        execute: function() {
            ClockService = (function () {
                function ClockService(notificationService) {
                    this.notificationService = notificationService;
                    this.clockStarted = false;
                    this.counter = 0;
                }
                ClockService.prototype.createClock = function (diff) {
                    var _this = this;
                    this.counter = diff;
                    this.notificationService.stop();
                    var onEachSecond = function (time) {
                        if (time == 0)
                            _this.notificationService.notify();
                    };
                    this.clock = $('.clock').FlipClock(diff, {
                        autoStart: false,
                        countdown: true,
                        clockFace: 'MinuteCounter',
                        callbacks: {
                            interval: function () {
                                var time = this.factory.getTime().time;
                                onEachSecond(time);
                            }
                        }
                    });
                };
                ClockService.prototype.startClock = function () {
                    this.clockStarted = true;
                    return this.clock.start();
                };
                ClockService.prototype.stopClock = function () {
                    this.clockStarted = false;
                    return this.clock.stop();
                };
                ClockService.prototype.getTime = function () {
                    return this.clock.getTime();
                };
                ClockService.prototype.getDuration = function () {
                    return this.counter - this.getTime();
                };
                ClockService.prototype.formatDurationAsHours = function (value, metric) {
                    return moment.duration(value, metric).asHours().toFixed(2);
                };
                ClockService.prototype.isClockStarted = function () {
                    return this.clockStarted;
                };
                ClockService.prototype.getDateTime = function () {
                    return moment();
                };
                ClockService.prototype.getTimestamp = function () {
                    return moment.now().toString();
                };
                ClockService = __decorate([
                    core_1.Injectable(),
                    core_1.Component({
                        providers: [app_notification_service_1.NotificationService]
                    }), 
                    __metadata('design:paramtypes', [app_notification_service_1.NotificationService])
                ], ClockService);
                return ClockService;
            })();
            exports_1("ClockService", ClockService);
        }
    }
});
//# sourceMappingURL=app.clock.service.js.map