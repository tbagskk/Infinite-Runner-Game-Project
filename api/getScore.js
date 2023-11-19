// serverless-function.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// export const config = {
//   runtime: 'edge',
// };

export default async (req, res) => {
  try {

    console.log("Function invoked get Score");

    const existingUser = await prisma.user.findMany();
      
    return res.status(200).json({ user: existingUser });
    } catch (error) {
      console.error('Error updating user score:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  };