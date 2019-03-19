const assert = require('assert');
const { expect } = require('chai');
const app = require('../../../dist/app').default;

describe('Poem Remark Service', () => {
    const poemRemarkService = app.service('poem-remark');
    const poemService = app.service('poem');
    const userService = app.service('user');

    // A user and poem to use for tests
    let user;
    let poem;

    before(async () => {
        const { data: users } = await userService.find();
        const { data: poems } = await poemService.find();

        if (users.length === 0) {
            user = await userService.create({
                email: 'babayao@email.com',
                password: 'password1',
                name: 'Baba yao',
            });
        } else {
            [user] = users;
        }

        if (poems.length === 0) {
            poem = await poemService.create({
                title: 'Tha Poem v2',
                verse: `Poem verse,
                        Goes over here,
                        where they can hear,
                        songs of a higher tier.`,
                poet: user,
            });
        } else {
            [poem] = poems;
        }
    });

    it('Registers the Poem Remark service successfully', () => {
        assert.ok(poemRemarkService, 'Registered the service');
    });

    it('throws when making a remark with missing/invalid data', (done) => {
        const missingParams = {
            text: 'Nice poem!',
            // Missing user and poem IDs
        };

        const invalidParams = {
            text: 'Nice Poem!',
            poem: 'Invalid Poem id',
            user: 'Invalid User id',
        };

        poemRemarkService.create(missingParams).then(() => {
            throw new Error('Test should have failed: ValidatorError');
        }).catch((err) => {
            expect(err.errors.poem.name).to.equal('ValidatorError');
            expect(err.errors.user.name).to.equal('ValidatorError');

            poemRemarkService.create(invalidParams).then(() => {
                throw new Error('Test should have failed: CastError');
            }).catch((ex) => {
                expect(ex.errors.poem.name).to.equal('CastError');
                expect(ex.errors.user.name).to.equal('CastError');

                done();
            });
        });
    });

    it('makes a remark on a poem', (done) => {
        const params = {
            text: 'Nice Poem!',
            poem,
            user,
        };

        poemRemarkService.create(params).then((result) => {
            expect(result).to.have.property('text');
            expect(result).to.have.property('poem');
            expect(result).to.have.property('user');

            done();
        }).catch((err) => {
            throw err;
        });
    });

    it('fetches remarks for a given poem', (done) => {
        // Suggestion: Fetch remarks using poemService or the poemRemarkService?
        poemRemarkService.find({
            query: {
                poem,
            },
        }).then((result) => {
            expect(result).to.be.an('object');
            expect(result.data).to.be.an('array');
            expect(result.total).to.equal(1);

            done();
        }).catch((err) => {
            throw err;
        });
    });
});
