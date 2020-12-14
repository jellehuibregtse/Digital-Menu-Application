import React, {useEffect, useState} from "react";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import DishColumn from "./DishColumn";
import OrderColumn from "./OrderColumn";
import MessagingService from "../../services/MessagingService";
import {Box, Container, Divider, Grid, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";
import {useHistory} from "react-router-dom";

const OrderStatus = {
    NEW: "NEW",
    PROCESSING: "PROCESSING",
    COMPLETE: "COMPLETE",
};

const useStyles = makeStyles((theme) => ({
    button: {
        textTransform: 'none'
    },
    toolBar: {
        padding: 0,
        justifyContent: 'space-between'
    },
    subFlex: {
        display: 'flex',
        alignItems: 'center'
    },
    backButton: {
        minWidth: 0,
        position: 'absolute',
        marginLeft: theme.spacing(-6)
    },
    header: {
        marginRight: theme.spacing(1)
    },
    content: {
        background: theme.palette.primary.light,
        height: ' 100%',
        overflow: 'hidden',
        padding: theme.spacing(0, 5)
    },
    view: {
        display: 'flex',
        width: '100%',
        height: '100%'
    }
}))

const OrderView = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const {orders} = props;

    // Get all menu items from all open orders
    const [items, setItems] = useState([]);
    const newItems = items.filter((item) => item.status === OrderStatus.NEW);
    const processingItems = items.filter((item) => item.status === OrderStatus.PROCESSING);
    const completeItems = items.filter((item) => item.status === OrderStatus.COMPLETE);

    useEffect(() => {
        if (orders.length > 0) {
            setItems(orders.map((order) => order.items.map((item, index) => {
                item.index = index;
                item.parentId = order.id;
                item.tableNumber = order.tableNumber;
                return item;
            })).flat());
        }
    }, [orders])

    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result;

        if (!destination)
            return;

        if (source.droppableId === 'orders')
            return;

        if (destination.droppableId === source.droppableId && destination.index === source.index)
            return;

        const order = orders.find((order) => order.id === items.find((item) => item.id.toString() === draggableId).parentId);

        if (destination.droppableId === 'newDishes') {
            moveOrder(order, draggableId, OrderStatus.NEW);
        }

        if (destination.droppableId === 'processingDishes') {
            moveOrder(order, draggableId, OrderStatus.PROCESSING);
        }

        if (destination.droppableId === 'completeDishes') {
            moveOrder(order, draggableId, OrderStatus.COMPLETE);
        }
    };

    const moveOrder = (order, draggableId, status) => {
        order.items[items.find((item) => item.id.toString() === draggableId).index].status = status;
        MessagingService.fetchHandler("PUT", "/order-service/orders/" + order.id, order).then().catch(() => {
        });
        setItems(orders.map((order) => order.items.map((item, index) => {
            item.index = index;
            item.parentId = order.id;
            item.tableNumber = order.tableNumber;
            return item;
        })).flat());
    }

    return (
        <>
            <Container>
                <Toolbar className={classes.toolBar}>
                    <IconButton className={classes.backButton} onClick={() => history.push("/")}>
                        <ArrowBack/>
                    </IconButton>
                    <Typography className={classes.header} variant="h5">{props.restaurantName}</Typography>
                </Toolbar>
            </Container>
            <Divider/>
            <div className={classes.content}>
                <Grid className={classes.view}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId={"newDishes"}>
                            {(provided) => (
                                <DishColumn
                                    key={1}
                                    id={"newDishes"}
                                    name="New Dishes"
                                    items={newItems}
                                    innerRef={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {provided.placeholder}
                                </DishColumn>
                            )}
                        </Droppable>

                        <Droppable droppableId={"processingDishes"}>
                            {(provided) => (
                                <DishColumn
                                    key={2}
                                    id={"processingDishes"}
                                    name="Preparing Dishes"
                                    items={processingItems}
                                    innerRef={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {provided.placeholder}
                                </DishColumn>
                            )}
                        </Droppable>

                        <Droppable droppableId={"completeDishes"}>
                            {(provided) => (
                                <DishColumn
                                    key={3}
                                    id={"completeDishes"}
                                    name="Completed Dishes"
                                    items={completeItems}
                                    innerRef={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {provided.placeholder}
                                </DishColumn>
                            )}
                        </Droppable>
                    </DragDropContext>

                    <DragDropContext>
                        <Droppable droppableId={"orders"}>
                            {(provided) => (
                                <OrderColumn
                                    key={4}
                                    id={"orders"}
                                    name="Orders"
                                    items={orders}
                                    innerRef={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {provided.placeholder}
                                </OrderColumn>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Grid>
            </div>
        </>
    );
};

export default OrderView;