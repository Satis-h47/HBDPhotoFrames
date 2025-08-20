import { Button } from "react-native";

export default function SaveButton({saveButton1, saveButton2, second, onPress}){
    return(
                saveButton1 && (!second || saveButton2) ?
                  <Button title='Save' onPress={onPress} /> :
                  <Button title='Save' disabled />
    )
}