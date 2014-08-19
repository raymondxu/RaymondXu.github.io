window.onload = function() {
  	$("#studentcontainer").hide();
    $("#programmercontainer").hide();
    $("#magiciancontainer").hide();
};

$(".btn-trifold.studentbutton").on("click", function() {
  	$("#studentcontainer").show();
    $("#programmercontainer").hide();
    $("#magiciancontainer").hide();
});

$(".btn-trifold.programmerbutton").on("click", function() {
    $("#programmercontainer").show();
  	$("#studentcontainer").hide();
    $("#magiciancontainer").hide();
});

$(".btn-trifold.magicianbutton").on("click", function() {
    $("#magiciancontainer").show();
  	$("#studentcontainer").hide();
    $("#programmercontainer").hide();
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
