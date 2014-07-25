// jQuery(document).on('click', 'a.modal', function() {
//     var myHTML = ['<header>Header here</header>', '<div class="content">Some content...</div>', '<footer>Footer here</footer>'].join('')
//     jQuery(this).customModal({
//         html : myHTML, width:640, sucess : function(){alert('created')}
//     });  
// });
jQuery.fn.customModal = function(options)
{
    var defaults = {
        html : '',
        width : 480,
        class : 'body',
        success : null,
        ajax : false,
    };
    
    var settings = jQuery.extend({}, defaults, options);
    settings.overlayWidget = jQuery('<div id="customModalOverlay">');
    settings.contentWidget = jQuery('<div id="customModalContent">');
    
    var methods = {
        init : function() 
        {
            methods.buildHTML();
            jQuery(settings.contentWidget).draggable()
            if(typeof settings.success == 'function') {
                settings.success.apply(Array.prototype.slice.call(arguments, 1));
            }
        },
        
        buildHTML : function() {
            settings.overlayWidget.css({
                background : '#fff',
                opacity : '0.5',
                position : 'fixed',
                left : '0px',
                top : '0px',
                zIndex : 1001
            });
            jQuery(settings.overlayWidget).appendTo('body');
            methods.overlayResize();
            
            settings.contentWidget.css({
                width : settings.width + 'px',
                background : '#fff',
                position : 'fixed',
                zIndex : 1002                
            });
            settings.contentWidget.html(settings.html);
            settings.contentWidget.addClass(settings.class);
            
            jQuery(settings.contentWidget).appendTo('body');
            methods.contentResize();
        },
        
        overlayResize : function() {
            var windowHeight = jQuery(window).height();
            var windowWidth = jQuery(window).width();
            settings.overlayWidget.css({
                height : windowHeight,
                width : windowWidth,
                zIndex : 1001
            });
        },
        
        contentResize : function() {
            var windowHeight = jQuery(window).height();
            var windowWidth = jQuery(window).width();
            
            var marginLeft = (windowWidth / 2) - (settings.width / 2);
            var marginTop = (windowHeight / 2) - (settings.contentWidget.height() / 2);
            settings.contentWidget.css({
                top : parseInt(marginTop)+'px',
                left : parseInt(marginLeft)+'px'
            });
        }
    };
    
    jQuery(window).resize(function(){
        methods.overlayResize();
        methods.contentResize();
    });
    
    return this.each(function(){
        methods.init();
    });
}
