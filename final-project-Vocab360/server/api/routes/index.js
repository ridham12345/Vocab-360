import userRouter from './user.js'
import wordRouter from './word.js'
export default(app)=>{
    app.use('/', userRouter);
    app.use('/', wordRouter);
}