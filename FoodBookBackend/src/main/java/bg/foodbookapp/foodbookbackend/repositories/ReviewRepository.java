package bg.foodbookapp.foodbookbackend.repositories;

import bg.foodbookapp.foodbookbackend.models.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
}
