/*!
 * Copyright (c) 2020, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

const FORMS = {
  IDENTIFY: 'identify',
  SELECT_IDENTIFY: 'select-identify',
  SELECT_ENROLL_PROFILE: 'select-enroll-profile',
  ENROLL_PROFILE: 'enroll-profile',

  SELECT_AUTHENTICATOR_AUTHENTICATE: 'select-authenticator-authenticate',
  AUTHENTICATOR_VERIFICATION_DATA: 'authenticator-verification-data',
  CHALLENGE_AUTHENTICATOR: 'challenge-authenticator',

  SELECT_AUTHENTICATOR_ENROLL: 'select-authenticator-enroll',
  SELECT_AUTHENTICATOR_ENROLL_DATA: 'select-authenticator-enroll-data',
  AUTHENTICATOR_ENROLLMENT_DATA: 'authenticator-enrollment-data',
  ENROLL_AUTHENTICATOR: 'enroll-authenticator',
  RE_ENROLL_AUTHENTICATOR: 're-enroll-authenticator',
  RE_ENROLL_AUTHENTICATOR_WARNING: 're-enroll-authenticator-warning',
  RESET_AUTHENTICATOR: 'reset-authenticator',
  SKIP: 'skip',

  SUCCESS_REDIRECT: 'success-redirect',
  REDIRECT_IDP: 'redirect-idp',

  DEVICE_CHALLENGE_POLL: 'device-challenge-poll',
  DEVICE_APPLE_SSO_EXTENSION: 'device-apple-sso-extension',
  CANCEL_TRANSACTION: 'cancel-transaction',
  LAUNCH_AUTHENTICATOR: 'launch-authenticator',
};

const FORMS_WITHOUT_SIGNOUT = [
  FORMS.IDENTIFY,
  FORMS.SUCCESS_REDIRECT,
  FORMS.ENROLL_PROFILE,
  FORMS.SELECT_AUTHENTICATOR_ENROLL,
  FORMS.AUTHENTICATOR_ENROLLMENT_DATA,
  FORMS.ENROLL_AUTHENTICATOR,
  FORMS.REDIRECT_IDP,
  FORMS.RESET_AUTHENTICATOR,
  // TODO: remove following when deprecating `factor`
  'select-factor-enroll',
  'enroll-factor'
];

const FORMS_WITH_STATIC_BACK_LINK = [
  FORMS.SELECT_AUTHENTICATOR_ENROLL,
  FORMS.SELECT_AUTHENTICATOR_AUTHENTICATE
];

export {
  FORMS,
  FORMS_WITHOUT_SIGNOUT,
  FORMS_WITH_STATIC_BACK_LINK
};