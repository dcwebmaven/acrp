Array.max = function (array) {
    return Math.max.apply(Math, array);
};

function adjustFlexboxes(n){				
	var ww = window.innerWidth;
	
	$('.ie-flex-shrink').each(function(){						
		var trbFlexWidth = $(this).outerWidth(),
		trbFlexContentWidth = 0,
		trbChildCount = 0;
						
		$(this).children().each(function(){
			$(this).css('width','');
			$(this).css('height','');
			trbFlexContentWidth += $(this).outerWidth();
			trbChildCount ++;
		});
			
		if(trbFlexContentWidth > trbFlexWidth){
			$(this).children().each(function(){
				var oWidth = $(this).outerWidth(),
				oHeight = $(this).outerHeight(),
				nWidth,
				nHeight;
				
				if( ww > n){
					nWidth = (trbFlexWidth/trbChildCount) + 'px';								
				}else{
					nWidth = trbFlexWidth+'px';
				}	
				nHeight = (nWidth*(oHeight/oWidth)) + 'px';	
				
				$(this).css('width', nWidth);
				$(this).css('height', nHeight);				
			});	
		}
	});	
}	
function truncateText(){
	$('.active [class*="truncate-text"]').each(function(){
		var ttClasses = '',
		n,
		ttHeight,
		ttFontSize,
		ttLineHeight,
		ttTargetHeight;
		
		$(this).css('height','');
		$(this).addClass('original').removeClass('truncated');		
		ttClasses = $(this).attr('class').split(' ');
		for(i = 0; i < ttClasses.length; i++){
			if(ttClasses[i].indexOf('truncate-text-') !== -1){
				n = ttClasses[i].replace('truncate-text-','');
			}
		}
		ttHeight = $(this).outerHeight();		
		ttFontSize = $(this).css('font-size').replace('px','');		
		ttLineHeight = ($(this).css('line-height').replace('em','').replace('px','').replace('rem',''))/ttFontSize;		
		ttTargetHeight = (ttLineHeight * n * ttFontSize);
		
		if(ttHeight > ttTargetHeight){
			$(this).css('height',ttTargetHeight+'px');	
			$(this).removeClass('original').addClass('truncated');
		}
	});
}
function adjustButtons(trbDesktopWidth){
	
	var btnCount = 0,
	currentBtn = 1;
	
	$('.trb-homepage-btns > div').each(function(){				
		btnCount += 1;
	});	
	
	$('.trb-homepage-btns > div').each(function(){
		$(this).removeClass('hidden-md-down');
		
		if(btnCount === 3){
			//do nothing
		}else if(btnCount%2){
			if(currentBtn !== btnCount){
				$(this).removeClass('col-xs-4').addClass('col-xs-6');
			}else{
				$(this).removeClass('col-xs-4').addClass('col-xs-12');
			}
		}else{
			$(this).removeClass('col-xs-4').addClass('col-xs-6');
		}
		currentBtn++;
		if(currentBtn === btnCount){
			adjustCarousel(trbDesktopWidth);
		}
	});	
}
function adjustBtnHeights(){
	var btnHeights = [],
	btnMaxHeight = 0;
	
	$('.trb-homepage-btns > div').each(function(){
		$(this).css('height','');
		btnHeights.push($(this).outerHeight());
	});
	
	if($(window).outerWidth() < trbDesktopWidth){		
		btnMaxHeight = Array.max(btnHeights);
		$('.trb-homepage-btns > div').each(function(){
			$(this).css('height',btnMaxHeight+'px');
		});
	}
}
function adjustCarousel(trbDesktopWidth) {
	var ww = window.innerWidth;
	var totalBtnHeight = $('.trb-homepage-btns').outerHeight();
	
	if(window.lastMediaBreakpointWidth < 1200 && ww >= 1200) {
		//  We are switching media queries from mobile to desktop view.
		//  Do not base carousel height off button group height.
		$(this).css('height','250px');
	}
	else if(ww >= trbDesktopWidth){
		$('#trbCarousel, #trbCarousel .carousel-inner, #trbCarousel .item').each(function(){
			$(this).css('height',totalBtnHeight+'px');
		});	
	}else{
		$('#trbCarousel, #trbCarousel .carousel-inner, #trbCarousel .item').each(function(){
			$(this).css('height','250px');
		});
	}

	window.lastMediaBreakpointWidth = ww;  //  Save new width for next comparison
}
function adjustPublications(trbTabletWidth){
	
	var pubCount = 0;
	var currentPub = 1;
	
	$('.trb-publication').each(function(){
		pubCount += 1;		
	});
	$('.trb-publication').each(function(){
		switch(pubCount){
			case 1:
				$(this).removeClass('hidden-sm').removeClass('col-sm-4');
				break;
			case 2:
				$(this).removeClass('hidden-sm').removeClass('col-sm-4').addClass('col-sm-6');
				break;
			case 3:
				$(this).removeClass('hidden-sm');
				break;
			case 4:
				$(this).removeClass('hidden-sm').removeClass('col-sm-4').addClass('col-sm-3');
				break;
			default:
				$(this).removeClass('col-sm-4').addClass('col-sm-3');
				if(currentPub < 5){
					$(this).removeClass('hidden-sm');
				}
				break;
		}
		currentPub++;
	});	
}
function adjustBookstoreBtn(trbTabletWidth, trbDesktopWidth){
	var ww = window.innerWidth;
	var pubHeights = [];
	var maxPubHeight = 0;	

	if(ww >= trbDesktopWidth){
		$('.trb-publication').each(function(){
			pubHeights.push($(this).outerHeight());
		});
		maxPubHeight = Array.max(pubHeights);
		$('.trb-bookstore-btn > a').css('height',maxPubHeight+'px');
		
	}else{
		if(ww >= trbTabletWidth){
			$('.trb-bookstore-btn > a').css('height','100px');
		}else{
			$('.trb-bookstore-btn > a').css('height','60px');
		}
	}
}

function RunSearch() {
	var searchType = $(':radio').filter('[name="search-type"]:checked').val();
	var keywords   = $('#q').val();

	window.location = (searchType === 'trid' ?
		'https://trid.trb.org/Results?q=' :
		'/Main/Search2.aspx?q=') + keywords;

	return false;
};

$(document).ready(function() {
	$('.trb-searchbar').on('keypress', '#q', function(e) {
		if(e.which === 13)
			return RunSearch();
	});
	
	$('.trb-searchbar').on('click', '#run-search', RunSearch);
});

//  Previously embedded script.  Run after main.js:

var trbTabletWidth = 768;
var trbDesktopWidth = 1200;
window.lastMediaBreakpointWidth = window.innerWidth;

$(document).ready(function() {
	adjustButtons(trbDesktopWidth);
	adjustBtnHeights();
	adjustPublications(trbTabletWidth);
	adjustBookstoreBtn(trbTabletWidth, trbDesktopWidth);
	truncateText();
});

$('.trb-publication img').each(function() {
	$(this).load(function() {
		adjustBookstoreBtn(trbTabletWidth, trbDesktopWidth);
	});
});

$('.carousel').on('slid.bs.carousel', function() {
	truncateText();
});

$(window).bind('resize orientationchange', function() {		
	adjustCarousel(trbDesktopWidth);
	adjustBtnHeights();
	adjustBookstoreBtn(trbTabletWidth, trbDesktopWidth);
	truncateText();
});