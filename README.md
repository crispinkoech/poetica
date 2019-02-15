# Arts Poetica's API service
> A FeathersJS application

Exposes a set of endpoints/services that are consumable as a conventional REST API or via WebSockets.

Services are described as Mongoose models and initialzed using featherjs' Mongoose connector. As such, these services are composed as functions which can then be hooked up/configured to the app instance this way:

- Create your model:
```
export default (moongooseClient: mongoose.Mongoose) => {
    const userSchema: Schema = new moongooseClient.Schema({
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
    });

    const model: Model<IUser> = moongooseClient.model<IUser>('User', userSchema);
    
    return model;
}
```

- Create your service (userService.ts)
```
export default (app: feathers.Application) => {
    const mongooseClient = app.get('mongooseClient');
    const paginate = app.get('paginate');

    const userModel = User(mongooseClient);

    const options = {
        paginate,
        Model: userModel,
    };

    app.use('/user', createService(options));

    const service = app.service('user');

    // Initialize hooks
    service.hooks(userHooks);
}; 
```

- Add this service to the application 
```
const app = feathers();
app.configure(userService);
```
