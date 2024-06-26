package stepDefinitions.AIEngine;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import modules.Home;
import org.openqa.selenium.Keys;
import org.testng.Assert;
import pages.LoginPage;
import utilities.GlobalUtil;
import utilities.KeywordUtil;

public class Login extends KeywordUtil {

    @When("Enter Username and Password AI Engine")
    public void enter_username_and_password_AI_Engine() {
        modules.Login.enterUsernameAndPasswordAIEngine();
    }

    @And("^Click on \"([^\"]*)\" button$")
    public void clickOnButton(String buttonName) {
        modules.Login.clickOnSubmit(buttonName);
    }

    @And("^Verify that \"([^\"]*)\" toast message should be displayed$")
    public void verifyThatInvalidLoginCredentialErrorMessageShouldBeDisplayed(String toastMsg) {
        modules.Login.verifyToastMessage(toastMsg);

    }

    @And("Enter invalid username and press tab")
    public void enterInvalidUsernameAndPressTab() {
        modules.Login.enterInvalidEmail();
    }

    @Then("^Verify \"([^\"]*)\" error message should be displayed$")
    public void verifyErrorMessageShouldBeDisplayed(String message) {
        modules.Login.verifyInvalidMessage(message);
    }

    @And("Purposely failed step")
    public void purposelyFailedStep() {
        try {
            String var = "Shivani";
            Assert.assertEquals(var, "Sharma");
        } catch (Throwable e) {
            catchAssertError(e);
        }

    }
}
