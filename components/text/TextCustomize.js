import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native';

import ShadowPropSlider from '../ShadowPropSlider';
import CustomSlider from '../CustomSlider';

import fonts from '../../assets/data/fonts.json';

import EditTextIcon from '../../assets/svg/EditTextIcon';
import TextRotation from '../../assets/svg/TextRotation';
import TextColorIcon from '../../assets/svg/TextColorIcon';
import ResetIcon from '../../assets/svg/ResetIcon';
import FontTextIcon from '../../assets/svg/FontTextIcon';
import Colors from './Colors';
import { useTranslation } from 'react-i18next';

export default function TextCustomize({ tappedItem, EditText, changeColor, changeBgColor, changeShadowColor,
    changeColorOpacity, changeBgColorOpacity, changeShadowOffset, rotateX, rotateY, changeFontStyle }) {
const {t} = useTranslation();
    const [colorButton, setColorButton] = useState('Text')
    const [action, setAction] = useState('font')

    return (
        <ScrollView style={{ backgroundColor: 'white', top: -150 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 50 }}>
                <TouchableOpacity onPress={EditText}
                    style={{
                        // backgroundColor: action == 'color' ? '#e2e2e2' : 'transparent',
                        width: 50, marginVertical: 2, justifyContent: 'center', alignItems: 'center', borderRadius: 5
                    }}
                >
                    <EditTextIcon />
                    <Text style={{ fontSize: 10 }}>{t('editorScreen.text.text')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAction('color')}
                    style={{
                        backgroundColor: action == 'color' ? '#e2e2e2' : 'transparent',
                        width: 50, marginVertical: 2, justifyContent: 'center', alignItems: 'center', borderRadius: 5
                    }}
                >
                    <TextColorIcon />
                    <Text style={{ fontSize: 10 }}>{t('editorScreen.text.color')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAction('rotation')}
                    style={{
                        backgroundColor: action == 'rotation' ? '#e2e2e2' : 'transparent',
                        width: 50, marginVertical: 2, justifyContent: 'center', alignItems: 'center', borderRadius: 5
                    }}
                >
                    <TextRotation />
                    <Text style={{ fontSize: 10 }}>{t('editorScreen.text.rotation')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAction('font')}
                    style={{
                        backgroundColor: action == 'font' ? '#e2e2e2' : 'transparent',
                        width: 50, marginVertical: 2, justifyContent: 'center', alignItems: 'center', borderRadius: 5
                    }}
                >
                    <FontTextIcon />
                    <Text style={{ fontSize: 10 }}>{t('editorScreen.text.font')}</Text>
                </TouchableOpacity>
            </View>
            {action == 'color' && <View style={{ height: 200, backgroundColor: '#f6f6f6', justifyContent: 'space-evenly' }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => setColorButton('Text')}
                        style={{
                            marginLeft: 10,
                            backgroundColor: colorButton == 'Text' ? '#5390fe' : '#e2e2e2',
                            paddingHorizontal: 20, paddingVertical: 5, borderRadius: 15
                        }}
                    >
                        <Text style={{
                            color: colorButton == 'Text' ? 'white' : 'gray'
                        }}>{t('editorScreen.color.text')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setColorButton('Background')}
                        style={{
                            marginLeft: 10,
                            backgroundColor: colorButton == 'Background' ? '#5390fe' : '#e2e2e2',
                            paddingHorizontal: 20, paddingVertical: 5, borderRadius: 15
                        }}
                    >
                        <Text style={{
                            color: colorButton == 'Background' ? 'white' : 'gray'
                        }}>{t('editorScreen.color.background')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setColorButton('Shadow')}
                        style={{
                            marginLeft: 10,
                            backgroundColor: colorButton == 'Shadow' ? '#5390fe' : '#e2e2e2',
                            paddingHorizontal: 20, paddingVertical: 5, borderRadius: 15
                        }}
                    >
                        <Text style={{
                            color: colorButton == 'Shadow' ? 'white' : 'gray'
                        }}>{t('editorScreen.color.shadow')}</Text>
                    </TouchableOpacity>
                </View>
                {/* <Slider onValueChange={(v) => changeColorValue(v)} /> */}
                {colorButton == 'Text' && <View style={{}}>
                    <ShadowPropSlider
                        minimumValue={0}
                        maximumValue={100}
                        value={tappedItem.colorOpacity * 100}
                        onValueChange={(val) => changeColorOpacity(val)}
                    />
                    <Colors broder={tappedItem.color}  UpdateColor={changeColor} radiantColors={true} />
                </View>
                }
                {colorButton == 'Background' && <View>
                    <ShadowPropSlider
                        minimumValue={0}
                        maximumValue={100}
                        value={tappedItem.backgroundColorOpacity * 100}
                        onValueChange={(val) => changeBgColorOpacity(val)}
                    />
                    <Colors broder={tappedItem.backgroundColor}  UpdateColor={changeBgColor} radiantColors={true} transparent={true} />
                </View>
                }
                {colorButton == 'Shadow' && <View>
                    <ShadowPropSlider
                        minimumValue={0}
                        maximumValue={100}
                        value={tappedItem.shadowOffset}
                        onValueChange={(val) => changeShadowOffset(val)}
                    />
                    <Colors broder={tappedItem.shadowColor}  UpdateColor={changeShadowColor} radiantColors={true} transparent={true} />

                    {(tappedItem.color.length > 1 && <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.1)' }]} />
                    )}
                </View>
                }
            </View>
            }
            {action == 'font' && <ScrollView style={{ backgroundColor: '#f6f6f6', height: 200 }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {fonts.map((font, index) => (
                        <Pressable
                            key={index}
                            onPress={() => changeFontStyle(font)}
                            style={{
                                height: 40,
                                width: 100,
                                borderRadius: 5,
                                margin: 5,
                                borderWidth: 2,
                                backgroundColor: '#e2e2e2',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderColor: tappedItem.font === font ? '#039DDF' : 'transparent',
                            }}
                        >
                            <Text style={{ fontSize: 20, fontFamily: font }}>ABC</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
            }
            {action == 'rotation' &&
                <View style={{ backgroundColor: '#f6f6f6', height: 200, justifyContent: 'space-evenly' }}>
                    <Pressable  onPress={() => {
                                rotateX(0)
                                rotateY(0)
                            }}
                             style={{ alignItems: 'flex-end', marginHorizontal: 20, height: 20 }}>
                        {(tappedItem.rotatedX != 0 || tappedItem.rotatedY != 0) && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ResetIcon />
                            <Text>{t('editorScreen.rotation.reset')}</Text>
                        </View>
                        }
                    </Pressable>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ width: 70, textAlign: 'center' }}>{t('editorScreen.rotation.horizontal')}</Text>
                        <CustomSlider
                            value={tappedItem.rotatedX}
                            onValueChange={(val) => rotateX(val)} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ width: 70, textAlign: 'center' }}>{t('editorScreen.rotation.vertical')}</Text>
                        <CustomSlider
                            value={tappedItem.rotatedY}
                            onValueChange={(val) => rotateY(val)} />
                    </View>
                </View>
            }
        </ScrollView>
    )
}