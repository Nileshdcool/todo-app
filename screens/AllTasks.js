import { useContext } from 'react';

import TasksOutput from '../components/TasksOutput/TasksOutput'
import { AuthContext } from '../store/auth-context';

function AllTasks() {
  const tasksCtx = useContext(AuthContext);

  return (
    <TasksOutput
    tasks={tasksCtx.tasks}
      tasksPeriod="Total"
      fallbackText="No registered tasks found!"
    />
  );
}

export default AllTasks;