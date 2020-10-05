import React, {useEffect, useState} from "react";
import "./css/App.css";
import Navbar from "./components/fragments/NavBar";
import OrderView from "./components/OrderView";
import MessagingService from "./services/MessagingService";

function App() {
    const [orders, setOrders] = useState([]);
    const [restaurant, setRestaurant] = useState({});
    const [user, setUser] = useState({ name: "user"});

    const RESTAURANT_ID = 0;

    //runs once at runtime, that's what the [] at the end are for.
    useEffect(() => {
        // Subscribe to orders with restaurant id
        MessagingService.register('/topic/orders/' + RESTAURANT_ID,
            (m) => setOrders(JSON.parse(m.body)),
            () =>{alert("Couldn't connect to servers")},
            () => {MessagingService.tryGetMessage(8083, '/orders/').then().catch((e) => {alert(e)})})

        // Getting restaurant and settings
        MessagingService.getRestaurant(RESTAURANT_ID).then(res => { setRestaurant(res) }).catch((e) => {alert(e)});
    }, []);

    return (
        <>
            <Navbar restaurantName={restaurant.name} userName={user.name}/>
            <OrderView orders={orders}/>
        </>
    );
}

export default App;
