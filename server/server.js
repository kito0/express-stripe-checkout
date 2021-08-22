require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_KEY);

app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:5500',
	})
);

const storeItems = new Map([
	[1, { priceInCents: 10000, name: 'Burger' }],
	[2, { priceInCents: 20000, name: 'Fries' }],
]);

app.post('/create-checkout-session', async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price: 'price_1JRKJ7AMniAZknTKSrBQZq9p',
				quantity: 1,
			},
		],
		payment_method_types: ['card'],
		mode: 'payment',
		success_url: `${process.env.CLIENT_URL}/success.html`,
		cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
	});
	res.json({ url: session.url });
	// try {
	// 	const session = await stripe.checkout.sessions.create({
	// 		payment_method_types: ['card'],
	// 		mode: 'payment',
	// 		line_items: req.body.items.map((item) => {
	// 			const storeItem = storeItems.get(item.id);
	// 			return {
	// 				price_data: {
	// 					currency: 'usd',
	// 					product_data: {
	// 						name: storeItem.name,
	// 					},
	// 					unit_amount: storeItem.priceInCents,
	// 				},
	// 				quantity: item.quantity,
	// 			};
	// 		}),
	// 		success_url: `${process.env.CLIENT_URL}/success.html`,
	// 		cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
	// 	});

	// 	//res.json({ url: session.url });
	// 	res.redirect(303, session.url);
	// } catch (e) {
	// 	res.status(500).json({ error: e });
	// }
});

app.listen(process.env.PORT, () =>
	console.log(`Listening on port ${process.env.PORT}`)
);
