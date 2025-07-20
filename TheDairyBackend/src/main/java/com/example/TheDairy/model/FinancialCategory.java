package com.example.TheDairy.model;

import lombok.Getter;

@Getter
public enum FinancialCategory {
    GROCERIES("Groceries"),
    TRANSPORTATION("Transportation"),
    RENT("Rent"),
    UTILITIES("Utilities"),
    HEALTH("Health"),
    ENTERTAINMENT("Entertainment"),
    CLOTHING("Clothing"),
    ELECTRONICS("Electronics"),
    EDUCATION("Education"),
    TRAVEL("Travel"),
    WELLNESS("Wellness"),
    OTHER("Other");

    private final String displayName;

    FinancialCategory(String displayName) {
        this.displayName = displayName;
    }
}
