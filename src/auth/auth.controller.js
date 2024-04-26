import bcryptjs from 'bcryptjs';
import User from '../user/user.model.js'
import { generateJWT } from '../helpers/generate-jwt.js'; 

export const login = async (req, res) => {
    const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "Wrong Credentials, Email doesn't exists in database",
      });
    }

    if (!user.state) {
      return res.status(400).json({
        msg: "The User doesn't exists in database",
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Wrong Password",
      });
    }

    const token = await generateJWT( user.id);

    res.status(200).json({
      msg: 'Login Successful',
      user,
      token
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      msg: "Comunicate with the support",
    });
  }
}

export const register = async (req, res) => {
  
  const { name, username, email, password } = req.body;
  const user = new User({ name, username, email, password, role: "USER_ROLE" });


  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.status(200).json({
    msg: `${user.name} your user with username ${user.username} was created successful`
  });
}