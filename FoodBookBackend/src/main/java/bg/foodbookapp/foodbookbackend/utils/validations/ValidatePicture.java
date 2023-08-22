package bg.foodbookapp.foodbookbackend.utils.validations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@Constraint(validatedBy = PictureValidator.class)
public @interface ValidatePicture {
    String message() default "Picture should be PNG, JPEG or WEBP";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
