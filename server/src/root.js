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
    const findLinked = await context.prisma.post.findMany({ where: { id }, include: { content: true } })
    const delPost = await context.prisma.post.delete({ where: { id: id } })
    const delContent = await context.prisma.content.delete({ where: { id: findLinked[0].content.id } })
    return delPost && delContent ? true : false;
  }
};

export default root;