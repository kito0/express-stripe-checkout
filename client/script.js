const button = $('button');
button.click(() => {
	$.post('http://localhost:5000/create-checkout-session', {
		id: 1,
		quantity: 3,
	}).done(function (res) {
		location.assign(res.url);
	});
});
