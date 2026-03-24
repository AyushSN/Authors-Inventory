package projects.authors_inventory.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import projects.authors_inventory.dto.responses.AuthReponse;
import projects.authors_inventory.dto.requests.LoginRequest;
import projects.authors_inventory.entity.User;
import projects.authors_inventory.exceptions.UserNotFoundException;
import projects.authors_inventory.repositories.UserRepository;

@Service
public class AuthServices {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthServices(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.jwtService = new JwtService();
    }

    public AuthReponse login(LoginRequest request) {
        User user = userRepository
                .findByUsername(request.getUsername())
                .orElseThrow(()-> new UserNotFoundException("Username does not exist"));

        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!passwordMatches) {
            throw new RuntimeException("Incorrect Password");
        }
        final String name= user.getUsername();
        String accessToken = jwtService.generateAccessToken(name);
        String refreshToken = jwtService.generateRefreshToken(name);
        return new AuthReponse(accessToken, refreshToken);
    }
}
