const mongoose = require('mongoose')

// Connexion à MongoDB
const mongoDBDConection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('📦 Vous etes bien connecté à mongoDB Atlas');
    
  } catch (error) {
    console.error('la connexion à Connection échoué:',error.message);
    
  }
}


module.exports = mongoDBDConection;