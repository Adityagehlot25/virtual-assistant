import userSchema from '../models/user_model.js';

const getAllUsers = async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await userSchema.findById(userid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'No user found' });
    }
}
export default getAllUsers;

