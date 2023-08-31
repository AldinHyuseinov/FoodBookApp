package bg.foodbookapp.foodbookbackend.models.dto;

import com.google.gson.annotations.Expose;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class NoteDTO {
    private Long id;

    @Expose
    private String title;

    @Expose
    private String noteText;
}
