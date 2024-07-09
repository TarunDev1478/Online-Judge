import jwt from 'jsonwebtoken';

export const USERSECRET = "userTarun-Dev";
export const ADMINSECRET = "adminTarun-Dev";

export const authenticateUserJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, USERSECRET, (err, payload) => {
      if (err) {
        return res.sendStatus(403);
      }
      if (!payload) {
        return res.sendStatus(403);
      }
      if (typeof payload === "string") {
        return res.sendStatus(403);
      }
      req.user=payload;
      req.headers["userId"] = payload.id;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export const authenticateAdminJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, ADMINSECRET, (err, payload) => {
      if (err) {
        return res.sendStatus(403);
      }
      if (!payload) {
        return res.sendStatus(403);
      }
      if (typeof payload === "string") {
        return res.sendStatus(403);
      }
      req.user=payload;
      req.headers["userId"] = payload.id;
   
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
