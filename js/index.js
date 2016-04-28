
var url = $("#url");
var user = $("#user");
var pass = $("#pass");

$(document).ready(function () {
	
	if(sessionCheck())
	{
			window.location="home.html";
	}
	else
	{
		sessionOut();
		}
	$("#btnLogin").click(function () {
		$('#loader').show();
		if(url.val()!= "")
		{
			if(user.val()!= "")
			{
				if(pass.val()!= "")
				{
					sessionIn(url.val(),user.val(),pass.val());
					window.location="home.html";
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
});



function reset()
{
	$("#host").val('');
	$("#port").val('');
	$("#app").val('');
}