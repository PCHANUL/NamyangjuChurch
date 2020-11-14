const root = {
  getUsers: async (_, context) => {
    return await context.prisma.user.findMany()
  },
  addUser: async ({nickname, password}, context) => {
    return await context.prisma.user.create({
      data: {
        nickname,
        password,
      }
    })
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
    return await context.prisma.category.findMany({
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
  },
  getContent: async ({ id }, context) => {
    return await context.prisma.post.findOne({
      where: {
        id: id
      },
      select: {
        id: true,
        title: true, 
        detailId: true,
        createdAt: true,
        content: {
          include: {
            post: true,
          }
        }
      }
    })
  },
  addContent: async ({ category, title, content }, context) => {
    const isCreated = await context.prisma.post.create({
      data: {
        title,
        detail: {
          connect: { id: Number(category) }
        },
        content: {
          create: { 
            content
          }
        }
      }
    })
    return isCreated ? true : false;
  },
  updateContent: async({ id, category, title, content }, context) => {
    const isUpdated = await context.prisma.post.update({
      where: {
        id: id
      },
      data: {
        title,
        detail: {
          connect: { id: Number(category) }
        },
        content: {
          create: { 
            content
          }
        }
      }
    })
    return isUpdated ? true : false;
  },
  deleteContent: async({ id }, context) => {
    const findLinked = await context.prisma.post.findMany({ where: { id }, include: { content: true } })
    const delPost = await context.prisma.post.delete({ where: { id: id } })
    const delContent = await context.prisma.content.delete({ where: { id: findLinked[0].content.id } })
    return delPost && delContent ? true : false;
  }
};

export default root;