package com.pknu.my01.dto;

import java.time.LocalDate;

public class MemberData {
    private String name;
    private LocalDate birthData;

    public MemberData(String name, LocalDate birthData) {
        this.name = name;
        this.birthData = birthData;
    }

    public String getName() {
        return name;
    }

    public LocalDate getBirthData() {
        return birthData;
    }

}
