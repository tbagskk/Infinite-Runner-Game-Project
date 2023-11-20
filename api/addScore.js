// serverless-function.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  try {

    let theName = req.body.name;
    let newScore = req.body.score;
    let skin = req.body.skin;
    console.log("skin",skin);
    console.log("Function invoked add Score");

    const existingUser = await prisma.user.findFirst({
        where: {
          name: theName,
        },
      });
      console.log("le user",);
    let formerScore = existingUser.score;

    if (newScore > formerScore)
    {
        const updatedUser = await prisma.user.updateMany({
            where: {
              name: theName, // Remplacez 'id' par la clé primaire réelle que vous utilisez
            },
            data: {
              score: newScore,
              skin: skin,
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