import React, {useEffect, useState} from "react";
import "./css/App.css";
import Navbar from "./components/fragments/NavBar";
import OrderView from "./components/OrderView";
import MessagingService from "./services/MessagingService";

function App() {
    const [orders, setOrders] = useState([]);
    const [restaurant, setRestaurant] = useState('');
    const [user, setUser] = useState('user');

    const RESTAURANT_ID = 0;

    //runs once at runtime, that's what the [] at the end are for.
    useEffect(() => {
        MessagingService.register('/topic/orders/' + RESTAURANT_ID, (m) => setOrders(JSON.parse(m.body)), () =>{}, () => {MessagingService.tryGetMessage(8083, '/orders/').then()})

        MessagingService.getRestaurant(RESTAURANT_ID).then(res => {
            try {
                setRestaurant(res);
            } catch (e) {}
        }).catch((e) => {});
    }, []);

    return (
        <>
            <Navbar restaurantName={restaurant.name} userName={user}/>
            <OrderView orders={orders}/>
        </>
    );
}

export default App;
