import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { MockLoginPage } from '../mocks/mock.login';

/**
*
*
*/
let login = null;
let username = null;
let passworkd = null;


beforeEach(() => {
    login = new MockLoginPage();
});

describe('Login page functionality and components', () =>
{
  /**
  * try to test when the login function is called, a TabsPage is created
  *
  **/
  test('Tests if username is a string', () =>
  {
      expect.assertions(1);
      let username = login.username;

      expect(typeof username).toBe('string')
  });

  test('Tests if password is a string', () =>
  {
      expect.assertions(1);
      let password = login.password;

      expect(typeof password).toBe('string')
  });


});
