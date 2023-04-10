const interceptor1 = (req, res, next) => {
  if (req.query.token1 == '12341234') {
    next();
  } else {
    res.end('No token 1');
  }
};

const interceptor2 = (req, res, next) => {
  if (req.query.token2 == '12341234') {
    next();
  } else {
    res.end('No token 2');
  }
};

export default { interceptor1, interceptor2 };
