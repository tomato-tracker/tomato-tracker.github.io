/**
 * Created by artem.kolosovich on 28.01.2016.
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
    var ChartController;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ChartController = (function () {
                function ChartController() {
                    this.selector = '#chart';
                }
                ChartController.prototype.setSelector = function (selector) {
                    this.selector = selector;
                };
                ChartController.prototype.createBar = function (categories, data) {
                    $(this.selector).highcharts({
                        chart: {
                            type: 'bar',
                            height: 150,
                        },
                        title: { text: null },
                        xAxis: {
                            categories: categories,
                            title: { text: null }
                        },
                        yAxis: {
                            min: 0,
                            title: { text: null, },
                            labels: { overflow: 'justify' }
                        },
                        tooltip: { valueSuffix: ' seconds' },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true
                                }
                            },
                            title: { text: null }
                        },
                        credits: { enabled: false },
                        series: [{
                                showInLegend: false,
                                data: data
                            }]
                    });
                };
                ChartController = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ChartController);
                return ChartController;
            })();
            exports_1("ChartController", ChartController);
        }
    }
});
//# sourceMappingURL=app.chart.controller.js.map