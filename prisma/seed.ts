import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const USERS_TO_CREATE = 20;
const MIN_TWEETS = 1;
const MAX_TWEETS = 20;

const run = async () => {
  const userData = Array(USERS_TO_CREATE)
    .fill(null)
    .map(() => {
      return {
        name: faker.internet.userName().toLowerCase(),
        email: faker.internet.email().toLocaleLowerCase(),
        image: faker.image.avatar(),
      };
    });
  const createUsers = userData.map((user) =>
    prisma?.user.create({ data: user })
  );
  const users = await prisma?.$transaction(createUsers);
  const tweets = [];
  for (let index = 0; index < users.length; index++) {
    const amount_of_tweets = faker.datatype.number({
      min: MIN_TWEETS,
      max: MAX_TWEETS,
    });
    for (let i = 0; i < amount_of_tweets; i++) {
      tweets.push({
        message: faker.lorem.sentence(),
        author: {
          connect: {
            id: users[i]?.id,
          },
        },
      });
    }
  }
  const createTweets = tweets.map((tweet) =>
    prisma.tweet.create({ data: tweet })
  );
  await prisma.$transaction(createTweets);
};

run()
  .catch((error) => {
    console.log("Error When Seeding", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
