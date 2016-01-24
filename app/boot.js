/**
 * Created by artem.kolosovich on 21.01.2016.
 */
System.register(['angular2/platform/browser', "./app.clock.component"], function(exports_1) {
    var browser_1, app_clock_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_clock_component_1_1) {
                app_clock_component_1 = app_clock_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_clock_component_1.ClockComponent);
        }
    }
});
//# sourceMappingURL=boot.js.map