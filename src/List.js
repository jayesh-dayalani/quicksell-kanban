// Import necessary modules and components
import React, { Component } from 'react';
import Task from "./Task"; // Import Task component
import "./list.css"; // Import list CSS styles

// Define the List component
export default class List extends Component {
    constructor(props) {
        super(props);
    }

    // Render the component
    render() {
        // Extract data from props
        let data = this.props.data;
        return (
            <div className="board-main">
                {/* List navigation */}
                <div className="list-nav">
                    <div className="list-title">
                        {/* Display list title and the number of tasks */}
                        <p>
                            <span className="list-title-text">{this.props.title}</span>
                            <span>&emsp;{this.props.data.length}</span>
                        </p>
                    </div>
                </div>
                {/* Display tasks using the Task component */}
                {data.map(i => {
                    return <Task groupingMode={this.props.groupingMode} delete={this.props.delete} task={i} />
                })}
            </div>
        );
    }
}
