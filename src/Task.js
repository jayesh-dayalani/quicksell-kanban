import React, { Component } from 'react';
import { ReactComponent as BarZero } from './icons/new/bar-0.svg';
import { ReactComponent as BarOne } from './icons/new/bar-1.svg';
import { ReactComponent as BarTwo } from './icons/new/bar-2.svg';
import { ReactComponent as BarThree } from './icons/new/bar-3.svg';
import { ReactComponent as BarFour } from './icons//new/bar-4.svg';
import { ReactComponent as Avatar } from './icons/avatar.svg';
import { ReactComponent as Fr } from './icons/frr.svg';

// Define the Task component
export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullTitle: false
    };
  }

  // Toggle the display of the full title
  toggleFullTitle = () => {
    this.setState(prevState => ({
      showFullTitle: !prevState.showFullTitle
    }));
  }

  render() {
    // Define an array of priority icons based on the priority level
    const priorityIcons = [BarZero, BarOne, BarTwo, BarThree, BarFour];
    const { task } = this.props;
    const PriorityIcon = priorityIcons[task.priority];
    const { showFullTitle } = this.state;

    return (
      <div className='task-main' 
        // draggable={}
        // onDragEnter={}
      >
        <div className='task-sub'>
          {/* Display the task ID */}
          <p className='task-cam'>CAM-5</p>
          {/* Display the task title */}
          <p
            className='task-title'
            onClick={this.toggleFullTitle}
            title={showFullTitle ? task.title : ''}
          >
            {task.title}
          </p>
          <div className='f-req-div'>
            {/* Display priority icon if not grouping by Priority */}
            { this.props.groupingMode !== "Priority" &&
              (<div>
                {PriorityIcon && (
                  <PriorityIcon className='task-priority-div task-bar-icon' width='1rem' />
                )}
              </div>)
            }
            {/* Display Feature Request icon */}
            <p className='f-req-p'>
              <Fr className='fr-icon' width='1rem' />&nbsp;
              Feature Request
            </p>
          </div>
        </div>
        <div>
          {/* Additional content can be added here */}
        </div>
        {/* Display avatar if not grouping by UserId */}
        { this.props.groupingMode !== "UserId" &&
          <div className='avatar-container'>
            <Avatar className='avatar task-bar-icon' />
          </div>
        }
      </div>
    );
  }
}
