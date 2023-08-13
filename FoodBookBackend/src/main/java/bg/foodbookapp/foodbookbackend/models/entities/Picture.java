package bg.foodbookapp.foodbookbackend.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "pictures")
@NoArgsConstructor
@Getter
@Setter
public class Picture extends BaseEntity {
    @Lob
    @Column(columnDefinition = "BLOB", length = Integer.MAX_VALUE)
    private byte[] picture;

    @ManyToOne(optional = false)
    private PictureType pictureType;
}
