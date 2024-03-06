package pages;

import org.openqa.selenium.By;

public class LoginPage {
	public static By loginButtonOnDropdown = By.xpath("//a//span[text()='Login']");
	public static By username = By.xpath("//div[@name='Login']//input[@id='validationFormik01']");
	public static By password = By.xpath("//div[@name='Login']//input[@id='validationFormik02']");
	public static By loginButton = By.xpath("//button[@type='submit']");
	public static By logoutButton = By.cssSelector("#ddllogout");
	public static By successfulToastMsg = By.cssSelector(".Toastify .Toastify__toast-body");
	public static By invalidMessage(String message) {
		return By.xpath("//div[@class='invalid-feedback' and text()='"+message+"']");
	}
	public static By submitButton(String buttonName) {
		return By.xpath("//div[@name='"+buttonName+"']//button[@type='submit']");
	}
	public static By submitButtonByIndex(String buttonName,int index) {
		return By.xpath("(//div[@name='"+buttonName+"']//button[@type='submit'])["+index+"]");
	}
}
