import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';

const Header = ({ title, subtitle, showMenu = false, menuItems = [], onBackPress }) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Appbar.Header elevated mode="center-aligned">
      {onBackPress && <Appbar.BackAction onPress={onBackPress} />}
      
      <Appbar.Content 
        title={title} 
        subtitle={subtitle}
      />
      
      {showMenu && (
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="dots-vertical" onPress={openMenu} />
          }
        >
          {menuItems.map((item, index) => (
            <Menu.Item
              key={index}
              leadingIcon={item.icon}
              onPress={() => {
                closeMenu();
                item.onPress && item.onPress();
              }}
              title={item.title}
            />
          ))}
        </Menu>
      )}
    </Appbar.Header>
  );
};

export default Header;
