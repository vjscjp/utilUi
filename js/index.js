


    $(document).ready(function () {
	
    	
	if(sessionCheck())
	{
        siteView("I");
        callErrorDialog("Loading data ....");
        callListAppId();
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
            callLogoutAPI();
    });
    
    $("#btnSearch").click(function () {
			
			if ($("#host").val().trim() != "") {
				if ($("#port").val().trim() != "") {
					callHostPortApi();
                    $("#app").val('-1').trigger("change");
                    $('#loader').show();
                     setTimeout(function(){$('#loader').hide();},1000);
				} else {
					callErrorDialog('Missing <span class="label label-warning"> Port Number </span>, Please provide valid Port #');
				}
			} else if ($("#app").val().trim() != "") {
				callAppIdApi();
                $("#host").val('');
                $("#port").val('');
                    $('#loader').show();
                     setTimeout(function(){$('#loader').hide();},1000);
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
                    $('#loader2').show();
                    callLoginAPI(user.val(),pass.val(),url.val());
					setTimeout(function(){$('#loader2').hide();},3000);
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