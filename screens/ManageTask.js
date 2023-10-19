import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import TaskForm from '../components/ManageTask/TaskForm'
import IconButton from '../components/UI/IconButton';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { GlobalStyles } from '../constants/styles';
import { AuthContext } from '../store/auth-context';
import { storeTask, updateTask, deleteTask } from '../util/http';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function ManageTask({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const tasksCtx = useContext(AuthContext);

  const editedTaskId = route.params?.taskId;
  const isEditing = !!editedTaskId;

  const selectedTask = tasksCtx.tasks.find(
    (task) => task.id === editedTaskId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Task' : 'Add Task',
    });
  }, [navigation, isEditing]);

  async function deleteTaskHandler() {
    setIsSubmitting(true);
    try {
      await deleteTask(editedTaskId);
      tasksCtx.deleteTask(editedTaskId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete task - please try again later!');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(taskData) {
    taskData.token = tasksCtx.token;
    setIsSubmitting(true);
    try {
      if (isEditing) {
        tasksCtx.updateTask(editedTaskId, taskData);
        await updateTask(editedTaskId, taskData);
      } else {
        const id = await storeTask(taskData);
        tasksCtx.addTask({ ...taskData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data - please try again later!');
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <TaskForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedTask}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteTaskHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});