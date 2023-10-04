const isAuthenticated = (req, res, next) => {
      const idToken = req.header('Authorization');
    
      if (!idToken) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    
      admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
          req.user = decodedToken;
          next();
        })
        .catch((error) => {
          console.error('Error verifying token:', error);
          res.status(401).json({ message: 'Unauthorized' });
        });
    };

    module.exports = isAuthenticated
    