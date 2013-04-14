
jQuery.fn.exists = function() {
    return this.length !== 0;
};

function heyEngineClass(){
    var doc = $(document);
    var win = $(window);
    var html = $('html');

    // erase some actions when started another action
    var eraseHandlers = [];

    var onErase = function(fn){
        if (typeof fn == 'function')
            eraseHandlers.push(fn);
    };

    var eraseActions = function(){
        $.each(eraseHandlers, function(i, fn){
            fn();
            eraseHandlers.splice(i, 1);
        });
    };



    // combine default and user options
    var defineOptions = function(defaultOptions, userOptions){
        userOptions = userOptions || {};
        $.each(defaultOptions, function(optName){
            if (typeof userOptions[optName] !== 'undefined') defaultOptions[optName] = userOptions[optName];
        });

        return defaultOptions;
    };



    // drag & drop elements
    this.dragnDropInit = function(options){

        options = defineOptions({
            selector: '.dragnDrop',
            draggedClass: 'dragged',
            onDragBodyClass: 'moveOnBody',
            // todo:
            allowDrop: null,
            denyDrop: null,
            onDenyReturn: false
        }, options);

        $(function(){
            var zIndex, origLeft, origTop;

            // drag or drop element
            html.on('click', options['selector'], function(event){

                var moving = $(this);
                moving.css('position', 'absolute');

                // drag
                if (!html.hasClass(options['onDragBodyClass'])){
                    eraseActions();

                    html.addClass(options['onDragBodyClass']);

                    $('.' + options['draggedClass']).removeClass(options['draggedClass']);
                    zIndex = moving.css('z-index');
                    origLeft = moving.css('left');
                    origTop = moving.css('top');
                    moving.css('z-index', '99')
                        .addClass(options['draggedClass']);
                }
                // drop
                else {
                    // todo drop denied
                    if (0){
                        moving.css('left', origLeft)
                            .css('top', origTop);
                    }

                    html.removeClass(options['onDragBodyClass']);

                    moving.css('z-index', zIndex)
                        .removeClass(options['draggedClass']);
                }

                event.stopPropagation();
            });

            // rightclick returns element
            html.on('contextmenu', options['selector'], function(event){
                event.preventDefault();
                if (!html.hasClass(options['onDragBodyClass'])) return;

                $(this).css('left', origLeft)
                    .css('top', origTop)
                    .css('z-index', zIndex)
                    .removeClass(options['draggedClass']);
                html.removeClass(options['onDragBodyClass']);

                event.stopPropagation();
            });

            // move element
            doc.on('mousemove', '.' + options['onDragBodyClass'], function(event){

                var dragged = $('.' + options['draggedClass']);
                if (!dragged.exists()) return;

                var size = {
                    w: dragged.width(),
                    h: dragged.height()
                };

                var winSize = {
                    w: win.width(),
                    h: win.height()
                };

                var lay = {
                    x: event.pageX - Math.ceil(size['w'] / 2),
                    y: event.pageY - Math.ceil(size['h'] / 2)
                };

                if (lay['x'] < 0) lay['x'] = 0;
                else if (lay['x'] > winSize['w'] - size['w']) lay['x'] = winSize['w'] - size['w'];
                if (lay['y'] < 0) lay['y'] = 0;
                else if (lay['y'] > winSize['h'] - size['h']) lay['y'] = winSize['h'] - size['h'];

                dragged.css({
                    left: lay['x'],
                    top: lay['y']
                });

                event.stopPropagation();
            });
        });
    };



    // drag & drop elements
    this.unitInit = function(options){

        options = defineOptions({
            selector: '.unit',
            selectedClass: 'unitSelected',
            onSelectBodyClass: 'unitOnBody',
            speed: 300, // pixels per second
            gridX: 1,
            gridY: 1
        }, options);

        $(function(){
            // select unit
            html.on('click', options['selector'], function(event){
                eraseActions();
                onErase(function(){
                    $('.' + options['selectedClass']).removeClass(options['selectedClass']);
                    $('.' + options['onSelectBodyClass']).removeClass(options['onSelectBodyClass']);
                });

                $(this).css('position', 'absolute')
                    .addClass(options['selectedClass']);
                html.addClass(options['onSelectBodyClass']);

                event.stopPropagation();
            });

            // move unit
            doc.on('click', '.' + options['onSelectBodyClass'], function(event){

                var unit = $('.' + options['selectedClass']);
                if (!unit.exists()) return;
                unit.stop();

                var cutX = unit.width() /2;
                var cutY = unit.height() /2;

                var aimX = (Math.ceil(event.pageX /options['gridX']) * options['gridX']) - options['gridX'] /2;
                var aimY = (Math.ceil(event.pageY /options['gridY']) * options['gridY']) - options['gridY'] /2;

                // duration
                var duration = Math.sqrt(
                    Math.pow(Math.abs(aimX - unit.position().left - cutX), 2)
                        + Math.pow(Math.abs(aimY - unit.position().top - cutY), 2)
                ) / options['speed'] * 1000;

                unit.animate({
                    left: aimX - cutX,
                    top: aimY - cutY
                }, {
                    duration: duration,
                    easing: 'linear',
                    queue: false
                });

                event.stopPropagation();
            });

            doc.on('contextmenu', '.' + options['onSelectBodyClass'], function(event){
                $('.' + options['selectedClass']).stop();
                event.preventDefault();
            });
        });
    }
}
var hey = new heyEngineClass;
