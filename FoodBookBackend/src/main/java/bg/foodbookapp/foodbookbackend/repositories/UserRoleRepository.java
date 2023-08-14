package bg.foodbookapp.foodbookbackend.repositories;

import bg.foodbookapp.foodbookbackend.models.entities.UserRole;
import bg.foodbookapp.foodbookbackend.models.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    UserRole findUserRoleByRole(Role role);
}
