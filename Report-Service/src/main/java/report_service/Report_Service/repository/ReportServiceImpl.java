package report_service.Report_Service.repository;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import report_service.Report_Service.entity.Report;
import report_service.Report_Service.service.ReportService;

@Service
public class ReportServiceImpl implements ReportService {
	
	private ReportRepository reportRepository;
	

	@Override
	public Report saveReport(MultipartFile file) {
		
		String fakeUrl = "local/" + file.getOriginalFilename();
		
		 Report report = Report.builder()
		       .id(UUID.randomUUID().toString())
		       .fileUrl("/Users/chetanramshelke/Downloads/Vitthalai_Devi_Warriors_List.pdf")
		       .status("Pending")
		       .createdAt(LocalDateTime.now())
		       .build();
		
		
		return reportRepository.save(report);
	}

}
