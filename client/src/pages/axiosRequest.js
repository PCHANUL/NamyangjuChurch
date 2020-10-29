import axios from 'axios';

const addData = async(category, title, content) => {
  const result = await axios({
    url: 'http://localhost:4000/graphql',
    method: 'POST',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
      mutation {
        addContent(
          category: "${category}"
          title: "${title}"
          desc: ""
          url: ""
          content: "${content}"
        ) 
      }
      `
    }
  })
  console.log(result);
}

const updateData = async(id, category, title, content) => {
  console.log('id, category, title, content: ', id, category, title, content);
  return await axios({
    url: 'http://localhost:4000/graphql',
    method: 'POST',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
      mutation {
        updateContent (
          id: ${id}
          category: "${category}"
          title: "${title}"
          desc: ""
          url: ""
          content: "${content}"
        ) 
      }
      `
    }
  })
}

const deleteData = async(id, callback) => {
  const result = await axios({
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

  if (result.data.data.deleteContent) {
    alert('삭제되었습니다.');
    callback(true);
  }
}

const getContent = async( id, callback ) => {
  const content = await axios({
    url: 'http://localhost:4000/graphql',
    method: 'GET',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      query: `
      {
        getContent(id: ${id}) {
          id
          title
          detailId
          content{
            content
          }
        }
      }
      `
    }
  });
  callback(content);
}

const getDataList = async(callback) => {
  const data = await axios({
    url: 'http://localhost:4000/graphql',
    method: 'GET',
    withCredentials : true,
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
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

const uploadImage = async(file, callback) => {
  let formData = new FormData();
  await formData.append("img", file);

  const imgUrl = await axios.post('http://localhost:4000/post/img', formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  })

  callback(imgUrl)
}

export { getDataList, deleteData, uploadImage, addData, getContent, updateData }