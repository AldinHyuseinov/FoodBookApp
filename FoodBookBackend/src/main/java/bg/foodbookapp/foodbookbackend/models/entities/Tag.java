package bg.foodbookapp.foodbookbackend.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tags")
@NoArgsConstructor
@Getter
@Setter
public class Tag extends BaseEntity {
    @Column(nullable = false)
    private String tagName;
}
