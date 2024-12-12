package lk.iit.TicketingSystem.Models.Threading;

import lk.iit.TicketingSystem.Service.TicketPoolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component //Spring-managed component
public class Vendor implements Runnable {
    // Fields to store vendor properties and dependencies
    private TicketPoolService ticketPoolService;
    private int releaseRate;
    private String vendorName;
    private int releaseTicketAmount;

    // Default constructor
    public Vendor(){}
    // Constructor to initialize vendor properties and ticket pool service
    public Vendor(TicketPoolService ticketPoolService, int releaseRate, String vendorName, int totalTicketAmount) {
        this.ticketPoolService = ticketPoolService;
        this.releaseRate = releaseRate;
        this.vendorName = vendorName;
        this.releaseTicketAmount = totalTicketAmount;

    }
    // Overriding the run method to define the behavior of the vendor thread
    @Override
    public void run() {
        while (true) {
            ticketPoolService.addTickets(releaseRate, vendorName, releaseTicketAmount);
            try {
                // Release tickets every 2 seconds (simulate the process)
                Thread.sleep(30);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;// Exit the loop when interrupted
            }
        }
    }
}

