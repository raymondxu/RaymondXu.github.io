$("#about").click(function(){
	selectTab(0);
});

$("#projects").click(function(){
	selectTab(1);
});

$("#talks").click(function(){
	selectTab(2);
});

$("#contact").click(function(){
	selectTab(3);
});


var selectTab = function(index) {
	navs = ["#about", "#projects", "#talks", "#contact"];
	tabs = ["#about-div", "#projects-div", "#talks-div", "#contact-div"];

	for (var i = 0; i < tabs.length; i++) {
		if (i === index) {
			$(tabs[i]).show();
			$(navs[i]).toggleClass("hover-highlight");
		}
		else {
			$(tabs[i]).hide();
			$(".behind").hide();
			if ($(navs[i]).hasClass("hover-highlight")) {
				$(navs[i]).toggleClass("hover-highlight");
			}
		}
	}
}
