$("#about").click(function(){
	selectTab(0);
});

$("#projects").click(function(){
	selectTab(1);
});

$("#contact").click(function(){
	selectTab(2);
});

var selectTab = function(index) {
	navs = ["#about", "#projects", "#contact"];
	tabs = ["#aboutdiv", "#projectsdiv", "#contactdiv"];
	for (var i = 0; i < tabs.length; i++) {
		if (i == index) {
			$(tabs[i]).show();
			$(navs[i]).toggleClass("hover-highlight");
		}
		else {
			$(tabs[i]).hide();
			if ($(navs[i]).hasClass("hover-highlight")) {
				$(navs[i]).toggleClass("hover-highlight");
			}
		}
	}
}
