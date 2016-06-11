$(function() {
    $('.main').onepage_scroll({
        sectionContainer: '.main-section',
        direction: 'horizontal',
        keyboard : false,
		afterMove: function(index){
			$('#mainNav li[data-index=' + index + ']').addClass('active').siblings().removeClass('active');
		}
    });

    $('#mainNav li').click(function(){
    	var index = $(this).attr('data-index');
    	$('.main').moveTo(index);

    	$('body').css('background-position', 33 * (index - 1 ) + '% top');

    });



    $(document).keydown(function(e) {
        var tag = e.target.tagName.toLowerCase();

        var curIdx = $('#mainNav li').index($('#mainNav li.active'));
        var length = $('#mainNav li').length;
        switch (e.which) {
            case 37:

                    var index = (curIdx - 1) % length + 1 || length;
                    $('#mainNav li[data-index=' + index + ']').click();


                break;
            case 39:
					var index = (curIdx + 1) % length + 1;
                    $('#mainNav li[data-index=' + index + ']').click();
                break;
            default:
                return;
        }



    });


});
