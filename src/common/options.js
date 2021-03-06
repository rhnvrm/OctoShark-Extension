KangoAPI.onReady(function() {

		if (kango.storage.getItem("do_manager_auth_token"))
		{
			$("#do_auth_token").val(kango.storage.getItem("do_manager_auth_token"));
		}

		$('#save_options').click(function(event)
		{
			var api_success = false;

			var details = {
		        method: 'GET',
		        url: 'https://api.digitalocean.com/v2/droplets/',
		        async: false,
		        contentType: 'json',
		        headers: {
		                'Authorization': 'Bearer ' + $("#do_auth_token").val()
		        }
			};

			kango.xhr.send(details, function(request) {

				if(request.status == 200 && request.response != null) 
				{
					api_success = true;
				}
				else
				{
					api_success = false;
				}
			});

			if (api_success)
			{
				kango.storage.setItem("do_manager_auth_token", $("#do_auth_token").val());
				kango.dispatchMessage('refresh_api_cache', true);
				$("#options_success").modal({
					backdrop: 'static',
				  keyboard: false
				});
			}
			else
			{
				$("#options_fail_api").modal({
					backdrop: 'static',
				  keyboard: false
				});
			}
		});		
});
