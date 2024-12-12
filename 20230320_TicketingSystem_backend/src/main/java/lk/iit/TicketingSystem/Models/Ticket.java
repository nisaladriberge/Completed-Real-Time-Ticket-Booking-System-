package lk.iit.TicketingSystem.Models;

import jakarta.persistence.*;

@Entity //a JPA entity
public class Ticket {
    // Fields to store ticket properties
    private @Id @GeneratedValue int ticketId; // Primary key with auto-generated value
    private double ticketPrice;

    @ManyToOne // Many-to-one relationship with the Customer entity
    @JoinColumn(name = "customer_id") // Foreign key column for customer
    private Customer customer; // Reference to the customer who purchased the ticket

    @ManyToOne
    @JoinColumn(name = "vendor_id") // Foreign key column for vendor
    private Vendor vendor; // Reference to the vendor who issued the ticket

    private String purchaserName; // Name of the purchaser

//    @ManyToOne
//    @JoinColumn(name = "session_id")
//    private Session session;

    private boolean isPurchased; // Flag to indicate if the ticket has been purchased
    // Default constructor
    public Ticket() {}

    // Constructor to initialize a ticket with its ID
    public Ticket(int ticketId) {
        this.ticketId = ticketId;
        this.isPurchased = false;
        this.purchaserName = null;
    }

    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    public double getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public boolean isPurchased() {
        return isPurchased;
    }

    public void setPurchased(boolean purchased) {
        isPurchased = purchased;
    }

    public String getPurchaserName() {
        return purchaserName;
    }

    public void setPurchaserName(String purchaserName) {
        this.purchaserName = purchaserName;
    }

    // Method to purchase the ticket
    public void purchaseTicket(String customerName) {
        this.isPurchased = true;
        this.purchaserName = customerName;
    }
    // Override toString method to provide a string representation of the ticket
    @Override
    public String toString() {
        return "Ticket ID: " + ticketId + ", Purchased: " + isPurchased;
    }
}
