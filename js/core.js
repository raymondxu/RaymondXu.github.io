window.onload = function() {
  	$("#studentcontainer").hide();
    $("#programmercontainer").hide();
    $("#magiciancontainer").hide();
};

$(".trifoldbutton.studentbutton").on("click", function() {
  	$("#studentcontainer").show();
    $("#programmercontainer").hide();
    $("#magiciancontainer").hide();
    $(".animated.fadeInUp.sectiontext").html("Student");
});

$(".trifoldbutton.programmerbutton").on("click", function() {
    $("#programmercontainer").show();
  	$("#studentcontainer").hide();
    $("#magiciancontainer").hide();
    $(".animated.fadeInUp.sectiontext").html("Programmer");
});

$(".trifoldbutton.magicianbutton").on("click", function() {
    $("#magiciancontainer").show();
  	$("#studentcontainer").hide();
    $("#programmercontainer").hide();
    $(".animated.fadeInUp.sectiontext").html("Magician");
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
