package bg.foodbookapp.foodbookbackend.web;

import bg.foodbookapp.foodbookbackend.utils.exceptions.FormException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class RestAdvice {
    @ExceptionHandler(FormException.class)
    public ResponseEntity<Map<String, String>> onFormError(FormException fe) {
        return ResponseEntity.badRequest().body(fe.getFieldAndMessage());
    }
}
