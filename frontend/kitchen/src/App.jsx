import React, {useEffect, useState} from "react";
import "./css/App.css";
import Navbar from "./components/fragments/NavBar";
import OrderView from "./components/OrderView";
import MessagingService from "./services/MessagingService";

// Hardcoded restaurant id
const RESTAURANT_ID = 0;

function App() {
    const [orders, setOrders] = useState([]);
    const [restaurant, setRestaurant] = useState({});
    const [user, setUser] = useState({ name: "user"});

    // Run once at runtime
    useEffect(() => {
        // Subscribe to orders from restaurant
        MessagingService.register('/topic/orders/' + RESTAURANT_ID,
            (m) => setOrders(JSON.parse(m.body)),
            () =>{alert("Couldn't connect to servers")},
            () => {MessagingService.tryGetMessage(8083, '/orders/').then().catch((e) => {alert(e)})})

        // Get restaurant settings
        MessagingService.tryGetMessage(8081, '/restaurants/' + RESTAURANT_ID).then(res => { setRestaurant(res) }).catch((e) => {alert(e)});
    }, []);

    return (
        <>
            <Navbar restaurantName={restaurant.name} userName={user.name}/>
            <OrderView orders={orders}/>
        </>
    );
}

export default App;
