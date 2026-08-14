package pk.reliefgrid.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pk.reliefgrid.model.Incident;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
}
