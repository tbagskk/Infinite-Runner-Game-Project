// serverless-function.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cookie = require('cookie'); // Ajout de l'importation du module cookie
const jwt = require('jsonwebtoken');
const secretKey = 'gabin_test'; // Gardez cette clé secrète

module.exports = async (req, res) => {
  try {
    console.log("Function invoked");
    console.log(req.body.name);

    // Votre logique ici
    const name = req.body.name;
    let newUser = "";

     // Vérifier si l'utilisateur existe déjà
     const existingUser = await prisma.user.findFirst({
      where: {
        name: name,
      },
    });

    console.log("existing", existingUser);
    if (existingUser) {
      // L'utilisateur existe déjà, renvoyer un message approprié
      const token = jwt.sign({ userId: existingUser.id, username: existingUser.name }, secretKey, { expiresIn: '1h' });

      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`);
      // res.cookie('token', token, {
      //   httpOnly: true,
      //   secure: false, // Assurez-vous d'utiliser HTTPS en production
      //   sameSite: 'Strict', // Ou 'Lax' selon vos besoins
      // });


      return res.status(200).json({ message: 'User already exists'});
    }
    else  {
      newUser = await prisma.user.create({
        data: {
          name,
          score:0,
          nbgame:0,
          skin:'default_skin'
        },
      });
      console.log('User created:', newUser);
    }

    const token = jwt.sign({ userId: newUser.id, username: newUser.name }, secretKey, { expiresIn: '1h' });
    
    // Envoyer la réponse
    res.status(200).json({ message: 'User created successfully', user: newUser, token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Déconnexion de la base de données après avoir terminé l'opération
    await prisma.$disconnect();
  }
};
