import { people, getById, deleteUser, addUser } from './db';


const resolvers = {
  Query: {
    people: async (parent, args, context) => {
      return context.prisma.user.findMany()
    },
    person: (_, {id}, context) => {
      return context.prisma.user.findOne({
        where: {
          id: id,
        },
      })
    }
  },
  Mutation: {
    // addUser: (_, {name, age, gender}) => addUser(name, age, gender),
    addUser: (_, {name, age, gender}, context, info) => {
      const newUser = context.prisma.user.create({
        data: {
          name,
          age,
          gender
        }
      })
      return newUser
    },
    deleteUser: (_, {id}) => deleteUser(id),
    singleUpload: async (obj, { file }) => {
      const { filename, mimetype, encoding } = await file;

      const returnFile = { filename, mimetype, encoding };
      return returnFile;
    }
  }
};

export default resolvers;