const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const history = require( 'connect-history-api-fallback' );
const cors = require('cors' );
const compression = require( 'compression' );


// 引入路由文件
const { verifyCodeRouter, registerRouter } = require( './routes/login/register' );
const loginRouter = require( './routes/login/login' );
const userAvatarRouter = require( './routes/user/userAvatar' );
const articleListRouter = require( './routes/article/articleList' );
const articleRouter = require( './routes/article/article' );
const articleCategoriesRouter = require('./routes/article/articleCategories');
const typeArticleRouter = require( './routes/article/typeArticle' );
const publishCommentRouter = require( './routes/comment/publishComment' );
const commentContentRouter = require( './routes/comment/commentContent' );
const replyCommentRouter = require( './routes/comment/replyComment' );
const userMessageRouter = require( './routes/user/userMessage' );
const jurisdictionRouter = require( './routes/jurisdiction' );
const replaceAvatarRouter = require( './routes/user/replaceAvatar' );
const writeArticleRouter = require( './routes/admin/writeArticle' );
const reviseMessageRouter = require( './routes/user/reviseMessage' );
const userSettingsRouter = require( './routes/user/UserSettings' );
const subUserSettingsRouter = require( './routes/user/subUserSetting' );
const userListRouter = require( './routes/admin/userList' );
const removeUserRouter = require( './routes/admin/removeUser' );


const app = express();


//process.env.PORT = 80;
//process.env.NODE_ENV = 'production';


// 使用第三方中间件
app.use(logger('dev'));
app.use(compression());
app.use(
    cors({
        origin: [
            'http://www.foolman.top',
            'http://foolman.top',
            'https://www.foolman.top',
            'https://foolman.top',
        ],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use( history() );



/* 
*配置单页面应用的跳转，
*也就是说怎么跳都是那一个HTML页面，
 */
//app.use( '/', express.static( path.join( __dirname, 'public' ) ) );






// 使用路由中间件
app.use( verifyCodeRouter() );
app.use( registerRouter() );
app.use( loginRouter() );
app.use( userAvatarRouter() );
app.use( articleListRouter() );
app.use( articleRouter() );
app.use(articleCategoriesRouter());
app.use( typeArticleRouter() );
app.use( publishCommentRouter() );
app.use( commentContentRouter() );
app.use( replyCommentRouter() );
app.use( userMessageRouter() );
app.use( jurisdictionRouter() );
app.use( replaceAvatarRouter() );
app.use( writeArticleRouter() );
app.use( reviseMessageRouter() );
app.use( userSettingsRouter() );
app.use( subUserSettingsRouter() );
app.use( userListRouter() );
app.use( removeUserRouter() );



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
