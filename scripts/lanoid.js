/**
 * @name lanoid
 * @description a general purpose class object for lanoid.co.uk
 * @author Matthew Lane
 * @version 1
 */
define(['jquery', 'lanoid/config'], function($, config){
    
    var module = {
        controller : {},
        view : {},
        loaded : []
    };
    
    /**
     * @name bind
     * @description bind event handlers when the page is ready
     */
    var bind = function(){
        $('li').children('ol').hide();
        
        $('ol li').mouseenter(function(){
            module.view.show_hide($(this).children('ol'));
        });

        $('ol li').mouseout(function(){
            module.view.show_hide($(this).children('ol'));
        });
        
        module.controller.timer(config.time, module.controller.backgrounds, config.images);
    };
    
    module.controller = {
        /**
         * @name module.controller.loader
         * @description a simple get request which passes data or false to a callback
         * @param (string) url
         * @param (function) callback
         */
        loader : function(url, callback){
            $.get(url)
            .success(function(data){
                module.loaded.push(url);
                callback(url);
            })
            .error(function(){
                callback(false);
            });
        },
        /**
         * @name module.controller.timer
         * @description trigger a callback when time reaches 0
         * @param (number) time
         * @param (function) callback
         * @param (object) data
         */
        timer : function(time, callback, data){
            var timer;
            
            if(time > 0){
                timer = setInterval(function(){
                    callback(data);
                }, time);
            } else {
                clearInterval(timer);
            }
        },
        /**
         * @name module.controller.backgrounds
         * @description load an image from an object based on a random integer
         * @param (object) backgrounds
         */
        backgrounds : function(backgrounds){
            var total = backgrounds.length;
            var x = module.controller.get_random_int(0, total);
            $.each(backgrounds, function(i,v){
                if(i === x){
                    if($.inArray(v, module.loaded) !== -1){
                        module.view.change_background(v);
                    } else {
                        module.controller.loader(v, module.view.change_background);
                    }
                }
            });
        },
        /**
         * Returns a random integer between min and max
         * Using Math.round() will give you a non-uniform distribution!
         */
        get_random_int : function(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    };
    
    module.view = {
        /**
         * @name module.view.show_hide
         * @description determine an elements visibility and show or hide it
         * @param (object) element - the element to be shown or hidden
         * @return void
         */
        show_hide : function(element){
            if(element.is(':visible')){
                element.slideUp();
            } else {
                element.slideDown();
            }
        },
        /**
         * @name module.view.change_background
         * @description change the css value of background image
         * @param (string) new_background
         */
        change_background : function(new_background){
            if(new_background){
                $('#page').css('background-image', 'url(' + new_background + ')');
            }
        }
    };
    
    $(function(){
       bind(); 
    });
    
    return module;
});