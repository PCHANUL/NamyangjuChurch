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
  deleteUser: async ({ nickname }, context) => {
    console.log(nickname)
    const isDeleted = await context.prisma.user.delete({
      where: {
        nickname
      }
    })
    console.log('isDeleted: ', isDeleted);
    return isDeleted ? true : false;
  },
  getCategory: async (_, context) => {
    const result = await context.prisma.category.findMany({
      select: { 
        id: true,
        name: true,
        details: {
          include: {
            category: true,
            posts: {
              include: {
                detail: true,
              }
            }
          }
        }
      },
    })
    console.log('result: ', result[0].details[0]);
    return result
  },
  addContent: async ({ category, title, desc, url, content }, context) => {
    const result = await context.prisma.post.create({
      data: {
        title,
        desc,
        detail: {
          connect: { name: category }
        },
        content: {
          create: { 
            url,
            content
          }
        }
      }
    })
    return result ? true : false;
  },
  deleteContent: async({ id }, context) => {
    const delPost = await context.prisma.post.delete({ where: { id: id } })
    const delContent = await context.prisma.content.delete({ where: { id: id } })
    return delPost && delContent ? true : false;
  }
};

export default root;