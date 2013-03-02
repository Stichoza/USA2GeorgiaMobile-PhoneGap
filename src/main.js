$(document).bind('pagecreate', function() {
	// INIT
	var activeTab = "flights";
	$("#page-blog").hide();
	$("#page-info").hide();
	$("#icon-plane").addClass("ui-btn-active");
	$("#page-flights input[data-type='search']")
	.attr("placeholder", "მონაცემების გაფილტრვა")
	.attr("value", "H0100");
	var sideInfoHTML = $("#page-info").html()
	.replace(/data-iconpos="left"/g, 'data-iconpos="notext"')
	.replace(/icon-left/g, "icon-notext");
	$("#page-info-side #src-contain").html(sideInfoHTML).children().filter("a").css({'vertical-align': 'bottom'});
	
	// Flights AJAX
	$.ajax({
		url: 'http://stichoza.com/projects/usa2georgia/response.php',
		data: 'id=flights',
		cache: false,
		success: function (response) {
			$('#page-flights .loader-li').remove();
			for (var i=0; i<response.length; i++) {
				var dateStyle = "";
				var iconName = "";
				if (response[i]['arrived'] == '1') {
					iconName = 'data-icon="check"';
					var dateStyle = 'style="background: #9AD945; border-color: #8CC63F;"';
				} else {
					var dateStyle = 'style="background: #f7a31e; border-color: #e7830e;"';
				}
				response[i]['text'] = response[i]['text']
				.replace("ჩამოფრინდა", "<span style='color: green !important;'>ჩამოფრინდა</span>")
				.replace("დაგვიანება.", "<span style='color: red !important;'>დაგვიანება.</span>");
				
				$("#page-flights ul").append('<li '+iconName+' class="ui-li-has-count">'
					+'<span class="flight-number" onclick="return false">'+response[i]['number']+'</span><br/>'
					+'<span class="flight-text">'+response[i]['text']+'</span>'
					+'<span class="ui-li-count" '+dateStyle+'>'
					+response[i]['date']+'</span></li>');
			}
			$("#page-flights ul").listview('refresh');
		},
		error: function () {
			//navigator.notification.alert("Error", alertCallback, "Err", [buttonName]);
			$('#page-flights .loader-li a').html('ვერ მოხერხდა სერვერთან დაკავშირება :(<br/><span class="flight-text">გადაამოწმეთ კავშირი ინტერნეტთან, ან სცადეთ მოგვიანებით.</span>').click(function() {
				window.location.reload();
			});
		}
	});
	
	
	// Blog AJAX
	$.ajax({
		url: 'http://stichoza.com/projects/usa2georgia/response.php',
		data: 'id=blog',
		cache: false,
		success: function (response) {
			$('#page-blog .loader-li').remove();
			for (var i=0; i<response.length; i++) {					
				$("#page-blog ul").append('<li><a target="_blank" href="javascript:openLink(\''
					+response[i]['url']+'\')">'
					+response[i]['text']+'</a></li>');
			}
			$("#page-blog ul").listview('refresh');
		},
		error: function () {
			$('#page-blog .loader-li a').html('ვერ მოხერხდა სერვერთან დაკავშირება :(<br/><span class="flight-text">გადაამოწმეთ კავშირი ინტერნეტთან, ან სცადეთ მოგვიანებით.</span>').click(function() {
				window.location.reload();
			});
		}
	});


	// Tab Switcher Events
	$("#icon-plane").bind('tap', function() {
		activeTab = "flights";
		$("#page-blog").fadeOut(200);
		$("#page-info").fadeOut(200);
		$("#page-flights").delay(250).fadeIn(200);
	});
	$("#icon-blog").bind('tap', function() {
		activeTab = "blog";
		$("#page-flights").fadeOut(200);
		$("#page-info").fadeOut(200);
		$("#page-blog").delay(250).fadeIn(200);
	});
	$("#icon-info").bind('tap', function() {
		activeTab = "info";
		$("#page-flights").fadeOut(200);
		$("#page-blog").fadeOut(200);
		$("#page-info").delay(250).fadeIn(200);
	});
	
	/*$(window).resize(function () {
	});*/
});

/* Functions */
function openLink(url) {
	navigator.app.loadUrl(url, {openExternal: true});
	return false;
}