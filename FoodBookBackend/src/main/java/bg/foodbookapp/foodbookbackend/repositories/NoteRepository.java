package bg.foodbookapp.foodbookbackend.repositories;

import bg.foodbookapp.foodbookbackend.models.entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
}
