import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, SafeAreaView, ScrollView, Text } from "react-native";
import ScreenHeader from "../header/ScreenHeader";
import CheckmarkIcon from "../../assets/svg/CheckmarkIcon";
import CheckIcon from "../../assets/svg/CheckIcon";
const languages = [{
    key:'en',
    name:'English'
},{
    key:'fr',
    name:'French'
}
];
export default function LanguageScreen({navigation}){
    
    const {t,i18n} = useTranslation();
    const [lang, setLang] = useState('en');
    // console.log(lang,"uyuhgiu")

useEffect(() => {
  const loadLanguage = async () => {
    const lang = await AsyncStorage.getItem('language');
    if (lang) {
        setLang(lang)
    }
  };

  loadLanguage();
}, []);

    const changeLang = () => {

navigation.navigate(t('screens.home'))  
      if(!( i18n.language === lang)) i18n.changeLanguage(lang)

//   if(i18n.language === 'en') i18n.changeLanguage('fr')
//     else i18n.changeLanguage('en')

AsyncStorage.setItem('language', lang)
}

    return(
        <SafeAreaView>
            <ScreenHeader backPress={() => navigation.goBack()} title={t('languageScreen.heading')}/>
        <ScrollView>
            <Text onPress={changeLang} style={{alignSelf:'flex-end'}}>{t('languageScreen.done')}</Text>
            {
                languages.map((item,index) => 
                <Pressable key={index} style={{
                    height:30,
                    borderBottomColor:'black',
                    borderBottomWidth:1,
                    margin:5,
                    flexDirection:'row',
                    justifyContent:'space-between'
                }}
                onPress={() => setLang(item.key)}>
                    <Text style={{color: item.key == lang ? 'orange' : 'black'}}>{item.name}</Text>
                    { item.key == lang && <CheckIcon color="orange" /> }
                </Pressable>
                )
            }
        </ScrollView>
        </SafeAreaView>
    )
}