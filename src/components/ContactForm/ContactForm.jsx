import React, { Component } from 'react';
import { FormInput, Form, FormButton, FormLabel } from './ContactForm.styled';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const contactSchema = {
      name: this.state.name,
      number:
        Number.parseFloat(this.state.number) || alert(`Number is not correct`),
    };
    this.props.onSubmit(contactSchema);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <FormInput
          type="text"
          name="name"
          onChange={this.handleInputChange}
          value={this.state.name}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          required
        />

        <FormLabel htmlFor="number">Number</FormLabel>
        <FormInput
          type="tel"
          name="number"
          value={this.state.number}
          onChange={this.handleInputChange}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          required
        />

        <FormButton type="submit">Add contact</FormButton>
      </Form>
    );
  }
}

export default ContactForm;
