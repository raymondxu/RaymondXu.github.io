$(document).ready(function(){
	
	//Display button after scrolling down
	$(window).scroll(function(){
		if ($(this).scrollTop() > 716) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	
	//Click button to scroll to top
	$('.scrollToTop').click(function() {
		$('html, body').animate({scrollTop : 0},400);
		return false;
	});



	//Smooth scroll to anchor
	$(function() {
 		$('a[href*=#]:not([href=#])').click(function() {
    		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      			var target = $(this.hash);
      			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      			if (target.length) {
        			$('html,body').animate({scrollTop: target.offset().top}, 1000);
        			return false;
      			}
    		}
  		});
	});


});