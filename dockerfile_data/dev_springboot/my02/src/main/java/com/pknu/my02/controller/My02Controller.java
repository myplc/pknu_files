package com.pknu.my02.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
// import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class My02Controller {
    @GetMapping("/api")
    @ResponseBody
    public Map<String, String> Api() {
        Map<String, String> data = new HashMap<>();
        data.put("who", "friend");
        data.put("passkey", "ok-key");
        System.out.println("데이터를 전송함");
        return data;
    }

    @PostMapping("/data")
    @ResponseBody
    public Map<String, String> Rdata(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");
        System.out.println("아이디:" + username + "/ 비번:" + password);
        Map<String, String> result = new HashMap<>();
        result.put("username", username);
        result.put("password", password);
        return result;
    }
}