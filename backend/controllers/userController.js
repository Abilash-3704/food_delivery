const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const {userName, password} = req.body;

  let emptyFields = [];
  if (!userName) {
    emptyFields.push('userName');
  }
  if (!password) {
    emptyFields.push('password');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({error: 'Please fill in all the fields', emptyFields});
  }
  const userExists = await User.findOne({userName});
  if (userExists) {
    return res.status(400).json({error: 'user already exists'});
  }
  try {
    const user = await User.create({userName, password});
    res.status(200).json({
      _id: user.id,
      userName: user.userName,
      password: user.password,
      orders: [],
      cart: [],
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

const loginUser = async (req, res) => {
  const {userName, password} = req.body;

  const user = await User.findOne({userName});
  if (user && password === user.password) {
    res.json({
      _id: user.id,
      userName: user.userName,
      password: user.password,
      orders: user.orders,
      cart: user.cart,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).json({error: 'Invalid credentials'});
  }
};

const addToCart = async (req, res) => {
  const {name} = req.body;
  const userId = req.user.id;
  const user = await User.findOne({_id: req.user.id});

  let itemIndex = user?.cart?.findIndex(p => p.name === name);
  // console.log(user.cart);

  if (itemIndex > -1) {
    await User.findOneAndUpdate(
      {_id: userId, 'cart.name': name},
      {$inc: {'cart.$.quantity': 1}},
      {new: true},
    ).then((data, error) => {
      if (error) return res.status(400).json(error);
      if (data) return res.status(200).json(data);
    });
  } else {
    await User.findOneAndUpdate(
      {_id: userId},
      {
        $push: {
          cart: {
            name: name,
            quantity: 1,
          },
        },
      },
      {new: true},
    ).then((data, error) => {
      if (error) return res.status(400).json(error);
      if (data) return res.status(200).json(data);
    });
  }
};

const getCart = async (req, res) => {
  // const {userId} = req.body;
  const user = await User.findOne({_id: req.user.id});
  if (user) {
    res.json({
      cart: user.cart,
    });
  }
};
const getOrders = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findOne({_id: userId});
  if (user) {
    res.json({
      orders: user.orders,
    });
  }
};

const placeOrder = async (req, res) => {
  const {newOrder} = req.body;
  const userId = req.user.id;
  const user = await User.findOne({_id: userId});
  if (user) {
    await User.findOneAndUpdate(
      {_id: userId},
      {
        $push: {
          orders: {
            orders: newOrder,
          },
        },
      },
      {new: true},
    ).then((data, error) => {
      if (error) return res.status(400).json(error);
      if (data) return res.status(200).json(data);
    });
    await User.findOneAndUpdate(
      {_id: userId},
      {$set: {cart: []}},
      {multi: true},
    );
  }
};

//generate jwt
const generateToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '600d',
  });
};
module.exports = {
  registerUser,
  loginUser,
  addToCart,
  getCart,
  getOrders,
  placeOrder,
};
