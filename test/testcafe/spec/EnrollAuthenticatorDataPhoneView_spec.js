import { RequestMock } from 'testcafe';
import { checkA11y } from '../framework/a11y';
import EnrollPhonePageObject from '../framework/page-objects/EnrollPhonePageObject';
import SuccessPageObject from '../framework/page-objects/SuccessPageObject';
import { checkConsoleMessages } from '../framework/shared';
import xhrAuthenticatorEnrollDataPhone from '../../../playground/mocks/data/idp/idx/authenticator-enroll-data-phone';
import xhrAuthenticatorEnrollDataPhoneVoice from '../../../playground/mocks/data/idp/idx/authenticator-enroll-data-phone-voice';
import xhrSuccess from '../../../playground/mocks/data/idp/idx/success';

const mock = RequestMock()
  .onRequestTo('http://localhost:3000/idp/idx/introspect')
  .respond(xhrAuthenticatorEnrollDataPhone)
  .onRequestTo('http://localhost:3000/idp/idx/challenge')
  .respond(xhrSuccess);

const voiceOnlyOptionMock = RequestMock()
  .onRequestTo('http://localhost:3000/idp/idx/introspect')
  .respond(xhrAuthenticatorEnrollDataPhoneVoice)
  .onRequestTo('http://localhost:3000/idp/idx/challenge')
  .respond(xhrSuccess);

fixture('Authenticator Enroll Data Phone');

async function setup(t) {
  const enrollPhonePage = new EnrollPhonePageObject(t);
  await enrollPhonePage.navigateToPage();
  await checkConsoleMessages({
    controller: null,
    formName: 'authenticator-enrollment-data',
    authenticatorKey: 'phone_number',
  });

  return enrollPhonePage;
}

test.requestHooks(mock)('default sms mode', async t => {
  const enrollPhonePage = await setup(t);
  await checkA11y(t);

  // Check title
  await t.expect(enrollPhonePage.getFormTitle()).eql('Set up phone authentication');
  await t.expect(enrollPhonePage.getFormSubtitle())
    .eql('Enter your phone number to receive a verification code via SMS.');
  await t.expect(enrollPhonePage.getSaveButtonLabel()).eql('Receive a code via SMS');

  // Extension field is hidden
  await t.expect(enrollPhonePage.extensionIsHidden()).eql(true);

  await t.expect(await enrollPhonePage.signoutLinkExists()).ok();

  // assert switch authenticator link shows up
  await t.expect(await enrollPhonePage.switchAuthenticatorLinkExists()).ok();
  await t.expect(enrollPhonePage.getSwitchAuthenticatorLinkText()).eql('Return to authenticator list');
});

test.requestHooks(mock)('voice mode click and extension will get shown', async t => {
  const enrollPhonePage = await setup(t);
  await checkA11y(t);

  // Switch to Voice
  await enrollPhonePage.clickRadio();
  await t.expect(enrollPhonePage.getSaveButtonLabel()).eql('Receive a code via voice call');

  // Extension field is shown
  await t.expect(enrollPhonePage.extensionIsHidden()).eql(false);
  const extensionText = await enrollPhonePage.getElement('.phone-authenticator-enroll__phone-ext').innerText;
  await t.expect(extensionText.trim()).eql('Extension');

  // Default country code US
  const countryCodeText = await enrollPhonePage.getElement('.phone-authenticator-enroll__phone-code').innerText;
  await t.expect(countryCodeText.trim()).eql('+1');

  // Phone Number input field is rendered small
  await t.expect(enrollPhonePage.phoneNumberFieldIsSmall()).eql(true);
});

test.requestHooks(mock)('phone number is required', async t => {
  const enrollPhonePage = await setup(t);
  await checkA11y(t);
  // fields are required
  await t.expect(enrollPhonePage.hasPhoneNumberError()).eql(false);
  await enrollPhonePage.clickSaveButton();
  await enrollPhonePage.waitForError();
  await t.expect(enrollPhonePage.hasPhoneNumberError()).eql(true);
});

test.requestHooks(mock)('should succeed when values are filled in sms mode', async t => {
  const enrollPhonePage = await setup(t);
  await checkA11y(t);

  await enrollPhonePage.fillPhoneNumber('4156669999');
  await enrollPhonePage.clickSaveButton();

  const successPage = new SuccessPageObject(t);
  const pageUrl = await successPage.getPageUrl();
  await t.expect(pageUrl)
    .eql('http://localhost:3000/app/UserHome?stateToken=mockedStateToken123');
});

test.requestHooks(mock)('should succeed when values are filled in voice mode', async t => {
  const enrollPhonePage = await setup(t);
  await checkA11y(t);
  await enrollPhonePage.clickRadio();
  await enrollPhonePage.fillPhoneNumber('4156669999');
  await enrollPhonePage.clickSaveButton();

  const successPage = new SuccessPageObject(t);
  const pageUrl = await successPage.getPageUrl();
  await t.expect(pageUrl)
    .eql('http://localhost:3000/app/UserHome?stateToken=mockedStateToken123');
});


/* Voice only option mocks */
test.requestHooks(voiceOnlyOptionMock)('default is voice mode', async t => {
  const enrollPhonePage = await setup(t);
  await checkA11y(t);

  // Check title
  await t.expect(enrollPhonePage.getFormTitle()).eql('Set up phone authentication');
  await t.expect(enrollPhonePage.getFormSubtitle())
    .eql('Enter your phone number to receive a verification code via voice call.');
  await t.expect(enrollPhonePage.getSaveButtonLabel()).eql('Receive a code via voice call');

  // Extension field is not hidden
  await t.expect(enrollPhonePage.extensionIsHidden()).eql(false);
  // Phone field is rendered small
  await t.expect(enrollPhonePage.phoneNumberFieldIsSmall()).eql(true);
});

test.requestHooks(voiceOnlyOptionMock)('should succeed when values are filled when in voice only mode', async t => {
  const enrollPhonePage = await setup(t);
  await checkA11y(t);
  await enrollPhonePage.fillPhoneNumber('4156669999');
  await enrollPhonePage.clickSaveButton();

  const successPage = new SuccessPageObject(t);
  const pageUrl = await successPage.getPageUrl();
  await t.expect(pageUrl)
    .eql('http://localhost:3000/app/UserHome?stateToken=mockedStateToken123');
});
