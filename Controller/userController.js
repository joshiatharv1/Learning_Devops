import db from "../Models/index.js";
import bcrypt from "bcrypt";
import Sequelize, { DataTypes } from "sequelize";

const { User } = db;

// Authentication Not Required For These

// To create a new user first time. 

const register = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body must not be empty" });
    }

    console.log("Received request body:", req.body);

    const existingUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (existingUser) {
      console.log("User already exists:", existingUser.toJSON());
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = req.body;
    
    const unexpectedFields = Object.keys(user).filter(field => !['first_name', 'last_name', 'username', 'password'].includes(field));
    if (unexpectedFields.length > 0) {
      console.log("Unexpected fields found:", unexpectedFields);
      return res.status(400).json({ message: "Unexpected fields in request body" });
    }

    if (!user.first_name || !user.last_name || !user.username || !user.password) {
      console.log("Missing mandatory fields:", user);
      return res
        .status(400)
        .json({
          message:
            "Username, Firstname, Lastname, and Password are mandatory fields",
        });
    }

    const isEmailFormat = String(user.username)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (!isEmailFormat) {
      console.log("Invalid email format:", user.username);
      return res
        .status(400)
        .json({ message: "Username should be an Email ID" });
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    // Delete unexpected fields to prevent them from being included in the user object
    delete user.id;
    delete user.account_created;
    delete user.account_updated;

    user.account_created = new Date();
    user.account_updated = new Date();

    const createdUser = await User.create(user);

    console.log("User created:", createdUser.toJSON());

    const responseObj = {
      id: createdUser.id,
      first_name: createdUser.first_name,
      last_name: createdUser.last_name,
      username: createdUser.username,
      account_created: createdUser.account_created,
      account_updated: createdUser.account_updated,
    };

    return res.status(201).json(responseObj);
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(400).json(error);
  }
};


const getUserDetails = async (req, res) => {
  try {
      const existingUser = await User.findOne({
          attributes: ['id', 'first_name', 'last_name', 'username', 'account_created', 'account_updated'],
          where: {
              username: req.user.username,
          },
      });

      if (!existingUser) {
          console.log('User not found in req.user');
          return res.status(401).json({ message: 'User not found' });
      }

      const userDetails = {
          id: existingUser.id,
          first_name: existingUser.first_name,
          last_name: existingUser.last_name,
          username: existingUser.username,
          account_created: existingUser.account_created,
          account_updated: existingUser.account_updated,
      };

      console.log('User details retrieved successfully:', userDetails);
      res.status(200).json(userDetails);
  } catch (error) {
      console.error('Error in getUserDetails:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};



const updateUserDetails = async (req, res) => {
  try {
      // Get the user from the request
      const user = req.user;

      // Check if the user exists
      if (!user) {
          console.log('User not found in req.user');
          return res.status(401).json({ message: 'User not found' });
      }

      // Extract updated details from the request body
      const { first_name, last_name, username, password } = req.body;

      // Validate that only allowed fields are being updated
      const allowedFields = ['first_name', 'last_name', 'username', 'password'];
      const isUpdateValid = Object.keys(req.body).every(field => allowedFields.includes(field));

      if (!isUpdateValid) {
          console.log('Invalid fields for update:', req.body);
          return res.status(400).json({ message: 'Invalid fields for update' });
      }

      // Update user details
      user.first_name = first_name || user.first_name;
      user.last_name = last_name || user.last_name;
      user.username = username || user.username;

      // Update the password if provided
      if (password) {
          const salt = await bcrypt.genSalt();
          user.password = await bcrypt.hash(password, salt);
      }

      // Update the account_updated field
      user.account_updated = new Date();

      // Save the updated user details
      await user.save();

      // Return success message
      return res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
      // If an error occurs, log the error and return an appropriate response
      console.error('Error in updateUserDetails:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
          return res.status(400).json({ error: 'Username (email) must be unique' });
      }
      return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export default { register, getUserDetails, updateUserDetails};
