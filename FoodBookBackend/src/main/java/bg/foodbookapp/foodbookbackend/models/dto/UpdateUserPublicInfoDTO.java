package bg.foodbookapp.foodbookbackend.models.dto;

import bg.foodbookapp.foodbookbackend.utils.validations.ValidatePicture;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@Getter
@Setter
public class UpdateUserPublicInfoDTO {
    @Size(min = 3, max = 250, message = "Username should be between 3 and 250 characters")
    private String username;

    @Size(min = 5, max = 500, message = "Tagline should be between 5 and 500 characters")
    private String tagline;

    @ValidatePicture
    private MultipartFile photo;
}
