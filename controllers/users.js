const db = require('../db');
const {getLatLngFromAddress} = require("../services/geolocationService");

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Busca el usuario en la base de datos
    const user = await db('users').where({ id }).first();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await db('users').select('*');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

const addUser = async (req, res) => {
  const { name, address } = req.body;

  if (!name || !address) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const { latitude, longitude } = await getLatLngFromAddress(address);

  try {
    const [id] = await db('users').insert({
      name,
      address,
      latitude,
      longitude,
    });
    const newUser = await db('users').where({ id }).first();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};


const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;

  try {
    const user = await db('users').where({ id }).first();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let latitude = user.latitude;
    let longitude = user.longitude;

    if (address && address !== user.address) {
      const { latitude, longitude } = await getLatLngFromAddress(address);
    }

    const updatedRows = await db('users')
      .where({ id })
      .update({ name, address, latitude, longitude });

    if (!updatedRows) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ id, name, address, latitude, longitude });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
};


const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await db('users').where({ id }).del();

    if (!deletedRows) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
};



module.exports = { getUser, getUsers, addUser, deleteUser, updateUser };
