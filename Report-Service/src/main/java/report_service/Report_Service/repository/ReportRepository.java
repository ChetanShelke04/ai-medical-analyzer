package report_service.Report_Service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import report_service.Report_Service.entity.Report;

public interface ReportRepository extends JpaRepository<Report, String> {

}
