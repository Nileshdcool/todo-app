import { useContext, useEffect, useState } from 'react';

import TasksOutput from '../components/TasksOutput/TasksOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { getDateMinusDays } from '../util/date';
import { fetchTasks } from '../services/task';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RecentTasks() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const tasksCtx = useContext(AuthContext);

  useEffect(() => {
    async function gettasks() {
      setIsFetching(true);
      try {
        // TODO - for some reason tasksCTx is not retriving userId on very first load. need to check the issue.
        // TODO for not it is taken care by AsyncStorage option.
        const userId = await AsyncStorage.getItem('localId');
        const tasks = await fetchTasks(tasksCtx.token,userId);
        tasksCtx.settasks(tasks);
      } catch (error) {
        setError('Could not fetch tasks!');
      }
      setIsFetching(false);
    }

    gettasks();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recenttasks = tasksCtx.tasks.filter((task) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return task.date >= date7DaysAgo && task.date <= today && task.status === 'TODO';
  });

  return (
    <TasksOutput
      tasks={recenttasks}
      fallbackText="No tasks registered for the last 7 days."
    />
  );
}

export default RecentTasks;