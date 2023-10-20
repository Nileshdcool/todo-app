import { useContext } from 'react';

import TasksOutput from '../components/TasksOutput/TasksOutput'
import { AuthContext } from '../store/auth-context';

function AllTasks() {
  const tasksCtx = useContext(AuthContext);

  const allTasks = tasksCtx.tasks.filter((task) => {
    console.log(task);
    return task.status === 'TODO';
  });

  return (
    <TasksOutput
    tasks={allTasks}
      fallbackText="No registered tasks found!"
    />
  );
}

export default AllTasks;