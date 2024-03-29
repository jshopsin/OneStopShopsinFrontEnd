import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';

import colors from '../config/colors';
import { Item } from '../components/Item';
// import BottomNav from '../components/common';

class ItemList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.getItems = this.getItems.bind(this);
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    const category = this.props.navigation.state.params;
    axios.get(`https://one-stop-shop-backend.herokuapp.com/categories/${category.id}`)
      .then(response => {
        this.setState({items: response.data})
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: colors.background}}>
        {this.state.items.map((item, idx) => (
          <Item item={item} getItems={this.getItems} key={idx} />
        ))}
      </ScrollView>
    );
  }
}

export default ItemList;
