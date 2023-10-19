import { Pressable, StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';

function TaskItem({ id, description, date }) {
  const navigation = useNavigation();

  function taskPressHandler() {
    navigation.navigate('ManageTask', {
      taskId: id
    });
  }

  return (
    <Pressable
      onPress={taskPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.taskItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View >
          <Button
            title="Done"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    </Pressable>
  );
}

export default TaskItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  taskItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
});