$(document).ready(() => {
	isLoggedIn();
	$("#login-form").on("submit", logIn);
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
};
