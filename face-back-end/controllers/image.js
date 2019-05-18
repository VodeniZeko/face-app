const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'b3f7a289193047bfbdd4ce4459b22d0e'
});

const handleApi = (req, res) => {
app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
.then(data=> {
  res.json(data);
})
.catch(err=> res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
		const { id } = req.body;
  db('users').where('id', '=', id )
      .increment("entries", 1)
      .returning('entries')
      .then(entries=> {
      	res.json(entries[0]);
      })
      .catch(err=>res.status(400).json('unable to count'))
}

module.exports = {
	handleImage,
	handleApi
}