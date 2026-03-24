package projects.authors_inventory.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projects.authors_inventory.dto.requests.RefreshRequest;
import projects.authors_inventory.dto.responses.AuthReponse;
import projects.authors_inventory.dto.requests.LoginRequest;
import projects.authors_inventory.services.AuthServices;
import projects.authors_inventory.services.JwtService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtService jwtService;
    private AuthServices authServices;

    public AuthController(AuthServices authServices, JwtService jwtService) {
        this.authServices = authServices;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthReponse> post(@RequestBody LoginRequest request) {
        AuthReponse result = authServices.login(request);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthReponse> refreshToken(@RequestBody RefreshRequest request){

        String username=jwtService.extractUserName(request.getRefreshToken());
        String newAccessToken=jwtService.generateAccessToken(username);

        return ResponseEntity.ok(new AuthReponse(newAccessToken,newAccessToken));
    }
}
