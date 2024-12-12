package lk.iit.TicketingSystem.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lk.iit.TicketingSystem.Models.Configuration;

import java.io.File;
import java.io.IOException;

public class JsonReader {
    // Method to read a Configuration object from a JSON file
    public static Configuration readConfigFromFile(String filePath) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper(); // Jackson ObjectMapper for JSON processing
        return objectMapper.readValue(new File(filePath), Configuration.class); // Deserialize JSON into a Configuration object
    }
}