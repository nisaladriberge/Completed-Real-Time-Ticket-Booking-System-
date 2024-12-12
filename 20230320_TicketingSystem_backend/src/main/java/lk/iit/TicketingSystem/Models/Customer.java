package lk.iit.TicketingSystem.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jdk.jfr.BooleanFlag;

import java.util.List;

@Entity // Marks this class as a JPA entity
public class Customer {
    // Fields to store customer properties
    private @Id @GeneratedValue int customerId;// Primary key with auto-generated value
    private String firstName;
    private String lastName;
    private int retrieveTicketAmount;


    @OneToMany(mappedBy = "customer")  // Defines a one-to-many relationship with the Ticket entity
    private List<Ticket> tickets; // List of tickets associated with the customer
    // Default constructor
    public Customer() {}
    // Constructor to initialize customer properties
    public Customer(String firstName, String lastName, int retrieveTicketAmount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.retrieveTicketAmount = retrieveTicketAmount;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
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

    public int getRetrieveTicketAmount() {
        return retrieveTicketAmount;
    }

    public void setRetrieveTicketAmount(int retrieveTicketAmount) {
        this.retrieveTicketAmount = retrieveTicketAmount;
    }



    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }
}

