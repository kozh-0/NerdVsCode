import com.example.dto.ClientDto;
import com.example.dto.response.UserDtoResponse;
import com.example.entity.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.SpringVersion;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Objects;

public class UserTests {

    @Test
    public void simpleTest() {
        Assertions.assertEquals("5.3.23", SpringVersion.getVersion());
    }

   /* @Test
    public void bankTest() {


        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<List<UserDtoResponse>> response
                = restTemplate.exchange("http://localhost:8080/users/", HttpMethod.GET, null, ParameterizedTypeReference<List<UserDtoResponse>>() {});

        System.out.println(response.getBody());
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
    }*/

}
