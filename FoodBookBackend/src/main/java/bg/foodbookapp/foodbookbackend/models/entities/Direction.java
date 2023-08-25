package bg.foodbookapp.foodbookbackend.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "directions")
@NoArgsConstructor
@Getter
@Setter
public class Direction extends BaseEntity {
    @Column(columnDefinition = "TEXT", nullable = false)
    private String explanation;

    @Column(nullable = false)
    private Integer stepNumber;
}
