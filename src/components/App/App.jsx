import css from './App.module.css';
import { useState, useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/SearchBox';

// масив об'єктів початкового значення стану App
const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

//ф-ція що зчитує значення localStorage за ключем
const getInitialContacts = () => {
  const savedContacts = window.localStorage.getItem('contact');
  return savedContacts !== null ? JSON.parse(savedContacts) : initialContacts;
};
console.log(getInitialContacts()); // == initialContacts

export default function App() {
  const [contacts, setContacts] = useState(getInitialContacts()); // початковий стан контактів
  const [filter, setFilter] = useState(''); // початковий стан фільтра пошуку SearchBox

  // змінна де зберігаємо відфільтровані контакти не записуючи в стан, пропс до ContactList
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  // для колекції елементів використовують функціональну форму сеттеру!
  // ф-ція повертає змінений стану контактів (додавання)
  const addContact = newContact => {
    setContacts(prevContacts => {
      return [...prevContacts, newContact];
    });
  };

  // ф-ція повертає змінений стану контактів (видалення), функціональна форма сеттеру
  const deleteContact = contactId => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== contactId);
    });
  };

  // Збереження контактів у локальному сховищі при зміні станів
  useEffect(() => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.error('Error storing contacts or filter in localStorage:', error);
    }
  }, [contacts]);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={filter} onChange={setFilter} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
}
