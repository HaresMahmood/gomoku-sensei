$(document).ready(function($) {
    $("dialog").dialog({
        autoOpen: false,
        modal: true,
        height: 600,
        open: function(ev, ui){
                 $('#myIframe').attr('src','http://www.jQuery.com');
        }
    });

    $('#settings').click(function(){
        $('dialog').dialog('open');
    });
});