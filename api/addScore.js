// serverless-function.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const secretKey = 'gabin_test'; // Gardez cette clé secrète
const cookie = require('cookie'); // Ajout de l'importation du module cookie

module.exports = async (req, res) => {
  
  try {


    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', 'https://cliks.vercel.app')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    
  
  // protection de la route avec JWT

  const cookies = cookie.parse(req.headers.cookie || ''); // Parse les cookies de l'en-tête
  const token = cookies.token;

    // if (!token) {
    //   return res.status(401).json({ message: 'Authentification requise' });
    // }

    // jwt.verify(token, secretKey, async (err, decoded) => {
    //   if (err) {
    //     return res.status(403).json({ message: 'Token non valide' });
    //   }

      console.log('ca passe');
  // le reste du code si JWT est reconnu


    let theName = req.body.name;
    let newScore = req.body.score;
    let skin = req.body.skin;
    let nbgame;
    console.log("lol", theName, newScore, skin, nbgame);
    console.log("Function invoked add Score");

    const existingUser = await prisma.user.findFirst({
        where: {
          name: theName,
        },
      });
      console.log("le user",);
    let formerScore = existingUser.score;
    nbgame = existingUser.nbgame;
    console.log("nbgame",nbgame);

    if (newScore > formerScore)
    {
        const updatedUser = await prisma.user.updateMany({
            where: {
              name: theName, // Remplacez 'id' par la clé primaire réelle que vous utilisez
            },
            data: {
              score: newScore,
              skin: skin,
              nbgame: nbgame + 1,
            },
          });
    
      console.log('User score updated:', updatedUser);
      return updatedUser;}
      else {
        const updatedUser = await prisma.user.updateMany({
          where: {
            name: theName, // Remplacez 'id' par la clé primaire réelle que vous utilisez
          },
          data: {
            skin: skin,
            nbgame: (nbgame + 1)
          },
        });
      }

    
   
    } catch (error) {
      console.error('Error updating user score:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  };