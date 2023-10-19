import { FlatList } from 'react-native';

import TaskItem from './TaskItem';

function renderTaskItem(itemData) {
  return <TaskItem {...itemData.item} />;
}

function TaskList({ tasks }) {
  return (
    <FlatList
      data={tasks}
      renderItem={renderTaskItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default TaskList;