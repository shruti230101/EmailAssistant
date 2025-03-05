package com.project.emailwriter.entities;

import lombok.Data;

@Data
public class EmailRequest {
    private String emailContent;
    private String tone;
    private String senderName;
    private String receiverName;
}
