package modules;

import java.util.HashMap;

import com.aventstack.extentreports.Status;

import pages.HomePage;
import pages.LoginPage;
import utilities.*;

public class Home extends KeywordUtil {
    public static HashMap<String, String> dataMap = new HashMap<String, String>();

    public static void readTheTestDataFromExcelFile(String arg1) {
        try {
            dataMap = ExcelDataUtil.getTestDataWithTestCaseID(arg1, "AIEngine");
        } catch (Throwable e) {
            catchAssertError(e);
        }
    }

    public static void navigateToTheAIEngineUrl() {
        try {
            navigateToUrl(dataMap.get("URL"));
            ExtentUtil.logger.get().log(Status.PASS, HTMLReportUtil.passStringGreenColor("Navigated to " + dataMap.get("URL") + " url successfully"));
            waitForVisible(HomePage.firstProduct);
        } catch (Throwable e) {
            catchAssertError(e);
        }
    }


    public static void accountAndListDropdown(String option) {
        try {
            waitForVisible(HomePage.helloSignInDropDown);
            click(HomePage.helloSignInDropDown, "Click on Account and list dropdown");
            switch (option) {
                case "Login" -> {
                    waitForVisible(LoginPage.loginButtonOnDropdown, "Validated that " + option + " option is visible");
                    click(LoginPage.loginButtonOnDropdown, "Click on " + option + " option from the dropdown");
                }
                case "Logout" -> {
                    waitForVisible(LoginPage.logoutButton, "Validated that " + option + " option is visible");
                    click(LoginPage.logoutButton, "Click on " + option + " option from the dropdown");
                }
                case "Your Wishlist" -> {
                    waitForVisible(HomePage.accountAndListDropdownOption("wishlist"), "Validated that " + option + " option is visible");
                    click(HomePage.accountAndListDropdownOption("wishlist"), "Click on " + option + " option from the dropdown");
                }
                case "Your Orders" -> {
                    waitForVisible(HomePage.accountAndListDropdownOption("orders"), "Validated that " + option + " option is visible");
                    click(HomePage.accountAndListDropdownOption("orders"), "Click on " + option + " option from the dropdown");
                }
                case "Your Cart" -> {
                    waitForVisible(HomePage.accountAndListDropdownOption("cart"), "Validated that " + option + " option is visible");
                    click(HomePage.accountAndListDropdownOption("cart"), "Click on " + option + " option from the dropdown");
                }
                case "Shipping Address" -> {
                    waitForVisible(HomePage.accountAndListDropdownOption("billingAddress"), "Validated that " + option + " option is visible");
                    click(HomePage.accountAndListDropdownOption("billingAddress"), "Click on " + option + " option from the dropdown");
                }
            }
        } catch (Throwable e) {
            catchAssertError(e);
        }
    }
}
