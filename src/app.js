// import { getFirstTwentyImages } from './fetch-functions';
import { renderForm, renderImageList } from './render';
import { getFirstTwentyImages, getFormImages, getImageSizes } from './fetch-functions';

// form submission
const handleSubmit = async (e) => {
  e.preventDefault()
  const formObj = Object.fromEntries(new FormData(form))
  for (const data in formObj) {
    if(!formObj[data]) delete formObj[data]
  }
 
  const imageListEl = document.querySelector('.image-list')
  // imageListEl.innerHTML = ''
  const images = await getFormImages(formObj)
  console.log(formObj)
  renderImageList(imageListEl, images)




}

export default async function app(appDiv) {
  const { form } = renderForm(appDiv);

  const imageListEl = document.createElement('ul');
  imageListEl.classList.add('image-list');
  appDiv.append(imageListEl);

  // Fetch images
  const images = await getFirstTwentyImages();
  console.log('images', images);
  // Render
  renderImageList(imageListEl, images);

  form.addEventListener('submit', handleSubmit);
}
