import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next();
    });
    } catch (error) {
        return res.status(500).json({ message: 'is Auth error' });
    }
};

export default isAuth;
