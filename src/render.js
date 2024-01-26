//const renderAPOD = (apod, appDiv) => {
//   const apodDiv = document.createElement('div')
//   apodDiv.id = 'apod'

//   const h2 = document.createElement('h2')
//   const date = new Date()
//   h2.textContent = `Astrology Picture of the Day: ${date.toDateString()}`
//   const apodImg = document.createElement('img');
//   apodImg.src = apod.src || 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/NGC2207%2BIC2163.jpg/640px-NGC2207%2BIC2163.jpg'
//   apodImg.id = 'apod-img'

//   const description = document.createElement('div')
//   const title = document.createElement('h3')
//   title.textContent = `${apod.title}` || 'NGC2207+IC2163'

//   const credit = document.createElement('p')
//   credit.textContent = `Credit/Copyright: ${apod.copyright}` || 'NASA/ESA and The Hubble Heritage Team (STScI)'

//   const explanation = document.createElement('p')
//   explanation.textContent = `Description: ${apod.explanation}` || 'Near colliding NGC 2207 and IC 2163 as seen by the NASA/ESA Hubble Space Telescope.'

//   description.append(title, credit, explanation)
//   apodDiv.append(h2, apodImg, description)
//   appDiv.append(apodDiv)
//   };

const mainfilterDiv = document.createElement('div');
mainfilterDiv.id = 'main-filters'

const addOptions = (optionsArr, id, labelText, name, defaultValue = '') => {
  const selectionDiv = document.createElement('div')
  selectionDiv.className = 'filter'
  const selectElLabel = document.createElement('label');
  selectElLabel.htmlFor = id;
  selectElLabel.textContent = labelText;
  const selectEl = document.createElement('select');
  selectEl.id = id;
  selectEl.name = name;

  const defaultOption = document.createElement('option')
  defaultOption.value = defaultValue
  defaultOption.textContent = defaultValue || 'Any'
  defaultOption.selected = 'selected'
  selectEl.append(defaultOption)

  for (const selection of optionsArr) {
    const option = document.createElement('option');
    option.value = selection;
    option.textContent = selection;
    selectEl.append(option);
    selectionDiv.append(selectElLabel, selectEl)
    mainfilterDiv.append(selectionDiv)
  }
  return selectEl
};

export const renderForm = (appDiv) => {
  const filterDiv = document.createElement('div');
  filterDiv.id = 'filters';

  const form = document.createElement('form');
  form.id = 'form';

  const h2 = document.createElement('h2');
  h2.textContent = 'Search NASA Database:';

  const searchDiv = document.createElement('div');
  searchDiv.id = 'searchbar';

  const searchLabel = document.createElement('label');
  searchLabel.htmlFor = 'search';
  searchLabel.textContent = 'Custom Search: ';

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'search';
  searchInput.name = 'q';
  searchInput.placeholder = 'Search the cosmos...';

  searchDiv.append(searchLabel, searchInput);

  const filterH3 = document.createElement('h3');
  filterH3.textContent = 'Apply filters: ';
  filterDiv.append(filterH3);

  const keywords = ['MOON', 'STAR', 'JUPITER', 'PLANET', 'ASTRONAUT', 'ASTEROID', 'BLACK HOLE', 'HUBBLE', 'GALAXY', 'SATELLITE'].sort();
  addOptions(keywords, 'keyword-filter', 'Keyword: ', 'keywords');

  const photographers = ['Bridget Caswell', 'Eric Bordelon', 'Bill Ingalls', 'Josh Varcarcel', 'Desiree Stover', 'Bill Stafford', 'Jordan Salkin', 'Jeff Janis', 'Jim Ross', 'Norah Moran'];
  addOptions(photographers, 'photographer-filter', 'Photographer: ', 'photographer');

  const pageSizes = [10, 30, 50];
  addOptions(pageSizes, 'page-size-select', 'Image Count: ', 'page_size', 20);

  filterDiv.append(mainfilterDiv);

  const yearDiv = document.createElement('div');
  yearDiv.id = 'year-inputs';
  // convert the resulting formData to a string before making requests
  const currentYear = new Date().getFullYear();


  const yearStart = document.createElement('div');
  yearStart.className = 'filter';

  const yearStartInput = document.createElement('input');
  yearStartInput.type = 'number';
  yearStartInput.min = 1920;
  yearStartInput.max = currentYear;
  yearStartInput.id = 'year-start';
  yearStartInput.value = 1920;
  yearStartInput.name = 'year_start';
  yearStartInput.placeholder = 'Min: 1920';

  const yearStartLabel = document.createElement('label');
  yearStartLabel.htmlFor = yearStartInput.id;
  yearStartLabel.textContent = 'Earliest Year: ';

  yearStart.append(yearStartLabel, yearStartInput);

  const yearEnd = document.createElement('div');
  yearEnd.className = 'filter';

  const yearEndInput = document.createElement('input');
  yearEndInput.type = 'number';
  yearEndInput.min = 1920;
  yearEndInput.max = currentYear;
  yearEndInput.id = 'year-end';
  yearEndInput.value = currentYear;
  yearEndInput.placeholder = `Max: ${currentYear}`;
  yearEndInput.name = 'year_end';

  const yearEndLabel = document.createElement('label');
  yearEndLabel.htmlFor = yearEndInput.id;
  yearEndLabel.textContent = 'Latest Year: ';

  yearEnd.append(yearEndLabel, yearEndInput);

  yearDiv.append(yearStart, yearEnd);
  filterDiv.append(yearDiv);
  

  const buttons = document.createElement('div');
  buttons.id = 'buttons';
  // gimme a minute for the options
  const submit = document.createElement('button');
  submit.textContent = 'Search';
  
  const clearAll = document.createElement('button');
  clearAll.type = 'reset';
  clearAll.textContent = 'Reset Filters';

  buttons.append(submit, clearAll);

  form.append(h2, searchDiv, filterDiv, buttons);
  appDiv.append(form);
  return { form, h2, searchDiv, filterDiv, buttons };
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
