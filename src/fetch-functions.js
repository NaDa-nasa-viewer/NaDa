const url = 'https://images-api.nasa.gov/search';

export const getFirstTwentyImages = async () => {
  try {
    const data = await fetch(`${url}?q=space&media_type=image`);
    if (!data.ok) throw new Error('Failed to get images');
    const { collection } = await data.json();
    console.log(collection)
    const res = [];
    for (let i = 0; i < 20; i++) {
      const item = collection.items[i];
      res.push({
        imageUrl: await getImageSizes(item.href),
        title: item.data[0].title,
        photographer: item.data[0].photographer,
        // location: item.data[0].location,
        description: item.data[0].description,
        dateCreated: item.data[0].date_created,
        keywords: item.data[0].keywords
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
    return images[0];
  } catch (err) {
    console.warn(err);
    return null;
  }
};

export const getFormImages = async (formObj) => {
  //possible object examples

  // all values selected:
  //Object { q: "v", keywords: "MOON", photographer: "Jim Ross", page_size: "20", year_start: "1920", year_end: "2024"; }
  // no values selected
  //Object { pageSize: "20" }

  let queryStr = ''
  for (const [data, value] of Object.entries(formObj)) {
    queryStr += `${data}=${value.replaceAll(' ', '%20')}&`
  }

  queryStr = queryStr.slice(0, -1)
  console.log(queryStr)
  
}
