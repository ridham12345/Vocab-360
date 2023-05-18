import jwt from "jsonwebtoken";

const secret = 'secret';
/**
 * decodes the token and adds user id to the request
 * @param {*} req request object
 * @param {*} res response object
 * @param {function} next executes the next call in the api flow
 */
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    
    let decodedData;

    if (token) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
      
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;