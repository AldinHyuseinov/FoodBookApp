package bg.foodbookapp.foodbookbackend.models.entities;

import bg.foodbookapp.foodbookbackend.models.enums.Type;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "picture_types")
@NoArgsConstructor
@Getter
@Setter
public class PictureType extends BaseEntity {
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Type type;
}
