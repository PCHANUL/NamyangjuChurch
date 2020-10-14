import { people, getById, deleteUser, addUser } from './db';

const resolvers = {
  Query: {
    people: () => people,
    person: (_, {id}) => getById(id)
  },
  Mutation: {
    addUser: (_, {name, age, gender}) => addUser(name, age, gender),
    deleteUser: (_, {id}) => deleteUser(id)
  }
};

export default resolvers;