import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.core.SpringVersion;

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
