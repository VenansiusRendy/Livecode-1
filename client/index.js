$(document).ready(() => {
	isLoggedIn();
	$("#login-form").on("submit", logIn);
	$("#logout-btn").on("click", logOut);
	$("#add-food-form").on("submit", addFood);
});

const isLoggedIn = () => {
	if (!localStorage.getItem("access_token")) {
		$("#login-page").show();
		$("#app-page").hide();
	} else {
		$("#login-page").hide();
		$("#app-page").show();
		displayFood();
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

const addFood = (e) => {
	e.preventDefault();

	const name = $("#name-field");
	const price = $("#price-field");
	const ingredients = $("#ingredients-field");
	const tag = $("#tag-field");

	$.ajax({
		type: "POST",
		url: "http://localhost:3000/foods",
		headers: {
			access_token: localStorage.getItem("access_token"),
		},
		data: {
			title: name.val(),
			price: price.val(),
			ingredients: ingredients.val(),
			tag: tag.val(),
		},
	})
		.done((data) => {
			console.log(data);
		})
		.fail((err) => console.log(err))
		.always((_) => {
			name.val("");
			price.val("");
			ingredients.val("");
			tag.val("");
			displayFood();
		});
};

const displayFood = () => {
	$.ajax({
		type: "GET",
		url: "http://localhost:3000/foods",
		headers: {
			access_token: localStorage.getItem("access_token"),
		},
	})
		.done((data) => {
			const foodContainer = $("#list-food-cotainer");
			foodContainer.empty();
			data.forEach((food) => {
				foodContainer.append(`
        <div class="card">
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between mb-0">
              <div class="col-9">
                <h5 class="font-weight-bold">${food.title}</h5>
                <p>Rp.${food.price}</p>
              </div>
              <div class="col-3 d-flex align-items-baseline">
                <i class="fas fa-tag text-grey mr-2"></i>
                <p class="text-grey">${food.tag}</p>
                <button
                  data-id="${food.id}"
                  class="food-del-btn fas fa-trash text-danger ml-auto cursor-pointer"
                ></button>
              </div>
            </div>
            <div class="card-body border-bottom">
              ${food.ingredients}
            </div>
          </div>
        </div>
        `);
			});
			foodContainer.append();
		})
		.fail((err) => console.log(err))
		.always((_) => {
			$(".food-del-btn").on("click", deleteFood);
		});
};

const deleteFood = (e) => {
	e.preventDefault();
	const foodId = e.target.getAttribute("data-id");

	$.ajax({
		type: "DELETE",
		url: `http://localhost:3000/foods/${foodId}`,
		headers: {
			access_token: localStorage.getItem("access_token"),
		},
	})
		.done((data) => {
			console.log(data);
		})
		.fail((err) => console.log(err))
		.always((_) => {
			displayFood();
		});
};
