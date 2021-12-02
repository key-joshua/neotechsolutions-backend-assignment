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

  it('User should be able to create employee', (done) => {
    router()
      .post('/api/employees/create-employee')
      .send(dummyData[4])
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

describe('TEST VIEW EMPLOYEES API', async () => {
  it('User should be able to view employees', (done) => {
    router()
      .get('/api/employees/view-employees')
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it('User should be able to view employees', (done) => {
    router()
      .get('/api/employees/view-employees?page=1&limit=1')
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it('User should be able to view employees', (done) => {
    router()
      .get('/api/employees/view-employees?page=2&limit=1')
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it('User should be able to view employees', (done) => {
    router()
      .get('/api/employees/view-employees?page=3&limit=1')
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });
});

describe('TEST UPDATE EMPLOYEE API', async () => {
  it('User should be able to update employee', (done) => {
    router()
      .patch(`/api/employees/update-employee/${data._id}`)
      .send(dummyData[2])
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it('User should not be able to update employee with empty body', (done) => {
    router()
      .patch(`/api/employees/update-employee/${data._id}`)
      .send(dummyData[3])
      .end((error, response) => {
        expect(response).to.have.status(BAD_REQUEST);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
});

describe('TEST DELETE, VEIW DELETED EMPLOYEES AND UPDATE EMPLOYEE API', async () => {
  it('User should be able to deleted employee', (done) => {
    router()
      .delete(`/api/employees/delete-employee/${data._id}`)
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });

  it('User should be able to view deleted employee', (done) => {
    router()
      .get('/api/employees/view-deleted-employees?page=1&limit=1')
      .end((error, response) => {
        expect(response).to.have.status(OK);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it('User should not be able to update deleted employee', (done) => {
    router()
      .patch(`/api/employees/update-employee/${data._id}`)
      .send(dummyData[2])
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });

  after(async () => {
    await employeesHelper.destroyEmployee('email', dummyData[0].email);
    await employeesHelper.destroyEmployee('email', dummyData[4].email);
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

  it('User should not be able to update unexist employee', (done) => {
    router()
      .patch(`/api/employees/update-employee/${data._id}`)
      .send(dummyData[2])
      .end((error, response) => {
        expect(response).to.have.status(NOT_FOUND);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
});
