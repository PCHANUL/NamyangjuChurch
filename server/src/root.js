const root = {
  getUsers: async (_, context) => {
    const users = await context.prisma.user.findMany()
    return users
  },
  addUser: async ({nickname, password}, context) => {
    const newUser = await context.prisma.user.create({
      data: {
        nickname,
        password,
      }
    })
    return newUser
  },
  deleteUser: async ({nickname}, context) => {
    console.log(nickname)
    const isDeleted = await context.prisma.user.delete({
      where: {
        nickname
      }
    })
    console.log('isDeleted: ', isDeleted);
    return isDeleted ? true : false;
  },
  // getCategory: async ({}, context) => {

  // },
  addContent: async ({category, title, desc, url }, context) => {
    console.log('category, title, desc, url: ', category, title, desc, url);
    const result = await context.prisma.post.create({
      data: {
        detail: {
          connect: { name: category }
        },
        content: {
          create: { 
            title,
            desc,
            url 
          }
        }
      }
    })
    return result ? true : false;
  }
};

export default root;