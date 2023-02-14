import 'reflect-metadata';
import { Container } from 'inversify';
import AppLication from './app/application.js';
import { Component } from './types/component.types.js';
import { applicationContainer } from './app/application.container.js';
import { userContainer } from './modules/user/user.container.js';
import { cityContainer } from './modules/city/city.container.js';
import { offerContainer } from './modules/offer/offer.container.js';

const mainContainer = Container.merge(
  applicationContainer,
  userContainer,
  cityContainer,
  offerContainer,
);

async function bootstart() {
  const aplication = mainContainer.get<AppLication>(Component.Application);
  await aplication.init();
}

bootstart();
