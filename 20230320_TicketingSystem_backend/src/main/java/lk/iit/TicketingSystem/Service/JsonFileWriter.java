package lk.iit.TicketingSystem.Service;

//import aj.org.objectweb.asm.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lk.iit.TicketingSystem.Models.Configuration;
//import lk.iit.TicketingSystem.Models.User;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;

//import java.util.List;

@Service //as a Spring-managed service component
public class JsonFileWriter {

    private final ObjectMapper objectMapper; // Jackson ObjectMapper for JSON processing
    // Constructor for dependency injection of the ObjectMapper
    public JsonFileWriter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }
    // Method to write a Configuration object to a JSON file
    public void writeUserToFile(Configuration config, String fileName) throws IOException {
        // Convert the User object to JSON and write it to a file
        objectMapper.writeValue(new File(fileName), config);
    }

}

