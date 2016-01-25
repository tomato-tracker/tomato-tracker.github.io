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
                    this.today = moment().format('YYYY-MM-DD');
                    this.clockStarted = false;
                    this.logs = [
                        {
                            id: this.createId(),
                            date: moment(),
                            period: 777,
                            text: '',
                            template: "Example, <span class=\"task\">!tasks</span> and <span class=\"tag\">#hashtags</span> will be highlighted."
                        }
                    ];
                    this.logText = '';
                    this.groupedTasks = {};
                    this.tasks = [];
                    this.summary = 0;
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
                ClockComponent.prototype.addOrUpdateTask = function (period, words) {
                    var _this = this;
                    words.forEach(function (s) {
                        _this.groupedTasks[s] = _this.groupedTasks[s] || { value: 0, count: 0, name: null };
                        _this.groupedTasks[s].value += period;
                        _this.groupedTasks[s].count++;
                        _this.groupedTasks[s].name = s;
                    });
                };
                ClockComponent.prototype.createTemplate = function (source) {
                    var symbols = {};
                    var result = { value: null, symbols: symbols };
                    var delimiter = ' ';
                    result.value = source
                        .split(delimiter)
                        .map(function (word) {
                        if (word.indexOf('#') == 0) {
                            return '<span class="tag">' + word + '</span>';
                        }
                        else if (word.indexOf('!') == 0) {
                            symbols[word] = true;
                            return '<span class="task">' + word + '</span>';
                        }
                        return word;
                    }).join(delimiter);
                    return result;
                };
                ClockComponent.prototype.createId = function () {
                    return Date.now().toString();
                };
                ClockComponent.prototype.updateSummary = function (period) {
                    this.summary += period;
                };
                ClockComponent.prototype.getPeriod = function () {
                    var time = this.clock.getTime();
                    return this.config.counter - time;
                };
                ClockComponent.prototype.updateTasks = function () {
                    var _this = this;
                    this.tasks = Object.keys(this.groupedTasks).map(function (s) { return _this.groupedTasks[s]; });
                };
                ClockComponent.prototype.onSaveLog = function () {
                    if (this.logText) {
                        var id = this.createId();
                        var template = this.createTemplate(this.logText);
                        var period = this.getPeriod();
                        var log = { id: id, date: moment(), period: period, text: this.logText, template: template.value };
                        this.logs.unshift(log);
                        this.logText = '';
                        this.onResetTimer();
                        this.updateSummary(period);
                        this.addOrUpdateTask(period, Object.keys(template.symbols));
                        this.updateTasks();
                    }
                };
                ClockComponent.prototype.onDeleteLog = function (log) {
                    var index = -1;
                    this.logs.forEach(function (x, i) {
                        if (x.id === log.id) {
                            index = i;
                        }
                    });
                    if (index !== -1) {
                        this.logs.splice(index, 1);
                    }
                    this.updateTasks();
                };
                ClockComponent.prototype.onCopyLog = function (text) {
                    this.logText = text;
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