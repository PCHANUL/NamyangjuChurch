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
    // deleteUser: (_, {id}) => deleteUser(id)
  }
};

export default resolvers;