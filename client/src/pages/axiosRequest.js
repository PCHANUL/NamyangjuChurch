import axios from 'axios';

const deleteData = async(id, callback) => {
  await axios({
    url: 'http://localhost:4000/graphql',
    method: 'DELETE',
    withCredentials : true,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
        mutation {
          deleteContent(id: ${id})
        }
      `
    }
  })
  .catch((err) => console.log(err))
  .then((result) => {
    console.log('result: ', result);
    if (result.data.data.deleteContent) {
      alert('삭제되었습니다.');
      callback(true);
    }
  } )
}

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
            name
            posts {
              id
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

const uploadImage = async(callback, file) => {
  let formData = new FormData();
  await formData.append("img", file);

  console.log('formData: ', formData);

  const imgUrl = await axios.post('http://localhost:4000/post/img', formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  })

  // const imgUrl = await axios({
  //   url: 'http://localhost:4000/post/img',
  //   method: 'POST',
  //   withCredentials: true,
  //   headers: {'Content-Type': 'multipart/form-data'},
  //   body: {
  //     img: formData
  //   }
  // })

  callback(imgUrl)
}

export { getData, deleteData, uploadImage }