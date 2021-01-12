import bcrypt from 'bcryptjs';
const saltRounds = 10;

const root = {
  signin: async ({nickname, password}, { prisma, req, res }) => {
    try {
      console.log('nickname, password: ', nickname, password);

      const result = await prisma.user.findUnique({
        where: { 
          nickname
        }
      })
      console.log('result: ', result);

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
    return req.session.isLogged === undefined ? false : req.session.isLogged;
  },
  getCategory: async ({ category, detail }, { prisma, req, res }) => {
    let result = await prisma.category.findMany({
      where: {
        id: category
      },
      select: { 
        details: {
          where: {
            id: detail
          },
          select: {
            posts: {
              orderBy: {
                id: 'desc'
              },
            }
          }
        }
      },
    })
    return result[0].details[0].posts;
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
        thumbnail: true,
        verse: true,
        content: {
          include: {
            post: true,
          }
        }
      }
    })
  },
  addContent: async ({ category, title, content, datetime, thumbnail, verse }, context) => {
    console.log('category, title, content, dateTime: ', category, title, content, datetime);
    const isCreated = await context.prisma.post.create({
      data: {
        title, thumbnail, verse,
        createdAt: datetime,
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
  updateContent: async({ id, category, title, content, datetime, thumbnail, verse }, context) => {
    const isUpdated = await context.prisma.post.update({
      where: {
        id: id
      },
      data: {
        title, thumbnail, verse,
        createdAt: datetime,
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
  },
  getBible: async({ book, chapterA, verseA, chapterB, verseB}, context) => {
    if (chapterA !== chapterB) {
      const front = await context.prisma.bible_korHRV.findMany({
        where: {
          book: book,
          chapter: chapterA,
          verse: {
            gte: verseA,
          }
        }
      })
      const back = await context.prisma.bible_korHRV.findMany({
        where: {
          book: book,
          chapter: chapterB,
          verse: {
            lte: verseB,
          }
        }
      })

      if (chapterA + 1 === chapterB) {
        return front.concat(back);
      } else {
        const mid = await context.prisma.bible_korHRV.findMany({
          where: {
            book: book,
            chapter: {
              gte: chapterA + 1,
              lte: chapterB - 1
            }
          }
        })
        return front.concat(mid).concat(back);
      }

    } else {
      return await context.prisma.bible_korHRV.findMany({
        where: {
          book: book,
          chapter: {
            gte: chapterA,
            lte: chapterB
          },
          verse: {
            gte: verseA,
            lte: verseB,
          }
        },
      })
    }
  }
};

export default root;