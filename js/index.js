


    $(document).ready(function () {
	
    	
	if(sessionCheck())
	{
       siteView("I");
    }
	else
	{    
        sessionOut();
        siteView("L");
    }
    ButtonRegistry();
});



function ButtonRegistry()
{
    $("#btnLogout").click(function(){
			siteView("L");
            sessionOut();
    });
    
    $("#btnSearch").click(function () {
			$('#loader').show();
			if ($("#host").val().trim() != "") {
				if ($("#port").val().trim() != "") {
					callHostPortApi();
				} else {
					callErrorDialog('Missing <span class="label label-warning"> Port Number </span>, Please provide valid Port #');
				}
			} else if ($("#app").val().trim() != "") {
				callAppIdApi();
			} else {
				callErrorDialog('Please provide Either <span class="label label-warning"> Hostname, Port No</span> or <span class="label label-warning">Application id</span> to get running application details.');
			}
		});
    
    $("#btnLogin").click(function () {
        var url = $("#url");
        var user = $("#user");
        var pass = $("#pass");
		
        resetInnerForm();
		if(url.val()!= "")
		{
			if(user.val()!= "")
			{
				if(pass.val()!= "")
				{
                    $('#loader').show();
                    callLoginAPI(user.val(),pass.val(),url.val());
					
				}
				else
				{
					callErrorDialog("Please provide Password");
				}
			}
			else
				{
					callErrorDialog("Please provide User");
				}
		}
		else
				{
					callErrorDialog("Please provide Url");
				}
		
	});
}


function resetInnerForm()
{
	$("#host").val('');
	$("#port").val('');
	$("#app").val('');
    $('#loader').hide();
}


function resetLoginForm()
{
	 $("#url").val('');
     $("#user").val('');
     $("#pass").val('');
    $('#loader').hide();
}