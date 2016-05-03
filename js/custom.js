
var endPoint = "http://localhost:8888";
//var endPoint = "http://dev--api4--api4--13db66.shipped-cisco.com";
var loginEndPoint = endPoint+"/login";
var appEndPoint = endPoint + "/apps/{{appName}}";
var hostPortEndpoint = endPoint + "/hostport/{{hostName}}/{{port}}";

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

function callLoginAPI(id,pass,url)
{
   var dataObj  = '{"id":"'+id+'","pass":"'+pass+'","api":"'+url+'"}';
    $.ajax({
    url: loginEndPoint,
    data: dataObj,
    error: function() {
      alert('<p>An error has occurred</p>');
    },
    success: function(data, status, xhr) {
       if(data.StatusCode==401)
       {
           callErrorDialog(data.Status);
       }
       else
       {
           sessionIn(data.Token);
           jsonData = data.Apps;
            $('#app').select2({
              placeholder: {
                id: '-1', // the value of the option
                text: 'Select an option'
              },
            data:jsonData
            });
            $("#urlHead").html("<b>Current Session Pointing to : </b> "+localStorage.getItem("url"));
            $('#s1').show();
            resetLoginForm();
        }
    },
    type: 'POST'
    });
}

function callHostPortApi() {
	var hostName = $('#host').val().trim();
	var port = $('#port').val().trim();
	var requestURL = hostPortEndpoint.replace('{{hostName}}', encodeURI(hostName)).replace('{{port}}', encodeURI(port));    
    
    $.ajax({
    url: requestURL,
         beforeSend: function (request)
    {
       request.setRequestHeader("X-Token", localStorage.getItem("token"));
    },
    error: function() {
     callErrorDialog("We didn't find any app running on given Host Name and Port No.");
       // loadDataFromJson();
		setTimeout(function(){$('#loader').hide();},500);
    },
        headers: { 'Cookie': localStorage.getItem("token") },
    success: function(data, status, xhr) {
       renderApiData(data);
		setTimeout(function(){$('#loader').hide();},500);
    },
    type: 'GET'
    });
    
}

function callAppIdApi() {
	var appName = $("#app").val().trim().replace('/','');
	var requestURL = appEndPoint.replace('{{appName}}', encodeURI(appName));
    
     $.ajax({
          
    url: requestURL,
    beforeSend: function (request)
    {
       request.setRequestHeader("X-Token", localStorage.getItem("token"));
    },
    error: function() {
     callErrorDialog("We didn't find any app running for given application id.");
        //loadDataFromJson();
			setTimeout(function(){$('#loader').hide();},500);
    },
    //headers: { 'Cookie': localStorage.getItem("token") },
    success: function(data, status, xhr) {
        debugger;
       renderApiData(data);
			setTimeout(function(){$('#loader').hide();},500);
    },
    type: 'GET'
    });

}