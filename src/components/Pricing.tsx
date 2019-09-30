import React from 'react'
import { View, Dimensions, Platform, Alert, TouchableOpacity } from 'react-native';
import { ListItem, Image, Button, Text } from 'react-native-elements';

import {
    connectAsync,
    setPurchaseListener,
    getProductsAsync,
    getPurchaseHistoryAsync,
    purchaseItemAsync,
    getBillingResponseCodeAsync,
    finishTransactionAsync,
    disconnectAsync,
    IAPResponseCode,
    IAPErrorCode,
} from 'expo-in-app-purchases';
import { material } from 'react-native-typography';
import { connect } from 'react-redux';
import axios from 'axios';

class Pricing extends React.Component<any, any> {

    state = {
        items: [],
        history: [],
        responseCode: 0,
    }

    public componentDidMount = async () => {
        const history = await connectAsync();
        const items = Platform.select({
            android: ['1_bulan']
        })

        // Get product details
        const { responseCode, results } = await getProductsAsync(items);
        if (responseCode === IAPResponseCode.OK) {
            this.setState({ items: results, history: history.results });
        }

        // Set purchase listener
        setPurchaseListener(({ responseCode, results, errorCode }) => {
            if (responseCode === IAPResponseCode.OK) {
                for (const purchase of results) {
                    if (!purchase.acknowledged) {
                        finishTransactionAsync(purchase, true);
                        Alert.alert('Thanks', 'Your Purchase Complete')
                        axios.get(`https://us-central1-westmanga-d528a.cloudfunctions.net/updatePremium/?id=${this.props.accounts.email}`);
                    }
                }
            } else if (responseCode === IAPResponseCode.USER_CANCELED) {
                Alert.alert('Ups!!', 'Your Cancel Purchase')
            } else {
                Alert.alert('Ups!!', `Something went wrong with the purchase. Received response code ${responseCode} and errorCode ${errorCode}`)
            }
        })
    }

    public componentWillUnmount = async () => {
        await disconnectAsync();
    }

    private queryPurchaseHistory = async () => {
        const { errorCode, responseCode, results } = await getPurchaseHistoryAsync()
        if (responseCode === IAPResponseCode.OK) {
            this.setState({ history: results })
        }
    }

    private getBillingResult = async () => {
        const responseCode = await getBillingResponseCodeAsync();
        this.setState({ responseCode });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.items.map(item => this.renderItem(item))}
            </View>
        )
    }


    private renderItem = (item) => (
        <View key={item.productId}>
            <TouchableOpacity
                onPress={() => purchaseItemAsync(item.productId)}
            >
                <ListItem
                    containerStyle={{
                        margin: 5,
                        borderRadius: 10
                    }}
                    title={(
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[material.body2, { marginRight: 3 }]}>{item.title}</Text>
                            <Text style={[material.caption, { color: 'red' }]}>{item.price}{" "}{item.priceCurrencyCode}</Text>
                        </View>
                    )}
                    subtitle={item.description}
                    subtitleStyle={{
                        fontSize: 12
                    }}
                    rightIcon={{
                        name: "payment",
                        underlayColor: 'white',
                        reverse: true,
                        raised: true,
                        size: 24,
                        color: 'rgb(162, 28, 255)',
                        reverseColor: 'white',
                        disabled: false,
                        onPress: () => purchaseItemAsync(item.productId)
                    }}
                />
            </TouchableOpacity>
        </View>
    )

}

const mapState = state => ({
    accounts:state.accounts
})



export default connect(mapState)(Pricing);