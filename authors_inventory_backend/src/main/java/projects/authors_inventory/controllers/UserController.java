package projects.authors_inventory.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import projects.authors_inventory.dto.requests.RegisterRequest;
import projects.authors_inventory.dto.requests.UpdateUserRequest;
import projects.authors_inventory.dto.responses.UserResponse;
import projects.authors_inventory.entity.User;
import projects.authors_inventory.repositories.UserRepository;
import projects.authors_inventory.services.UserServices;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;
    private UserServices userServices;

    private UserController(UserServices userServices, UserRepository userRepository) {
        this.userServices = userServices;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userServices.registerUser(request));
    }

    @PutMapping("/update")
    public ResponseEntity<UserResponse> updateUser(@RequestBody UpdateUserRequest request) {
        return ResponseEntity.ok(userServices.updateUser(request));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
       List<UserResponse> users = userServices.getAllUsers();
       return ResponseEntity.ok(users);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(@RequestParam String username) {
        userServices.deleteUser(username);
        return ResponseEntity.ok("User deleted successfully");
    }
}
