
//var endPoint = "http://localhost:8888";
var endPoint = "http://dev--mapi--mapi--94ad2d.tx3.shipped-cisco.com";
var appEndPoint = endPoint + "/app/{{appName}}";
var hostPortEndpoint = endPoint + "/hostport/{{hostName}}/{{port}}";

$(document).ready(function () {
	$('#s1').show();
	$("#btnSearch").click(function () {
		if ($("#host").val().trim() != "") {
			if ($("#port").val().trim() != "") {
				callHostPortApi();
            } else {
				alert("Port no is missing")
			}
		} else if ($("#app").val().trim() != "") {
			callAppIdApi();
		} else {
			alert("Search By either Host Name & Port No or Search By App Id")
		}
	});
});

function renderApiData(data) {
	if (typeof data === 'object') {
        $('#treeOne').empty();
		$('.task-link').remove();
		$('.task-content').remove();
		$('#id').text(data.id);
		$('#project_name').text(data.projectname);
		$('#project_id').text(data.projectid);
		$('#env_name').text(data.envname);
		$('#env_id').text(data.envid);
		$('#service_name').text(data.servicename);
		$('#service_id').text(data.serviceid);

		$.each(data.tasks, function (i) {
			var task = this;
			var $view = $($('#tasks_list').html());
			$view.find('.task-link').attr('href', '#task-' + i).text(task.id);
			$view.find('.task-content').attr('id', 'task-' + i);
			$view.find('.host').text(task.host);
			$view.find('.id').text(task.id);
			$view.find('.app-id').text(task.appid);
			$view.find('.ports').text(task.ports.join());
			$('.app-details-row').append($view);
			//console.log($view.html());
		});

		$('.app-details').fadeIn(100);
        
        
        //manipulating the data to render the graph
        var uniqueHosts = _(data.tasks).chain().flatten().pluck('host').unique().value();
        var graphData = {
            name : data.id,
            parent : null,
            icon: "img/v2.png",
            children : []
        };
        
        $.each(uniqueHosts, function(i){
            var host = {
                name : uniqueHosts[i],
                parent : data.id,
                icon: "img/c1.png",
                children : []
            };
        
            $.each(data.tasks, function(j){
                if(data.tasks[j].host == uniqueHosts[i]){
                    var port = {
                        name : data.tasks[j].ports[0],
                        parent : uniqueHosts[i]
                    };
                    
                    host.children.push(port);
                }
            });
            
            graphData.children.push(host);
        });
        renderSearchResponseGraph(graphData);
	}
}

function loadDataFromJson(){
    $.get('data/testData.json', function(data){
        renderApiData(data);
    });
}

function callHostPortApi() {
	var hostName = $('#host').val().trim();
	var port = $('#port').val().trim();
	var requestURL = hostPortEndpoint.replace('{{hostName}}', encodeURI(hostName)).replace('{{port}}', encodeURI(port));

	$.get(requestURL)
	.done(function (data) {
		renderApiData(data);
	})
	.fail(function (err) {
        loadDataFromJson();
    });
}

function callAppIdApi() {
	var appName = $("#app").val().trim();
	var requestURL = appEndPoint.replace('{{appName}}', encodeURI(appName));
	$.get(requestURL)
	.done(function (data) {
		renderApiData(data);
	})
	.fail(function (err) {
        loadDataFromJson();
    });
}