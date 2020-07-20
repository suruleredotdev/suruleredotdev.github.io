var pageLoadTransition = function() {
  $('.page-content, .site-footer').addClass('fadeIn');
  $('.page-content, .site-footer').addClass('fadeIn');
}

$(document).ready(pageLoadTransition);
$(document).on('page:load', pageLoadTransition);

document.onload = pageLoadTransition;
document.addEventListener("", function () {
	document.body.addClass("animate-bg");
	setTimeout(function () {
		document.body.removeClass("animate-bg");
	}, 2000);
});
