import { useContext } from 'react';

import TasksOutput from '../components/TasksOutput/TasksOutput'
import { AuthContext } from '../store/auth-context';

function CompletedTasks() {
  const tasksCtx = useContext(AuthContext);

  const completedTasks = tasksCtx.tasks.filter((task) => {
    return task.status === 'COMPLETED';
  });

  return (
    <TasksOutput
    tasks={completedTasks}
      tasksPeriod="Total"
      fallbackText="No registered tasks found!"
    />
  );
}

export default CompletedTasks;