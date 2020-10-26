package com.dma.menuservice.controller;

import com.dma.menuservice.model.Menu;
import com.dma.menuservice.repository.MenuRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests using Mock MVC.
 *
 * @author Jelle Huibregtse
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class MenuControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MenuRepository menuRepository;

    @BeforeEach
    public void setup() throws Exception {
        var menuOne = new Menu(1, "Menu 1", Lists.newArrayList());
        var menuTwo = new Menu(2, "Menu 2", Lists.newArrayList());

        menuRepository.saveAll(Lists.newArrayList(menuOne, menuTwo));
    }

    @Test
    public void getAllMenus_returnsStatus200_andAllMenus() throws Exception {
        this.mockMvc.perform(get("/menus/"))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))

                    .andExpect(jsonPath("$", hasSize(2)))
                    .andExpect(jsonPath("$[0].id", is(1)))
                    .andExpect(jsonPath("$[0].restaurantId", is(1)))
                    .andExpect(jsonPath("$[0].name", is("Menu 1")))
                    .andExpect(jsonPath("$[0].items", hasSize(0)))

                    .andExpect(jsonPath("$[1].id", is(2)))
                    .andExpect(jsonPath("$[1].restaurantId", is(2)))
                    .andExpect(jsonPath("$[1].name", is("Menu 2")))
                    .andExpect(jsonPath("$[1].items", hasSize(0)));
    }

    @Test
    public void getSingleMenu_returnsStatus200_andMenu() throws Exception {
        this.mockMvc.perform(get("/menus/1"))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))

                    .andExpect(jsonPath("$.id", is(1)))
                    .andExpect(jsonPath("$.restaurantId", is(1)))
                    .andExpect(jsonPath("$.name", is("Menu 1")))
                    .andExpect(jsonPath("$.items", hasSize(0)));
    }

    @ParameterizedTest
    @ValueSource(ints = {Integer.MIN_VALUE, -1, 10, Integer.MAX_VALUE})
    public void getNonExistentMenu_returnsStatus404(int id) throws Exception {
        this.mockMvc.perform(get("/menus/" + id)).andDo(print()).andExpect(status().isNotFound());
    }

    @Test
    public void addMenu_returnsStatus200_andMessage() throws Exception {
        var newMenu = new Menu(3, "Menu 3", Lists.newArrayList());

        this.mockMvc.perform(post("/menus/").contentType(MediaType.APPLICATION_JSON).content(toJsonString(newMenu)))
                    .andExpect(status().isOk())
                    .andExpect(content().string(endsWith("has been successfully created!")));
    }

    @Test
    public void addMenuWithEmptyBody_returnsStatus400() throws Exception {
        this.mockMvc.perform(post("/menus/").contentType(APPLICATION_JSON))
                    .andDo(print())
                    .andExpect(status().isBadRequest());
    }

    @ParameterizedTest
    @ValueSource(ints = {Integer.MIN_VALUE, -1, 10, Integer.MAX_VALUE})
    public void updateNonExistentMenu_returnsStatus404(int id) throws Exception {
        var newMenu = new Menu(3, "Menu 3", Lists.newArrayList());

        this.mockMvc.perform(put("/menus/" + id).contentType(APPLICATION_JSON).content(toJsonString(newMenu)))
                    .andDo(print())
                    .andExpect(status().isNotFound());
    }

    @ParameterizedTest
    @ValueSource(ints = {1, 2})
    public void updatedMenuWithEmptyBody_returnsStatus400(int id) throws Exception {
        this.mockMvc.perform(put("/menus/" + id).contentType(APPLICATION_JSON))
                    .andDo(print())
                    .andExpect(status().isBadRequest());
    }

    @ParameterizedTest
    @ValueSource(ints = {1, 2})
    public void updateMenu_returnsStatus200_andMessage(int id) throws Exception {
        var newMenu = new Menu(3, "Menu 3", Lists.newArrayList());

        this.mockMvc.perform(put("/menus/" + id).contentType(APPLICATION_JSON).content(toJsonString(newMenu)))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().string(endsWith("has been successfully updated!")));
    }

    @ParameterizedTest
    @ValueSource(ints = {1, 2})
    public void getUpdatedMenu_returnsStatus200_andUpdatedMenu(int id) throws Exception {
        updateMenu_returnsStatus200_andMessage(id);

        this.mockMvc.perform(get("/menus/" + id))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().contentTypeCompatibleWith(APPLICATION_JSON))
                    .andExpect(jsonPath("$.id", is(id)))
                    .andExpect(jsonPath("$.restaurantId", is(3)))
                    .andExpect(jsonPath("$.name", is("Menu 3")))
                    .andExpect(jsonPath("$.items", hasSize(0)));
    }

    @ParameterizedTest
    @ValueSource(ints = {1, 2})
    public void deleteMenu_returnsStatus200_andMessage(int id) throws Exception {
        this.mockMvc.perform(delete("/menus/" + id))
                    .andDo(print())
                    .andExpect(status().isOk())
                    .andExpect(content().string(endsWith("has been successfully deleted!")));
    }

    @ParameterizedTest
    @ValueSource(ints = {Integer.MIN_VALUE, -1, 10, Integer.MAX_VALUE})
    public void deleteNonExistentMenu_returnsStatus404(int id) throws Exception {
        this.mockMvc.perform(delete("/menus/" + id)).andDo(print()).andExpect(status().isNotFound());
    }

    private String toJsonString(Object object) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(object);
    }
}