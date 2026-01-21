import React from 'react';
import { FAB, Portal } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const FloatingActionButton = ({ 
  icon = 'plus', 
  onPress, 
  actions = null,
  label = null 
}) => {
  const [open, setOpen] = React.useState(false);

  const onStateChange = ({ open }) => setOpen(open);

  if (actions) {
    return (
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? 'close' : icon}
          actions={actions}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do nothing when closing
            }
          }}
          fabStyle={styles.fab}
        />
      </Portal>
    );
  }

  return (
    <FAB
      icon={icon}
      style={styles.fab}
      onPress={onPress}
      label={label}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default FloatingActionButton;
