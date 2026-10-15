package com.medical.analyzer.controller;

import com.medical.analyzer.model.Report;
import com.medical.analyzer.service.ReportService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    /** GET /api/reports — list all reports */
    @GetMapping
    public ResponseEntity<List<Report>> getAllReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }

    /** GET /api/reports/{id} — get one report */
    @GetMapping("/{id}")
    public ResponseEntity<Report> getReportById(@PathVariable Long id) {
        return ResponseEntity.ok(reportService.getReportById(id));
    }

    /** POST /api/reports — create a new report */
    @PostMapping
    public ResponseEntity<Report> createReport(@Valid @RequestBody Report report) {
        Report created = reportService.createReport(report);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    /** PUT /api/reports/{id} — update an existing report */
    @PutMapping("/{id}")
    public ResponseEntity<Report> updateReport(@PathVariable Long id,
            @Valid @RequestBody Report report) {
        return ResponseEntity.ok(reportService.updateReport(id, report));
    }

    /** DELETE /api/reports/{id} — delete a report */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable Long id) {
        reportService.deleteReport(id);
        return ResponseEntity.noContent().build();
    }

    /** GET /api/reports/status/{status} — filter by status */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Report>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(reportService.getReportsByStatus(status));
    }

    /** GET /api/reports/search?keyword=... — search by title */
    @GetMapping("/search")
    public ResponseEntity<List<Report>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(reportService.searchReports(keyword));
    }
}
