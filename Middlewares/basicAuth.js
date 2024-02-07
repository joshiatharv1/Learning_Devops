import db from "../Models/index.js";
import bcrypt from 'bcrypt';

const { User } = db;

const basicAuthMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            console.log('Authorization header missing');
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const authDecoded = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf-8');
        const [username, ...passwordArray] = authDecoded.split(':');
        const password = passwordArray.join(':');

        console.log('Decoded credentials:', { username, password });

        const existingUser = await User.findOne({
            attributes: ['id', 'username', 'password'], // Include 'Password' in the attributes
            where: {
                username: username,
            },
        });

        if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
            console.log('Invalid credentials');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('User authenticated successfully:', existingUser);

        // Attach user information to the request for later use
        req.user = existingUser;
        next();
    } catch (error) {
        console.error('Error in basicAuthMiddleware:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default basicAuthMiddleware;
