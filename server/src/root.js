import bcrypt from 'bcryptjs';
const saltRounds = 10;

const root = {
  signin: async ({nickname, password}, { prisma, req, res }) => {
    try {
      const result = await prisma.user.findUnique({
        where: {
          nickname
        }
      })
      let isCorrect = await bcrypt.compare(password, result.password)
      if (result === null || !isCorrect) return false;
      else {
        req.session.isLogged = true;
        return true;
      }
    } catch(err) {
      return false;
    }
  },
  signup: async({nickname, password}, context) => {
    const hash = await bcrypt.hash(password, saltRounds);
    return await context.prisma.user.create({
      data: {
        nickname,
        password: hash,
      }
    })
  },
  signout: async (_, { prisma, req, res }) => {
    req.session.isLogged = false;
    return true;
  },
  isSignin: async(_, {prisma, req, res}) => {
    return req.session.isLogged;
  },
  getCategory: async (_, { prisma, req, res }) => {
    let result = await prisma.category.findMany({
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
    return result;
  },
  getContent: async ({ id }, context) => {
    return await context.prisma.post.findUnique({
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