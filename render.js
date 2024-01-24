export const renderImageList = (imageListEl, images) => {
  imageListEl.innerHTML = ``;
  for (const image of images) {
    const li = document.createElement('li');
    li.classList.add('image');
    const img = document.createElement('img');

    img.src = image.imageUrl;
    img.alt = image.title;

    img.dataset.imageUrl = image.imageUrl;

    li.append(img);

    imageListEl.appendChild(li);
  }
};
