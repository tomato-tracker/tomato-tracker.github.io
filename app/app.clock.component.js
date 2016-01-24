/**
 * Created by artem.kolosovich on 21.01.2016.
 */
System.register(['angular2/core', "./app.clock.service", "./app.config"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, app_clock_service_1, app_config_1;
    var ClockComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_clock_service_1_1) {
                app_clock_service_1 = app_clock_service_1_1;
            },
            function (app_config_1_1) {
                app_config_1 = app_config_1_1;
            }],
        execute: function() {
            ClockComponent = (function () {
                function ClockComponent(clockService, configService) {
                    this.clockService = clockService;
                    this.configService = configService;
                    this.interval = null;
                    this.clockStarted = false;
                    this.logs = [
                        {
                            id: this.createId(),
                            date: new Date(),
                            text: 'Example, you can highlight something !important or use #hashtag in your messages',
                            template: "Example, you can highlight something <span class=\"important\">!important</span> or use <span class=\"tag\">#hashtag</span> in your messages"
                        }
                    ];
                    this.logText = '';
                    this.audio = new Audio('./assets/sound.mp3');
                    this.config = configService.getConfig();
                    this.createClock();
                }
                ClockComponent.prototype.createClock = function () {
                    var _this = this;
                    var onEachSecond = function (time) {
                        if (time == 0)
                            _this.notify();
                    };
                    this.clock = this.clockService.createClock(this.config.counter, onEachSecond);
                };
                ClockComponent.prototype.notify = function () {
                    var _this = this;
                    this.interval = setInterval(function () { return _this.playSound(); }, 2000);
                    // send notification
                };
                ClockComponent.prototype.playSound = function () {
                    this.audio.play();
                };
                ClockComponent.prototype.createTemplate = function (source) {
                    var delimiter = ' ';
                    return source
                        .split(delimiter)
                        .map(function (word) {
                        if (word.indexOf('#') == 0) {
                            return '<span class="tag">' + word + '</span>';
                        }
                        else if (word.indexOf('!') == 0) {
                            return '<span class="important">' + word + '</span>';
                        }
                        return word;
                    }).join(delimiter);
                };
                ClockComponent.prototype.createId = function () {
                    return Date.now().toString();
                };
                ClockComponent.prototype.onSaveLog = function () {
                    if (this.logText) {
                        var id = this.createId();
                        var template = this.createTemplate(this.logText);
                        var log = { id: id, date: new Date(), text: this.logText, template: template };
                        this.logs.unshift(log);
                        this.logText = '';
                        if (this.interval !== null) {
                            this.onResetTimer();
                        }
                    }
                };
                ClockComponent.prototype.onDeleteLog = function (id) {
                    var index = -1;
                    this.logs.forEach(function (x, i) {
                        if (x.id === id) {
                            index = i;
                        }
                    });
                    if (index !== -1) {
                        this.logs.splice(index, 1);
                    }
                };
                ClockComponent.prototype.onStartTimer = function () {
                    if (!this.clockStarted) {
                        this.clock.start();
                        this.clockStarted = true;
                    }
                };
                ClockComponent.prototype.onStopTimer = function () {
                    if (this.clockStarted) {
                        this.clock.stop();
                        this.clockStarted = false;
                    }
                };
                ClockComponent.prototype.onResetTimer = function () {
                    this.onStopTimer();
                    clearInterval(this.interval);
                    this.interval = null;
                    this.createClock();
                    if (this.config.sprint) {
                        this.onStartTimer();
                    }
                };
                ClockComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: './app/template.html',
                        providers: [app_clock_service_1.ClockService, app_config_1.ConfigService]
                    }), 
                    __metadata('design:paramtypes', [app_clock_service_1.ClockService, app_config_1.ConfigService])
                ], ClockComponent);
                return ClockComponent;
            })();
            exports_1("ClockComponent", ClockComponent);
        }
    }
});
//# sourceMappingURL=app.clock.component.js.map