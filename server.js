// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const mongoDBDConection = require('./config/mongoDbConnection')

// Middlewares
app.use(express.json());

// connecte to database
mongoDBDConection()

// User model
const User = require('./models/User');

// GET : Retourner tous les utilisateurs
app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // POST : Ajouter un utilisateur
  app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
  
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // PUT : Modifier un utilisateur par ID
  app.put('/users/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // DELETE : Supprimer un utilisateur par ID
  app.delete('/users/:id', async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'Utilisateur supprimé !' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Démarrage du serveur
app.listen(process.env.PORT, () =>
  console.log(`🚀 Serveur lancé sur http://localhost:${process.env.PORT}`)
);
