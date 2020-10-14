export let people = [
  {
    id: 0,
    name: 'chanul',
    age: 20,
    gender: 'male',
  },
  {
    id: 1,
    name: 'chanul',
    age: 20,
    gender: 'male',
  },
  {
    id: 2,
    name: 'chanul',
    age: 20,
    gender: 'male',
  }
];

export const getById = id => {
  const filteredPeople = people.filter(person => person.id === id);
  return filteredPeople[0];
}

export const deleteUser = id => {
  const cleanedUser = people.filter(user => user.id !== id);
  if(people.length > cleanedUser.length) {
    people = cleanedUser;
    return true;
  } else {
    return false;
  }
}

export const addUser = (name, age, gender) => {
  const newUser = {
    id: `${people.length + 1}`,
    name,
    age,
    gender
  };
  people.push(newUser);
  return newUser;
};