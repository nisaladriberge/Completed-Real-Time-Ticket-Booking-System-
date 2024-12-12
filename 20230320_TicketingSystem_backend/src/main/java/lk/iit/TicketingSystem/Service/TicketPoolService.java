package lk.iit.TicketingSystem.Service;


import lk.iit.TicketingSystem.Models.Ticket;
import org.springframework.beans.factory.annotation.Value;

import java.util.Collections;
import java.util.List;
import java.util.LinkedList;


public class TicketPoolService {

    // Synchronized list for thread-safe access
    private final List<Ticket> tickets;

    // Injecting maxTicketCapacity using @Value
    @Value("${ticket.max-capacity}")
    private int maxTicketCapacity;

    // Ticket ID generator
    private int ticketIdGenerator;

    public TicketPoolService(int maxTicketCapacity, @Value("${ticket.initial-tickets}") int totalInitialTickets) {
        this.tickets = Collections.synchronizedList(new LinkedList<>());
        this.maxTicketCapacity = maxTicketCapacity;
        this.ticketIdGenerator = 1;

        // Initialize with some tickets
        for (int i = 0; i < totalInitialTickets; i++) {
            tickets.add(new Ticket(ticketIdGenerator++));
        }
    }

    // Add tickets to the pool (by vendors)
    public synchronized void addTickets(int releaseRate, String vendorName, int releaseTicketAmount) {
        for (int i = 0; i < releaseTicketAmount; i++) {
            if (ticketIdGenerator > maxTicketCapacity) {
                try {
                    System.out.println("The ticket pool is full.");
                    wait();  // Wait if the pool is full
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
            try {
                Ticket ticket = new Ticket(ticketIdGenerator++);
                tickets.add(ticket);
                Thread.sleep(60000 / releaseRate);  // Simulate rate delay
                System.out.println("A ticket added by vendor " + vendorName + ". Ticket details: " + ticket);
                notifyAll();  // Notify other threads when a ticket is added
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new RuntimeException(e);
            }
        }
    }

    // Method to purchase tickets (by customers)
    public synchronized boolean removeTicket(int retrievalRate, String customerName, int ticketAmount) {
        while (tickets.isEmpty()) {
            try {
                System.out.println("All tickets are sold...");
                wait();  // Wait if there are no tickets available
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return false;
            }
        }

        // Only proceed if there are enough tickets available
        if (tickets.size() >= ticketAmount) {
            for (int i = 0; i < ticketAmount; i++) {
                try {
                    Ticket ticket = tickets.removeFirst();  // Remove the first ticket from the list
                    ticket.purchaseTicket(customerName);
                    Thread.sleep(60000 / retrievalRate);  // Simulate retrieval delay
                    System.out.println("Ticket purchased by " + customerName + ". Ticket details: " + ticket);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    return false;
                }
            }
            return true;  // Successfully removed tickets
        } else {
            System.out.println("Not enough tickets available.");
            try {
                wait();  // Wait if there are not enough tickets
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            return false;  // Not enough tickets to fulfill the request
        }
    }

    // Get the current available tickets
    public int getAvailableTickets() {
        return tickets.size();
    }
}