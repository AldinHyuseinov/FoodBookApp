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
    @Column(columnDefinition = "MEDIUMBLOB", length = Integer.MAX_VALUE)
    private byte[] picture;

    @Column(nullable = false)
    private String fileType;

    @ManyToOne(optional = false)
    private PictureType pictureType;
}
