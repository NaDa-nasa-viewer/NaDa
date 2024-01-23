import { getFirstTwentyImages, getImageSizes } from './fetch-functions';
import { renderImageList } from './render';

export default async function app(appDiv) {
  const imageListEl = document.createElement('ul');
  imageListEl.classList.add('image-list');
  appDiv.append(imageListEl);

  // Fetch images
  const images = await getFirstTwentyImages();
  console.log('images', images);
  // Render
  renderImageList(imageListEl, images);
}
