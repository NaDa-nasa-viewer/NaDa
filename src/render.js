const filterDiv = document.createElement('div')
filterDiv.id = 'filters'


const addOptions = (optionsArr, id, labelText, name, defaultValue='') => {
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
    filterDiv.append(selectElLabel, selectEl)
  }
  return selectEl
};

export const renderForm = (appDiv) => {
  const form = document.createElement('form');
  form.id = 'form';

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
  searchInput.name = 'q'; // all-encompassing metadata search parameter
  // add a default value to allow submission with no manual input?

  const filterH3 = document.createElement('h3')
  filterH3.textContent = 'Apply filters: '
  filterDiv.append(filterH3)

  const keywords = ['MOON', 'STAR', 'JUPITER', 'PLANET', 'ASTRONAUT', 'ASTEROID', 'BLACK HOLE', 'HUBBLE', 'GALAXY', 'SATELLITE'].sort();
  addOptions(keywords, 'keyword-filter', 'filter by keyword: ', 'keywords');

  const photographers = ['Bridget Caswell', 'Eric Bordelon', 'Bill Ingalls', 'Josh Varcarcel', 'Desiree Stover', 'Bill Stafford', 'Jordan Salkin', 'Jeff Janis', 'Jim Ross', 'Norah Moran'];
  addOptions(photographers, 'photographer-filter', 'photographer: ', 'photographer');

  const pageSizes = [10, 30, 50];
  addOptions(pageSizes, 'page-size-select', 'number of images: ', 'page_size', 20);


  const yearDiv = document.createElement('div');
  yearDiv.id = 'year-inputs'
  // convert the resulting formData to a string before making requests
  const currentYear = new Date().getFullYear();

  const yearStartInput = document.createElement('input');
  yearStartInput.type = 'number';
  yearStartInput.min = 1920;
  yearStartInput.max = currentYear;
  yearStartInput.id = 'year-start';
  yearStartInput.value = 1920;
  yearStartInput.name = 'year_start'

  const yearStartLabel = document.createElement('label');
  yearStartLabel.htmlFor = yearStartInput.id;
  yearStartLabel.textContent = 'Year min: '

  const yearEndInput = document.createElement('input');
  yearEndInput.type = 'number';
  yearEndInput.min = 1920;
  yearEndInput.max = currentYear;
  yearEndInput.id = 'year-end';
  yearEndInput.value = currentYear;
  yearEndInput.placeholder = `Max ${currentYear}`
  yearEndInput.name = 'year_end'

  const yearEndLabel = document.createElement('label');
  yearEndLabel.htmlFor = yearEndInput.id;
  yearEndLabel.textContent = 'Year max: ';

  yearDiv.append(yearStartLabel, yearStartInput, yearEndLabel, yearEndInput);
  filterDiv.append(yearDiv)
  


  // gimme a minute for the options
  const submit = document.createElement('button');
  submit.textContent = 'Search';
  
  const clearAll = document.createElement('button');
  clearAll.type = 'reset';
  clearAll.textContent = 'Reset Filters';

  // give everything a name...
  form.append(h2, formDesc, searchLabel, searchInput, filterDiv, submit, clearAll);
  appDiv.append(form);
  return {form, h2, formDesc, searchLabel, searchInput, filterDiv, submit, clearAll };
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
