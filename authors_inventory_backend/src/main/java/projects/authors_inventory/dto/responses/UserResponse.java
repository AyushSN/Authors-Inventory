package projects.authors_inventory.dto.responses;

import lombok.Getter;
import projects.authors_inventory.entity.User;

@Getter
public class UserResponse {
    private String first_name;
    private String last_name;
    private String username;
    private String email;

    public UserResponse(String first_name, String lastName, String username, String email){
        this.first_name = first_name;
        this.last_name = lastName;
        this.username = username;
        this.email = email;
    }
    public UserResponse(User user){
        this.first_name = user.getFirst_name();
        this.last_name = user.getLast_name();
        this.username = user.getUsername();
        this.email = user.getEmail();
    }
}
