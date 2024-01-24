const dropdownDiv = document.createElement('div');
dropdownDiv.id = 'dropdowns';

const addOptions = (optionsArr, id, labelText) => {
  const selectElLabel = document.createElement('label');
  selectElLabel.htmlFor = id;
  selectElLabel.textContent = labelText;
  const selectEl = document.createElement('select');
  selectEl.id = id;
  for (const selection of optionsArr) {
    const option = document.createElement('option');
    option.value = selection;
    option.textContent = selection;
    selectEl.append(option);
    dropdownDiv.append(selectElLabel, selectEl);
  }
};

export const renderForm = (appDiv) => {
  const form = document.createElement('form');
  form.id = form;

  const h2 = document.createElement('h2');
  h2.textContent = 'Search NASA Database:';

  const formDesc = document.createElement('p');
  formDesc.textContent = 'explain the form goofball';

  const searchLabel = document.createElement('label');
  searchLabel.htmlFor = 'search';
  searchLabel.textContent = 'type something -> ';

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'search';

  const keywords = [
    'MOON',
    'STAR',
    'JUPITER',
    'PLANET',
    'ASTRONAUT',
    'ASTEROID',
    'BLACK HOLE',
    'HUBBLE',
    'GALAXY',
    'SATELLITE',
  ].sort();
  addOptions(keywords, 'keyword-filter', 'filter by keyword');

  const photographers = [
    'Bridget Caswell',
    'Eric Bordelon',
    'Bill Ingalls',
    'Josh Varcarcel',
    'Desiree Stover',
    'Bill Stafford',
    'Jordan Salkin',
    'Jeff Janis',
  ];

  addOptions(photographers, 'photographer-filter', 'photographer');

  // gimme a minute for the options
  const submit = document.createElement('button');
  submit.textContent = 'Search';

  form.append(h2, formDesc, searchLabel, searchInput, dropdownDiv, submit);
  appDiv.append(form);
  return { h2, formDesc, searchLabel, searchInput, dropdownDiv, submit };
};
export const renderImageList = (imageListEl, images) => {
  imageListEl.innerHTML = ``;
  for (const image of images) {
    const li = document.createElement('li');
    li.classList.add('image');
    const img = document.createElement('img');

    img.src = image.imageUrl;
    img.alt = image.title;

    img.dataset.imageUrl = image.imageUrl;
    img.dataset.title = image.title;
    img.dataset.photographer = image.photographer ?? 'Not Found';
    img.dataset.location = image.location ?? 'Not Found';
    img.dataset.description = image.description ?? 'Not Found';
    img.dataset.dateCreated = image.dateCreated ?? 'Not Found';

    li.append(img);

    imageListEl.appendChild(li);
  }
};

export const renderImageInfo = (imageInfoEl, image) => {
  imageInfoEl.innerHTML = ``;

  const h2 = document.createElement('h2');
  h2.textContent = image.dataset.title;

  const h3 = document.createElement('h3');
  h3.textContent = `Photographer: ${image.dataset.photographer}`;

  const img = document.createElement('img');
  img.src = image.dataset.imageUrl;
  img.alt = `A picture of ${image.dataset.title}`;

  const p1 = document.createElement('p');
  p1.textContent = `Description: ${image.dataset.description}`;
  const p2 = document.createElement('p');
  p2.textContent = `Location: ${image.dataset.location}`;
  const p3 = document.createElement('p');
  p3.textContent = `Date: ${image.dataset.dateCreated}`;

  imageInfoEl.append(h2, h3, img, p1, p2, p3);
};
