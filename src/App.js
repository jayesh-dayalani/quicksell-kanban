// Import necessary modules and components
import React, { Component } from 'react';
import List from "./List"; // Import List component
// import { cards } from './data'; // Import cards from data file
import { data } from './api-data'; // Import data from api-data file
// import { ReactComponent as Controls } from './icons/controls.svg'; // Import Controls SVG icon
// import Form from "./Form"; // Import Form component
import "./app.css"; // Import app CSS styles

// Define the main App component
export default class App extends Component {
  constructor(props) {
    super(props);
    // Initialize component state
    this.state = {
      DataisLoaded: false,
      groupingMode: "status",
      orderingMode: "priority",
      cat: false,
      addToggle: false
    };
    // Bind event handlers to the component instance
    this.handleSelectOne = this.handleSelectOne.bind(this);
    this.handleSelectTwo = this.handleSelectTwo.bind(this);
    this.toggleCat = this.toggleCat.bind(this);
    this.handleClickOutsideDropdowns = this.handleClickOutsideDropdowns.bind(this);
  }

  // Lifecycle method: called after component is mounted
  componentDidMount() {
    // Add a click event listener to handle clicks outside dropdowns
    document.addEventListener("click", this.handleClickOutsideDropdowns);
    // Fetch data from the API
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true
        });
      });
  }

  // Compare two values based on a specified property
  compareProperty(a, b, property) {
    let value1 = a[property];
    let value2 = b[property];
    if (typeof a == String) {
      value1 = a[property].toUpperCase();
      value2 = b[property].toUpperCase();
    }

    let comparison = 0;

    if (value1 > value2) {
      comparison = 1;
    } else if (value1 < value2) {
      comparison = -1;
    }
    return comparison;
  }

  // Event handler for selecting a grouping mode
  handleSelectOne(e) {
    this.setState({ groupingMode: e.target.value });
  }

  // Event handler for selecting an ordering mode
  handleSelectTwo(e) {
    this.setState({ orderingMode: e.target.value });
  }

  // Toggle the 'cat' state
  toggleCat() {
    this.setState((prevState) => ({ cat: !prevState.cat }));
  }

  // Handle clicks outside dropdowns
  handleClickOutsideDropdowns(event) {
    const dropdownsContainer = document.querySelector(".app-dropdowns");
    const displaySelect = document.querySelector(".display-select"); // Adjust the class name accordingly
    if (
      dropdownsContainer &&
      !dropdownsContainer.contains(event.target) &&
      displaySelect &&
      !displaySelect.contains(event.target)
    ) {
      this.setState({ cat: false });
    }
  }

  // Render the component
  render() {
    if (this.state.DataisLoaded) {
      console.log(this.state);

      // Determine the property based on the selected grouping mode
      let property =
        this.state.groupingMode.toLowerCase() === "userid"
          ? "userId"
          : this.state.groupingMode.toLowerCase();

      // Organize data into boards based on selected property
      let boards = {};
      this.state.items.tickets.forEach((i) => {
        if (boards[i[property.split(" ").join("-")]]) {
          boards[i[property.split(" ").join("-")]].push(i);
        } else {
          boards[i[property.split(" ").join("-")]] = [i];
        }
      });

      // Define priority names for sorting
      let priorityNames = ["No Priority", "Low", "Medium", "High", "Urgent"];
      console.log(data.users);

      // Create a map of user IDs to user names
      let userNames = {};
      data.users.forEach((i) => {
        userNames[i.id] = i.name;
      });
      console.log(userNames);

      // Adjust board organization based on the selected property
      if (property === "priority") {
        let newBoards = {};
        Object.keys(boards).forEach((i) => {
          newBoards[priorityNames[i]] = boards[i];
        });
        boards = newBoards;
      } else if (property === "userid") {
        let newBoards = {};
        Object.keys(boards).forEach((i) => {
          newBoards[userNames[i]] = boards[i];
        });
        boards = newBoards;
      }

      // Sort each board's items based on the selected ordering mode
      Object.keys(boards).forEach((i) => {
        boards[i].sort((a, b) =>
          this.compareProperty(a, b, this.state.orderingMode.toLowerCase())
        );
      });

      // Render the JSX
      return (
        <div className="App">
          {/* Dropdowns for grouping and ordering */}
          {this.state.cat && (
            <div className="app-dropdowns">
              <div className="main-drops">
                Grouping:
                <select
                  onChange={this.handleSelectOne}
                  value={this.state.groupingMode}
                >
                  <option>Status</option>
                  <option>Priority</option>
                  <option>UserId</option>
                </select>
              </div>
              <div>
                Ordering:
                <select
                  onChange={this.handleSelectTwo}
                  value={this.state.orderingMode}
                >
                  <option>Title</option>
                  <option>Priority</option>
                </select>
              </div>
            </div>
          )}
          {/* Display button */}
          <nav>
          <div>
                Grouping:
                <select
                  onChange={this.handleSelectOne}
                  value={this.state.groupingMode}
                >
                  <option>Status</option>
                  <option>Priority</option>
                  <option>UserId</option>
                </select>
              </div>
              <div>
                Ordering:
                <select
                  onChange={this.handleSelectTwo}
                  value={this.state.orderingMode}
                >
                  <option>Title</option>
                  <option>Priority</option>
                </select>
              </div>
          </nav>
          {/* Display the lists */}
          <div className="main-lists">
            {Object.keys(boards).map((i) => {
              return (
                <List
                  key={i}
                  groupingMode={this.state.groupingMode}
                  delete={this.delete}
                  title={i}
                  data={boards[i]}
                  handleAddToggle={this.handleAddToggle}
                />
              );
            })}
          </div>
        </div>
      );
    }
  }
}
