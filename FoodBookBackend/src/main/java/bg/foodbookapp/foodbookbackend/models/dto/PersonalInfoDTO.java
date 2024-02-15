package bg.foodbookapp.foodbookbackend.models.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Setter
public class PersonalInfoDTO {
    private String firstName;

    private String lastName;

    private LocalDate birthDate;
}
