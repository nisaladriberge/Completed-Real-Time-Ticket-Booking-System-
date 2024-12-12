package lk.iit.TicketingSystem.Models.Threading;

import lk.iit.TicketingSystem.Service.TicketPoolService;
import org.springframework.stereotype.Component;


@Component
public class Customer implements Runnable {
    // Fields to store customer properties and dependencies
    private TicketPoolService ticketPoolService;// Service to manage ticket pool operations
    private String customerName;// Name of the customer
    private int ticketRetrievalRate; // Rate at which tickets are retrieved
    private int ticketAmount;// Number of tickets the customer wants to retrieve

    // Default constructor
    public Customer(){}
    // Constructor to initialize customer properties and ticket pool service
    public Customer(TicketPoolService ticketPoolService, String customerName, int ticketRetrievalRate, int ticketAmount) {
        this.ticketPoolService = ticketPoolService;
        this.customerName = customerName;
        this.ticketRetrievalRate = ticketRetrievalRate;
        this.ticketAmount = ticketAmount;
    }
    // Overriding the run method to define the behavior of the customer thread
    @Override
    public void run() {
        while (true) {
            // Exit the loop if no tickets are left to retrieve
            if (ticketAmount <= 0) {
                System.out.println(customerName + " has retrieved all available tickets. Exiting...");
                break; // Exit the loop when no tickets are left
            }
            // Retrieve tickets in batches of 4 if possible
            if (ticketAmount >= 4) {
                ticketPoolService.removeTicket(ticketRetrievalRate, customerName, 4); // Assume 4 tickets are retrieved
                ticketAmount -= 4; // Decrease the ticket amount by 4
                try {
                    System.out.println(customerName + " has bought 4 tickets in a row. Please wait 10 seconds...");
                    Thread.sleep(10000);// Simulate delay after batch retrieval
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();// Handle thread interruption
                }
            } else {
                // Retrieve the remaining tickets if less than 4 are left
                ticketPoolService.removeTicket(ticketRetrievalRate, customerName, ticketAmount); // Retrieve the remaining tickets
                System.out.println(customerName + " has bought " + ticketAmount + " tickets.");
                ticketAmount = 0; // No tickets left
                try {
                    Thread.sleep(2000);// Simulate delay after retrieval
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();// Handle thread interruption
                }
            }
        }

    }
}
