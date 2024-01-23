import { getFirstTwentyImages } from './fetch-functions';
import { renderForm } from '../render';


export default async function app(appDiv) {

  renderForm(appDiv)

  const imageListEl = document.createElement('ul');
  imageListEl.classList.add('image-list');
  appDiv.append(imageListEl);

  // Fetch images
  const images = await getFirstTwentyImages();
  console.log('images', images);
  // Render
}
