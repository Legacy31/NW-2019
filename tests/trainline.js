
module.exports = {
    '@disabled': false,
    'Test trainline': function (browser) {
        /* ==========Scenario=============
          1. As a user, I navigate to "https://www.trainline.fr";
          2. As a user, I check that the Home title is displayed;
          3. As a user, I set the departure station field to "Paris";
          4. As a user, I set the arrival station field to "Angers";
          5. As a user, I click on the "Aller" field to display the date-picker;
          6. As a user, I check that the date-picker is displayed;
          7. As a user, I click one time on the "Next month" arrow;
          8. As a user, I check that the displayed month changed;
          9. As a user, I click on the "24" field
          10. As a user, I check that the "24" field is selected
          11. As a user, I click on the "16h" field
          12. As a user, I check that the "16h" field is selected
          13. As a user, I check the departure date is correct
          14. As a user, I click on the "RECHERCHER" button
          15. As a user, I check that the result page is displayed
          16. As a user, I check that I'm on the result page for "Paris to Angers" travels
          17. As a user, I check that the date for the retrieved result is "Mercredi 24 Juillet"
          18. As a user, I click on the proposal that have departure time to "16h30"
          19. As a user, I check that departure station is "Paris Montparnasse" 
          20. As a user, I check that arrival time is "18h30";
          21. As a user, I check that arrival station is "Angers St-Laud";
        */

        browser
            .windowMaximize()
            .url('https://www.trainline.fr/') //1
            .waitForElementVisible('body')
            .assert.containsText('.open-home__title', "Réservez vos billets de train et de bus.\nEn France et en Europe.") //2
            .setValue("#ember35", "Paris") //3
            .setValue("#ember36", "Angers") //4
            .click("#ember38") //5
            .waitForElementVisible(".search__calendar--container"); //6

        var str_month;

        browser
            .getText(".search__calendar--current-month", (result) => {
                str_month = result.value;   // stores the displayed month to compare with the one displayed after month change 
                browser
                    .click('.search__calendar--increment-month') //7
                    .expect.element("td.search__calendar--current-month").text.not.equal(str_month); //8
            });


        var int_line = 5;

        browser.getText(".search__calendar>tbody>tr:nth-child(" + 5 + ")>td:first-child", (result) => {
            if (parseInt(result.value) > 24) { int_line = 4; } // retrieve on which line is the 24 in the date picker

            for (let row = 1; row < 8; row++) {
                let eltSelector = ".search__calendar>tbody>tr:nth-child(" + int_line + ")>td:nth-child(" + row + ")";
                browser.getText(eltSelector, (result) => {
                    if (parseInt(result.value) == 24) {
                        browser
                            .click(eltSelector) //9
                            .assert.attributeContains(eltSelector, "class", "selected"); //10
                    }
                });
            }
        });

        for (let row = 1; row <= 9; row++) {
            let eltSelector = ".search__timeslots.ember-view>time:nth-child(" + row + ")";
            browser.getText(eltSelector, (result) => {
                if (result.value === "16h") { //searching for the field with the correct value
                    browser
                        .click(eltSelector) //11
                        .assert.attributeContains(eltSelector, "class", "selected"); //12
                }
            });
        }

        browser
            .assert.attributeEquals("#ember38", "value", "mercredi 24 juillet 2019") //13
            .expect.element("#ember39").text.equal("à partir de 16h00"); //13
            
        browser.click("button.progress-button__button"); //14

        browser
            .waitForElementVisible(".search__results") //15
            .expect.element("div.search__results--title").text.contains("Aller : Paris ➜ Angers"); //16
            
        browser.expect.element("div.search__results--header>div.first").text.contains("mercredi 24 juillet"); //17


        // I noticed that the instruction asked to use mostly CSS selector , but didn't find a way to do the same thing
        // with CSS. So in order to don't block the test I choosed to use XPath selector for this step.
        browser
            .useXpath() 
            .click("//span[contains(text(), '16h30')]") //18
            .useCss();

        browser.waitForElementVisible(".segments-section.segments--search.ember-view");
        browser.expect.element(".segments-section.segments--search.ember-view>div:first-child>div.segment__od>div.segment__origin>label.segment__departure-time").text.equal("16h30");
        browser.expect.element(".segments-section.segments--search.ember-view>div:first-child>div.segment__od>div.segment__origin>label.segment__departure-station").text.equal("Paris Montparnasse");
        browser.expect.element(".segments-section.segments--search.ember-view>div:last-child>div.segment__od>div.segment__destination>label.segment__arrival-time").text.equal("18h30");
        browser.expect.element(".segments-section.segments--search.ember-view>div:last-child>div.segment__od>div.segment__destination>label.segment__arrival-station").text.equal("Angers St-Laud");

        browser.end(); 
    }
};
