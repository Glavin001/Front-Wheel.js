// Adding New Functionality to the Skillet
(function( lib, $, Handlebars, undefined ) {

    var self = lib;

    var selector = ".front-wheel";

    // Private Property
    var amountOfGrease = "1 Cup";

    // Public Method

    // Private Methods
    var loadWithSelector = function(sel) {
        $.each($(sel), function(index, el) {
            console.log(el);
            var $el = $(el);
            
            loadWithElement($el);

        });
    };

    var loadWithElement = function($el) {

        // Check if already loaded
        var template = $el.data('handlebars-template');
        
        if (!template) {

            // Extract template
            var source = $el.html();
            template = Handlebars.compile(source);

            // Save Template
            $el.data('handlebars-template', template);
            
            // Replace
            var el = replaceTag($el.get(0), 'div');
            $el = $(el);

            // Clear
            $el.html('');

        } else {
            //console.log('Template:', template);
        }

        // Extract Properties
        var props = extractProperties($el);

        // Render template
        var context = props.model;
        var html = template(context);
        $el.html(html);

    };

    var extractProperties = function($el) {
        var props = {};

        props.modelType = $el.attr('data-model-type') || 'json';
        props.model = $el.attr('data-model') || '{}';
        props.updateInterval = parseInt( $el.attr('data-update-interval') ) || false;
        props.updateTriggers = $el.attr('data-watch-el') || false;

        // Parse Model
        if (props.modelType === 'json') {
            try {
                var model = JSON.parse(props.model);
                props.model = model;
            } catch (e) {
                console.error(e);
            }
        } else if (props.modelType === "function") {
            try {
                var model = eval(props.model);
                props.model = model;
            } catch (e) {
                console.error(e);
            }
        }

        // Update Triggers
        if (props.updateTriggers) {
            
            try {
                var elTriggers = JSON.parse(props.updateTriggers);
                //
                for (var sel in elTriggers)
                {
                    var ev = elTriggers[sel];

                    //console.log(ev);
                    var $t = $(sel);
                    // Bind Once
                    // Note: when rendered, this will re-bind any still existing triggers.
                    ev.push( function() {
                        loadWithElement($el);
                    });
                    $t.one.apply($t, ev);
                    
                }

            } catch (e) {
                console.error(e);
            }
        }

        // Updating on an Interval
        if (props.updateInterval) {
            setTimeout(function() {
                loadWithElement($el);
            }, props.updateInterval);
        }

        return props;
    };

    var replaceTag = function(src, newTag) {
        
        el = document.createElement(newTag);
        // Attributes
        attrs = src.attributes;
        for(var j=0,k=attrs.length;j<k;j++) {
            el.setAttribute(attrs[j].name, attrs[j].value);
        }
        // HTML
        el.innerHTML = src.innerHTML;
        // Data
        var $src = $(src);
        var data = $src.data();
        var $el = $(el);
        for (var key in data) {
            $el.data(key, data[key]);
        }
        // Finally, replace
        src.parentNode.replaceChild(el, src);
        
        return el;
    };

    loadWithSelector(selector);
    
}( window.lib = window.lib || {}, jQuery, Handlebars ));
