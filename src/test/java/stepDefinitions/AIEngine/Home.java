package stepDefinitions.AIEngine;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.JavascriptExecutor;
import org.testng.Assert;
import pages.AddToCartPage;
import pages.HomePage;
import pages.LoginPage;
import utilities.KeywordUtil;

public class Home extends KeywordUtil {

	@Given("^Read the test data \"([^\"]*)\" from Excel file$")
	public void read_the_test_data_from_Excel_file(String arg1) {
		modules.Home.readTheTestDataFromExcelFile(arg1);
	}

	@When("Navigate to the AI Engine url")
	public void navigate_to_the_AI_Engine_url() {
		modules.Home.navigateToTheAIEngineUrl();
		waitForInVisibile(HomePage.loader);
		JavascriptExecutor js = (JavascriptExecutor) getDriver();
		js.executeScript("window.postMessage({ type: 'START' }, '*');");
	}

	@And("^Click on \"([^\"]*)\" option from Account and list dropdown$")
	public void navigateToPage(String dropdownOption) {
		modules.Home.accountAndListDropdown(dropdownOption);
	}

	@Then("Verify user is successfully logged in")
	public void verifyUserIsSuccessfullyLoggedIn() {
		waitForInVisibile(LoginPage.loginButton);
		Assert.assertTrue(isWebElementVisible(AddToCartPage.myCart,"Validated that user is successfully logged in"));
	}
}
