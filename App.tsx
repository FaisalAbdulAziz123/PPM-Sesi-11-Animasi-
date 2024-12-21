import {
  View,
  Text,
  Animated,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import * as Animatable from 'react-native-animatable';

const App = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    const position = scrollPosition > 0;
    setVisible(position);

    setTimeout(() => {
      setVisible(false);
    }, 1000);
  };

  useEffect(() => {
    Animated.timing(scrollY, {
      toValue: visible ? 100 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [visible, scrollY]);

  return (
    <View>
      <ScrollView onScroll={handleScroll} showsVerticalScrollIndicator={false}>
        {Array.from({length: 20}, (_, i) => (
          <Animatable.View
            animation={'fadeInRight'}
            duration={i * 100}
            key={i}
            style={{
              marginVertical: 10,
              marginHorizontal: 20,
              height: 50,
              backgroundColor: 'silver',
            }}>
            <Text>{i}</Text>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 20,
              justifyContent: 'center',
              alignItems: 'center'
            }}>Faisal Abdul Aziz</Text>
          </Animatable.View>
        ))}
      </ScrollView>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 10,
          borderRadius: 50,
          width: '96%',
          marginHorizontal: 10,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'blue',
          transform: [{translateY: scrollY}],
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Button checkout
        </Text>
      </Animated.View>
    </View>
  );
};

export default App;