import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {name: "Ivan T.", salary: "800", increase: false, rise: true, id: 1},
        {name: "Eduard L.", salary: "1500", increase: true, rise: false, id: 2},
        {name: "Artem M.", salary: "1100", increase: false, rise: false, id: 3}
      ],
      term: '',
      filter: 'all'
    }
    this.maxId = this.state.data.length + 1;
  }

  deleteItem = (id) => {
    this.setState(({data}) => {

      return {
        data: data.filter(item => item.id !== id)
      }
    }) 
  }

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++
    }
    this.setState(({data}) => {
      const newArr = [...data, newItem];
      return {
        data: newArr
      }
    })
  }

  onToggleProp = (id, prop) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if(item.id === id) {
          return {...item, [prop]: !item[prop]}
        }
        return item;
      })
    })) 
  }

  searchEmployee = (items, term) => {
    if(term.length === 0) {
      return items
    }
    return items.filter(item => {
      return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term});
  }

  filterPost = (items, filter) => {
    switch(filter) {
      case 'rise': 
        return items.filter(item => item.rise);
      case 'moreThan1000': 
        return items.filter(item => +item.salary > 1000);
      default:
        return items;
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter});
  }

  onUpdateSalary = (id, newValue) => {
    this.setState(({data}) => ({
      data: data.map(item => {
        if(id === item.id) {
          return {...item, salary: newValue}
        }
        return item
      })
    }))
  }
 
  render() {
    const {data, term, filter} = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmployee(data, term), filter);

    return (
      <div className="app">
        <AppInfo 
        employees={employees}
        increased={increased} />
  
        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter 
          filter={filter}
          onFilterSelect={this.onFilterSelect}/>
        </div>
  
        <EmployeesList 
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
          onUpdateSalary={this.onUpdateSalary} />
        <EmployeesAddForm onAdd={this.addItem}/>
      </div>
    );
  }
}

export default App; 