export const checkRole = (role) => {
    return (req, res, next) => {
      if (req.user.role !== role) {
        return res.status(403).json({ msg: 'Access denied: You do not have the required role' });
      }
      next();
    };
  };
  