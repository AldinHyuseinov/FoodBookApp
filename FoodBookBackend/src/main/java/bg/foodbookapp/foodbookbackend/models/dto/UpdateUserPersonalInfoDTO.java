package bg.foodbookapp.foodbookbackend.models.dto;

import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Setter
public class UpdateUserPersonalInfoDTO {
    @Size(min = 3, max = 40, message = "First name should be between 3 and 40 characters")
    private String firstName;

    @Size(min = 3, max = 40, message = "Last name should be between 3 and 40 characters")
    private String lastName;

    @Past(message = "Date should be in the past")
    private LocalDate birthDate;
}
