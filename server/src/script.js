// 1
const { PrismaClient } = require("@prisma/client")

// 2
const prisma = new PrismaClient()

//3
async function main() {
  // const newUser = await prisma.user.create({
  //   data: {
  //     name: 'chanul',
  //     age: 10,
  //     gender: 'male',
  //   }
  // })
  const allLinks = await prisma.user.findMany()
  console.log(allLinks)
}

//4
main()
  .catch(e => {
    throw e
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect()
  })