package report_service.Report_Service.service;

import org.springframework.web.multipart.MultipartFile;

import report_service.Report_Service.entity.Report;

public interface ReportService {
	
	Report saveReport(MultipartFile file);
		
	
}
