package bg.foodbookapp.foodbookbackend.web;

import bg.foodbookapp.foodbookbackend.models.dto.*;
import bg.foodbookapp.foodbookbackend.services.UserService;
import bg.foodbookapp.foodbookbackend.utils.JwtUtil;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import static bg.foodbookapp.foodbookbackend.utils.ErrorHelper.hasErrors;

@RestController
@RequestMapping("/api/users")
public class UserRestController {
    private final UserService userService;

    private final AuthenticationProvider authenticationProvider;

    private final JwtUtil jwtTokenUtil;

    private static final Logger LOGGER = LoggerFactory.getLogger(UserRestController.class);

    public UserRestController(UserService userService, AuthenticationProvider authenticationProvider, JwtUtil jwtTokenUtil) {
        this.userService = userService;
        this.authenticationProvider = authenticationProvider;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterUserDTO registerUserDTO, BindingResult bindingResult) {
        hasErrors(bindingResult);
        userService.registerUser(registerUserDTO);
        LOGGER.info("Registered user with email: {}", registerUserDTO.getEmail());

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUserDTO request) {

        try {
            Authentication authenticate = authenticationProvider
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            String token = jwtTokenUtil.generateToken(authenticate.getName());

            UserModel userModel = new UserModel();
            userModel.setEmail(authenticate.getName());

            DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String strDate = dateFormat.format(jwtTokenUtil.extractExpiration(token).toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime());
            userModel.setTokenExpiration(strDate);

            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, token)
                    .body(userModel);
        } catch (AuthenticationException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/user/public-info")
    public ResponseEntity<PublicInfoDTO> publicInfo(Principal principal) {
        return ResponseEntity.ok(userService.getPublicInfo(principal.getName()));
    }

    @PatchMapping(path = "/user/public-info/update", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updatePublicInfo(@ModelAttribute @Valid UpdateUserPublicInfoDTO userPublicInfoDTO,
                                              BindingResult bindingResult, Principal principal) {
        hasErrors(bindingResult);
        userService.updatePublicInfo(userPublicInfoDTO, principal.getName());

        return ResponseEntity.ok().build();
    }

    @PatchMapping("/user/personal-info/update")
    public ResponseEntity<?> updatePersonalInfo(@RequestBody @Valid UpdateUserPersonalInfoDTO userPersonalInfoDTO,
                                              BindingResult bindingResult, Principal principal) {
        hasErrors(bindingResult);
        userService.updatePersonalInfo(userPersonalInfoDTO, principal.getName());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/public-info/picture")
    public ResponseEntity<PictureDTO> getUserPicture(Principal principal) {
        PictureDTO base64Picture = userService.getUserPicture(principal.getName());

        if (base64Picture != null) {
            return ResponseEntity.ok(base64Picture);
        }

        return ResponseEntity.notFound().build();
    }
}
