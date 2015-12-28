// Open up the selected tab and hide the others
function selectTab(navId) {
	$('.behind').hide();

	var targetTab = navId + '-div';
	var targetNav = document.getElementById(navId);
	var tabs = document.getElementsByClassName('tab');

	for (var i = 0; i < tabs.length; i++) {
		if (tabs[i].id === targetTab) {
			$(tabs[i]).show();
		}
		else {
			$(tabs[i]).hide();
		}
	}
}


// When a nav is clicked, highlight it and open up the
// corresponding tab
previousNavSelected = null;

$('.nav').each(function() {
	$(this).on('click', function() {
		selectTab($(this).attr('id'));
		if (previousNavSelected !== null) {
			previousNavSelected.classList.toggle('nav-selected');
		}
		this.classList.toggle('nav-selected');
		previousNavSelected = this;
	});
});
