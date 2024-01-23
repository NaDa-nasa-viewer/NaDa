import { getFirstTwentyImages } from './fetch-functions';

export default async function app(appDiv) {
  const imageListEl = document.createElement('ul');
  imageListEl.classList.add('image-list');
  appDiv.append(imageListEl);

  // Fetch images
  const images = await getFirstTwentyImages();
  console.log('images', images);
  // Render
}
