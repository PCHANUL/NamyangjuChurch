import axios from 'axios';
import { transDate } from './Methods';

export const signup = async(id, pw) => {
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
        signup (
          nickname: ${id}
          password: ${pw}
        )
      }
      `
    }
  })
}

export const signin = async(id, pw) => {
  console.log('id, pw: ', id, pw);
  const result = await axios({
    url: 'http://localhost:4000/graphql',
    method: 'POST',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
      query {
        signin (
        nickname: "${id}"
        password: "${pw}"
        )
      }
      `
    }
  })
  return result.data.data.signin;
}

export const isSignin = async() => {
  const result = await axios({
    url: 'http://localhost:4000/graphql',
    method: 'POST',
    withCredentials: true,
    data: {
      query: `
      query {
        isSignin
      }
      `
    }
  })
  return result.data.data.isSignin;
}

export const signout = async() => {
  const result = await axios({
    url: 'http://localhost:4000/graphql',
    method: 'POST',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      query: `
      query {
        signout
      }
      `
    }
  })
  return result.data.data.signout;
}

export const addData = async(category, title, content, dateNow, verse, thumbnail) => {
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
          content: ${JSON.stringify(content)}
          datetime: "${dateNow}"
          verse: "${verse}"
          thumbnail: "${thumbnail}"
        ) 
      }
      `
    }
  })
  return result
}

export const updateData = async(id, category, title, content, dateNow, verse, thumbnail) => {
  console.log('id, category, title, content: ', id, category, title, verse);
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
          content: ${JSON.stringify(content)}
          datetime: "${dateNow}"
          verse: "${verse}"
          thumbnail: "${thumbnail}"
        ) 
      }
      `
    }
  })
}

export const deleteData = async(id, callback) => {
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

export const getContent = async( id, callback ) => {
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
          title
          detailId
          createdAt
          verse
          thumbnail
          content {
            content
          }
        }
      }
      `
    }
  });
  console.log(content.data.data.getContent);
  callback(content.data.data.getContent);
}

export const getDataList = async(category, detail, callback) => {
  try {
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
          getCategory (
            category: ${++category}
            detail: ${++detail}
          ) {
            id
            createdAt
            title
            verse
            thumbnail
          }
        }
        `
      }
    });
    callback(data.data.data.getCategory);
  } catch (err) {
    alert(err);
  }
}

export const uploadImage = async(files, callback) => {
  let result = [];
  for (let file of files) {
    let formData = new FormData();
    await formData.append("img", file);
    let dataUrl = await axios.post('http://localhost:4000/post/img', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    result.push(dataUrl);
  }
  callback(result)
}

const getLiveUrlFunc = () => {
  let time = Date.now();
  let resultObj = {};

  return async(callback, getNow = false) => {
    let now = Date.now();
    if (!resultObj.status || now - time > 120000 || getNow === true) {
      const resultUrl = await axios.get('http://localhost:4000/live');
      const youtubeInfo = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${resultUrl.data.url}&key=AIzaSyA6S9ghWF8sGcKSNqFC6ORnzDnB3y8jMmE`);
      if (youtubeInfo.data.items.length === 0) {
        // youtube url이 아닌 경우
        resultObj = { status: false };
      } else {
        const snippet = youtubeInfo.data.items[0].snippet;
        resultObj = {
          status: true,
          url: resultUrl.data.url,
          title: snippet.title,
          time: transDate(resultUrl.data.time),
          live: snippet.liveBroadcastContent,
        };
      }
    }
    callback(resultObj);
  }
}

export const getLiveUrl = getLiveUrlFunc();

export const postLiveUrl = async(url, callback) => {
  const resultMsg = await axios({
    url: 'http://localhost:4000/live',
    method: 'post',
    withCredentials : true,
    headers: {
      'Content-Type': 'application/json',
    },
    params: { url }
  })
  callback(resultMsg);
}

export const getBibleVerse = async(book, chapterA, verseA, chapterB, verseB, callback) => {
  try {
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
          getBible (
            book: ${book}
            chapterA: ${chapterA}
            chapterB: ${chapterB}
            ${
              verseA ? (
              `verseA: ${verseA}
               verseB: ${verseB}`
              ) : ''
            }
          ) {
            book
            chapter
            verse
            content
          }
        }
        `
      }
    });
    callback(data.data.data.getBible)
  } catch (err) {
    console.log(err);
  }
}
