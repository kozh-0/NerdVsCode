import com.example.entity.Client;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class BankTests {

    @Test
    public void simpleTest() {
        assertEquals(true, true);
    }

    /*private static final Logger log = LoggerFactory.getLogger(BankTests.class);
    private final WebClient webClient;

    public BankTests(WebClient webClient) {
        this.webClient = webClient;
    }


     @Test
    public void bankTest() {
         Client client = webClient
                 .get()
                 .uri(String.join("", "/clients/1"))
                 .retrieve()
                 .bodyToMono(Client.class)
                 .block();




        System.out.println(client.toString());
        assertEquals(1, client.getId());
    }*/

}
