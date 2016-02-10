/**
 * Created by artem.kolosovich on 08.02.2016.
 */
System.register(["./app.logger", "angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var app_logger_1, core_1;
    var AppStorage;
    return {
        setters:[
            function (app_logger_1_1) {
                app_logger_1 = app_logger_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AppStorage = (function () {
                function AppStorage() {
                }
                AppStorage.prototype.save = function (key, obj) {
                    window.localStorage.setItem(key, JSON.stringify(obj));
                };
                AppStorage.prototype.load = function (key) {
                    var str = window.localStorage.getItem(key);
                    if (!str)
                        return null;
                    try {
                        return JSON.parse(str);
                    }
                    catch (e) {
                        return null;
                    }
                };
                __decorate([
                    app_logger_1.Logger, 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [String, Object]), 
                    __metadata('design:returntype', void 0)
                ], AppStorage.prototype, "save", null);
                __decorate([
                    app_logger_1.Logger, 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [String]), 
                    __metadata('design:returntype', Object)
                ], AppStorage.prototype, "load", null);
                AppStorage = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], AppStorage);
                return AppStorage;
            })();
            exports_1("AppStorage", AppStorage);
        }
    }
});
//# sourceMappingURL=app.storage.js.map