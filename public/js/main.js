$('#myLoginForm').modal('show');
//for validation form - boodtrap4
(function() {
	'use strict';
	window.addEventListener('load', function() {
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		const forms = document.getElementsByClassName('needs-validation');
		// Loop over them and prevent submission
		const validation = Array.prototype.filter.call(forms, function(form) {
			form.addEventListener('submit', function(event) {
				if (form.checkValidity() === false) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add('was-validated');
			}, false);
		});
	}, false);
})();

let getLocalStorage = (key) => {
	return  localStorage.getItem(key);
};

$("#secretPageBtn").click(function(event) {
	event.preventDefault();

	$.ajax({
		type:"POST",
		url: "/secret",
		data: { 
			token: getLocalStorage("token"), //find token key in local machine user
	  	},
		success: (function(msg) {
			window.location.href='/secret';
		}),
		error: async function(jqXHR, exception){
			let msg = '';
			console.log(jqXHR.status);
			if (jqXHR.status === 0) {
				msg = 'Not connect.\n Verify Network.';
			} else if (jqXHR.status == 404) {
				msg = 'Requested page not found. [404]';
			} else if (jqXHR.status == 500) {
				msg = 'Internal Server Error [500].';
			} else if (exception === 'parsererror') {
				msg = 'Requested JSON parse failed.';
			} else if (exception === 'timeout') {
				msg = 'Time out error.';
			} else if (exception === 'abort') {
				msg = 'Ajax request aborted.';
			} else {
				msg = 'Uncaught Error.\n' + jqXHR.responseText;
			}
			window.location.href = '/login';  //if exp token simple
		}
	});
});

$("#logInBtn").click( function(event) {
	event.preventDefault();
	$.ajax({
		type:"POST",
		url: "/login/users",
		data: { 
			username: $("#loginUser").val(),
		  	password: $("#passwordUser").val() 
	  	},
		success: (function(msg) {
			if (msg.your_token != undefined) {
				localStorage.setItem("token", msg.your_token);  //add token in local storage
				window.location.href='/';
			} else {
				window.location.href='/login';
			}
		}),
		error: function(err){
				console.log(err);
		}
	});
});