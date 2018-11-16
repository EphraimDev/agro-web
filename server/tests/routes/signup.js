import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import data from '../data/userData';
//import resetUser from '../data/resetInfo';

import app from '../../app';

chai.should();

chai.use(chaiHttp);

describe('Tests for User Sign Up API endpoint', () => {
    describe('POST api/v1/register-user', () => {
        it('should add a new user to the database', (done) => {
            chai.request(app)
                .post('api/v1/register-user')
                .send()
        })
    })
})