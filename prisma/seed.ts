import { PrismaClient, User } from "@prisma/client";
import USERS from "@/constants/DataMigration/Email_WhiteList";

const prisma = new PrismaClient();
require("dotenv");

async function seed() {
  try {
    // Seed data for AuthorizedUsers
    // console.log(`SUPEREMAIL: ${process.env.SUPEREMAIL}`);

    for (const user of USERS) {
      // Remove id if your DB auto-generates this on create, or handle as needed
      const { id, ...userData } = user;
      userData.email = userData.email.toUpperCase(); // Ensure email is case-insensitive

      // Check if user already exists by email (adjust as needed)
      const existingUser = await prisma.authorizedUsers.findUnique({
        where: {
          email: userData.email, // Ensure email is case-insensitive
        },
      });

      if (!existingUser) {
        await prisma.authorizedUsers.create({
          data: userData,
        });
        console.log(`Created user: ${userData.email}`);
      } else {
        await prisma.authorizedUsers.update({
          where: {
            email: userData.email,
          },
          data: userData,
        });
        console.log(`Updated user: ${userData.email}`);
      }
    }

    // Check if ENV is 'dev', and add developer as additional user if needed
    if (process.env.ENV === "dev") {
      const additionalUserData = {
        // Change developer email here
        email: ("developer@example.com").toUpperCase(),
        name: "Developer User",
        role: "Admin",
      };

      const existingAdditionalUser = await prisma.authorizedUsers.findUnique({
        where: {
          email: additionalUserData.email,
        },
      });

      if (!existingAdditionalUser) {
        await prisma.authorizedUsers.create({
          data: additionalUserData,
        });
        console.log(`Created additional user: ${additionalUserData.email}`);
      } else {
        await prisma.authorizedUsers.update({
          where: {
            email: additionalUserData.email,
          },
          data: additionalUserData,
        });
        console.log(`Updated additional user: ${additionalUserData.email}`);
      }
    }

    console.log("Seed script completed successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();