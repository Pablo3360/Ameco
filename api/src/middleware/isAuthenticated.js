const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authorization = req.get('authorization');
  let token = '';
  if( authorization && authorization.toLowerCase().startsWith('bearer')){
    token = authorization.substring(7);
  };

  try {
    const decodedToken = jwt.verify( token, process.env.SECRET);
    const { id, mail } = decodedToken;
    req.id = id;
    req.mail = mail;
  } catch (error) {
    return res.status(401).send('Token invalido');
  }

  next();
}
