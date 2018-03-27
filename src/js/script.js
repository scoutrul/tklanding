$(function() {
	var oldHash = window.location.hash;
	$('a').on('click', function(e) {
		var newHash = $(this).attr('href');
		if (newHash.indexOf('#') != -1) {
			e.preventDefault();
			$('html, body').animate({ scrollTop: $(newHash).offset().top }, 618);
		}
	});

	var toggleBlack = function() {
		var hero = document.querySelector('#hero');
		var heroHeight = hero.getBoundingClientRect().height;
		var scrollTop = window.pageYOffset;
		var ofset = -80;
		var header = document.querySelector('#header');

		if (scrollTop > ofset + heroHeight) {
			header.classList.add('black');
		} else {
			header.classList.remove('black');
		}
	};
	toggleBlack();

	window.addEventListener('scroll', function() {
		toggleBlack();
	});

});
