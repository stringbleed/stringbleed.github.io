$(document).ready(function() {
	//$("ul > li:nth-child(4) > a").addClass("disabled")
	$(function () {
		$(window).scroll(function(event) {
			if(document.body.scrollTop > 70 ){
				$('.masthead').css('background', '#222');
			}else{
				
				$('.masthead').css('background', 'transparent');
			}
		});

		$( "#menuSelected" ).load( "includes/home.html" );

		function setActive(){

			$("nav ul li").removeClass('active');
			this.className="active"
			//$("ul > li:nth-child(4) > a").addClass("disabled")

			var selectedMenu = this.children[0].outerText;
			

			if (selectedMenu == "Home"){
				$( "#menuSelected" ).load( "includes/home.html" );
			} 
			else if (selectedMenu == "Stringbleed"){
				$( "#menuSelected" ).load( "includes/stringbleed.html" );
			}
			else if (selectedMenu == "Global Scope"){
				$( "#menuSelected" ).load( "includes/GlobalScope.html" );
			}	
			else if (selectedMenu == "Download"){
				$( "#menuSelected" ).load( "includes/liveAction.html" ); <!-- !!!!!!!!!!!!!!!! -->
			}
			else if (selectedMenu == "Contact"){
				$( "#menuSelected" ).load( "includes/contact.html" );
			}
			else{
				$( "#menuSelected" ).load( "includes/home.html" );
			}

		}
		


		$("nav ul li.setMenu").click(setActive);

		
		getMore = function() {
			$( "#menuSelected" ).load( "includes/stringbleed.html" );
		}
	

});
	
});