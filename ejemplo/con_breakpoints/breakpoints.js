$(document).on('ready', function () {

	$('#contenedor').jmResponsiveSlider({
		breakpoint        : [{bp : 800, slides : 2}, {bp : 1000, slides : 3}]
	});
});