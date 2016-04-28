
//var endPoint = "http://localhost:8888";
var endPoint = "http://dev--mapi--mapi--94ad2d.tx3.shipped-cisco.com";
var appEndPoint = endPoint + "/app/{{appName}}";
var hostPortEndpoint = endPoint + "/hostport/{{hostName}}/{{port}}";

$(document).ready(function () {
	if(!sessionCheck())
	{
			window.location="index.html";
	}
	else
	{
		$("#url").html("<b>Current Session Pointing to : </b> "+localStorage.getItem("url"));
		$('#app').select2();
		$('#s1').show();
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
	
		$("#btnLogout").click(function(){
			sessionOut();
			window.location="index.html";
		});
	}
});


function reset()
{
	$("#host").val('');
	$("#port").val('');
	$("#app").val('');
}

function callListAppId(endPoint)
{
	//[{ id: 0, text: 'enhancement' }]
	//Make sure api give result in this format
}

function callHostPortApi() {
	var hostName = $('#host').val().trim();
	var port = $('#port').val().trim();
	var requestURL = hostPortEndpoint.replace('{{hostName}}', encodeURI(hostName)).replace('{{port}}', encodeURI(port));

	$.get(requestURL)
	.done(function (data) {
		renderApiData(data);
		setTimeout(function(){$('#loader').hide();},500);
	})
	.fail(function (err) {
		callErrorDialog("We didn't find any app running on given Host Name and Port No.");
       // loadDataFromJson();
		setTimeout(function(){$('#loader').hide();},500);
    });
}

function callAppIdApi() {
	var appName = $("#app").val().trim();
	var requestURL = appEndPoint.replace('{{appName}}', encodeURI(appName));
	$.get(requestURL)
	.done(function (data) {
		renderApiData(data);
			setTimeout(function(){$('#loader').hide();},500);
	})
	.fail(function (err) {
	callErrorDialog("We didn't find any app running for given application id.");
        //loadDataFromJson();
			setTimeout(function(){$('#loader').hide();},500);
    });
}