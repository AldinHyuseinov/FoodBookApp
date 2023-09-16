package bg.foodbookapp.foodbookbackend.services;

import bg.foodbookapp.foodbookbackend.models.dto.RegisterUserDTO;
import bg.foodbookapp.foodbookbackend.models.dto.UpdateUserPublicInfoDTO;
import bg.foodbookapp.foodbookbackend.models.entities.User;
import bg.foodbookapp.foodbookbackend.models.enums.Role;
import bg.foodbookapp.foodbookbackend.models.enums.Type;
import bg.foodbookapp.foodbookbackend.repositories.UserRepository;
import bg.foodbookapp.foodbookbackend.repositories.UserRoleRepository;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor_ = @Autowired)
public class UserService {
    private final UserRepository userRepository;

    private final UserRoleRepository userRoleRepository;

    private final PictureService pictureService;

    private final PasswordEncoder passwordEncoder;

    private final ModelMapper mapper;

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

    public void registerUser(RegisterUserDTO registerUserDTO) {
        User user = mapper.map(registerUserDTO, User.class);
        user.setPassword(passwordEncoder.encode(registerUserDTO.getPassword()));
        user.setRole(userRoleRepository.findUserRoleByRole(Role.USER));

        userRepository.save(user);
    }

    public void updatePublicInfo(UpdateUserPublicInfoDTO userPublicInfoDTO, String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElse(null);

        if (userPublicInfoDTO.getPhoto() != null) {
            user.setProfilePicture(pictureService.addPicture(userPublicInfoDTO.getPhoto(), Type.USER));
        }
        user.setUsername(userPublicInfoDTO.getUsername());
        user.setTagline(userPublicInfoDTO.getTagline());

        userRepository.save(user);
    }
}
