import { Component } from 'react';
import { nanoid } from 'nanoid';


import { ContactForm, ContactList, Filter } from 'components';

const initialContacts = [
  { id: 1, name: 'Silvia Weber', number: '0076 397–70–42' },
  { id: 2, name: 'Alberto Meier', number: '0079 202-75-94' },
];

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts) ?? initialContacts;
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleAddContact = newContact => {
    const isExist = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isExist) {
      alert(`Oops, contact '${newContact.name}' is already in contacts!`);
      return;
    }
    const readyToAddContact = {
      ...newContact,
      id: nanoid(),
    };
    console.log(newContact);

    this.setState(prevState => ({
      contacts: [...prevState.contacts, readyToAddContact],
    }));
  };

  changeFilter = value => {
    this.setState({ filter: value });
  };

  getFilteredContacts = () => {
    const { filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          margin: '0 auto',
          padding: '30px',
        }}
      >
        <h1 style={{ color: '#3645ab' }}>Phonebook</h1>
        <ContactForm onSubmit={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
