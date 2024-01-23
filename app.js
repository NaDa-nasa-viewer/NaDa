import { getFirstTwentyImages, getImageSizes } from './fetch-functions';

export default async function app(appDiv) {
  const imageListEl = document.createElement('ul');
  imageListEl.classList.add('image-list');
  appDiv.append(imageListEl);

  // Fetch images
  const images = await getFirstTwentyImages();
  console.log('images', images);

  const image = await getImageSizes(images[0].href);
  console.log('image', image);
  // Render
}
