const notify = async (req, res) => {
	const { email } = req.body;

	try {
		console.log(email);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { notify };
