import css from './App.module.css';
import { useState, useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/SearchBox';

// початкове значення стану App
const initialValues = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

//ф-ція що зчитує значення localStorage за ключем
// const getInitialFeedback = () => {
//   const storedContact = window.localStorage.getItem('contact');
//   return storedContact !== null ? JSON.parse(storedContact) : initialValues;
// };

const App = () => {
  // зміна значення початкового стану
  // const [value, setValue] = useState(initialValues);
  const [contacts, setContacts] = useState(initialValues);
  //початкове значення стану фільтра пошуку SearchBox слід зберігати в компоненті App
  const [filter, setFilter] = useState('');
  //ф-ція зміни стану фільтра пошуку що передається як пропс до SearchBox
  const handleFilterChange = newFilter => {
    setFilter(newFilter);
  };
  //фільтрація масиву контактів в компоненті App, масив відфільтрованих контактів передається як пропс до ContactList, ф - ція фільтрації контактів (нечутлива до регістру),
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    try {
      localStorage.setItem('contacts', JSON.stringify(filteredContacts));
    } catch (error) {
      console.error('Error storing contacts in localStorage:', error);
    }
  }, [filteredContacts]);

  useEffect(() => {
    try {
      localStorage.setItem('filter', JSON.stringify(filter));
    } catch (error) {
      console.error('Error storing filter in localStorage:', error);
    }
  }, [filter]);

  useEffect(() => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.error('Error storing contacts in localStorage:', error);
    }
  }, [contacts]);

  //ф-ція дадавання нового контакту до стану
  const onAddContact = newContact => {
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />
      <SearchBox value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} />
    </div>
  );
};

export default App;
