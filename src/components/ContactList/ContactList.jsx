//імпорт CSS-модуля
import css from './ContactList.module.css';
import Contact from '../Contact/Contact';

export default function ContactList({ contacts }) {
  return (
    <div className={css.contactList}>
      {contacts.map(contact => (
        <Contact
          key={contact.id}
          contact={contact}
          name={contact.name}
          number={contact.number}
        />
      ))}
    </div>
  );
}
