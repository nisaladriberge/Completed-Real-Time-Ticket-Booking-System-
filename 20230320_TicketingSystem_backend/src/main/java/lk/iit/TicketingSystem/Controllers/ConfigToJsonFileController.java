package lk.iit.TicketingSystem.Controllers;

import lk.iit.TicketingSystem.Models.Configuration;
//import lk.iit.ticketingsystem.Models.User;
import lk.iit.TicketingSystem.Service.JsonFileWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController // Marks this class as a REST controller in a Spring application
public class ConfigToJsonFileController {

    @Autowired  // Automatically injects the JsonFileWriter bean
    private JsonFileWriter jsonFileWriter;
    // Endpoint to write configuration data to a JSON file
    @PostMapping("/write-config-json")
    public String writeConfigJson(@RequestBody Configuration config) {
        try {
            // Write to a file called 'config.json'
            jsonFileWriter.writeUserToFile(config, "config.json");
            return "User JSON written successfully!";
        } catch (IOException e) {
            // Handle exceptions during the file writing process
            return "Error writing to file: " + e.getMessage();
        }
    }
}
