import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { MyApp } from '../app/app.component';
import { Component } from '@angular/core';
import { IonicModule, NavController } from 'ionic-angular';
import { NavControllerMock } from 'ionic-mocks-jest';
import { HomePage } from '../pages/home/home';
import { MockHomePage } from '../mocks/mock.home';

let comp: HomePage;
let fixture: ComponentFixture<HomePage>;
let nav = null;
let component = null;

beforeEach(async() => {

    TestBed.configureTestingModule({
      declarations: [MyApp, HomePage],

      providers: [
        {
          provide: NavController,
          useClass: NavControllerMock
        },
        {
          provide: HomePage,
          useClass: MockHomePage
        }
      ],

      imports: [
        IonicModule.forRoot(MyApp)
      ]
    }).compileComponents();


});


beforeEach(() => {
  fixture = TestBed.createComponent(HomePage);
  comp = fixture.componentInstance;

});


describe('Home page functionality', () =>
{
  test('Test number', () =>
  {
    expect.assertions(1);
    expect(typeof 1).toBe('string')
  });

  test('Test nav?', () =>
  {
    expect.assertions(1);

    expect(typeof 1).toBe('number')
  });

  test('Page is created', () => {
    expect.assetions(1);

    expect(fixture).toBeTruthy();
  });

});
