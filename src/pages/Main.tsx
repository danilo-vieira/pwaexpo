import React, { useState, useEffect } from 'react';
import { 
  StatusBar,
  SafeAreaView, 
  FlatList, 
  View, 
  Image, 
  Text, 
  StyleSheet, 
} from 'react-native';

// import { Container } from './styles';

interface Member {
  login: string;
  avatar_url: string;
}

const Main: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/orgs/rocketseat/members')
    .then(response => response.json()
    .then(data => {
      setMembers(data);
    }));

  }, []);

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
      <FlatList
        contentContainerStyle={{ padding: 24 }}
        data={members}
        keyExtractor={member => member.login}
        renderItem={({ item: member }) => (
          <View style={styles.member}>
            <Image style={styles.image} source={{uri: member.avatar_url}}/>
            <Text>{member.login}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  member: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  }
})

export default Main;