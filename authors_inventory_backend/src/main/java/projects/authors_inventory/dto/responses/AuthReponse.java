package projects.authors_inventory.dto.responses;

import lombok.Getter;

@Getter
public class AuthReponse {

    private String accessToken;
    private String refreshToken;

    public AuthReponse(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
