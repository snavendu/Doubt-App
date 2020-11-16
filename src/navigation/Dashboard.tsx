import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Doubt from "../Components/Doubt";
import CreateDoubt from "../Components/CreateDoubt";
import { NavigationContainer } from "@react-navigation/native";
import Detail from "../Components/Detail";
import { IDoubt } from "../Components/Interface";

export type StackParamList = {
    Doubt: { doubt?: IDoubt };
    CreateDoubt: undefined;
    DoubtDetail: { doubt: IDoubt };
};
const Stack = createStackNavigator<StackParamList>();
export default function MyStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="Doubt"
                    component={Doubt}
                />
                <Stack.Screen name="CreateDoubt" component={CreateDoubt} />
                <Stack.Screen name="DoubtDetail" component={Detail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
