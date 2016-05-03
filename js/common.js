function renderApiData(data) {
	if (typeof data === 'object') {
        $('#treeOne').empty();
		//$('.task-link').remove();
		//$('.task-content').remove();
		$('.app-details-row').html('');
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
			$view.find('.tid').text(task.id);
			$view.find('.host').text(task.host);
			$view.find('.ports').text(task.ports[0]);
			$('.app-details-row').append($view);
		});

		$('.app-details').fadeIn(100);
        
        
        //manipulating the data to render the graph
        var uniqueHosts = _(data.tasks).chain().flatten().pluck('host').unique().value();
        var graphData = {
            name : data.id,
            parent : null,
            icon: "img/v4.PNG",
            children : []
        };
        
        $.each(uniqueHosts, function(i){
            var host = {
                name : uniqueHosts[i],
                parent : data.id,
                icon: "img/c2.PNG",
                children : []
            };
        
            $.each(data.tasks, function(j){
                if(data.tasks[j].host == uniqueHosts[i]){
                    var port = {
                        name : data.tasks[j].ports[0],
                        parent : uniqueHosts[i],
						icon: "img/circle.PNG",
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

//Error Message
function callErrorDialog(msg)
{
	$("#msg").html(msg);
	$('#errorMsg').modal('show'); 
	$('#loader').hide();
}

function sessionIn(token)
{
	localStorage.setItem("sessionId",Number(new Date()));
	localStorage.setItem("token",token);
       siteView("I");
}

//Login - L, InnerView - I
function siteView(code)
{
    $("#loginPanel").hide();
    $("#innerPanel").hide();
    $(".logoutHeaderPanel").hide();
    if(code == "L")
    {
        $("#loginPanel").show();
    }
    else if(code == "I")
    {
         $("#innerPanel").show();
        $(".logoutHeaderPanel").show();
    }
}

function sessionOut()
{
	localStorage.setItem("sessionId","");
	localStorage.setItem("token","");
     siteView("L");
}
function sessionCheck()
{
	if(localStorage.getItem("token")!="")
	{
        siteView("L");
		return true;
	}
	else{
        siteView("I");
		return false;
		}
}