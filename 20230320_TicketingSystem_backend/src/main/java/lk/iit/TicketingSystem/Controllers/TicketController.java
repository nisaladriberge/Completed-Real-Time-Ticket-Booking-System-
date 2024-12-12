package lk.iit.TicketingSystem.Controllers;

import lk.iit.TicketingSystem.Service.TicketPoolService;
import org.springframework.web.bind.annotation.*;

@RestController // REST controller for handling HTTP requests
public class TicketController {

    // Service to manage the ticket pool
    private TicketPoolService ticketPoolService;


    // Endpoint to purchase tickets (by customer)
    @PostMapping("/purchase")
    public String purchaseTickets(
            @RequestParam int rate, // The rate of ticket purchase
            @RequestParam String customerName, // The name of the customer
            @RequestParam int amount) { // The number of tickets to purchase
        // Attempt to remove tickets from the pool for the customer
        boolean success = ticketPoolService.removeTicket(rate, customerName, amount);
        // Return success or failure message
        return success ? "Tickets purchased successfully!" : "Failed to purchase tickets.";
    }

    // Endpoint to get available tickets
    @GetMapping("/available")
    public int getAvailableTickets() {
        return ticketPoolService.getAvailableTickets();
    }
}
