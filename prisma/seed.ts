import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

async function seed() {
  try {
    // Seed data for AuthorizedUsers
    // console.log(`SUPEREMAIL: ${process.env.SUPEREMAIL}`);

    if (!process.env.SUPEREMAIL) {
      console.error("SUPEREMAIL environment variable is not set");
      return;
    }

    const authorizedUserData = {
      email: process.env.SUPEREMAIL,
      role: "admin",
    };

    // Check if the authorized user already exists
    const existingAuthorizedUser = await prisma.authorizedUsers.findUnique({
      where: {
        email: authorizedUserData.email,
      },
    });

    if (!existingAuthorizedUser) {
      await prisma.authorizedUsers.create({
        data: authorizedUserData,
      });
      console.log(`Created authorized user: ${authorizedUserData.email}`);
    } else {
      await prisma.authorizedUsers.update({
        where: {
          email: authorizedUserData.email,
        },
        data: authorizedUserData,
      });
      console.log(`Updated authorized user: ${authorizedUserData.email}`);
    }

    // Check if ENV is 'dev', and add an additional user if needed
    if (process.env.ENV === "dev") {
      const additionalUserData = {
        email: "matthew150612@gmail.com",
        role: "admin",
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
