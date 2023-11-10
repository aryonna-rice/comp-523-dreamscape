import React, { useState } from 'react';
import { BottomSheet, Button, ListItem, Card, Text } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SpeedDial } from '@rneui/themed';

type BottomSheetComponentProps = {};

const BottomSheetComponent: React.FunctionComponent<BottomSheetComponentProps> = () => {
const [isVisible, setIsVisible] = useState(false);
const list = [
  { title: 'Tech Talk',
    onPress:() => console.log('Tech Talk!')
  },
  { title: 'Team C3',
    onPress:() => console.log('Team C3!')
  },
  {
    title: 'Cancel',
    containerStyle: { backgroundColor: 'red' },
    titleStyle: { color: 'white' },
    onPress: () => setIsVisible(false),
  },
];

const [open, setOpen] = React.useState(false);

return (
  <SafeAreaProvider style={{backgroundColor:'#19173D'}}>
    <Text style={{marginTop:100, padding:20, fontSize:50, fontWeight:500, color:"#5A6bFF"}}>Test app</Text>
    <Button
      title="Hello COMP 523!"
      onPress={() => setIsVisible(true)}
      buttonStyle={styles.button}

    />
    <Card containerStyle={{marginTop:100, backgroundColor:'#292847'}}>
        <Text style={{color: 'white'}} >Word of the Day</Text>
        <Text style={{color: 'white'}}  h4>benevolent</Text>
        <Text style={{color: 'white'}} >adjective</Text>
        <Text style={{color: 'white'}} >
          well meaning and kindly.
          {'"a benevolent smile"'}
        </Text>
    </Card>
    <Card containerStyle={{marginTop:100, backgroundColor:'#292847'}}>
        <Text style={{color: 'white'}}>Topic of the Day</Text>
        <Text style={{color: 'white'}} h4>React Native</Text>
        <Text style={{color: 'white'}} >
          React Native is an open-source UI software framework created by Meta Platforms, Inc.
        </Text>
    </Card>
    <SpeedDial
      isOpen={open}
      icon={{ name: 'edit', color: '#fff' }}
      openIcon={{ name: 'close', color: '#fff' }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
    >
      <SpeedDial.Action
        icon={{ name: 'add', color: '#fff' }}
        title="Add"
        onPress={() => console.log('Add Something')}
      />
      <SpeedDial.Action
        icon={{ name: 'delete', color: '#fff' }}
        title="Delete"
        onPress={() => console.log('Delete Something')}
      />
    </SpeedDial>
    <BottomSheet modalProps={{}} isVisible={isVisible}>
      {list.map((l, i) => (
        <ListItem
          key={i}
          containerStyle={l.containerStyle}
          onPress={l.onPress}
        >
          <ListItem.Content>
            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </BottomSheet>
  </SafeAreaProvider>
);
};

const styles = StyleSheet.create({
button: {
  margin: 10,
  backgroundColor: '#5A6BFF',
},
});

export default BottomSheetComponent;