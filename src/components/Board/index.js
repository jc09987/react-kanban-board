import React, { PureComponent } from "react";
import "./index.css";

export default class KanbanBoard extends PureComponent {
  constructor() {
    super();
    this.state = {
      // State variable for input changes
      newTaskName: "",
      tasks: [
          { name: '1', stage: 0 },
          { name: '2', stage: 0 },
      ]
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  }

  // Set value of input to state
  setValue = (name) => {
    this.setState({
      newTaskName: name
    })
  }

  // Task creation (to 'Backlog' stage)
  createTask = () => {
    const { newTaskName } = this.state;
  
    this.setState(prevState => ({
      tasks: [...prevState.tasks, {
        name: newTaskName,
        stage: 0
      }],
      newTaskName: ""
    }));
  }

  // Task removal (by task's name)
  removeTask = (event, name) => {
    this.setState(prevState => {
      const tasks = prevState.tasks.filter(task => task.name !== name)
      return ({ tasks })
    });
  }

  // Task Back/Forward (by task's name)
  moveTask= (event, name, isForward) => {
    this.setState(prevState => {
      const taskToMove = prevState.tasks.find(task => task.name === name)
      isForward ? taskToMove.stage++ : taskToMove.stage--;
      const tasks = [...prevState.tasks]
      return ({ tasks })
    });
  }

  render = () => {
    const { tasks, newTaskName } = this.state;

    let stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      stagesTasks.push([]);
    }
    for (let task of tasks) {
      const stageId = task.stage;
      stagesTasks[stageId].push(task);
    }

    return (
      <div className="mt-20 layout-column justify-content-center align-items-center">
        <section className="mt-50 layout-row align-items-center justify-content-center">
          <input 
            id="create-task-input"
            type="text"
            className="large"
            placeholder="New task name"
            data-testid="create-task-input"
            value={newTaskName}
            onChange={(e) => this.setValue(e.target.value)}
          />
          <button 
            type="submit" 
            className="ml-30" 
            data-testid="create-task-button"
            onClick={
              (e) => newTaskName !== "" ? this.createTask() : false
            }
          >
            Create task
          </button>
        </section>

        <div className="mt-50 layout-row">
            {stagesTasks.map((tasks, i) => {
                return (
                    <div className="card outlined ml-20 mt-0" key={`${i}`}>
                        <div className="card-text">
                            <h4>{this.stagesNames[i]}</h4>
                            <ul className="styled mt-50" data-testid={`stage-${i}`}>
                                {tasks.map((task, index) => {
                                    return <li className="slide-up-fade-in" key={`${i}${index}`}>
                                      <div className="li-content layout-row justify-content-between align-items-center">
                                        <span data-testid={`${task.name.split(' ').join('-')}-name`}>{task.name}</span>
                                        <div className="icons">
                                          <button 
                                          className="icon-only x-small mx-2"
                                          disabled={task.stage === 0}
                                          data-testid={`${task.name.split(' ').join('-')}-back`}
                                          onClick={(e) => this.moveTask(e, task.name, false)}
                                          >
                                            <i className="material-icons">arrow_back</i>
                                          </button>
                                          <button 
                                            className="icon-only x-small mx-2" 
                                            disabled={task.stage === (this.stagesNames.length - 1)}
                                            data-testid={`${task.name.split(' ').join('-')}-forward`}
                                            onClick={(e) => this.moveTask(e, task.name, true)}
                                          >
                                            <i className="material-icons">arrow_forward</i>
                                          </button>
                                          <button 
                                            className="icon-only danger x-small mx-2"
                                            data-testid={`${task.name.split(' ').join('-')}-delete`}
                                            onClick={(e) => this.removeTask(e, task.name)}
                                          >
                                            <i className="material-icons">delete</i>
                                          </button>
                                        </div>
                                      </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    );
  }
}