package bg.foodbookapp.foodbookbackend.models.dto;

import bg.foodbookapp.foodbookbackend.utils.validations.UniqueEmail;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class RegisterUserDTO {
    @Size(min = 2, max = 20, message = "Email should be between 2 and 30 symbols.")
    @UniqueEmail
    private String email;

    @Size(min = 5, message = "Password should be at least 5 symbols.")
    private String password;
}
