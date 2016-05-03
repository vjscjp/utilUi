
var endPoint = "http://localhost:8888";
//var endPoint = "http://dev--api4--api4--13db66.shipped-cisco.com";
var loginEndPoint = endPoint+"/login";
var logoutEndPoint = endPoint+"/logout";
var appEndPoint = endPoint + "/apps/{{appName}}";
var listappsEndPoint = endPoint + "/apps";
var hostPortEndpoint = endPoint + "/hostport/{{hostName}}/{{port}}";

function reset()
{
	$("#host").val('');
	$("#port").val('');
	$("#app").val('');
}

function callListAppId()
{
    $.ajax({
        url: listappsEndPoint,
        beforeSend: function (request)
        {
           request.setRequestHeader("X-Token", localStorage.getItem("token"));
        },
        error: function() {
            callErrorDialog("Please login and Retry, You credentials expire");
            sessionOut();
            siteView('L');
            setTimeout(function(){$('#loader').hide();},500);
        },
        success: function(data, status, xhr) {
            $("#urlHead").html("<b>Current Session Pointing to : </b> "+localStorage.getItem("url"));
            $('#app').select2({
              placeholder: {
                id: '-1', // the value of the option
                text: 'Select an option'
              },
            data:data
            }).on('change', function (e) {
                 $('#loader').show();
                callAppIdApi();
                 setTimeout(function(){$('#loader').hide(); },1000);
            });
            $('#errorMsg').modal('hide'); 
           setTimeout(function(){$('#loader').hide();	},1500);
        },
        type: 'GET'
    });
}

function callLogoutAPI()
{
    $.ajax({
        url: logoutEndPoint,
        beforeSend: function (request)
        {
           request.setRequestHeader("X-Token", localStorage.getItem("token"));
        },
        error: function() {
            callErrorDialog("User Already Logged Out.");
            sessionOut();
            siteView('L');
            setTimeout(function(){$('#loader').hide();},500);
        },
        success: function(data, status, xhr) {
            callErrorDialog("Logging out....");
            sessionOut();
            siteView('L');
            setTimeout(function(){$('#loader').hide();	$('#errorMsg').modal('hide'); },2000);
        },
        type: 'GET'
    });
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
           sessionIn(data.Token,url);
           jsonData = data.Apps;
            $('#app').select2({
              placeholder: {
                id: '-1', // the value of the option
                text: 'Select an option'
              },
            data:jsonData
            }).on('change', function (e) {
                 $('#loader').show();
                callAppIdApi();
                 setTimeout(function(){$('#loader').hide(); },1000);
            });
            $("#urlHead").html("<b>Current Session Pointing to : </b> "+localStorage.getItem("url"));
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
            setTimeout(function(){$('#loader').hide();},500);
        },
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
            setTimeout(function(){$('#loader').hide();},500);
        },
        success: function(data, status, xhr) {
           renderApiData(data);
           setTimeout(function(){$('#loader').hide();},500);
        },
        type: 'GET'
    });

}