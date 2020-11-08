package com.dma.orderservice.service;

import com.dma.orderservice.model.CustomerOrder;
import com.dma.orderservice.model.Status;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.util.Lists;
import org.junit.Assert;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.messaging.converter.StringMessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.lang.reflect.Type;
import java.util.concurrent.CompletableFuture;
import java.util.function.Consumer;

import static java.util.concurrent.TimeUnit.SECONDS;

/**
 * Repository Unit tests.
 *
 * @author Aron Hemmes
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class WebSocketTests {

    private final CustomerOrder order = new CustomerOrder(Status.NEW, 1L, 1, Lists.newArrayList());
    @LocalServerPort
    private Integer port;
    @Autowired
    private OrderService orderService;
    private WebSocketStompClient client;
    private StompSession session;

    @BeforeEach
    void setup() throws Exception {
        client = new WebSocketStompClient(new StandardWebSocketClient());
        client.setMessageConverter(new StringMessageConverter());
        String URL = String.format("ws://localhost:%d/websockets", port);
        session = client.connect(URL, new StompSessionHandlerAdapter() {}).get(1, SECONDS);
    }

    @AfterEach
    void teardown() {
        session.disconnect();
        client.stop();
    }

    @Test
    public void connectsToSocket() {
        Assert.assertTrue(session.isConnected());
    }

    @Test
    void receivesMessageFromSubscription() throws Exception {
        CompletableFuture<String> completableFuture = new CompletableFuture<>();

        session.subscribe("/orders/" + order.getRestaurantId(),
                          new MyStompFrameHandler(completableFuture::complete));

        Thread.sleep(1000);

        orderService.sendMessage(order.getRestaurantId());

        Assert.assertNotNull(new ObjectMapper().readValue(completableFuture.get(2, SECONDS), Object.class));
    }


    private static class MyStompFrameHandler implements StompFrameHandler {

        private final Consumer<String> frameHandler;

        public MyStompFrameHandler(Consumer<String> frameHandler) {
            this.frameHandler = frameHandler;
        }

        @Override
        public Type getPayloadType(StompHeaders headers) {
            return String.class;
        }

        @Override
        public void handleFrame(StompHeaders headers, Object payload) {
            assert payload != null;
            System.out.println("Received message: " + payload);
            frameHandler.accept(payload.toString());
        }
    }
}
