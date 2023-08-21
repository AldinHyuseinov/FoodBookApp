package bg.foodbookapp.foodbookbackend.repositories;

import bg.foodbookapp.foodbookbackend.models.entities.PictureType;
import bg.foodbookapp.foodbookbackend.models.enums.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PictureTypeRepository extends JpaRepository<PictureType, Long> {
    PictureType getPictureTypeByType(Type type);
}
