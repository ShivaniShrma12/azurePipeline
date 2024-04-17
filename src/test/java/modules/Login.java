package modules;

import com.aventstack.extentreports.Status;
import org.openqa.selenium.Keys;
import org.testng.Assert;
import pages.LoginPage;
import utilities.ExtentUtil;
import utilities.GlobalUtil;
import utilities.HTMLReportUtil;
import utilities.KeywordUtil;

public class Login extends KeywordUtil {

    public static void enterUsernameAndPasswordAIEngine() {
        try {
            waitForVisible(LoginPage.username);
            inputText(LoginPage.username, Home.dataMap.get("Username"), "Username is entered as: " + Home.dataMap.get("Username"));
            waitForVisible(LoginPage.password);
            inputText(LoginPage.password, Home.dataMap.get("Password"), "Password is entered as: " + Home.dataMap.get("Password"));
        } catch (Throwable e) {
            catchAssertError(e);
        }
    }

    public static void clickOnSubmit(String buttonName) {
        try {
            waitForVisible(LoginPage.submitButton(buttonName), "Validated that " + buttonName + " button is visible on " + buttonName + " page");
            int submitBtnSize = GlobalUtil.getDriver().findElements(LoginPage.submitButton(buttonName)).size();
            click(LoginPage.submitButtonByIndex(buttonName, submitBtnSize), "Click on " + buttonName + " button");
        } catch (Throwable e) {
            catchAssertError(e);
        }
    }

    public static void verifyToastMessage(String toastMsg) {
        try {
            waitForVisible(LoginPage.successfulToastMsg);
            String actualMsg = getElementText(LoginPage.successfulToastMsg);
            if (actualMsg.equals(toastMsg)) {
                ExtentUtil.logger.get().log(Status.PASS, HTMLReportUtil.passStringGreenColor("Validated that " + actualMsg + " toast message is displayed"));
            } else {
                Assert.fail("Toast message is not displayed");
            }
        } catch (Throwable e) {
            catchAssertError(e);
        }
    }

    public static void enterInvalidEmail() {
        try {
            waitForVisible(LoginPage.username);
            inputText(LoginPage.username, Home.dataMap.get("Username"), "Invalid username is entered as: " + Home.dataMap.get("Username"));
            GlobalUtil.getDriver().findElement(LoginPage.username).sendKeys(Keys.TAB);
        } catch (Throwable e) {
            catchAssertError(e);
        }
    }

    public static void verifyInvalidMessage(String message) {
        try {
            Assert.assertTrue(isWebElementVisible(LoginPage.invalidMessage(message),"Validated the '"+message+"' error message is displayed"),"Invalid error message is not displayed");
        } catch (Throwable e) {
            catchAssertError(e);
        }
    }
}
