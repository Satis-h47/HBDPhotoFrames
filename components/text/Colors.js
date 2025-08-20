import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import colors from '../../assets/data/colors.json';
import radiantColorPairs from '../../assets/data/radiantColorPairs.json';

export default function Colors({ UpdateColor, radiantColors, transparent, broder }) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
            {transparent &&
                <Pressable onPress={() => UpdateColor('transparent')} style={{}}>
                    <LinearGradient style={{
                        height: 50, width: 50,
                        borderRadius: 10,
                        marginHorizontal: 5,
                        borderWidth: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderColor: broder == 'transparent' ? '#039DDF' : 'transparent'
                    }}
                        colors={['white', 'white']}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                    >
                        <View style={{
                            height: 30, width: 6, borderRadius: 1,
                            backgroundColor: 'black',
                            transform: [{ rotate: '45deg' }]
                        }}></View>
                    </LinearGradient>
                </Pressable>
            }
            {
                colors.map((color, index) =>
                    <Pressable onPress={() => UpdateColor(color)} key={index}>
                        <LinearGradient style={{
                            height: 50, width: 50,
                            borderRadius: 10,
                            marginHorizontal: 5,
                            borderWidth: 2,
                            borderColor: broder == color ? '#039DDF' : 'transparent'
                        }}
                            colors={[color, color]}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                        >
                        </LinearGradient>
                    </Pressable>
                )
            }
            {radiantColors &&
                radiantColorPairs.map((color, index) => <Pressable onPress={() => UpdateColor(color)} key={index}>
                    <LinearGradient style={{
                        height: 50, width: 50,
                        borderRadius: 10,
                        marginHorizontal: 5,
                        borderWidth: 2,
                        borderColor: (broder[0] == color[0] && broder[1] == color[1]) ? '#039DDF' : 'transparent'
                    }}
                        colors={[color[0], color[1]]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                    >
                    </LinearGradient>
                </Pressable>
                )
            }
        </ScrollView>
    )
}