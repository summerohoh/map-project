$(document).ready(function (){

//initialize collapsible on hamburger click
	$('.collapsible').collapsible(); 

// close mobile list when item clicked
	$( '.mobile-list-items' ).click(function () {
		$('#mobilediv').css('display','none');
});

});