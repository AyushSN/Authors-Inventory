package projects.authors_inventory.services;

import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import projects.authors_inventory.dto.requests.RegisterRequest;
import projects.authors_inventory.dto.requests.UpdateUserRequest;
import projects.authors_inventory.dto.responses.UserResponse;
import projects.authors_inventory.entity.User;
import projects.authors_inventory.exceptions.UserNotFoundException;
import projects.authors_inventory.repositories.UserRepository;

import java.util.List;

@Service
public class UserServices {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServices(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse registerUser(RegisterRequest request) {

        User user=new User();
        user.setFirst_name(request.getFirst_name());
        user.setLast_name(request.getLast_name());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        return new UserResponse(user);
    }

    public UserResponse updateUser(UpdateUserRequest request) {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository
                .findByUsername(username)
                .orElseThrow(()->new UserNotFoundException("User Not Found"));
        if (request.getFirst_name() != null) {
            user.setFirst_name(request.getFirst_name());
        }

        if (request.getLast_name() != null) {
            user.setLast_name(request.getLast_name());
        }

        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        userRepository.save(user);
        return new UserResponse(user);
    }

    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream()
                .map(user->new UserResponse(
                        user.getFirst_name(),
                        user.getLast_name(),
                        user.getUsername(),
                        user.getEmail()
                ))
                .toList();
    }

    @Transactional
    public void deleteUser(String username) {
        User user = userRepository.deleteByUsername(username).orElseThrow(()->new UserNotFoundException("User Not Found"));
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}
