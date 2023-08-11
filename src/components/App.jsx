import { Component } from "react";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import css from "./App.module.css";
class App extends Component{
  state = {
    contacts: [],
    filter: '',
  }
  componentDidMount(){
    const contacts=localStorage.getItem('contacts');
    const parsedContacts=JSON.parse(contacts);
    if(parsedContacts){
      this.setState({contacts: parsedContacts});
    }    
  }
  componentDidUpdate(prevState, prevProps){
    if(this.state.contacts!==prevState.contacts){
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  onSubmit = contactData => {
    const { name} = contactData;
    const { contacts } = this.state;

    const isDuplicateName = contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isDuplicateName) {
      return window.alert(
        `${name} is already in contacts!`
      );
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contactData],
    }));
  };
  filteredContacts=()=>{
    const {contacts,filter} = this.state;
    return contacts.filter(contact=>contact.name.toLowerCase().includes(filter.toLowerCase()))
  }
  filterChange = evt => {
    const { value } = evt.target;
    this.setState({ filter: value });
  };
  handleDeleteContact=event=>{
    const {contacts} =this.state;
    this.setState({contacts:contacts.filter(contact=>contact.id !== event.target.id)
  });
  }
  
  render(){
    const contacts = this.filteredContacts();
    return (
      <div
        style={{
          height: '100vh',
          fontSize: 20,
          color: '#010101',
          padding:'16px',
        }}
      >
      <ContactForm  onSubmit={this.onSubmit}></ContactForm>
      <h2 className={css["h"]}> Contacts </h2>
      <Filter filterChange={this.filterChange}></Filter>
      <ContactList contacts={contacts} handleDeleteContact={this.handleDeleteContact}></ContactList>
      </div>
    );
  }
}
export default App;
