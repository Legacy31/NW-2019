module.exports = {
    '@disabled': true,
    'Test kicherchekoi.com - step 1': function (browser) {
        /* ==========Scenario=============
        1. As a user, I navigate to "https://kicherchekoi.com";
        2. As a user, I check that "Achetez, vendez en toute sérénité" (home title) is displayed;
        3. As a user, I check that "Consultez nos annonces" button is displayed;
        4. As a user, I click on "Consultez nos annonces" button;
        5. As a user, I check that the search bar is visible;
        6. As a user, I type "mario kart" in "Que cherchez vous field";
        7. As a user, I click on the search button;
        8. As a user, I check that the I'm on the result page (searching the string that indicates the number of result) 
        9. As a user, I check that results are displayed (the no result message box is not displayed);
        10. As a user, I click on "Dans quelle catégorie" field;
        11. As a user, I check that the category selector is displayed;
        12. As a user, I set the "Moto / Scooter / Quad" category;
        13. As a user, I tick the "Titre uniquement" checkbox;
        14. As a user, I set the "Région, département ou ville" field to "75018";
        15. As a user, I check that "no result" message box is displayed;
        */

        var chaiAssert = require('chai'); //used to check that the number of result exceed a given number

        var str_url = 'https://kicherchekoi.com/';   //home page url

        browser
            .url(str_url) //1
            .waitForElementVisible('body')
            .expect.element('.home-main-title').text.contains('Achetez, vendez en toute sérénité'); //2

        browser
            .waitForElementVisible('#btn-home-main-search') //3
            .click('#btn-home-main-search') //4
            .waitForElementVisible('#second-navbar') //5
            .setValue('#search_q', 'mario kart') //6
            .click("button[title='Faire une recherche']") //7
            .waitForElementVisible('.classifieds-count')

        browser.assert.containsText('.classifieds-count', 'annonce'); //8
        browser.expect.element('.search-no-result-message.box').not.visible; //9

        browser
            .waitForElementVisible('#second-navbar')
            .click('#category-select') //10
            .waitForElementVisible(".menu-categories > div.container") //11
            .click("a[data-subref='moto-scooter-quad-occasion']") //12
            .click('#titleonly') //13
            .setValue('#location', '75018') //14
            .click('.pac-matched') //selecting the first value in the drop-down
            .expect.element('.search-no-result-message.box').visible; //15

        browser.end();
    }
}

