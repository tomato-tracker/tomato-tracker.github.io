/**
 * Created by artem.kolosovich on 07.02.2016.
 */
System.register([], function(exports_1) {
    function Logger(target, propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            console.group();
            console.info([target, propertyKey, 'INV'].concat(args.length ? args : ['none']));
            var result = originalMethod.apply(this, args);
            console.info([target, propertyKey, 'RES', result || 'void']);
            console.groupEnd();
            return result;
        };
        return descriptor;
    }
    exports_1("Logger", Logger);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=app.logger.js.map