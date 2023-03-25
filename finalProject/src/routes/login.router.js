const userModel = require('../dao/models/user.model');

const router = require('express').Router();

router.get('/register', (req, res) => {
	res.render('register');
});

router.post('/register', async (req, res) => {
	const { username, email, password, rol } = req.body;
	const userExists = await userModel.findOne({ email });
	if (userExists) return res.status(409).json({ msg: 'Email already registered' });
	await userModel.create({ username, email, password, rol });
	res.redirect('/login');
});

router.get('/login', (req, res) => {
	if (req.session?.user) return res.redirect('/api/products');
	res.render('login');
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	const userFound = await userModel.findOne({ email }).lean();
	if (!userFound) return res.status(404).json({ msg: 'Usuario no encontrado' });
	if (userFound.password != password) return res.status(409).json({ msg: 'Contraseña inválida' });
	req.session.user = userFound;
	res.redirect('/api/products');
});

router.get('/logout', (req, res) => {
	req.session.destroy(err => {
		if (!err) res.status(200).redirect('/login');
	});
});

module.exports = router;