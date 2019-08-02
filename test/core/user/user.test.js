const assert = require('assert');
const { expect } = require('chai');
const app = require('../../../dist/app').default;

describe('User service', () => {
    const userService = app.service('user');

    it('Registers the User Service successfully', () => {
        assert.ok(userService, 'Registered the service');
    });

    it('throws when creating a user with missing/invalid data', (done) => {
        const nameless = {
            email: 'crispin@email.com',
            password: 'password',
            // Name is missing
        };

        userService.create(nameless).then(() => {
            throw new Error('Test should have failed');
        }).catch((err) => {
            expect(err.errors.name.name).to.equal('ValidatorError');
            done();
        });
    });

    it('creates a user', (done) => {
        const user = {
            email: 'crispin@email.com',
            password: 'password1',
            name: 'Crispin Koech',
        };

        userService.create(user).then((result) => {
            expect(result).to.be.an('object');
            expect(result).to.have.property('_id');
            expect(result).to.have.property('verified');
            done();
        }).catch((err) => {
            throw err;
        });
    });

    it('throws when creating a new user with a registered email address', (done) => {
        const alreadyRegistered = {
            email: 'crispin@email.com',
            password: 'password1',
            name: 'Crispin Koech',
        };

        userService.create(alreadyRegistered).then(() => {
            throw new Error('Should have failed due to unique constraint');
        }).catch((err) => {
            const errMessage = `email: ${alreadyRegistered.email} already exists.`;
            expect(err.message).to.equal(errMessage);
            done();
        });
    });

    it('fetches users', (done) => {
        userService.find({
            query: {
                email: 'crispin@email.com',
            },
        }).then((result) => {
            expect(result).to.have.property('data');
            expect(result.total).to.equal(1);
            done();
        });
    });

    it('gets one user by id', (done) => {
        userService.create({
            email: 'random@email.com',
            password: 'random',
            name: 'Random User',
        }).then((user) => {
            const { _id } = user;

            userService.get(_id, {}).then((result) => {
                expect(result).to.be.an('object');
                expect(result).to.have.property('_id');
                expect(result).to.have.property('email');
                expect(result).to.have.property('verified');
                done();
            }).catch((err) => {
                throw err;
            });
        }).catch((err) => {
            throw err;
        });
    });

    it('throws when updating a non-existent user', (done) => {
        const updates = {
            email: 'newEmail@email.com',
        };

        const id = 33;

        userService.patch(id, updates).then(() => {
            throw new Error('Test should have failed');
        }).catch((err) => {
            const errMessage = `Cast to ObjectId failed for value "${id}" at path "_id" for model "User"`;
            expect(err.message).to.equal(errMessage);
            done();
        });
    });

    it('updates a user', (done) => {
        const updates = {
            email: 'newMcDonalds@email.com',
        };

        userService.create({
            email: 'McNuggetsV2@email.com',
            password: 'szechuan',
            name: 'McNugget Szechuan Sauce v2',
        }).then((user) => {
            const { _id } = user;

            userService.patch(_id, updates).then((result) => {
                expect(result.email).to.equal(updates.email);
                done();
            }).catch((err) => {
                throw err;
            });
        }).catch((err) => {
            throw err;
        });
    });

    it('throws when deleting a non-existent user', (done) => {
        const id = 3;

        userService.remove(id).then(() => {
            throw new Error('Test should have failed on invalid id');
        }).catch((err) => {
            const errMessage = `Cast to ObjectId failed for value "${id}" at path "_id" for model "User"`;
            expect(err.message).to.equal(errMessage);
            done();
        });
    });

    it('deletes a user', (done) => {
        userService.create({
            email: 'McNuggetsV2@email.com',
            password: 'szechuan',
            name: 'McNugget Szechuan Sauce v2',
        }).then((user) => {
            const { _id } = user;

            userService.remove(_id).then((result) => {
                expect(result).to.be.an('object');
                done();
            }).catch((err) => {
                throw err;
            });
        }).catch((err) => {
            throw err;
        });
    });
});
