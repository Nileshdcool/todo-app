import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
import TaskList from './TaskList';

function TasksOutput({ tasks, tasksPeriod, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (tasks.length > 0) {
    content = <TaskList tasks={tasks} />;
  }

  return (
    <View style={styles.container}>
      {content}
    </View>
  );
}

export default TasksOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});