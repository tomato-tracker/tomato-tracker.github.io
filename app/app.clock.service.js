/**
 * Created by artem.kolosovich on 23.01.2016.
 */
System.register(["angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var ClockService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ClockService = (function () {
                function ClockService() {
                }
                ClockService.prototype.createClock = function (diff, fn) {
                    return $('.clock').FlipClock(diff, {
                        autoStart: false,
                        countdown: true,
                        clockFace: 'MinuteCounter',
                        callbacks: {
                            interval: function () {
                                var time = this.factory.getTime().time;
                                fn && fn(time);
                            }
                        }
                    });
                };
                ClockService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ClockService);
                return ClockService;
            })();
            exports_1("ClockService", ClockService);
        }
    }
});
//# sourceMappingURL=app.clock.service.js.map