
$(function(){
	AOS.init();
	 $(".owl-carousel").owlCarousel({
	    loop:true,
	    margin:10,
	    nav:true,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:2
	        },
	        1000:{
	            items:3
	        }
	    }
	});


	$('#accordeon article h2').on('click',function(){
		var article = $(this).parent();
		$('#accordeon article').removeClass('active');
		article.addClass('active');
	});


	// 9 dig. Number Mask
	var maskBehavior = function (val) {
	 return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
	},
	options = {onKeyPress: function(val, e, field, options) {
	 field.mask(maskBehavior.apply({}, arguments), options);
	 }
	};
	$('#telefone').mask(maskBehavior, options);

	
});