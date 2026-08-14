package pk.reliefgrid.controller;

import pk.reliefgrid.model.Incident;
import pk.reliefgrid.repository.IncidentRepository;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/incidents")
public class IncidentController {

    private final IncidentRepository incidentRepository;

    public IncidentController(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    @GetMapping
    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }

    @PostMapping
    public Incident createIncident(@RequestBody Incident incident) {

        incident.setReportedAt(LocalDateTime.now());

        if (incident.getStatus() == null || incident.getStatus().isBlank()) {
            incident.setStatus("REPORTED");
        }

        return incidentRepository.save(incident);
    }

    @PatchMapping("/{id}/status")
    public Incident updateIncidentStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Incident not found"
                ));

        incident.setStatus(status.toUpperCase());

        return incidentRepository.save(incident);
    }

    @PostMapping("/{id}/confirm")
public Incident confirmIncident(@PathVariable Long id) {

    Incident incident = incidentRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Incident not found"
            ));

    Integer currentConfirmations = incident.getConfirmations();

    if (currentConfirmations == null) {
        currentConfirmations = 0;
    }

    incident.setConfirmations(currentConfirmations + 1);

    return incidentRepository.save(incident);
}
}