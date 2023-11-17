// serverless-function.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  try {

    let theName = req.body.name;
    let newScore = req.body.score;
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
            },
          });
    
    


      console.log('User score updated:', updatedUser);
      return updatedUser;}
    } catch (error) {
      console.error('Error updating user score:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  };