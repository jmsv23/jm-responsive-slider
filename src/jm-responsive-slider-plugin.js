/**
* Autor: Jose Manuel Santibañez Villanueva
* E-mail: jmsv23@gmail.com
* Github: https://github.com/jmsv23
* Licencia: GNU GPL V3
**/

(function($) {
    $.fn.jmResponsiveSlider = function(options) {

       // Establish our default settings
        var settings = $.extend({
            tiempo       : 500,
            breakpoint   : null,
            evento       : 'click',
            onmove       : null,
            complete     : null
        }, options);

        return this.each( function() {
            // variables set
            var container = $(this);
            var n = container.children('.slidecontent').children('.slide').size();
            var contenedor = container.children('.slidecontent');
            var slide = contenedor.children('.slide');
            var size = container.outerWidth(false);
            var avance = 0;
            var widthState = $( window ).width();
            var lock = false;
            var pos = 0;
            //container.css('position', 'relative');
            container.css({'position': 'relative', 'overflow': 'hidden'});
            contenedor.addClass('clearfix');
            contenedor.width(size * n);
            slide.css('display', 'block');

            //function de control de breakpoint
            function checkBreakpoint( bp, tam ) {
                //if breakpoint exist set inilial config
                if ($.isArray( bp )) {
                    if ( bp.length > 1 ) {
                        if( tam > bp[0].bp && tam < bp[1].bp ) {
                            return bp[0].slides;
                        } else if ( tam > bp[1].bp ) {
                            return bp[1].slides;
                        } else {
                            return 1;
                        }
                    } else if( tam > bp[0].bp) {
                        return bp[0].slides;
                    } else {
                        return 1;
                    }
                } else {
                    return 1;
                }
            }

            //asignando numero de elementos por slides dependiendo de los break point's
            var num = checkBreakpoint( settings.breakpoint, size );
            // ancho del contenedor de slides
            contenedor.width(size * (Math.ceil(n / num)));
            slide.width(size / num);


       		//create the controls
       		var izq = $('<span class="n-controls izq"></span>');
       		var der = $('<span class="n-controls der"></span>');

       		izq.insertAfter(contenedor);
       		der.insertAfter(contenedor);
            
            $('.n-controls').on(settings.evento, function () {
                if(!lock) {
                    var total = contenedor.width();
                    if ( $(this).hasClass('izq') ) {
                        if ( avance < 0 ) {
                            lock = true;//evita doble interaccion
                            //funcion se dispara en evento si existe
                            if ( $.isFunction( settings.onmove ) ) {
                                settings.onmove.call( this );
                            }
                            avance += size;
                            pos--;
                            contenedor.animate({'margin-left': avance}, settings.tiempo, function() { lock = false});
                        }
                    }

                    if ( $(this).hasClass('der') ) {
                        if ( avance > - (total - size) ) {
                            lock = true;
                            //funcion se dispara en evento si existe
                            if ( $.isFunction( settings.onmove ) ) {
                                settings.onmove.call( this );
                            }
                            avance -= size;
                            pos++;
                            contenedor.animate({'margin-left': avance}, settings.tiempo, function() { lock = false});
                        }
                    }
                }
            });
            
            //when window resize
            $( window ).resize(function() {
            	if ( widthState !== $( window ).width() ) {
                    size = container.outerWidth(false);

                    //asignando numero de elementos por slides dependiendo de los break point's
                    var num = checkBreakpoint( settings.breakpoint, size );
                    // ancho del contenedor de slides
                    contenedor.width(size * (Math.ceil(n / num)));
                    slide.width(size / num);
                    //ajuste de desplazamiento
                    console.log('avance1: ' + avance);
                    if ( pos > 0) {
                        avance = -(Math.floor(pos / num) * size);
                        contenedor.css('margin-left', avance );
                    } else {
                        contenedor.css('margin-left', 0);
                        avance = 0;
                    }
                    console.log('size: ' + size);
                    console.log('pos: ' + pos);
                    console.log('num: ' + num);
                    console.log('avance: ' + avance);
                } 
                //control si ancho cambia
                widthState = $( window ).width();
            });
            

            //calback complete
            if ( $.isFunction( settings.complete ) ) {
                settings.complete.call( this );
            }
        });

    }

}(jQuery));