$(document).ready(() => {
	isLoggedIn();
	$("#login-form").on("submit", logIn);
	$("#logout-btn").on("click", logOut);
});

const isLoggedIn = () => {
	if (!localStorage.getItem("access_token")) {
		$("#login-page").show();
		$("#app-page").hide();
	} else {
		$("#login-page").hide();
		$("#app-page").show();
	}
};

const logIn = (e) => {
	e.preventDefault();
	const email = $("#email-field");
	const password = $("#password-field");
	$.ajax({
		type: "POST",
		url: "http://localhost:3000/login",
		data: {
			email: email.val(),
			password: password.val(),
		},
	})
		.done((data) => {
			const { access_token } = data;
			localStorage.setItem("access_token", access_token);
		})
		.fail((err) => console.log(err))
		.always((_) => {
			email.val("");
			password.val("");
			isLoggedIn();
		});
};

const logOut = (e) => {
	e.preventDefault();
	localStorage.removeItem("access_token");
	isLoggedIn();
};
