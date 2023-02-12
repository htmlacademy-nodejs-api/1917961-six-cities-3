import { Container } from 'inversify';
import { Component } from '../../types/component.types.js';
import { UserServiceInterface } from './user-service.interface.js';
import UserService from './user.service.js';

const userContainer = new Container();

userContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService).inSingletonScope();

export {userContainer};
