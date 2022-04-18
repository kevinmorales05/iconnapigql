const User = require("../models/Users");
const Otp = require("../models/Otps");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config('variables.env');
const sendMailToValidateEmail = require("../services/sendVerificationEmail");

const createToken = (user, secret, expiresIn) => {
  const { id, email, name } = user;
  return jwt.sign({ id, email, name }, secret, { expiresIn });
};

const resolvers = {
  Query: {
    getUsers: async () => {
      const users = await User.find();
      return users;
    },
    getUserById: async (_, { id }, ctx) => {
      let user = await User.findById(id);
      if (!user) {
        return "User not found!";
      }
      return user;
    },
  },
  Mutation: {
    registerUser: async (_, { input }, ctx) => {
      const { email, password } = input;
      const userExist = await User.findOne({ email });
      if (userExist) {
        throw new Error("The user exists!");
      }
      try {
        const salt = await bcryptjs.genSalt(10);
        input.password = await bcryptjs.hash(password, salt);
        const newUser = new User(input);
        await newUser.save();
        return newUser;
      } catch (error) {
        console.log(error);
      }
    },
    updateUser: async (_, { id, input }, ctx) => {
      console.log("this is the context ", ctx.user);
      let user = await User.findById(id);
      if (!user) {
        return "User not found!";
      }
      //guardar el usuario
      await User.findOneAndUpdate({ _id: id }, input);
      return "User updated successfully!";
    },
    deleteUser: async (_, { id }, ctx) => {
      let user = await User.findById(id);
      if (!user) {
        return "User not found!";
      }
      await User.findByIdAndDelete(id);
      return "User deleted successfully!";
    },
    authUser: async (_, { input }, ctx) => {
      const { email, password } = input;
      //verificar que el usuario exista
      const existUser = await User.findOne({ email });
      console.log("Desde el servidor ", existUser);
      if (!existUser) {
        throw new Error("The user is not registered!");
      }
      const passwordIsCorrect = await bcryptjs.compare(
        password,
        existUser.password
      ); //compara el password con el otro hasheado
      if (!passwordIsCorrect) {
        throw new Error("Incorrect password!");
      }

      return {
        token: createToken(existUser, process.env.SECRETA, "2hr"),
        name: existUser.name,
        id: existUser._id,
        lastName: existUser.lastName,
        email: existUser.email,
        birthday: existUser.birthday,
        photo: existUser.photo,
        locationGPS: existUser.locationGPS,
        city: existUser.city,
        province: existUser.province,
        country: existUser.country,
        address: existUser.address,
        telephone: existUser.telephone,
        status: existUser.status,
      };
    },
    sendValidationEmail: async (_, { input }) => {
      const maxValue = 999999
      const minValue = 100000
      const existUser = await User.findOne({ email: input });
      const number = Math.floor((Math.random() * (maxValue - minValue + 1)) + minValue);
      if (!existUser) {
        return "The user is not registered!";
      } else {
        const newOtp = new Otp({
          email: input,
          number: number,
          creationDate: "2032323",
          validUntil: "230232",
        });
        await newOtp.save();
        sendMailToValidateEmail(process.env.INBOXID, number, input );
        return "We have sent an email with a code to validate your email";
      }
    },
    validateEmail: async (_, { input }) => {
      const existOtp = await Otp.findOne({ email: input.email });
      if (!existOtp) {
        return "The otp does not exist";
      }
      if (existOtp.number === input.otp) {
        await Otp.findByIdAndDelete(existOtp._id);
        return true;
      }
      return false;
    },
  },
};

module.exports = resolvers;
