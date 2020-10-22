import axios from 'axios';

const getData = async(callback) => {
  const data = await axios({
    url: 'http://localhost:4000/graphql',
    method: 'POST',
    withCredentials : true,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
      {
        getCategory {
          name
          details {
            id
            name
            posts {
              title
              desc
              createdAt
            }
          }
        }
      }
      `
    }
  })
  callback(data.data.data.getCategory);
}

export { getData }