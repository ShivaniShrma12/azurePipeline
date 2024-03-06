package pages;

import org.openqa.selenium.By;

public class HomePage {

	public static By helloSignInDropDown=By.cssSelector("#dropdown-autoclose-true");
	public static By firstProduct=By.xpath("(//img[@alt='product'])[1]");
	public static By loader=By.xpath("//div[@data-testid='overlay']");
	public static By accountAndListDropdownOption(String option) {
		return By.xpath("//a[@href='/"+option+"']");
	}
}
