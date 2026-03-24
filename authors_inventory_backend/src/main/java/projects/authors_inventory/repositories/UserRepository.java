package projects.authors_inventory.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import projects.authors_inventory.entity.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    Optional<User> deleteByUsername(String username);
}
