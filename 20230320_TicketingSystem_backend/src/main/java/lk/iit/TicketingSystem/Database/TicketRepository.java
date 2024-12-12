package lk.iit.TicketingSystem.Database;

import lk.iit.TicketingSystem.Models.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
}

