import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.core.SpringVersion;

public class UserTests {

    @Test
    public void simpleTest() {
        Assertions.assertEquals("5.3.23", SpringVersion.getVersion());
    }

}
