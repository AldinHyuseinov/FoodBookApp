package bg.foodbookapp.foodbookbackend.web;

import bg.foodbookapp.foodbookbackend.models.dto.LoginUserDTO;
import bg.foodbookapp.foodbookbackend.models.dto.RegisterUserDTO;
import bg.foodbookapp.foodbookbackend.models.dto.UserModel;
import bg.foodbookapp.foodbookbackend.services.UserService;
import bg.foodbookapp.foodbookbackend.utils.JwtUtil;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
