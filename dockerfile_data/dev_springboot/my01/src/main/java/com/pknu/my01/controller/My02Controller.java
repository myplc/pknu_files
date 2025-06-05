package com.pknu.my01.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pknu.my01.dto.ChatRequest;
import com.pknu.my01.service.OpenAiService;

@RestController
public class My02Controller {
    private final OpenAiService openAiService;

    public My02Controller(OpenAiService openAiService) {
        this.openAiService = openAiService;
    }

    @PostMapping("/final_chatbot")
    @ResponseBody
    public Map<String, String> chat(@RequestBody ChatRequest request) {
        System.out.println(request.getMessage());
        String message = request.getMessage();
        String answer;
        if ("안녕".equals(message)) {
            answer = "반가워요!🥰";
        } else if ("배고파".equals(message)) {
            answer = "배고프시구나 ㅠㅠ";
        } else {
            answer = openAiService.ask(message);
            // openai()
            // answer = "네...(대충뭔말인지모름;;)";
        }

        return Map.of("reply", answer);
    }

}
