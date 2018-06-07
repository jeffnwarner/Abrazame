import React from 'react';
import { Button } from 'react-native-elements';


const fetchLocation = props => {
    return( <Button title = "Set Location" onPress={props.onGetLocation}
    titleStyle={{ fontWeight: "700" }}
					buttonStyle={{
						backgroundColor: "#453484",
						width: 90,
						height: 40,
						borderColor: "transparent",
						borderWidth: 0,
						borderRadius: 19,
						paddingBottom: 10
					}}
    />
);
};


export default fetchLocation;