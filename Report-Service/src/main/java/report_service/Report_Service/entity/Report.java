package report_service.Report_Service.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "reports")
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Report {
	
	@Id
    private String id;

    private String fileName;
    private String fileUrl;
    private String status;

    private LocalDateTime createdAt;

    // Default Constructor (MANDATORY for JPA)
    public Report() {
    }

   
    
}
