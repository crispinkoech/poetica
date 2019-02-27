const assert = require('assert');
const { expect } = require('chai');
const app = require('../../../dist/app').default;

describe('User service', () => {
    const userService = app.service('user');

    it('Registered the User Service successfully', () => {
        assert.ok(userService, 'Registered the service');
    });

    it('creates a user', (done) => {
        const user = {
            email: 'crispin55@email.com',
            password: 'password1',
            name: 'Crispin Koech',
        };

        userService.create(user).then((result) => {
            expect(result).to.be.an('object');
            expect(result).to.have.property('_id');
            expect(result).to.have.property('verified');
            done();
        });
    });
});
