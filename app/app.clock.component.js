/**
 * Created by artem.kolosovich on 21.01.2016.
 */
System.register(['angular2/core', "./app.clock.service", "./app.config.service", "./app.logger", "./app.storage", "./app.notification.service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, app_clock_service_1, app_config_service_1, app_logger_1, app_storage_1, app_notification_service_1;
    var ClockComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_clock_service_1_1) {
                app_clock_service_1 = app_clock_service_1_1;
            },
            function (app_config_service_1_1) {
                app_config_service_1 = app_config_service_1_1;
            },
            function (app_logger_1_1) {
                app_logger_1 = app_logger_1_1;
            },
            function (app_storage_1_1) {
                app_storage_1 = app_storage_1_1;
            },
            function (app_notification_service_1_1) {
                app_notification_service_1 = app_notification_service_1_1;
            }],
        execute: function() {
            ClockComponent = (function () {
                function ClockComponent(clockService, configService, appStorage) {
                    this.clockService = clockService;
                    this.configService = configService;
                    this.appStorage = appStorage;
                    this.durationSummary = 0;
                    this.logs = [];
                    this.logText = '';
                    this.groupedTasks = {};
                    this.tasks = [];
                    this.config = configService.getConfig();
                    this.clockService.createClock(this.config.counter);
                    this.loadStorageData();
                }
                ClockComponent.prototype.loadStorageData = function () {
                    var _this = this;
                    var data = this.appStorage.load(this.config.day);
                    if (data) {
                        data.forEach(function (x) {
                            x.date = _this.clockService.getDateTime(x.date);
                            _this.addLog(x);
                            _this.addOrUpdateTask(x.duration, Object.keys(x.template.symbols));
                            _this.updateDurationSummary(x.duration);
                        });
                        this.updateTasks();
                    }
                    else {
                        this.createTaskExample();
                    }
                };
                ClockComponent.prototype.updateStorageData = function () {
                    this.appStorage.save(this.config.day, this.logs);
                };
                ClockComponent.prototype.clearState = function () {
                    this.onResetTimer();
                    this.logText = '';
                };
                ClockComponent.prototype.createTaskExample = function () {
                    var text = 'Example, !tasks and #hashtags are highlighted.';
                    var duration = 777;
                    this.onSaveLog(text, duration);
                };
                ClockComponent.prototype.addOrUpdateTask = function (duration, words) {
                    var _this = this;
                    words.forEach(function (s) {
                        _this.groupedTasks[s] = _this.groupedTasks[s] || { value: 0, count: 0, name: null };
                        _this.groupedTasks[s].value += duration;
                        _this.groupedTasks[s].count++;
                        _this.groupedTasks[s].name = s;
                        if (_this.groupedTasks[s].value <= 0) {
                            delete _this.groupedTasks[s];
                        }
                    });
                };
                ClockComponent.prototype.createTemplate = function (source) {
                    var symbolMap = {};
                    var result = { value: null, symbols: symbolMap };
                    var delimiter = ' ';
                    result.value = source
                        .split(delimiter)
                        .map(function (word) {
                        if (word.indexOf('#') == 0) {
                            return '<span class="tag">' + word + '</span>';
                        }
                        else if (word.indexOf('!') == 0) {
                            symbolMap[word] = true;
                            return '<span class="task">' + word + '</span>';
                        }
                        return word;
                    }).join(delimiter);
                    return result;
                };
                ClockComponent.prototype.updateDurationSummary = function (duration) {
                    this.durationSummary += duration;
                    if (this.durationSummary < 0) {
                        this.durationSummary = 0;
                    }
                };
                ClockComponent.prototype.updateTasks = function () {
                    var _this = this;
                    var keys = Object.keys(this.groupedTasks);
                    this.tasks = keys.map(function (s) { return _this.groupedTasks[s]; });
                };
                ClockComponent.prototype.addLog = function (log) {
                    this.logs.unshift(log);
                };
                ClockComponent.prototype.onSaveLog = function (text, duration) {
                    if (this.logText || (text && duration)) {
                        text = text || this.logText;
                        duration = duration || this.clockService.getDuration();
                        var id = this.clockService.getTimestamp();
                        var date = this.clockService.getDateTime();
                        var template = this.createTemplate(text);
                        this.addLog({ id: id, date: date, durationOld: duration, duration: duration, text: text, template: template, mode: 'view' });
                        this.addOrUpdateTask(duration, Object.keys(template.symbols));
                        this.updateTasks();
                        this.updateDurationSummary(duration);
                        this.updateStorageData();
                        this.clearState();
                    }
                };
                ClockComponent.prototype.deleteLog = function (id) {
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
                ClockComponent.prototype.onDeleteLog = function (log) {
                    this.deleteLog(log.id);
                    this.addOrUpdateTask(-log.durationOld, Object.keys(log.template.symbols));
                    this.updateTasks();
                    this.updateDurationSummary(-log.durationOld);
                    this.updateStorageData();
                };
                ClockComponent.prototype.onCopyLogText = function (text) {
                    this.logText = text;
                };
                ClockComponent.prototype.onEditLog = function (log) {
                    log.mode = 'edit';
                };
                ClockComponent.prototype.onUpdateLog = function (log) {
                    this.onDeleteLog(log);
                    this.onSaveLog(log.text, log.duration);
                };
                ClockComponent.prototype.onLogDurationChange = function (log) {
                    log.duration = parseInt(log.duration);
                    if (!log.duration) {
                        log.duration = log.durationOld;
                    }
                };
                ClockComponent.prototype.onGetTime = function (duration, metric) {
                    return this.clockService.formatDurationAsHours(duration, metric || 'seconds');
                };
                ClockComponent.prototype.onStartTimer = function () {
                    if (!this.clockService.isClockStarted()) {
                        this.clockService.startClock();
                    }
                };
                ClockComponent.prototype.onStopTimer = function () {
                    if (this.clockService.isClockStarted()) {
                        this.clockService.stopClock();
                    }
                };
                ClockComponent.prototype.onResetTimer = function () {
                    this.onStopTimer();
                    this.clockService.createClock(this.config.counter);
                    if (this.config.sprint) {
                        this.onStartTimer();
                    }
                };
                __decorate([
                    app_logger_1.Logger, 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [String, Number]), 
                    __metadata('design:returntype', void 0)
                ], ClockComponent.prototype, "onSaveLog", null);
                __decorate([
                    app_logger_1.Logger, 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], ClockComponent.prototype, "onDeleteLog", null);
                __decorate([
                    app_logger_1.Logger, 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [String]), 
                    __metadata('design:returntype', void 0)
                ], ClockComponent.prototype, "onCopyLogText", null);
                __decorate([
                    app_logger_1.Logger, 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], ClockComponent.prototype, "onEditLog", null);
                __decorate([
                    app_logger_1.Logger, 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], ClockComponent.prototype, "onUpdateLog", null);
                __decorate([
                    app_logger_1.Logger, 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], ClockComponent.prototype, "onLogDurationChange", null);
                __decorate([
                    app_logger_1.Logger, 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Number, String]), 
                    __metadata('design:returntype', String)
                ], ClockComponent.prototype, "onGetTime", null);
                __decorate([
                    app_logger_1.Logger, 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], ClockComponent.prototype, "onStartTimer", null);
                __decorate([
                    app_logger_1.Logger, 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], ClockComponent.prototype, "onStopTimer", null);
                __decorate([
                    app_logger_1.Logger, 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], ClockComponent.prototype, "onResetTimer", null);
                ClockComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        templateUrl: './app/template.html',
                        providers: [app_clock_service_1.ClockService, app_config_service_1.ConfigService, app_storage_1.AppStorage, app_notification_service_1.NotificationService]
                    }), 
                    __metadata('design:paramtypes', [app_clock_service_1.ClockService, app_config_service_1.ConfigService, app_storage_1.AppStorage])
                ], ClockComponent);
                return ClockComponent;
            })();
            exports_1("ClockComponent", ClockComponent);
        }
    }
});
//# sourceMappingURL=app.clock.component.js.map