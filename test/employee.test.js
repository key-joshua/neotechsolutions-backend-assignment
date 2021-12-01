import chaihttp from 'chai-http';
import chai, { expect } from 'chai';
import { CREATED, BAD_REQUEST } from 'http-status';

import app from '../src/index';
import dummyData from './adummyData';

chai.use(chaihttp);
const router = () => chai.request(app);

describe('TEST EMPLOYEE APIs', async () => {
  it('User should be able to create employee', (done) => {
    router()
      .post('/api/employees//create-employee')
      .send(dummyData[0])
      .end((error, response) => {
        expect(response).to.have.status(CREATED);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        expect(response.body).to.have.property('data');
        done(error);
      });
  });

  it('User should not be able to create employee with missing employee`s detail', (done) => {
    router()
      .post('/api/employees//create-employee')
      .send(dummyData[1])
      .end((error, response) => {
        expect(response).to.have.status(BAD_REQUEST);
        expect(response.body).to.be.a('object');
        expect(response.body.message).to.be.a('string');
        done(error);
      });
  });
});
