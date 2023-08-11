import React, { Component } from 'react';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';
class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
    handleDeleteContact: PropTypes.func.isRequired,
  };
  render() {
    const { contacts, handleDeleteContact } = this.props;
    return (
      <ul className={css['group']}>
        {contacts.map(contact => (
          <li key={contact.id} className={css['list']}>
            <p className={css['p']}>
              {contact.name} : {contact.number}
            </p>
            <button
              className={css['button']}
              id={contact.id}
              onClick={handleDeleteContact}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}
export default ContactList;
