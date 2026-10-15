package com.medical.analyzer.service;

import com.medical.analyzer.model.Report;
import com.medical.analyzer.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    public Report getReportById(Long id) {
        return reportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found with id: " + id));
    }

    public Report createReport(Report report) {
        return reportRepository.save(report);
    }

    public Report updateReport(Long id, Report reportDetails) {
        Report report = getReportById(id);
        report.setTitle(reportDetails.getTitle());
        report.setDescription(reportDetails.getDescription());
        report.setStatus(reportDetails.getStatus());
        return reportRepository.save(report);
    }

    public void deleteReport(Long id) {
        Report report = getReportById(id);
        reportRepository.delete(report);
    }

    public List<Report> getReportsByStatus(String status) {
        return reportRepository.findByStatus(status);
    }

    public List<Report> searchReports(String keyword) {
        return reportRepository.findByTitleContainingIgnoreCase(keyword);
    }
}
