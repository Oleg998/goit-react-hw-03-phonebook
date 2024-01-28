import { Component } from 'react';
import { nanoid } from 'nanoid';

import PhoneForm from './PhoneForm/PhoneForm';
import PhoneList from './PhoneList/PhoneList';

class MyPhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  isDulecate({ name, number }) {
    const { contacts } = this.state;
    const normalazeName = name.toLowerCase();

    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      return normalazeName === normalizedCurrentName ;
    });
    return Boolean(dublicate);
  }
  addForPhenebook = data => {
    if (this.isDulecate(data)) {
      return alert(`Name {data.name} and ${data.number} already in Phonebook`);
    }
    this.setState(({ contacts }) => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return {
        contacts: [...contacts, newContact],
      };
    });
  };

  deleteName = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(item => item.id !== id);
      return {
        contacts: newContacts,
      };
    });
  };

  handelSearce = ({ target }) => {
    this.setState({ filter: target.value });
  };

  getFilerName() {
    const { contacts, filter } = this.state;
    const normalazeNameFilter = filter.toLowerCase();
    const filterName = contacts.filter(({ name }) => {
      const filterCurentName = name.toLowerCase();
      return filterCurentName.includes(normalazeNameFilter);
    });
    return filterName;
  }

  render() {
    const contacts = this.getFilerName();
    const { addForPhenebook, deleteName, handelSearce } = this;
    return (
      <div>
        <PhoneForm onSubmit={addForPhenebook} />

        <PhoneList
          items={contacts}
          deleteName={deleteName}
          handelSearce={handelSearce}
        />
      </div>
    );
  }
}

export default MyPhoneBook;
