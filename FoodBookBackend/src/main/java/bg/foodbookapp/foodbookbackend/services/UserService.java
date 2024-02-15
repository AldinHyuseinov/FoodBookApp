package bg.foodbookapp.foodbookbackend.services;

import bg.foodbookapp.foodbookbackend.models.dto.*;
import bg.foodbookapp.foodbookbackend.models.entities.Picture;
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

import java.time.LocalDate;
import java.util.Base64;
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

        Picture previousUserPicture = user.getProfilePicture();
        String username = userPublicInfoDTO.getUsername();
        String tagline = userPublicInfoDTO.getTagline();

        if (userPublicInfoDTO.getPhoto() != null) {
            user.setProfilePicture(pictureService.addPicture(userPublicInfoDTO.getPhoto(), Type.USER));

            if (previousUserPicture != null) {
                pictureService.removePicture(previousUserPicture);
            }
        }

        if (username != null) {
            user.setUsername(username);
        }

        if (tagline != null) {
            user.setTagline(tagline);
        }

        userRepository.save(user);
    }

    public void updatePersonalInfo(UpdateUserPersonalInfoDTO userPersonalInfoDTO, String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElse(null);

        String firstName = userPersonalInfoDTO.getFirstName();
        String lastName = userPersonalInfoDTO.getLastName();
        LocalDate birthDate = userPersonalInfoDTO.getBirthDate();

        if (firstName != null) {
            user.setFirstName(firstName);
        }

        if (lastName != null) {
            user.setLastName(lastName);
        }

        if (birthDate != null) {
            user.setBirthDate(birthDate);
        }

        userRepository.save(user);
    }

    public PublicInfoDTO getPublicInfo(String userEmail) {
        return mapper.map(userRepository.findByEmail(userEmail).orElse(null), PublicInfoDTO.class);
    }

    public PictureDTO getUserPicture(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElse(null);
        Picture picture = user.getProfilePicture();

        if (picture != null) {
            String base64 = Base64.getEncoder().encodeToString(picture.getPicture());
            PictureDTO pictureDTO = new PictureDTO();
            pictureDTO.setPicture("data:" + picture.getFileType() + ";base64," + base64);

            return pictureDTO;
        }

        return null;
    }
}
