$(document).ready(function() {
	// Set Masonry layout
	$('#isotope-stories').isotope({
		itemSelector: '.story'
	});

	// Do it again after image load
	$('#isotope-stories').imagesLoaded(function() {
		$('#isotope-stories').isotope({
			itemSelector: '.story'
		});
	});
});
