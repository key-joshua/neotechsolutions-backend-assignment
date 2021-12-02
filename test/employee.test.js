/* eslint-disable no-underscore-dangle */

import chaihttp from 'chai-http';
import chai, { expect } from 'chai';
import { CREATED, BAD_REQUEST, CONFLICT, NOT_FOUND, OK } from 'http-status';

import app from '../src/index';
import dummyData from './adummyData';
import employeesHelper from '../src/helpers/employeesHelper';

let data;
chai.use(chaihttp);
const router = () => chai.request(app);

describe('TEST CREATE EMPLOYEE API', async () => {
  it('User should be able to create employee', (done) => {
    router()
      .post('/api/employees/create-employee')
      .send(dummyData[0])
      .end((error, response) => {
        data = response.body.data;
        expect(response).to.have.status(CREATED);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it('User should not be able to create employee with same email', (done) => {
    router()
      .post('/api/employees/create-employee')
      .send(dummyData[0])
      .end((error, response) => {
        expect(response).to.have.status(CONFLICT);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });

  it('User should not be able to create employee with missing employee`s detail', (done) => {
    router()
      .post('/api/employees/create-employee')
      .send(dummyData[1])
      .end((error, response) => {
        expect(response).to.have.status(BAD_REQUEST);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
});

describe('TEST DELETE EMPLOYEE API', async () => {
  it('User should be able to delete employee', (done) => {
    router()
      .delete(`/api/employees/delete-employee/${data._id}`)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });

  after(async () => {
    await employeesHelper.destroyEmployee('email', dummyData[0].email);
  });

  it('User should not be able to delete unexist employee', (done) => {
    router()
      .delete(`/api/employees/delete-employee/${data._id}`)
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
});
