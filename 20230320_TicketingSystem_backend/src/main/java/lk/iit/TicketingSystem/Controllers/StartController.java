package lk.iit.TicketingSystem.Controllers;

//import jakarta.annotation.PostConstruct;
import lk.iit.TicketingSystem.Database.CustomerRepository;
import lk.iit.TicketingSystem.Database.VendorRepository;
import lk.iit.TicketingSystem.Models.Configuration;
import lk.iit.TicketingSystem.Models.Threading.Customer;
import lk.iit.TicketingSystem.Models.Threading.Vendor;
import lk.iit.TicketingSystem.Service.JsonReader;
import lk.iit.TicketingSystem.Service.TicketPoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Controller // Marks this class as a Spring MVC Controller
public class StartController {
    @Autowired // Inject the VendorRepository dependency
    private VendorRepository vendorRepository;

    @Autowired // CustomerRepository dependency
    private CustomerRepository customerRepository;

    // Endpoint to start the ticketing system
    @PostMapping("/startsystem")
    public String startsystem() {
        System.out.println("System has started");

        // Read the configuration from the JSON file
        Configuration config = null;
        try {
            config = JsonReader.readConfigFromFile("config.json");// Load configuration
        } catch (IOException e) {
            throw new RuntimeException(e);// Handle exceptions during file reading
        }

        //TicketPoolService
        TicketPoolService ticketPoolService = new TicketPoolService(config.getMaximumTicketCapacity(), config.getTotalTickets());

        // Fetch all vendors and customers from the database
        List<lk.iit.TicketingSystem.Models.Vendor> vendors = vendorRepository.findAll();
        List<lk.iit.TicketingSystem.Models.Customer> customers = customerRepository.findAll();

        // List to store vendor and customer threads
        List<Thread> vendorThreads = new ArrayList<>();
        List<Thread> customerThreads = new ArrayList<>();

        // Create and start vendor threads
        for (lk.iit.TicketingSystem.Models.Vendor vendor : vendors) {
            Thread vendorThread = new Thread(new Vendor(ticketPoolService, 50, vendor.getFirstName(), vendor.getReleaseTicketAmount()));
            vendorThreads.add(vendorThread);
            vendorThread.start();  // Start the vendor thread
        }

        //  start customer threads
        for (lk.iit.TicketingSystem.Models.Customer customer : customers) {
            Thread customerThread = new Thread(new Customer(ticketPoolService, customer.getFirstName(), 50, customer.getRetrieveTicketAmount()));
            System.out.println(customer.getRetrieveTicketAmount());
            customerThreads.add(customerThread);
            customerThread.start();  // Start the customer thread
        }

        // Wait for all vendor threads to finish
        try {
            for (Thread vendorThread : vendorThreads) {
                vendorThread.join();  // Wait for vendor thread to finish
            }


        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // Wait for all customer threads to finish
        try {
            for (Thread customerThread : customerThreads) {
                customerThread.join();  // Wait for customer thread to finish
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        return "start";
    }


}

