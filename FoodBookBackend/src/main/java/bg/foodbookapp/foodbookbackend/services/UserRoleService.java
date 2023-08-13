package bg.foodbookapp.foodbookbackend.services;

import bg.foodbookapp.foodbookbackend.models.entities.UserRole;
import bg.foodbookapp.foodbookbackend.models.enums.Role;
import bg.foodbookapp.foodbookbackend.repositories.UserRoleRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@AllArgsConstructor(onConstructor_ = @Autowired)
public class UserRoleService {
    private final UserRoleRepository userRoleRepository;

    @PostConstruct
    private void initRoles() {

        if (userRoleRepository.count() == 0) {
            Arrays.stream(Role.values()).map(role -> {
                UserRole userRole = new UserRole();
                userRole.setRole(role);
                return userRole;
            }).forEach(userRoleRepository::save);
        }
    }
}
