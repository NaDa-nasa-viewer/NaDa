// import { getFirstTwentyImages } from './fetch-functions';
import { renderForm, renderImageInfo } from './render';

import { getFirstTwentyImages, getImageSizes } from './fetch-functions';
import { renderImageList } from './render';

export default async function app(appDiv) {
  renderForm(appDiv);

  const modal = document.createElement('dialog');
  modal.classList.add('modal');

  const button = document.createElement('button');
  button.id = 'close-modal';
  button.textContent = 'Close';

  const div = document.createElement('div');
  div.id = 'modal-content';
  modal.append(button, div);

  appDiv.append(modal);

  const imageListEl = document.createElement('ul');
  imageListEl.classList.add('image-list');
  appDiv.append(imageListEl);

  const imageInfoEl = document.createElement('div');
  imageInfoEl.classList.add('image-info');
  appDiv.append(imageInfoEl);

  // Fetch images
  const images = await getFirstTwentyImages();
  console.log('images', images);
  // Render
  renderImageList(imageListEl, images);

  imageListEl.addEventListener('click', async (e) => {
    e.target.tagName === 'IMG' ? renderImageInfo(div, e.target) : null;
    modal.showModal();
  });

  button.addEventListener('click', () => {
    modal.close();
  });
}
