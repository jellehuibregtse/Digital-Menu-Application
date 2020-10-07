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
    const [user] = useState({ name: "user"});

    // Run once at runtime
    useEffect(() => {
        // Subscribe to orders from restaurant
        MessagingService.register('/topic/orders/' + RESTAURANT_ID,
            (m) => setOrders(JSON.parse(m.body)),
            () =>{},
            () => {MessagingService.fetchHandler('GET','/orders/').then().catch((e) => {})})

        // Get restaurant settings
        MessagingService.fetchHandler('GET','/restaurants/' + RESTAURANT_ID).then(res => { setRestaurant(res) }).catch((e) => {});
    }, []);

    return (
        <>
            <Navbar restaurantName={restaurant.name} userName={user.name}/>
            <OrderView orders={orders}/>
        </>
    );
}

export default App;
