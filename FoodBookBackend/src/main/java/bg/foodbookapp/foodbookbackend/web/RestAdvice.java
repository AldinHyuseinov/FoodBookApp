package bg.foodbookapp.foodbookbackend.web;

import bg.foodbookapp.foodbookbackend.utils.exceptions.FormException;
import bg.foodbookapp.foodbookbackend.utils.exceptions.RecipeNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class RestAdvice {
    @ExceptionHandler(FormException.class)
    public ResponseEntity<Map<String, String>> onFormException(FormException fe) {
        return ResponseEntity.badRequest().body(fe.getFieldAndMessage());
    }

    @ExceptionHandler(RecipeNotFoundException.class)
    public ResponseEntity<?> onRecipeNotFoundException() {
        return ResponseEntity.notFound().build();
    }
}
