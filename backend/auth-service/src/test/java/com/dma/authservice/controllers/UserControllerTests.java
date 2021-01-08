package com.dma.authservice.controllers;

import com.dma.authservice.model.ApplicationUser;
import com.dma.authservice.repository.ApplicationUserRepository;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Arrays;

import static org.hamcrest.Matchers.endsWith;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class UserControllerTests {

    String bearer = null;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    ApplicationUserRepository applicationUserRepository;

    @BeforeEach
    public void setup() {
        var userOne = new ApplicationUser(0, "test@test.com", "$2a$10$OQfyIap0nR/BKKY5eRjSs.YLrJI6ObwZZb1c0U0ukvqFAlLun7ld6");

        saveAll(Arrays.asList(userOne));
    }

    @BeforeEach
    public void generateHeader() throws Exception{
        JSONObject applicationUser = new JSONObject();
        applicationUser.put("email", "test@test.com");
        applicationUser.put("password", "ijeXpkxR5HS43Kt");

        MvcResult mvcResult =  mockMvc.perform(post("/auth").contentType(MediaType.APPLICATION_JSON).content(applicationUser.toString()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(header().exists("Authorization"))
                .andReturn();

        bearer = mvcResult.getResponse().getHeader("Authorization");
    }

    @Test
    public void existingEmail_returnStatus200_andTrue() throws Exception {
        this.mockMvc.perform(get("/users?email=test@test.com"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("true"));
    }

    @Test
    public void nonExistingEmail_returnStatus200_andFalse() throws Exception {
        this.mockMvc.perform(get("/users?email=test@test2.com"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("false"));
    }

    @Test
    public void auth_returnsStatus200_andAuthorizationHeader() throws Exception {
        JSONObject applicationUser = new JSONObject();
        applicationUser.put("email", "test@test.com");
        applicationUser.put("password", "ijeXpkxR5HS43Kt");

        this.mockMvc.perform(post("/auth").contentType(MediaType.APPLICATION_JSON).content(applicationUser.toString()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(header().exists("Authorization"));
    }

    @Test
    public void invalidUserAuth_returnsStatus404() throws Exception {
        JSONObject applicationUser = new JSONObject();
        applicationUser.put("email", "test@test2.com");
        applicationUser.put("password", "ijeXpkxR5HS43Kt");

        this.mockMvc.perform(post("/auth").contentType(MediaType.APPLICATION_JSON).content(applicationUser.toString()))
                .andDo(print())
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void register_returnStatus200_andMessage() throws Exception {
        JSONObject applicationUser = new JSONObject();
        applicationUser.put("email", "test@test2.com");
        applicationUser.put("password", "ijeXpkxR5HS43Kt");

        this.mockMvc.perform(post("/users").contentType(MediaType.APPLICATION_JSON).content(applicationUser.toString()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(endsWith("has been successfully created!")));
    }

    @Test
    public void registerWithAlreadyExistingUser_returnStatus400_andMessage() throws Exception {
        JSONObject applicationUser = new JSONObject();
        applicationUser.put("email", "test@test.com");
        applicationUser.put("password", "ijeXpkxR5HS43Kt");

        this.mockMvc.perform(post("/users").contentType(MediaType.APPLICATION_JSON).content(applicationUser.toString()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(endsWith("is already taken.")));
    }

    @Test
    public void updateUser_returnStatus200_andMessage() throws Exception {
        if(bearer == null)
            throw new Exception("Bearer is not available");
        JSONObject applicationUser = new JSONObject();
        applicationUser.put("email", "test@test2.com");
        applicationUser.put("password", "test");

        this.mockMvc.perform(put("/users").contentType(MediaType.APPLICATION_JSON).content(applicationUser.toString()).header("Authorization", bearer))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(endsWith("has been successfully updated!")));
    }

    @Test
    public void updateUserWithoutAuth_returnStatus404() throws Exception {
        JSONObject applicationUser = new JSONObject();
        applicationUser.put("email", "test@test2.com");
        applicationUser.put("password", "test");

        this.mockMvc.perform(put("/users").contentType(MediaType.APPLICATION_JSON).content(applicationUser.toString()))
                .andDo(print())
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void deleteUser_returnStatus200_andMessage() throws Exception {
        if(bearer == null)
            throw new Exception("Bearer is not available");

        this.mockMvc.perform(delete("/users").header("Authorization", bearer))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(endsWith("has been successfully deleted!")));
    }

    @Test
    public void deleteUserWithoutAuth_returnStatus404() throws Exception {

        this.mockMvc.perform(delete("/users"))
                .andDo(print())
                .andExpect(status().isUnauthorized());
    }

    private void saveAll(Iterable<ApplicationUser> users) {
        for (var user : users) {
            applicationUserRepository.save(user);
        }
    }
}