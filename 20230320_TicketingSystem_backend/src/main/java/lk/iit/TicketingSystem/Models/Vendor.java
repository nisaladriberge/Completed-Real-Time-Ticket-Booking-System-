package lk.iit.TicketingSystem.Models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
//import lk.iit.TicketingSystem.Controllers.VendorController;

import java.util.List;

//import java.util.List;

@Entity //as a JPA entity
public class Vendor {
    // Fields to store vendor properties
    private @Id @GeneratedValue int vendorId; // Primary key with auto-generated value
    private String firstName;
    private String lastName;
    private int releaseTicketAmount;

    @OneToMany(mappedBy = "vendor") // Defines a one-to-many relationship with the Ticket entity
    private List<Ticket> tickets; // List of tickets issued by the vendor

    // Default constructor
    public Vendor() {}
    // Constructor to initialize vendor properties
    public Vendor(String firstName, String lastName, int releaseTicketAmount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.releaseTicketAmount = releaseTicketAmount;
    }

    public int getVendorId() {
        return vendorId;
    }

    public void setVendorId(int vendorId) {
        this.vendorId = vendorId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getReleaseTicketAmount() {
        return releaseTicketAmount;
    }

    public void setReleaseTicketAmount(int releaseTicketAmount) {
        this.releaseTicketAmount = releaseTicketAmount;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }
}

