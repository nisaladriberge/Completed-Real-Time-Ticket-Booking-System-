package lk.iit.TicketingSystem.Controllers;


//import lk.iit.TicketingSystem.Database.CustomerRepository;
import lk.iit.TicketingSystem.Database.VendorRepository;
//import lk.iit.TicketingSystem.Models.Configuration;
//import lk.iit.TicketingSystem.Models.Customer;
import lk.iit.TicketingSystem.Models.Vendor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//import java.io.IOException;
import java.util.List;

@RestController //a REST controller for handling HTTP requests
public class VendorController {
    // Repository to manage Vendor entities
    private final VendorRepository vendorRepository;

    // Constructor-based dependency injection for VendorRepository
    public VendorController(VendorRepository vendorRepository) {

        this.vendorRepository = vendorRepository;
    }
    // Endpoint to add multiple vendors to the repository
    @PostMapping("/add-vendor")
    public String addVendors(@RequestBody List<Vendor> vendors) {
        // Save the list of vendor objects to the repository
        vendorRepository.saveAll(vendors);
        return "Added " + vendors.size() + " vendors"; // Return confirmation message
    }
}
