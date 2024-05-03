export const hasRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Request without user object, validate the token before calling this middleware.'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `Unauthorized user, has a role ${req.user.role}, authorized roles are ${roles}`
            });
        }

        next();
    };
};