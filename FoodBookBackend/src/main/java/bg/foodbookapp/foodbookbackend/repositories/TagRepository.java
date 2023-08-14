package bg.foodbookapp.foodbookbackend.repositories;

import bg.foodbookapp.foodbookbackend.models.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
}
