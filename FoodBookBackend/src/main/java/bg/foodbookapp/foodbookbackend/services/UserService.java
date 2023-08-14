package bg.foodbookapp.foodbookbackend.services;

import bg.foodbookapp.foodbookbackend.models.entities.User;
import bg.foodbookapp.foodbookbackend.models.enums.Role;
import bg.foodbookapp.foodbookbackend.repositories.UserRepository;
import bg.foodbookapp.foodbookbackend.repositories.UserRoleRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor_ = @Autowired)
public class UserService {
    private final UserRepository userRepository;

    private final UserRoleRepository userRoleRepository;

    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    private void initUsers() {

        if (userRepository.count() >= 1) {
            return;
        }

        User admin = new User();
        admin.setEmail("Admin@example.com");
        admin.setPassword(passwordEncoder.encode("12345"));
        admin.setRole(userRoleRepository.findUserRoleByRole(Role.ADMIN));

        User user = new User();
        user.setEmail(("User@example.com"));
        user.setPassword(passwordEncoder.encode("12345"));
        user.setRole(userRoleRepository.findUserRoleByRole(Role.USER));

        userRepository.saveAll(List.of(admin, user));
    }
}
