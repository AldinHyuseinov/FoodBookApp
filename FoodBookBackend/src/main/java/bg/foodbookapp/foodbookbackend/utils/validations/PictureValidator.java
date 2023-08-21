package bg.foodbookapp.foodbookbackend.utils.validations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

public class PictureValidator implements ConstraintValidator<ValidatePicture, MultipartFile> {
    @Override
    public boolean isValid(MultipartFile value, ConstraintValidatorContext context) {

        if (value == null) {
            return true;
        }

        if (!value.getContentType().equals("image/jpeg") && !value.getContentType().equals("image/png") && !value.getContentType().equals("image/webp")) {
            return false;
        }

        return true;
    }
}
