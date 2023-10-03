const contactForm = document.getElementById('contact-form');
const contactList = document.getElementById('contact-list');
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
let editingIndex = -1;

function saveContacts() {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function addContact() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const imageUrl = document.getElementById('imageUrl').value;

  if (!name || !email || !phone) {
    alert('Не оставляйте пустым поля!');
    return;
  }

  const contact = { name, email, phone, imageUrl };

  if (editingIndex === -1) {
    contacts.push(contact);
  } else {
    contacts[editingIndex] = contact;
    editingIndex = -1;
  }

  saveContacts();
  renderContacts();
  clearForm();
}

function addContact() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const imageUrl = document.getElementById('imageUrl').value;

  if (!name || !email || !phone) {
    alert('Не оставляйте пустым поля!');
    return;
  }

  // Добавляем проверку наличия URL картинки
  if (!imageUrl) {
    alert('Пожалуйста добавьте только Image URL.');
    return;
  }

  const contact = { name, email, phone, imageUrl };

  if (editingIndex === -1) {
    contacts.push(contact);
  } else {
    contacts[editingIndex] = contact;
    editingIndex = -1;
  }

  saveContacts();
  renderContacts();
  clearForm();
}

function renderContacts() {
  contactList.innerHTML = '';

  contacts.forEach((contact, index) => {
    const contactDiv = document.createElement('div');
    contactDiv.classList.add('contact');

    contactDiv.innerHTML = `
    <div class='cart'>
    <div class="cartochka">
    <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone:</strong> ${contact.phone}</p>
      <img src="${contact.imageUrl}" alt="Contact Image" width="50">
      <div class="bttn">
      <button class="btn-click" onclick="editContact(${index})">Update</button>
      <button class="btn-click-delete" onclick="deleteContact(${index})">Delete</button>
    </div>
    </div>
    </div>
      `;

    contactList.appendChild(contactDiv);
  });
}

function editContact(index) {
  const contact = contacts[index];
  document.getElementById('name').value = contact.name;
  document.getElementById('email').value = contact.email;
  document.getElementById('phone').value = contact.phone;
  document.getElementById('imageUrl').value = contact.imageUrl;

  editingIndex = index;
}

function deleteContact(index) {
  contacts.splice(index, 1);
  saveContacts();
  renderContacts();
}

function clearForm() {
  contactForm.reset();
  editingIndex = -1;
}

// Инициализация данных при загрузке страницы
renderContacts();
