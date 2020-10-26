package com.dma.menuservice.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Tests for the menu controller.
 *
 * @author Jelle Huibregtse
 */
@SpringBootTest
@AutoConfigureMockMvc
public class MenuControllerTests {

    private static final String BASE_URL = "/menu";

    @Autowired
    private MockMvc mvc;

    @Test
    public void getMenuTest() throws Exception {
        this.mvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/get?menuId=1")).andExpect(status().isOk());
    }

    @Test
    public void getAllMenusTest() throws Exception {
        this.mvc.perform(MockMvcRequestBuilders.get(BASE_URL + "/getAll?restaurantId=1")).andExpect(status().isOk());
    }

//    @Test
//    public void addMenuTest() throws Exception {
//        String url = BASE_URL + "/add";
//        Menu menu = new Menu();
//        menu.setName("Menu");
//        menu.setRestaurantId(1L);
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        objectMapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
//        ObjectWriter objectWriter = objectMapper.writer().withDefaultPrettyPrinter();
//        String requestJson = objectWriter.writeValueAsString(menu);
//
//        this.mvc.perform(post(url).contentType(APPLICATION_JSON_UTF8)
//                .content(requestJson))
//                .andExpect(status().isOk());
//    }
}