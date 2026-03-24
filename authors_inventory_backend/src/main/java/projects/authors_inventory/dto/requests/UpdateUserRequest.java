package projects.authors_inventory.dto.requests;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String first_name;
    private String last_name;
    private String email;
}
