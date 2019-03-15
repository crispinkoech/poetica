const assert = require('assert');
const { expect } = require('chai');
const app = require('../../../dist/app').default;

describe('Poem Service', () => {
    const poemService = app.service('poem');
    const userService = app.service('user');

    // Gets a user to use for tests
    let poet;

    before(async () => {
        const { data: users } = await userService.find({});

        if (users.length === 0) {
            poet = await userService.create({
                email: 'babayao@email.com',
                password: 'password1',
                name: 'Baba yao',
            });
        } else {
            [poet] = users;
        }
    });

    it('Registers the Poem Service successfully', () => {
        assert.ok(poemService, 'Registered the service');
    });

    it('throws when creating a poem with missing/invalid data', (done) => {
        const missingParams = {
            title: 'Tha Poem',
            verse: `Poem verse,
                    Goes over here,
                    where the chandelier,
                    lights up to make clear.`,
            // Missing poet parameter
        };

        const invalidParams = {
            title: { key: 1 },
            verse: 'Invalid title',
            poet,
        };

        poemService.create(missingParams).then(() => {
            throw new Error('Test should have failed');
        }).catch((err) => {
            expect(err.errors.poet.name).to.equal('ValidatorError');

            poemService.create(invalidParams).then(() => {
                throw new Error('Test should have failed');
            }).catch((ex) => {
                expect(ex.errors.title.name).to.equal('CastError');
                done();
            });
        });
    });

    it('Posts a poem', (done) => {
        const params = {
            title: 'Tha Poem',
            verse: `Poem verse,
                    Goes over here,
                    where the chandelier,
                    lights up to make clear.`,
            poet,
        };

        poemService.create(params).then((poem) => {
            expect(poem).to.be.an('object');
            expect(poem).to.have.property('title');
            expect(poem).to.have.property('verse');
            expect(poem).to.have.property('poet');

            done();
        }).catch((err) => {
            throw err;
        });
    });

    it('fetches poems', (done) => {
        poemService.find({}).then((result) => {
            expect(result).to.have.property('data');
            expect(result.total).to.equal(1);
            done();
        }).catch((err) => {
            throw err;
        });
    });

    it('gets a poem by its id', (done) => {
        const params = {
            title: 'Tha Poem v2',
            verse: `Poem verse,
                    Goes over here,
                    where they can hear,
                    songs of a higher tier.`,
            poet,
        };

        poemService.create(params).then((poem) => {
            const { _id } = poem;

            poemService.get(_id, {}).then((result) => {
                expect(result).to.be.an('object');
                expect(result).to.have.property('title');
                expect(result).to.have.property('verse');
                expect(result).to.have.property('poet');

                done();
            }).catch((err) => {
                throw err;
            });
        }).catch((err) => {
            throw err;
        });
    });

    it('throws when updating a non-existent poem', (done) => {
        const updates = {
            verse: 'New Verse',
        };

        const id = 33;

        poemService.patch(id, updates).then(() => {
            throw new Error('Test should have failed: Cant cast for ObjectId that doesnt exist');
        }).catch((err) => {
            const errMessage = `Cast to ObjectId failed for value "${id}" at path "_id" for model "Poem"`;

            expect(err.message).to.equal(errMessage);
            done();
        });
    });

    it('throws when updating a poem with invalid data', (done) => {
        const invalidUpdates = {
            verse: { /* Should be String */ },
        };

        poemService.create({
            title: 'Tha Poem',
            verse: `Poem verse,
                    Goes over here,
                    where the chandelier,
                    lights up to make clear.`,
            poet,
        }).then((poem) => {
            const { _id } = poem;

            poemService.patch(_id, invalidUpdates).then(() => {
                throw new Error('Test should have failed due to fields validation');
            }).catch((err) => {
                const errMessage = 'Cast to string failed for value "{}" at path "verse"';
                expect(err.message).to.equal(errMessage);
                done();
            });
        }).catch((err) => {
            throw err;
        });
    });

    it('updates a poem', (done) => {
        const updates = {
            verse: 'Single line verse',
        };

        poemService.create({
            title: 'Tha Poem',
            verse: `Poem verse,
                    Goes over here,
                    where the chandelier,
                    lights up to make clear.`,
            poet,
        }).then((poem) => {
            const { _id } = poem;

            poemService.patch(_id, updates).then((result) => {
                expect(result.verse).to.equal(updates.verse);
                done();
            }).catch((err) => {
                throw err;
            });
        }).catch((err) => {
            throw err;
        });
    });

    it('throws when deleting a non-existent poem', (done) => {
        const id = 33;

        poemService.remove(id).then(() => {
            throw new Error('Test should\'ve failed: Can\'t cast to objectId that doesn\'t exist');
        }).catch((err) => {
            const errMessage = `Cast to ObjectId failed for value "${id}" at path "_id" for model "Poem"`;
            expect(err.message).to.equal(errMessage);
            done();
        });
    });

    it('deletes a poem', (done) => {
        poemService.create({
            title: 'Tha Poem',
            verse: `Poem verse,
                    Goes over here,
                    where the chandelier,
                    lights up to make clear.`,
            poet,
        }).then((poem) => {
            const { _id } = poem;

            poemService.remove(_id).then((result) => {
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
