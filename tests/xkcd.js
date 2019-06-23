module.exports = {
    '@disabled': true,
    'Test xkcd.com - step 1': function (browser) {
        /* ==========Scenario=============
        1. As a user, I navigate to "https://xkcd.com/";
        2. As a user, I check that "A WEBCOMIC OF ROMANCE, SARCASM, MATH, AND LANGUAGE." is displayed;
        3. As a user, I check that the "Random" button is displayed;
        4. As a user, I click on the random button;
        5. As a user, I check that the displayed picture is different than the previous one;
        6. As a user, I click on the archive link;
        7. As a user, I click on the "Standards" link; 
        8. As a user, I check that the "Standards" picture is displayed;
        */


        var str_url = 'https://www.xkcd.com/';   //home page url
        var str_pictUrl = '';   //home picture url

        browser
            .url(str_url) //1
            .waitForElementVisible('body')
            .assert.urlEquals(str_url)
            .expect.element('#slogan').text.contains('A webcomic of romance,\nsarcasm, math, and language.'); //2

        browser.getAttribute('#comic img', 'src', (result) => str_pictUrl = result.value);   //storing picture url for future comparison

        browser
            .waitForElementVisible('a[href="//c.xkcd.com/random/comic/"]') //3
            .click('a[href="//c.xkcd.com/random/comic/"]') //4
            .waitForElementVisible('#comic')
            .getAttribute('div#comic img', 'src', (result) => { //comparing the actual picture url with home picture url
                browser.assert.notEqual(result.value, str_pictUrl); //5
                str_pictUrl = result.value;
            });

        browser
            .click('a[href="/archive"]')  //6
            .click('a[href="/927/"]')  //7
            .waitForElementVisible('#comic')   //wait for the picture is loaded
            .expect.element('#ctitle').text.equal('Standards');

        browser.getAttribute('div#comic img', 'src', (result) => {
            browser.assert.equal(result.value, "https://imgs.xkcd.com/comics/standards.png"); //8
        });

        browser.end();
    }
}

