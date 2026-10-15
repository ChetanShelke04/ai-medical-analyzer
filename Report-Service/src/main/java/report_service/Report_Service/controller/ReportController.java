package report_service.Report_Service.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import report_service.Report_Service.service.ReportService;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {
	
	private final ReportService reportService;
	
	@PostMapping("/upload")
	public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file){
		
		if(file.isEmpty()) {
			return ResponseEntity.badRequest().body("File is empty");
		}

		return ResponseEntity.ok(reportService.saveReport(file));
	}

}
