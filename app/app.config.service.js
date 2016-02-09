/**
 * Created by artem.kolosovich on 24.01.2016.
 */
System.register(["angular2/core", "./app.logger"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, app_logger_1;
    var ConfigService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_logger_1_1) {
                app_logger_1 = app_logger_1_1;
            }],
        execute: function() {
            ConfigService = (function () {
                function ConfigService() {
                }
                ConfigService.prototype.getConfig = function () {
                    var params = this.parseUrl();
                    return {
                        counter: parseInt(params['counter']) || 1500,
                        sprint: !!params['sprint'],
                        showBar: !!params['showBar'],
                        day: moment().format('YYYY-MM-DD')
                    };
                };
                ConfigService.prototype.parseUrl = function () {
                    var urlParams = {};
                    var match, pl = /\+/g, // Regex for replacing addition symbol with a space
                    search = /([^&=]+)=?([^&]*)/g, decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); }, query = window.location.search.substring(1);
                    while (match = search.exec(query))
                        urlParams[decode(match[1])] = decode(match[2]);
                    return urlParams;
                };
                __decorate([
                    app_logger_1.Logger, 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', Object)
                ], ConfigService.prototype, "getConfig", null);
                ConfigService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ConfigService);
                return ConfigService;
            })();
            exports_1("ConfigService", ConfigService);
        }
    }
});
//# sourceMappingURL=app.config.service.js.map