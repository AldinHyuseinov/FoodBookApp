package bg.foodbookapp.foodbookbackend.models.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class PublicInfoDTO {
    private String username;

    private String tagline;
}
