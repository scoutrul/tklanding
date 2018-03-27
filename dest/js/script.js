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
		var offset = -80;
		var header = document.querySelector('#header');

		if (scrollTop > offset + heroHeight) {
			header.classList.add('black');
		} else {
			header.classList.remove('black');
		}
	};
	toggleBlack();

	var hideScroll = function() {
		var scrollTop = window.pageYOffset;
		if (scrollTop > 100) {
			$('.mouse_scroll').hide()
		} else {
			$('.mouse_scroll').show();
		}
	}

	window.addEventListener('scroll', function() {
		toggleBlack();
		hideScroll();
	});

});
