package lk.iit.TicketingSystem.Controllers;


import lk.iit.TicketingSystem.Database.CustomerRepository;
import lk.iit.TicketingSystem.Models.Customer;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController // Marks this class as a REST controller in a Spring application
public class CustomerController {
    // Repository to manage Customer entities
    private final CustomerRepository customerRepository;
    // Constructor-based dependency injection for the CustomerRepository
    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }
    // Endpoint to add multiple customers to the repository
    @PostMapping("/add-customer")
    public String addPerson(@RequestBody List<Customer> customer) {
        // Save the person object to the repository
        customerRepository.saveAll(customer);
        return "Added " + customer.size() + " customers";
    }

}
