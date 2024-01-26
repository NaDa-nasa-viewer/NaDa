const url = 'https://images-api.nasa.gov/search';

export const getImages = async (query='q=space', pageSize = 20) => {
  try {
    const data = await fetch(`${url}?${query}&media_type=image`);
    if (!data.ok) throw new Error('Failed to get images');
    const { collection } = await data.json();
    console.log(collection)
    const res = [];
    for (let i = 0; i < pageSize; i++) {
      const item = collection.items[i];
      res.push({
        imageUrl: await getImageSizes(item.href),
        title: item.data[0].title,
        photographer: item.data[0].photographer,
        location: item.data[0].location,
        description: item.data[0].description,
        dateCreated: item.data[0].date_created.slice(0,10),
        keywords: item.data[0].keywords,
      });
    }
    return res;
  } catch (err) {
    console.warn(err);
    return null;
  }
};

export const getImageSizes = async (href) => {
  try {
    const data = await fetch(href);
    if (!data.ok) throw new Error('Failed to get image');
    const images = await data.json();
    return images[images.length - 2];
  } catch (err) {
    console.warn(err);
    return null;
  }
};

export const getFormImages = async (formObj) => {
  let queryStr = ''

  for (const [data, value] of Object.entries(formObj)) {
    queryStr += `${data}=${value.replaceAll(' ', '%20')}&` 
  }

  queryStr = queryStr.slice(0, -1)
  
  return await getImages(queryStr, formObj.page_size)
};

// export const getAPOD = async (key) => {
//   try {
//     const data = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`);
//     if (!data.ok) throw new Error('Failed to get images');
//     const { title, copyright, hdurl, explanation } = await data.json();

//     console.log(explanation)
//     // console.log(response)
//     const res = {
//       title,
//       copyright,
//       explanation,
//       src: hdurl
//     }

//     return res;
//   } catch (err) {
//     console.warn(err);
//     return null;
//   }

// }