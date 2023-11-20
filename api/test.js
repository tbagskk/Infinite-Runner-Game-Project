// serverless-function.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
      return res.status(200).json({ message: 'User already exists' });
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
    
    // Envoyer la réponse
    res.status(200).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Déconnexion de la base de données après avoir terminé l'opération
    await prisma.$disconnect();
  }
};
